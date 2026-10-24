import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable 
} from 'react-native';
import { 
  CheckCircle2, 
  Zap, 
  MapPin, 
  ArrowRight, 
  Clock 
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export const PaymentSuccessScreen: React.FC = () => {
  const { activeOrder, setActiveModal, setActiveTab } = useApp();

  const handleTrackOrder = () => {
    setActiveModal('order-tracking');
  };

  const handleGoHome = () => {
    setActiveModal(null);
    setActiveTab('home');
  };

  if (!activeOrder) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentCard}>
        {/* Animated celebration badge */}
        <View style={styles.successBadgeCircle}>
          <CheckCircle2 size={48} color="#FFFFFF" strokeWidth={2.5} />
        </View>

        <Text style={styles.congratsTitle}>Payment Successful!</Text>
        <Text style={styles.congratsSub}>
          Your order has been placed and confirmed.
        </Text>

        {/* 30-60 Min Delivery Time Box */}
        <View style={styles.etaBox}>
          <View style={styles.zapIconWrap}>
            <Zap size={18} color="#D97706" fill="#D97706" />
          </View>
          <View style={styles.etaTextWrap}>
            <Text style={styles.etaTitle}>⚡ Arriving in 30–45 Minutes</Text>
            <Text style={styles.etaSub}>
              Dark store packing in progress • Live tracking available
            </Text>
          </View>
        </View>

        {/* Order Details Receipt */}
        <View style={styles.receiptBox}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Order ID</Text>
            <Text style={styles.receiptValue}>{activeOrder.orderNumber}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Amount Paid</Text>
            <Text style={styles.receiptValueHighlight}>₹{activeOrder.totalAmount}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Payment Mode</Text>
            <Text style={styles.receiptValue}>{activeOrder.paymentMethod} (Verified)</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Delivering To</Text>
            <View style={styles.addressTagInline}>
              <MapPin size={12} color="#059669" />
              <Text style={styles.receiptValueSmall} numberOfLines={1}>
                {activeOrder.deliveryAddress.tag} ({activeOrder.deliveryAddress.houseNo})
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery partner preview */}
        <View style={styles.riderBox}>
          <Clock size={16} color="#059669" />
          <Text style={styles.riderText}>
            Assigned Delivery Partner: <Text style={{ fontWeight: '800' }}>{activeOrder.rider.name}</Text>
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonCol}>
          <Pressable 
            style={styles.trackBtn}
            onPress={handleTrackOrder}
          >
            <Text style={styles.trackBtnText}>Track Order Live</Text>
            <ArrowRight size={18} color="#FFFFFF" />
          </Pressable>

          <Pressable 
            style={styles.homeBtn}
            onPress={handleGoHome}
          >
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contentCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  successBadgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  congratsTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
  },
  congratsSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 18,
  },
  etaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 12,
    gap: 10,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  zapIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaTextWrap: {
    flex: 1,
  },
  etaTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  etaSub: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
  receiptBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    marginBottom: 14,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  receiptValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  receiptValueHighlight: {
    fontSize: 16,
    fontWeight: '900',
    color: '#059669',
  },
  addressTagInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: '65%',
  },
  receiptValueSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  riderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  riderText: {
    fontSize: 12,
    color: '#047857',
  },
  buttonCol: {
    width: '100%',
    gap: 10,
  },
  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  trackBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  homeBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  homeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
});
