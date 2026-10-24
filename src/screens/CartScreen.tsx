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
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    cartOriginalTotal, 
    totalSavings, 
    deliveryFee, 
    handlingFee, 
    finalPayable, 
    selectedAddress, 
    setActiveModal, 
    setActiveTab 
  } = useApp();

  const handleCheckout = () => {
    setActiveModal('checkout');
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <ShoppingBag size={48} color="#059669" />
        </View>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySub}>
          Explore our fresh grocery catalog and enjoy delivery in 30–60 minutes!
        </Text>
        <Pressable 
          style={styles.browseButton}
          onPress={() => setActiveTab('home')}
        >
          <Text style={styles.browseButtonText}>Browse Products</Text>
          <ArrowRight size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Address & Delivery Speed Bar */}
      <Pressable 
        style={styles.addressBar}
        onPress={() => setActiveModal('address-select')}
      >
        <View style={styles.addressBarLeft}>
          <View style={styles.pinCircle}>
            <MapPin size={16} color="#059669" />
          </View>
          <View style={styles.addressTextContainer}>
            <Text style={styles.deliveringToText}>
              Delivering in <Text style={{ color: '#059669', fontWeight: '800' }}>30-45 mins</Text> to:
            </Text>
            <Text style={styles.addressLine} numberOfLines={1}>
              {selectedAddress.tag} • {selectedAddress.houseNo}, {selectedAddress.street}
            </Text>
          </View>
        </View>
        <ChevronRight size={18} color="#64748B" />
      </Pressable>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Savings banner if discount applies */}
        {totalSavings > 0 && (
          <View style={styles.savingsBanner}>
            <CheckCircle2 size={16} color="#047857" />
            <Text style={styles.savingsBannerText}>
              Yay! You are saving <Text style={{ fontWeight: '800' }}>₹{totalSavings}</Text> on this order
            </Text>
          </View>
        )}

        {/* Cart Items List */}
        <View style={styles.itemsSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.itemsHeaderTitle}>Cart Items ({cart.length})</Text>
            <Pressable onPress={() => setActiveTab('home')}>
              <Text style={styles.addMoreLink}>+ Add more</Text>
            </Pressable>
          </View>

          {cart.map(({ product, quantity }) => (
            <View key={product.id} style={styles.itemCard}>
              <Image source={{ uri: product.imageUrl }} style={styles.itemThumb} />
              
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.itemPack}>{product.packSize}</Text>
                
                <View style={styles.itemPriceRow}>
                  <Text style={styles.itemPrice}>₹{product.price * quantity}</Text>
                  {product.originalPrice > product.price && (
                    <Text style={styles.itemOriginalPrice}>
                      ₹{product.originalPrice * quantity}
                    </Text>
                  )}
                </View>
              </View>

              {/* Quantity Controls & Delete */}
              <View style={styles.itemActionCol}>
                <Pressable 
                  style={styles.deleteBtn}
                  onPress={() => removeFromCart(product.id)}
                >
                  <Trash2 size={15} color="#EF4444" />
                </Pressable>

                <View style={styles.stepper}>
                  <Pressable 
                    style={styles.stepBtn}
                    onPress={() => updateQuantity(product.id, quantity - 1)}
                  >
                    <Minus size={12} color="#FFFFFF" strokeWidth={3} />
                  </Pressable>
                  <Text style={styles.stepQty}>{quantity}</Text>
                  <Pressable 
                    style={styles.stepBtn}
                    onPress={() => updateQuantity(product.id, quantity + 1)}
                  >
                    <Plus size={12} color="#FFFFFF" strokeWidth={3} />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* 30-60 Min Delivery Guarantee Note */}
        <View style={styles.deliveryAssuranceCard}>
          <Clock size={18} color="#059669" />
          <View style={styles.assuranceRight}>
            <Text style={styles.assuranceTitle}>Fast 30–60 Min Delivery Promise</Text>
            <Text style={styles.assuranceDesc}>
              Temperature managed dark store packing. Rider assigned instantly on order placement.
            </Text>
          </View>
        </View>

        {/* Bill Summary / Price Breakdown */}
        <View style={styles.billCard}>
          <Text style={styles.billTitle}>Bill Summary</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>₹{cartTotal}</Text>
          </View>

          {cartOriginalTotal > cartTotal && (
            <View style={styles.billRow}>
              <Text style={styles.billLabelSavings}>Catalog Discount</Text>
              <Text style={styles.billValueSavings}>-₹{totalSavings}</Text>
            </View>
          )}

          <View style={styles.billRow}>
            <View style={styles.billLabelWithSub}>
              <Text style={styles.billLabel}>Delivery Partner Fee</Text>
              <Text style={styles.billSubtext}>
                {deliveryFee === 0 ? 'FREE on orders over ₹199' : 'Standard express'}
              </Text>
            </View>
            <Text style={[styles.billValue, deliveryFee === 0 && styles.freeText]}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </Text>
          </View>

          <View style={styles.billRow}>
            <View style={styles.billLabelWithSub}>
              <Text style={styles.billLabel}>Handling & Packaging</Text>
              <Text style={styles.billSubtext}>100% recyclable packing</Text>
            </View>
            <Text style={styles.billValue}>₹{handlingFee}</Text>
          </View>

          <View style={styles.billDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>To Pay</Text>
            <Text style={styles.totalValue}>₹{finalPayable}</Text>
          </View>
        </View>

        {/* Safe Payments Guarantee */}
        <View style={styles.safetyFooter}>
          <ShieldCheck size={16} color="#059669" />
          <Text style={styles.safetyText}>
            Safe & Contactless Delivery • 100% Quality Assured
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Checkout Action */}
      <View style={styles.bottomCheckoutBar}>
        <View style={styles.checkoutPriceCol}>
          <Text style={styles.checkoutTotalLabel}>TOTAL PAYABLE</Text>
          <Text style={styles.checkoutTotalAmount}>₹{finalPayable}</Text>
        </View>

        <Pressable 
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
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
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  browseButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  addressBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  pinCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addressTextContainer: {
    flex: 1,
  },
  deliveringToText: {
    fontSize: 11,
    color: '#64748B',
  },
  addressLine: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  savingsBannerText: {
    fontSize: 12,
    color: '#065F46',
  },
  itemsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  itemsHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  addMoreLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  itemThumb: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 17,
  },
  itemPack: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  itemPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  itemOriginalPrice: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  itemActionCol: {
    alignItems: 'flex-end',
    gap: 8,
  },
  deleteBtn: {
    padding: 4,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 6,
  },
  stepBtn: {
    padding: 2,
  },
  stepQty: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    minWidth: 14,
    textAlign: 'center',
  },
  deliveryAssuranceCard: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    gap: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  assuranceRight: {
    flex: 1,
  },
  assuranceTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#065F46',
  },
  assuranceDesc: {
    fontSize: 11,
    color: '#047857',
    lineHeight: 15,
  },
  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  billTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  billLabel: {
    fontSize: 13,
    color: '#475569',
  },
  billLabelSavings: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  billValueSavings: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  freeText: {
    color: '#059669',
    fontWeight: '800',
  },
  billLabelWithSub: {
    flex: 1,
  },
  billSubtext: {
    fontSize: 10,
    color: '#94A3B8',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#059669',
  },
  safetyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  safetyText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  bottomCheckoutBar: {
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
  checkoutPriceCol: {
    justifyContent: 'center',
  },
  checkoutTotalLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  checkoutTotalAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  checkoutBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
