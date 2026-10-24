import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Pressable 
} from 'react-native';
import { ArrowLeft, Search, X, Zap } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { CategoryId } from '../types';

export const ProductListingModal: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    setActiveModal 
  } = useApp();

  // Filter products by category and search text
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.categoryId === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
  const pageTitle = selectedCategory === 'all' 
    ? (searchQuery ? `Search Results for "${searchQuery}"` : 'All Products')
    : (activeCategoryObj?.name || 'Products');

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton} 
          onPress={() => setActiveModal(null)}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </Pressable>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle} numberOfLines={1}>{pageTitle}</Text>
          <View style={styles.deliveryBadge}>
            <Zap size={10} color="#059669" fill="#059669" />
            <Text style={styles.deliveryBadgeText}>⚡ Delivers in 30-45 mins</Text>
          </View>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={16} color="#059669" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items in this list..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <X size={14} color="#64748B" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Category Pills Slider */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryPillsScroll}
      >
        <Pressable
          style={[
            styles.pill,
            selectedCategory === 'all' && styles.activePill
          ]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text 
            style={[
              styles.pillText,
              selectedCategory === 'all' && styles.activePillText
            ]}
          >
            All Items
          </Text>
        </Pressable>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <Pressable
              key={cat.id}
              style={[
                styles.pill,
                isSelected && styles.activePill
              ]}
              onPress={() => setSelectedCategory(cat.id as CategoryId)}
            >
              <Text style={styles.pillEmoji}>{cat.icon}</Text>
              <Text 
                style={[
                  styles.pillText,
                  isSelected && styles.activePillText
                ]}
              >
                {cat.shortName}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Product List / Grid */}
      <ScrollView 
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultsCount}>
          Showing {filteredProducts.length} items
        </Text>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySub}>
              Try searching for something else or browse another category.
            </Text>
            <Pressable 
              style={styles.resetBtn}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              <Text style={styles.resetBtnText}>Clear Filters</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredProducts.map((prod) => (
              <View key={prod.id} style={styles.gridCol}>
                <ProductCard product={prod} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  deliveryBadgeText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 38,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    marginLeft: 6,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  categoryPillsScroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 5,
  },
  activePill: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  pillEmoji: {
    fontSize: 12,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activePillText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  productsContainer: {
    paddingBottom: 40,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  gridCol: {
    width: '50%',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  resetBtn: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
});
