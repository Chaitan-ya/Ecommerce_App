import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Home, ShoppingBag, ClipboardList, User, ArrowRight, Zap } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { TabScreen } from '../types';

export const BottomNavBar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cartCount, 
    cartTotal, 
    activeModal,
    setActiveModal 
  } = useApp();

  // If a modal like checkout/payment/success/login is taking the full screen, we hide the bottom bar
  const isFullScreenModal = activeModal === 'checkout' || 
                            activeModal === 'payment' || 
                            activeModal === 'payment-success' || 
                            activeModal === 'login';

  if (isFullScreenModal) {
    return null;
  }

  const tabs: { id: TabScreen; label: string; icon: React.FC<{ size: number; color: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'cart', label: 'Cart', icon: ShoppingBag },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Floating quick cart banner if cart has items and not currently on cart tab */}
      {cartCount > 0 && activeTab !== 'cart' && (
        <Pressable 
          style={styles.floatingCartBar}
          onPress={() => {
            setActiveModal(null);
            setActiveTab('cart');
          }}
        >
          <View style={styles.floatingCartLeft}>
            <View style={styles.floatingCartIcon}>
              <Zap size={14} color="#FFFFFF" fill="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.floatingCartTitle}>
                {cartCount} {cartCount === 1 ? 'item' : 'items'} • ₹{cartTotal}
              </Text>
              <Text style={styles.floatingCartSub}>⚡ 30-45 mins delivery</Text>
            </View>
          </View>
          <View style={styles.floatingCartRight}>
            <Text style={styles.viewCartText}>View Cart</Text>
            <ArrowRight size={16} color="#FFFFFF" />
          </View>
        </Pressable>
      )}

      {/* Main Tab Bar */}
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;
          const activeColor = '#059669';
          const inactiveColor = '#94A3B8';

          return (
            <Pressable
              key={tab.id}
              style={styles.tabButton}
              onPress={() => {
                setActiveModal(null);
                setActiveTab(tab.id);
              }}
            >
              <View style={styles.iconContainer}>
                <IconComponent 
                  size={22} 
                  color={isActive ? activeColor : inactiveColor} 
                />
                {/* Live Cart Counter Badge */}
                {tab.id === 'cart' && cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.tabLabel, { color: isActive ? activeColor : inactiveColor }]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
  },
  floatingCartBar: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingCartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  floatingCartIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCartTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  floatingCartSub: {
    fontSize: 11,
    color: '#D1FAE5',
    fontWeight: '500',
  },
  floatingCartRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewCartText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 16,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 28,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 3,
  },
});
