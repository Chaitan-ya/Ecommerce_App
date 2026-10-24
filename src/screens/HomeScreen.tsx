import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Pressable 
} from 'react-native';
import { Search, X, Flame, Sparkles, ArrowRight, Zap } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { DeliveryHeader } from '../components/DeliveryHeader';
import { DeliveryBanner } from '../components/DeliveryBanner';
import { ProductCard } from '../components/ProductCard';
import { CategoryId } from '../types';

export const HomeScreen: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    setSelectedCategory, 
    setActiveModal 
  } = useApp();

  const handleCategoryPress = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setActiveModal('product-listing');
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      setSelectedCategory('all');
      setActiveModal('product-listing');
    }
  };

  // Top featured products (e.g. first 6 products)
  const featuredProducts = PRODUCTS.slice(0, 5);
  // Popular products (e.g. products 5 to 14)
  const popularProducts = PRODUCTS.slice(5, 15);

  return (
    <View style={styles.container}>
      {/* Top Location Bar */}
      <DeliveryHeader />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search size={18} color="#059669" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search 'milk, bananas, sourdough, eggs'..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                <X size={16} color="#64748B" />
              </Pressable>
            )}
          </View>
        </View>

        {/* 30-60 Minute Delivery Promise Banner */}
        <DeliveryBanner />

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Sparkles size={18} color="#059669" />
            <Text style={styles.sectionTitle}>Explore Categories</Text>
          </View>
          <Pressable 
            style={styles.seeAllBtn}
            onPress={() => {
              setSelectedCategory('all');
              setActiveModal('product-listing');
            }}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ArrowRight size={14} color="#059669" />
          </Pressable>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: cat.bgColor }]}
              onPress={() => handleCategoryPress(cat.id)}
            >
              <View style={styles.categoryIconCircle}>
                <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              </View>
              <Text style={styles.categoryName} numberOfLines={2}>
                {cat.shortName}
              </Text>
              <View style={styles.categoryBadge}>
                <Text style={[styles.categoryBadgeText, { color: cat.color }]}>
                  {cat.itemCount}+ items
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Featured Fast Delivery Deals Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Flame size={18} color="#D97706" fill="#D97706" />
            <Text style={styles.sectionTitle}>Delivering in ~30 Mins</Text>
          </View>
          <View style={styles.liveTag}>
            <Zap size={11} color="#D97706" fill="#D97706" />
            <Text style={styles.liveTagText}>IN STOCK</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalProductsScroll}
        >
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} horizontal />
          ))}
        </ScrollView>

        {/* Popular Essentials Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Popular Everyday Essentials</Text>
          </View>
          <Pressable 
            style={styles.seeAllBtn}
            onPress={() => {
              setSelectedCategory('all');
              setActiveModal('product-listing');
            }}
          >
            <Text style={styles.seeAllText}>Browse All</Text>
            <ArrowRight size={14} color="#059669" />
          </Pressable>
        </View>

        {/* 2-column Grid of Popular Products */}
        <View style={styles.productGrid}>
          {popularProducts.map((prod) => (
            <View key={prod.id} style={styles.gridColumn}>
              <ProductCard product={prod} />
            </View>
          ))}
        </View>

        {/* Bottom Guarantee Banner */}
        <View style={styles.bottomAssurance}>
          <Text style={styles.assuranceTitle}>⚡ The FlashCart 30–60 Min Promise</Text>
          <Text style={styles.assuranceSub}>
            If your delivery takes more than 60 minutes, your next delivery fee is on us. Guaranteed freshness, curated quality.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    marginLeft: 8,
    height: '100%',
  },
  clearSearchBtn: {
    padding: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  liveTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B45309',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 6,
  },
  categoryCard: {
    width: 96,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryEmoji: {
    fontSize: 22,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    height: 30,
    lineHeight: 15,
  },
  categoryBadge: {
    marginTop: 4,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  horizontalProductsScroll: {
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  gridColumn: {
    width: '50%',
  },
  bottomAssurance: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  assuranceTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  assuranceSub: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
});
