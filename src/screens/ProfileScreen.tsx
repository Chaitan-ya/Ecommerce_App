import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Image, 
  Alert 
} from 'react-native';
import { 
  User, 
  MapPin, 
  ClipboardList, 
  Zap, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  Phone 
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { user, isLoggedIn, logout, setActiveModal, setActiveTab } = useApp();
  const [showGuaranteeInfo, setShowGuaranteeInfo] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleLoginPress = () => {
    setActiveModal('login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        {isLoggedIn && user ? (
          <View style={styles.userCard}>
            <Image 
              source={{ uri: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }} 
              style={styles.avatar} 
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <View style={styles.contactRow}>
                <Mail size={12} color="#64748B" />
                <Text style={styles.userContact}>{user.email}</Text>
              </View>
              <View style={styles.contactRow}>
                <Phone size={12} color="#64748B" />
                <Text style={styles.userContact}>{user.phone}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.guestCard}>
            <View style={styles.guestAvatar}>
              <User size={28} color="#64748B" />
            </View>
            <View style={styles.guestInfo}>
              <Text style={styles.guestTitle}>Welcome to FlashCart</Text>
              <Text style={styles.guestSub}>Log in to manage orders & saved addresses</Text>
            </View>
            <Pressable style={styles.loginBtn} onPress={handleLoginPress}>
              <Text style={styles.loginBtnText}>Log In</Text>
            </Pressable>
          </View>
        )}

        {/* 30-60 Minute Guarantee Card */}
        <Pressable 
          style={styles.promiseCard}
          onPress={() => setShowGuaranteeInfo(!showGuaranteeInfo)}
        >
          <View style={styles.promiseTopRow}>
            <View style={styles.zapCircle}>
              <Zap size={18} color="#D97706" fill="#D97706" />
            </View>
            <View style={styles.promiseTextWrap}>
              <Text style={styles.promiseTitle}>⚡ 30–60 Min Delivery Guarantee</Text>
              <Text style={styles.promiseSub}>
                {showGuaranteeInfo ? 'Tap to collapse details' : 'Learn how we deliver in 30-60 minutes'}
              </Text>
            </View>
            <ChevronRight 
              size={18} 
              color="#92400E" 
              style={{ transform: [{ rotate: showGuaranteeInfo ? '90deg' : '0deg' }] }}
            />
          </View>

          {showGuaranteeInfo && (
            <View style={styles.promiseDetails}>
              <Text style={styles.promiseParagraph}>
                • <Text style={{ fontWeight: '700' }}>Local Dark Stores:</Text> Strategically situated within 3–5 km of your neighborhood.
              </Text>
              <Text style={styles.promiseParagraph}>
                • <Text style={{ fontWeight: '700' }}>2-Min Packing:</Text> Cold-chain items and fresh produce picked and inspected instantly.
              </Text>
              <Text style={styles.promiseParagraph}>
                • <Text style={{ fontWeight: '700' }}>Dedicated Fleet:</Text> Local riders on electric bikes ensure safe & speedy transit.
              </Text>
            </View>
          )}
        </Pressable>

        {/* Menu Navigation Group */}
        <View style={styles.menuGroup}>
          <Pressable 
            style={styles.menuItem}
            onPress={() => setActiveTab('orders')}
          >
            <View style={styles.menuIconCircle}>
              <ClipboardList size={18} color="#059669" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuItemTitle}>My Orders</Text>
              <Text style={styles.menuItemSub}>Past orders, tracking & invoices</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable 
            style={styles.menuItem}
            onPress={() => setActiveModal('address-select')}
          >
            <View style={styles.menuIconCircle}>
              <MapPin size={18} color="#0284C7" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuItemTitle}>Saved Delivery Addresses</Text>
              <Text style={styles.menuItemSub}>Manage home, office, and other locations</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              Alert.alert(
                'Customer Support',
                'Need assistance? Our 24x7 support desk is available via chat and call: support@flashcart.com | 1800-300-400'
              );
            }}
          >
            <View style={styles.menuIconCircle}>
              <HelpCircle size={18} color="#7C3AED" />
            </View>
            <View style={styles.menuTextWrap}>
              <Text style={styles.menuItemTitle}>Help & Customer Support</Text>
              <Text style={styles.menuItemSub}>FAQs, refunds, and query resolution</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </Pressable>
        </View>

        {/* Security & Version info */}
        <View style={styles.infoBox}>
          <ShieldCheck size={18} color="#059669" />
          <Text style={styles.infoText}>
            FlashCart MVP v1.0.0 • Fast Commerce Prototype
          </Text>
        </View>

        {/* Logout / Switch Account */}
        {isLoggedIn && (
          <Pressable 
            style={styles.logoutBtn}
            onPress={handleLogout}
          >
            <LogOut size={18} color="#DC2626" />
            <Text style={styles.logoutBtnText}>Log Out / Switch Account</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
    marginRight: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  userContact: {
    fontSize: 12,
    color: '#64748B',
  },
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  guestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  guestInfo: {
    flex: 1,
  },
  guestTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  guestSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  loginBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  loginBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  promiseCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 16,
  },
  promiseTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zapCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  promiseTextWrap: {
    flex: 1,
  },
  promiseTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  promiseSub: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
  promiseDetails: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
    gap: 6,
  },
  promiseParagraph: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 16,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextWrap: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuItemSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 64,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  infoText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    marginTop: 8,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
  },
});
