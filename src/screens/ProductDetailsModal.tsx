import React, { useState } from 'react';
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
  Zap, 
  Star, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Minus, 
  ShoppingBag,
  CheckCircle2
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export const ProductDetailsModal: React.FC = () => {
  const { 
    selectedProduct, 
    cart, 
    addToCart, 
    updateQuantity, 
    setActiveModal, 
    setActiveTab 
  } = useApp();

  const [quantityLocal, setQuantityLocal] = useState<number>(1);

  if (!selectedProduct) {
    return null;
  }

  const existingCartItem = cart.find((item) => item.product.id === selectedProduct.id);
  const currentQuantityInCart = existingCartItem ? existingCartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantityLocal);
  };

  const handleGoToCart = () => {
    setActiveModal(null);
    setActiveTab('cart');
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header with Back Button */}
      <View style={styles.topBar}>
        <Pressable 
          style={styles.iconCircle}
          onPress={() => setActiveModal(null)}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </Pressable>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          {selectedProduct.name}
        </Text>
        <Pressable 
          style={styles.iconCircle}
          onPress={handleGoToCart}
        >
          <ShoppingBag size={18} color="#059669" />
          {cart.length > 0 && <View style={styles.cartDot} />}
        </Pressable>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Large Product Image */}
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: selectedProduct.imageUrl }} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          <View style={styles.floatingEtaBadge}>
            <Zap size={14} color="#D97706" fill="#D97706" />
            <Text style={styles.floatingEtaText}>
              Delivered in {selectedProduct.deliveryTimeMin} mins
            </Text>
          </View>
        </View>

        {/* Product Info Section */}
        <View style={styles.detailsContent}>
          <View style={styles.ratingRow}>
            <View style={styles.starBadge}>
              <Star size={12} color="#D97706" fill="#D97706" />
              <Text style={styles.starText}>{selectedProduct.rating}</Text>
            </View>
            <Text style={styles.reviewCount}>
              ({selectedProduct.reviewCount} reviews)
            </Text>
            <View style={styles.dot} />
            <Text style={styles.inStockText}>In Stock</Text>
          </View>

          <Text style={styles.productName}>{selectedProduct.name}</Text>
          <Text style={styles.packSize}>{selectedProduct.packSize}</Text>

          {/* Pricing Row */}
          <View style={styles.pricingRow}>
            <Text style={styles.currentPrice}>₹{selectedProduct.price}</Text>
            {selectedProduct.originalPrice > selectedProduct.price && (
              <>
                <Text style={styles.originalPrice}>₹{selectedProduct.originalPrice}</Text>
                <View style={styles.discountPill}>
                  <Text style={styles.discountPillText}>
                    {selectedProduct.discountPercent}% OFF
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Delivery Promise Card */}
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryCardHeader}>
              <Clock size={16} color="#059669" />
              <Text style={styles.deliveryCardTitle}>Superfast 30–60 Min Delivery</Text>
            </View>
            <Text style={styles.deliveryCardDesc}>
              Shipped directly from your nearest temperature-controlled micro warehouse.
            </Text>
          </View>

          {/* Product Description */}
          <View style={styles.descSection}>
            <Text style={styles.sectionHeader}>Product Highlights</Text>
            <Text style={styles.descriptionText}>
              {selectedProduct.description}
            </Text>
          </View>

          {/* Key Features / Assurances */}
          {selectedProduct.features && (
            <View style={styles.featuresSection}>
              <Text style={styles.sectionHeader}>Why you&apos;ll love it</Text>
              {selectedProduct.features.map((feat, index) => (
                <View key={index} style={styles.featureRow}>
                  <CheckCircle2 size={16} color="#059669" />
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Quality Assurance */}
          <View style={styles.assuranceBox}>
            <ShieldCheck size={20} color="#059669" />
            <View style={styles.assuranceTextWrap}>
              <Text style={styles.assuranceHeading}>100% Quality & Freshness Guarantee</Text>
              <Text style={styles.assuranceSub}>
                Not happy with the freshness? Instant refund or replacement at your door.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {/* Quantity selector */}
        <View style={styles.qtySelector}>
          <Pressable 
            style={styles.qtyBtn} 
            onPress={() => setQuantityLocal(Math.max(1, quantityLocal - 1))}
          >
            <Minus size={14} color="#0F172A" />
          </Pressable>
          <Text style={styles.qtyValue}>{quantityLocal}</Text>
          <Pressable 
            style={styles.qtyBtn} 
            onPress={() => setQuantityLocal(quantityLocal + 1)}
          >
            <Plus size={14} color="#0F172A" />
          </Pressable>
        </View>

        {/* Add to Cart CTA Button */}
        <Pressable 
          style={styles.addCartBtn} 
          onPress={handleAddToCart}
        >
          <Text style={styles.addCartText}>
            Add to Cart • ₹{selectedProduct.price * quantityLocal}
          </Text>
          {currentQuantityInCart > 0 && (
            <Text style={styles.inCartNote}>({currentQuantityInCart} already in cart)</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  topBarTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    maxWidth: '70%',
  },
  cartDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 280,
    backgroundColor: '#F8FAFC',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  floatingEtaBadge: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  floatingEtaText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
  },
  detailsContent: {
    padding: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  starBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  starText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },
  reviewCount: {
    fontSize: 11,
    color: '#64748B',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E1',
  },
  inStockText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 4,
  },
  packSize: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 12,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  originalPrice: {
    fontSize: 15,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  discountPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  discountPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#047857',
  },
  deliveryCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: 20,
  },
  deliveryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  deliveryCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#065F46',
  },
  deliveryCardDesc: {
    fontSize: 11,
    color: '#047857',
    lineHeight: 15,
  },
  descSection: {
    marginBottom: 18,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  featuresSection: {
    marginBottom: 18,
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '500',
  },
  assuranceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  assuranceTextWrap: {
    flex: 1,
  },
  assuranceHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  assuranceSub: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
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
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    paddingHorizontal: 10,
  },
  addCartBtn: {
    flex: 1,
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addCartText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  inCartNote: {
    fontSize: 10,
    color: '#D1FAE5',
    fontWeight: '600',
    marginTop: 2,
  },
});
