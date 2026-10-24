import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Plus, Minus, Zap } from 'lucide-react-native';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, horizontal = false }) => {
  const { cart, addToCart, updateQuantity, setSelectedProduct, setActiveModal } = useApp();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleCardPress = () => {
    setSelectedProduct(product);
    setActiveModal('product-details');
  };

  return (
    <Pressable 
      style={[styles.card, horizontal ? styles.horizontalCard : styles.gridCard]} 
      onPress={handleCardPress}
    >
      {/* Product Image & Badges */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.imageUrl }} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        {/* Delivery speed badge */}
        <View style={styles.etaBadge}>
          <Zap size={10} color="#D97706" fill="#D97706" />
          <Text style={styles.etaText}>{product.deliveryTimeMin}m</Text>
        </View>

        {/* Discount badge if any */}
        {product.discountPercent > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.packSize}>{product.packSize}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
        
        {/* Price & Add button row */}
        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
          </View>

          {/* Stepper or Add Button */}
          {quantity === 0 ? (
            <Pressable 
              style={styles.addButton}
              onPress={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
            >
              <Text style={styles.addButtonText}>ADD</Text>
              <Plus size={13} color="#059669" strokeWidth={3} />
            </Pressable>
          ) : (
            <View style={styles.stepperContainer}>
              <Pressable 
                style={styles.stepperBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, quantity - 1);
                }}
              >
                <Minus size={12} color="#FFFFFF" strokeWidth={3} />
              </Pressable>
              
              <Text style={styles.quantityText}>{quantity}</Text>

              <Pressable 
                style={styles.stepperBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, quantity + 1);
                }}
              >
                <Plus size={12} color="#FFFFFF" strokeWidth={3} />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  gridCard: {
    flex: 1,
    margin: 6,
  },
  horizontalCard: {
    width: 160,
    marginRight: 12,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
    backgroundColor: '#F8FAFC',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  etaBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  etaText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  content: {
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  packSize: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 17,
    marginBottom: 8,
    minHeight: 34,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  originalPrice: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#059669',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 3,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 6,
  },
  stepperBtn: {
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    minWidth: 14,
    textAlign: 'center',
  },
});
