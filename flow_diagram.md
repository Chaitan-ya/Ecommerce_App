# QuickCart Application Flow Diagram

This document illustrates the end-to-end user journeys, screen navigation paths, modal transitions, and reactive data flow of the application.

---

## 1. High-Level Navigation & Screen Hierarchy

```mermaid
flowchart TD
    classDef root fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff
    classDef tab fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#fff
    classDef modal fill:#1e1e24,stroke:#f59e0b,stroke-width:2px,color:#fff
    classDef action fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#fff

    APP["App Entry (src/app/index.tsx)<br/>AppContext Provider & Layout Shell"]:::root

    %% Bottom Tabs
    APP --> TAB_NAV["Bottom Navigation Bar"]
    TAB_NAV --> HOME["1. Home Screen<br/>(HomeScreen.tsx)"]:::tab
    TAB_NAV --> CART["2. Cart Screen<br/>(CartScreen.tsx)"]:::tab
    TAB_NAV --> ORDERS["3. My Orders<br/>(MyOrdersScreen.tsx)"]:::tab
    TAB_NAV --> PROFILE["4. Profile Screen<br/>(ProfileScreen.tsx)"]:::tab

    %% Home Screen Triggers
    HOME -->|"Tap Address"| MODAL_ADDR["Address Modal<br/>(AddressModal.tsx)"]:::modal
    HOME -->|"Tap Category"| MODAL_PLIST["Product Listing Modal<br/>(ProductListingModal.tsx)"]:::modal
    HOME -->|"Tap Product Card"| MODAL_PDETAIL["Product Details Modal<br/>(ProductDetailsModal.tsx)"]:::modal
    HOME -->|"Tap Floating Cart Strip"| CART

    %% Product Modals
    MODAL_PLIST -->|"Tap Product"| MODAL_PDETAIL
    MODAL_PDETAIL -->|"Add to Cart / View Cart"| CART

    %% Cart Screen Triggers
    CART -->|"Change Address"| MODAL_ADDR
    CART -->|"Proceed to Checkout"| SCREEN_CHECKOUT["Checkout Screen<br/>(CheckoutScreen.tsx)"]:::modal

    %% Checkout & Payment Flow
    SCREEN_CHECKOUT -->|"Proceed to Pay"| SCREEN_PAY["Payment Screen<br/>(PaymentScreen.tsx)"]:::modal
    SCREEN_PAY -->|"Confirm Payment (UPI/Card/COD)"| SCREEN_SUCCESS["Payment Success<br/>(PaymentSuccessScreen.tsx)"]:::action
    SCREEN_SUCCESS -->|"Track Live Order"| SCREEN_TRACK["Order Tracking Screen<br/>(OrderTrackingScreen.tsx)"]:::modal
    SCREEN_SUCCESS -->|"Continue Shopping"| HOME

    %% Orders Screen Triggers
    ORDERS -->|"Track Order"| SCREEN_TRACK
    ORDERS -->|"Reorder Items"| CART

    %% Profile Screen Triggers
    PROFILE -->|"Manage Addresses"| MODAL_ADDR
    PROFILE -->|"View Orders"| ORDERS
    PROFILE -->|"Login / Switch User"| MODAL_LOGIN["Login Screen<br/>(LoginScreen.tsx)"]:::modal
```

---

## 2. End-to-End User Purchase Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as Shopper
    participant Home as Home Screen
    participant Details as Product Details
    participant Store as AppContext
    participant Cart as Cart Screen
    participant Checkout as Checkout & Payment
    participant Tracking as Order Tracking

    User->>Home: Browse Catalog / Search Items
    User->>Details: Tap on Product (e.g., Organic Bananas)
    User->>Details: Click "Add to Cart"
    Details->>Store: addToCart(product, quantity)
    Store-->>Cart: Compute Subtotal, Discount & Free Delivery Threshold
    
    User->>Cart: Review Items & Check Bill Breakdown
    User->>Checkout: Click "Proceed to Checkout"
    Checkout->>Store: Fetch selectedAddress
    User->>Checkout: Choose Payment Method (UPI / Card / COD)
    User->>Checkout: Click "Confirm & Pay"
    
    Checkout->>Store: placeOrder(paymentMethod)
    Note over Store: 1. Generate Order ID (#FC-XXXXX)<br/>2. Assign Delivery Partner & ETA (35m)<br/>3. Clear Active Cart<br/>4. Append to orders[]
    Store-->>Checkout: Order Confirmed
    Checkout->>Tracking: Redirect to Live Order Tracking
    
    loop Status Simulation
        User->>Tracking: View Stepper: Placed → Confirmed → Preparing → Out for Delivery → Delivered
        Tracking->>Store: advanceOrderStatus(orderId)
    end
```

---

## 3. State & Event Data Flow Diagram

```mermaid
flowchart LR
    classDef state fill:#0f172a,stroke:#38bdf8,stroke-width:1.5px,color:#fff
    classDef action fill:#064e3b,stroke:#10b981,stroke-width:1.5px,color:#fff
    classDef view fill:#1e293b,stroke:#f59e0b,stroke-width:1.5px,color:#fff

    subgraph UserActions [User Events]
        A1["addToCart / updateQuantity"]:::action
        A2["selectAddress / addAddress"]:::action
        A3["placeOrder(method)"]:::action
        A4["advanceOrderStatus(id)"]:::action
        A5["loginWithPhone / logout"]:::action
    end

    subgraph AppState [Central Store: AppContext.tsx]
        S1["cart: CartItem[]"]:::state
        S2["addresses: Address[]<br/>selectedAddress: Address"]:::state
        S3["orders: Order[]<br/>activeOrder: Order"]:::state
        S4["user: UserProfile<br/>isLoggedIn: boolean"]:::state
        
        subgraph Computed [Live Calculated Values]
            C1["cartTotal"]
            C2["cartCount"]
            C3["totalSavings"]
            C4["deliveryFee (Free if >= ₹199)"]
            C5["finalPayable"]
        end
    end

    subgraph Views [UI Screens & Overlays]
        V1["HomeScreen & Catalog"]:::view
        V2["CartScreen & Bill Breakdown"]:::view
        V3["Checkout & PaymentScreen"]:::view
        V4["OrderTrackingScreen"]:::view
        V5["ProfileScreen & Header"]:::view
    end

    A1 --> S1
    A2 --> S2
    A3 --> S3
    A3 --> S1
    A4 --> S3
    A5 --> S4

    S1 --> Computed
    Computed --> V2
    Computed --> V1
    S2 --> V3
    S2 --> V1
    S3 --> V4
    S4 --> V5
```
