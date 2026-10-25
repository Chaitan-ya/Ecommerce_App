# QuickCart — Mobile eCommerce Application

A fast, full-featured, mobile-first eCommerce & Quick-Commerce application built with **React Native**, **Expo (SDK 57)**, **TypeScript**, and **Expo Router**, architected for easy integration with a **Java Spring Boot** backend.

**Repository:** [https://github.com/Chaitan-ya/Ecommerce_App.git](https://github.com/Chaitan-ya/Ecommerce_App.git) (Branch: `main`)

---

## 🚀 What Has Been Done Up To Now

### 1. Core Architecture & Global State
- **Centralized State Management ([AppContext.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/context/AppContext.tsx))**:
  - Full shopping cart state (add, remove, quantity update, bill calculations with auto savings).
  - Multi-address management (tagging addresses as Home, Work, or Other).
  - Order lifecycle state (simulated order placement, active order tracking, and order history).
  - Authentication state (phone number / OTP login and user profile switching).
  - Modal navigation stack controlling seamless transitions between catalog, details, checkout, payment, and tracking screens.
- **Strict TypeScript Typing ([src/types/index.ts](file:///c:/Users/shiva/Desktop/Workme/myapp/src/types/index.ts))**:
  - Strongly typed models for `Product`, `Category`, `CartItem`, `Address`, `Order`, `OrderStatus`, `DeliveryPartner`, and `UserProfile`.
- **Rich Mock Catalog ([src/data/mockData.ts](file:///c:/Users/shiva/Desktop/Workme/myapp/src/data/mockData.ts))**:
  - Realistic grocery, staples, snacks, drinks, and personal care products with high-resolution imagery, pricing, discounts, pack sizes, and ratings.

---

### 2. Main Tab Screens
- **1. Home Screen ([HomeScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/HomeScreen.tsx))**:
  - Delivery location header with address modal trigger and delivery ETA badge.
  - Interactive search bar with instant keyword matching.
  - Quick category carousel (Fruits & Veg, Dairy & Bakery, Snacks, Drinks, etc.).
  - Promotional banners highlighting lightning-fast delivery offers.
  - Multi-column product grid with discount badges, price comparisons, and quantity steppers (`+`/`-`).
  - Floating bottom cart strip showing real-time item count and total payable.
- **2. Cart Screen ([CartScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/CartScreen.tsx))**:
  - Itemized cart list with direct quantity adjustment and swipe-to-delete.
  - Free delivery threshold progress bar.
  - Promo code / coupon input with instant discount calculation.
  - Transparent bill summary (Item Total, Delivery Fee, Handling Fee, Total Savings).
  - Sticky "Proceed to Checkout" action bar.
- **3. My Orders Screen ([MyOrdersScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/MyOrdersScreen.tsx))**:
  - Active and Past orders tab toggle.
  - Comprehensive order cards displaying order ID, timestamp, items thumbnail strip, total amount, and delivery address.
  - "Track Order" button for live orders and "Reorder" button to reload past items into the cart.
- **4. Profile Screen ([ProfileScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/ProfileScreen.tsx))**:
  - User profile header with contact details and avatar.
  - Quick access shortcuts to Saved Addresses, Order History, Payment Methods, and Help Center.
  - Simulated authentication toggle (Login / Logout).

---

### 3. Modal & Checkout Flow Screens
- **Product Listing Modal ([ProductListingModal.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/ProductListingModal.tsx))**:
  - Category-filtered product catalog with sorting (Price: Low to High, High to Low, Rating).
- **Product Details Modal ([ProductDetailsModal.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/ProductDetailsModal.tsx))**:
  - High-res product imagery, pack size options, shelf life, nutritional info, and customer ratings.
  - Direct "Add to Cart" and "Buy Now" triggers.
- **Address Management Modal ([AddressModal.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/AddressModal.tsx))**:
  - Select active delivery address from saved addresses.
  - Add new delivery address form with validation (House/Flat No, Street/Road, Landmark, Pincode, and Address Tags).
- **Checkout Screen ([CheckoutScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/CheckoutScreen.tsx))**:
  - Delivery address confirmation with quick "Change" button.
  - Order item review with estimated delivery time.
  - Final price breakdown before initiating payment.
- **Payment Screen ([PaymentScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/PaymentScreen.tsx))**:
  - Multiple payment methods: UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Cash on Delivery (COD).
  - Simulated processing state with security badges.
- **Payment Success Screen ([PaymentSuccessScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/PaymentSuccessScreen.tsx))**:
  - Animated payment confirmation with transaction ID, amount paid, and assigned delivery partner.
  - Quick action buttons: "Track Order" and "Continue Shopping".
- **Live Order Tracking Screen ([OrderTrackingScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/OrderTrackingScreen.tsx))**:
  - Live 5-stage order status stepper (`Order Placed` ➔ `Confirmed` ➔ `Preparing` ➔ `Out for Delivery` ➔ `Delivered`).
  - Simulated "Advance Order Status" trigger to test real-time state changes.
  - Assigned delivery partner details (name, vehicle number, rating, call/chat actions).
- **Login Screen ([LoginScreen.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/screens/LoginScreen.tsx))**:
  - Clean mobile login with phone number verification and OTP input.

---

### 4. UI & Reusable Component Library
- **[BottomNavBar.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/components/BottomNavBar.tsx)**: Modern bottom tab navigation with active tinting and animated cart badge.
- **[ProductCard.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/components/ProductCard.tsx)**: Reusable product card with image thumbnail, discount tag, weight, and interactive add-to-cart stepper.
- **[DeliveryHeader.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/components/DeliveryHeader.tsx)**: Sticky header with delivery time guarantee and current address.
- **[DeliveryBanner.tsx](file:///c:/Users/shiva/Desktop/Workme/myapp/src/components/DeliveryBanner.tsx)**: Gradient promo strip for flash sales and free delivery notifications.

---

### 5. Repository & Build Setup
- **Git & GitHub Integration**:
  - Remote repository connected to [https://github.com/Chaitan-ya/Ecommerce_App.git](https://github.com/Chaitan-ya/Ecommerce_App.git).
  - Clean Git history on the default `main` branch.
- **Android Native Configuration**:
  - Pre-configured Android native build system using **Gradle 9.3.1** ([android/build.gradle](file:///c:/Users/shiva/Desktop/Workme/myapp/android/build.gradle), [android/settings.gradle](file:///c:/Users/shiva/Desktop/Workme/myapp/android/settings.gradle)).
- **Documentation**:
  - [flow_diagram.md](file:///c:/Users/shiva/Desktop/Workme/myapp/flow_diagram.md): Mermaid diagrams documenting the screen hierarchy and purchase lifecycle.

---

## 📂 Project Directory Structure

```text
myapp/
├── android/                   # Android native build files (Gradle)
├── assets/                    # App icons, splash screens, and SVGs
├── src/
│   ├── app/                   # Expo Router app entry
│   │   ├── _layout.tsx        # Root layout shell & status bar
│   │   └── index.tsx          # Application shell & modal router
│   ├── components/            # Reusable UI components
│   │   ├── BottomNavBar.tsx
│   │   ├── DeliveryBanner.tsx
│   │   ├── DeliveryHeader.tsx
│   │   └── ProductCard.tsx
│   ├── context/
│   │   └── AppContext.tsx     # Centralized global state (Cart, Orders, Auth)
│   ├── data/
│   │   └── mockData.ts        # Mock products, categories, addresses, orders
│   ├── screens/               # Screen implementations
│   │   ├── HomeScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── MyOrdersScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ProductListingModal.tsx
│   │   ├── ProductDetailsModal.tsx
│   │   ├── AddressModal.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   ├── PaymentSuccessScreen.tsx
│   │   ├── OrderTrackingScreen.tsx
│   │   └── LoginScreen.tsx
│   └── types/
│       └── index.ts           # TypeScript interfaces & types
├── flow_diagram.md            # Mermaid visual flow diagrams
├── package.json               # Dependencies & scripts
└── README.md                  # Project documentation
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- [Node.js (v18+)](https://nodejs.org/)
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
Start the Expo Metro bundler:
```bash
npx expo start
```

- **Web Browser**: Press `w` or open `http://localhost:8081`
- **Android Emulator**: Press `a` (requires Android Studio & Android SDK)
- **iOS Simulator**: Press `i` (macOS only)
- **Physical Phone**: Scan the QR code using the **Expo Go** app (Android) or Camera app (iOS).

---

## 🔮 Next Roadmap: Spring Boot Backend Integration
- [ ] Initialize Spring Boot REST API (`Spring Web`, `Spring Data JPA`, `Spring Security`).
- [ ] Connect PostgreSQL / MySQL database for persistence.
- [ ] Expose REST endpoints for `/api/products`, `/api/orders`, `/api/addresses`, and `/api/auth`.
- [ ] Replace `mockData.ts` in `AppContext.tsx` with asynchronous `fetch` / `axios` API calls.
- [ ] Add JWT authentication and token storage (`expo-secure-store`).
