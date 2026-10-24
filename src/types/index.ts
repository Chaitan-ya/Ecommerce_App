export type CategoryId = 
  | 'fruits-veg'
  | 'dairy-bakery'
  | 'snacks-munchies'
  | 'drinks-juices'
  | 'instant-staples'
  | 'personal-care';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgColor: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: CategoryId;
  price: number;
  originalPrice: number;
  discountPercent: number;
  packSize: string; // e.g. "500 g", "1 L", "Pack of 4"
  imageUrl: string;
  description: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number; // e.g. 30, 35, 45
  inStock: boolean;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type AddressTag = 'Home' | 'Work' | 'Other';

export interface Address {
  id: string;
  tag: AddressTag;
  houseNo: string;
  street: string;
  city: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

export type OrderStatus = 
  | 'Order Placed'
  | 'Confirmed'
  | 'Preparing'
  | 'Out for Delivery'
  | 'Delivered';

export type PaymentMethod = 'UPI' | 'Card' | 'COD';

export interface DeliveryPartner {
  name: string;
  phone: string;
  rating: number;
  vehicleNumber: string;
  avatarUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  handlingFee: number;
  totalAmount: number;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  paymentId?: string;
  status: OrderStatus;
  estimatedDeliveryMinutes: number;
  rider: DeliveryPartner;
  createdAt: number;
  deliveredAt?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export type TabScreen = 'home' | 'cart' | 'orders' | 'profile';

export type AppModalScreen = 
  | null
  | 'login'
  | 'product-listing'
  | 'product-details'
  | 'address-select'
  | 'address-add'
  | 'checkout'
  | 'payment'
  | 'payment-success'
  | 'order-tracking';
