import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Pressable 
} from 'react-native';
import { 
  ArrowLeft, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CreditCard 
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export const CheckoutScreen: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    totalSavings, 
    deliveryFee, 
    handlingFee, 
    finalPayable, 
    selectedAddress, 
    setActiveModal 
  } = useApp();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backBtn}
          onPress={() => setActiveModal(null)}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>Order Checkout</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Delivery Time Highlight Banner */}
        <View style={styles.etaBanner}>
          <View style={styles.zapCircle}>
            <Zap size={18} color="#FFFFFF" fill="#FFFFFF" />
          </View>
          <View style={styles.etaBannerContent}>
            <Text style={styles.etaTitle}>Delivery in 30–45 Minutes</Text>
            <Text style={styles.etaSub}>
              Shipment ready to pack from Indiranagar micro-fulfillment hub.
            </Text>
          </View>
        </View>

        {/* Delivery Address Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleRow}>
              <MapPin size={18} color="#059669" />
              <Text style={styles.cardTitle}>Delivering to</Text>
            </View>
            <Pressable 
              style={styles.changeBtn}
              onPress={() => setActiveModal('address-select')}
            >
              <Text style={styles.changeBtnText}>Change</Text>
            </Pressable>
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.addressTag}>{selectedAddress.tag}</Text>
            <Text style={styles.addressText}>
              {selectedAddress.houseNo}, {selectedAddress.street}
            </Text>
            <Text style={styles.addressCityPincode}>
              {selectedAddress.city} - {selectedAddress.pincode}
            </Text>
            {selectedAddress.landmark && (
              <Text style={styles.landmarkText}>Landmark: {selectedAddress.landmark}</Text>
            )}
          </View>
        </View>

        {/* Order Items Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Items ({cart.length})</Text>

          <View style={styles.itemsList}>
            {cart.map(({ product, quantity }) => (
              <View key={product.id} style={styles.itemRow}>
                <Image source={{ uri: product.imageUrl }} style={styles.itemThumb} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{product.name}</Text>
                  <Text style={styles.itemQty}>Qty: {quantity} • {product.packSize}</Text>
                </View>
                <Text style={styles.itemPrice}>₹{product.price * quantity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bill Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Breakdown</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Items Subtotal</Text>
            <Text style={styles.billVal}>₹{cartTotal}</Text>
          </View>

          {totalSavings > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabelSavings}>Savings Applied</Text>
              <Text style={styles.billValSavings}>-₹{totalSavings}</Text>
            </View>
          )}

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Charges</Text>
            <Text style={[styles.billVal, deliveryFee === 0 && styles.freeText]}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Packaging & Handling</Text>
            <Text style={styles.billVal}>₹{handlingFee}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalVal}>₹{finalPayable}</Text>
          </View>
        </View>

        {/* Cancellation policy */}
        <View style={styles.policyCard}>
          <Clock size={16} color="#059669" />
          <Text style={styles.policyText}>
            Cancellation is available until the order is packed at the dark store (~2 mins).
          </Text>
        </View>

        {/* 100% Secure Payments Guarantee */}
        <View style={styles.guaranteeRow}>
          <ShieldCheck size={16} color="#059669" />
          <Text style={styles.guaranteeText}>Encrypted & 100% Secure Payments</Text>
        </View>
      </ScrollView>

      {/* Bottom Sticky Payment CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.priceCol}>
          <Text style={styles.priceColLabel}>AMOUNT TO PAY</Text>
          <Text style={styles.priceColAmount}>₹{finalPayable}</Text>
        </View>

        <Pressable 
          style={styles.payBtn}
          onPress={() => setActiveModal('payment')}
        >
          <CreditCard size={18} color="#FFFFFF" />
          <Text style={styles.payBtnText}>Select Payment</Text>
          <ArrowRight size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  etaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 12,
    marginBottom: 14,
  },
  zapCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaBannerContent: {
    flex: 1,
  },
  etaTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46',
  },
  etaSub: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
    lineHeight: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  changeBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  addressBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  addressTag: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 18,
  },
  addressCityPincode: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  landmarkText: {
    fontSize: 11,
    color: '#64748B',
    fontStyle: 'italic',
    marginTop: 2,
  },
  itemsList: {
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  itemThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  itemQty: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  billLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  billVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  billLabelSavings: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  billValSavings: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  freeText: {
    color: '#059669',
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#059669',
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  policyText: {
    flex: 1,
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  guaranteeText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  priceCol: {
    justifyContent: 'center',
  },
  priceColLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  priceColAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  payBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
