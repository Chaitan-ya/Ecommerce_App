import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { AppProvider, useApp } from '../context/AppContext';
import { HomeScreen } from '../screens/HomeScreen';
import { CartScreen } from '../screens/CartScreen';
import { MyOrdersScreen } from '../screens/MyOrdersScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ProductListingModal } from '../screens/ProductListingModal';
import { ProductDetailsModal } from '../screens/ProductDetailsModal';
import { AddressModal } from '../screens/AddressModal';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { PaymentSuccessScreen } from '../screens/PaymentSuccessScreen';
import { OrderTrackingScreen } from '../screens/OrderTrackingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { BottomNavBar } from '../components/BottomNavBar';

function AppContent() {
  const { activeTab, activeModal, isLoggedIn } = useApp();

  // Determine what screen to display
  const renderScreen = () => {
    // If not logged in and user requested login modal
    if (activeModal === 'login') {
      return <LoginScreen />;
    }

    // Modal full screens
    switch (activeModal) {
      case 'product-listing':
        return <ProductListingModal />;
      case 'product-details':
        return <ProductDetailsModal />;
      case 'address-select':
        return <AddressModal />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'payment-success':
        return <PaymentSuccessScreen />;
      case 'order-tracking':
        return <OrderTrackingScreen />;
      default:
        break;
    }

    // Main Tab Screens
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'cart':
        return <CartScreen />;
      case 'orders':
        return <MyOrdersScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.appShell}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mobileContainer}>
          <View style={styles.screenBody}>
            {renderScreen()}
          </View>
          <BottomNavBar />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark elegant backdrop on desktop
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mobileContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480, // High-end mobile device frame width on web
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 25,
    elevation: 10,
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#334155',
  },
  screenBody: {
    flex: 1,
  },
});
