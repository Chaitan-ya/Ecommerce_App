import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  Product, 
  CartItem, 
  Address, 
  Order, 
  OrderStatus, 
  PaymentMethod, 
  UserProfile, 
  CategoryId, 
  TabScreen, 
  AppModalScreen 
} from '../types';
import { 
  PRODUCTS, 
  INITIAL_ADDRESSES, 
  INITIAL_USER, 
  INITIAL_ORDERS 
} from '../data/mockData';

interface AppContextType {
  // Authentication
  isLoggedIn: boolean;
  user: UserProfile | null;
  loginWithPhone: (phone: string, otp: string) => boolean;
  loginWithGoogle: () => boolean;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  cartOriginalTotal: number;
  totalSavings: number;
  deliveryFee: number;
  handlingFee: number;
  finalPayable: number;

  // Address
  addresses: Address[];
  selectedAddress: Address;
  addAddress: (address: Omit<Address, 'id'>) => Address;
  selectAddress: (id: string) => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  placeOrder: (paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceOrderStatus: (orderId: string) => void;
  setActiveOrder: (order: Order | null) => void;

  // Navigation & Screens
  activeTab: TabScreen;
  setActiveTab: (tab: TabScreen) => void;
  activeModal: AppModalScreen;
  setActiveModal: (modal: AppModalScreen) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state - initialized as true with demo user so user can immediately browse or test login
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);

  // Cart state - seed with 1 item initially so cart isn't empty on first glance
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[5], quantity: 1 },
  ]);

  // Address state
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(INITIAL_ADDRESSES[0].id);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Navigation state
  const [activeTab, setActiveTab] = useState<TabScreen>('home');
  const [activeModal, setActiveModal] = useState<AppModalScreen>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected address object
  const selectedAddress = useMemo(() => {
    return addresses.find((a) => a.id === selectedAddressId) || addresses[0];
  }, [addresses, selectedAddressId]);

  // Auth actions
  const loginWithPhone = (phone: string, otp: string): boolean => {
    // In MVP, verify any 4-digit code (e.g. 1234)
    if (phone.length >= 10 && otp.length >= 4) {
      setUser({
        name: 'Demo Shopper',
        email: 'shopper@quickcart.com',
        phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      });
      setIsLoggedIn(true);
      setActiveModal(null);
      return true;
    }
    return false;
  };

  const loginWithGoogle = (): boolean => {
    setUser({
      name: 'Alex Johnson',
      email: 'alex.johnson@gmail.com',
      phone: '+91 98765 43210',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });
    setIsLoggedIn(true);
    setActiveModal(null);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveModal('login');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart calculations
  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartOriginalTotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.originalPrice * item.quantity,
      0
    );
  }, [cart]);

  const totalSavings = Math.max(0, cartOriginalTotal - cartTotal);
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Delivery fee: FREE if order >= 199, else 25
  const deliveryFee = cartTotal >= 199 || cartTotal === 0 ? 0 : 25;
  const handlingFee = cartTotal > 0 ? 5 : 0;
  const finalPayable = cartTotal + deliveryFee + handlingFee;

  // Address actions
  const addAddress = (newAddrData: Omit<Address, 'id'>): Address => {
    const newAddr: Address = {
      ...newAddrData,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [newAddr, ...prev]);
    setSelectedAddressId(newAddr.id);
    return newAddr;
  };

  const selectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  // Order actions
  const placeOrder = (paymentMethod: PaymentMethod): Order => {
    const randomOrderNum = `#FC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: randomOrderNum,
      date: 'Just now',
      items: [...cart],
      subtotal: cartTotal,
      deliveryFee,
      handlingFee,
      totalAmount: finalPayable,
      deliveryAddress: selectedAddress,
      paymentMethod,
      paymentId: `${paymentMethod.toLowerCase()}-${Date.now().toString().slice(-6)}`,
      status: 'Order Placed',
      estimatedDeliveryMinutes: 35,
      rider: {
        name: 'Suresh Varma',
        phone: '+91 98450 12890',
        rating: 4.9,
        vehicleNumber: 'KA 01 MG 7742',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      },
      createdAt: Date.now(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const advanceOrderStatus = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const stages: OrderStatus[] = [
      'Order Placed',
      'Confirmed',
      'Preparing',
      'Out for Delivery',
      'Delivered',
    ];

    const currentIndex = stages.indexOf(order.status);
    if (currentIndex < stages.length - 1) {
      const nextStatus = stages[currentIndex + 1];
      updateOrderStatus(orderId, nextStatus);
    }
  };

  const value = {
    isLoggedIn,
    user,
    loginWithPhone,
    loginWithGoogle,
    logout,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    cartOriginalTotal,
    totalSavings,
    deliveryFee,
    handlingFee,
    finalPayable,
    addresses,
    selectedAddress,
    addAddress,
    selectAddress,
    orders,
    activeOrder,
    placeOrder,
    updateOrderStatus,
    advanceOrderStatus,
    setActiveOrder,
    activeTab,
    setActiveTab,
    activeModal,
    setActiveModal,
    selectedProduct,
    setSelectedProduct,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
