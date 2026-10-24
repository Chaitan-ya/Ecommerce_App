import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Image 
} from 'react-native';
import { 
  ClipboardList, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Bike, 
  RotateCw, 
  MapPin, 
  ChevronRight, 
  Zap 
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';

export const MyOrdersScreen: React.FC = () => {
  const { orders, setActiveOrder, setActiveModal, setActiveTab, addToCart } = useApp();
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'completed'>('all');

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return {
          bg: '#ECFDF5',
          text: '#047857',
          icon: CheckCircle2,
        };
      case 'Out for Delivery':
        return {
          bg: '#FEF3C7',
          text: '#B45309',
          icon: Bike,
        };
      default:
        return {
          bg: '#EFF6FF',
          text: '#1D4ED8',
          icon: Clock,
        };
    }
  };

  const handleTrackOrder = (order: Order) => {
    setActiveOrder(order);
    setActiveModal('order-tracking');
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    setActiveTab('cart');
  };

  const filteredOrders = orders.filter((ord) => {
    if (filterTab === 'active') return ord.status !== 'Delivered';
    if (filterTab === 'completed') return ord.status === 'Delivered';
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerSub}>
          {orders.length} {orders.length === 1 ? 'order placed' : 'orders placed'}
        </Text>
      </View>

      {/* Filter Tabs: All, Active, Completed */}
      <View style={styles.filterBar}>
        {(['all', 'active', 'completed'] as const).map((tab) => {
          const isActive = filterTab === tab;
          const label = tab === 'all' ? 'All Orders' : tab === 'active' ? 'Active' : 'Past Orders';

          return (
            <Pressable
              key={tab}
              style={[styles.filterTabBtn, isActive && styles.filterTabBtnActive]}
              onPress={() => setFilterTab(tab)}
            >
              <Text style={[styles.filterTabText, isActive && styles.filterTabTextActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyWrap}>
            <View style={styles.emptyIconCircle}>
              <ClipboardList size={36} color="#059669" />
            </View>
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptyDesc}>
              {filterTab === 'active'
                ? 'You have no live ongoing deliveries right now.'
                : 'Browse our fresh catalog and place your first 30-min delivery order!'}
            </Text>
            <Pressable 
              style={styles.shopNowBtn}
              onPress={() => setActiveTab('home')}
            >
              <Text style={styles.shopNowText}>Start Shopping</Text>
              <ArrowRight size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        ) : (
          filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status);
            const BadgeIcon = badge.icon;
            const isLive = order.status !== 'Delivered';

            return (
              <View key={order.id} style={styles.orderCard}>
                {/* Order Top Bar */}
                <View style={styles.orderCardTop}>
                  <View>
                    <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                  </View>

                  <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                    <BadgeIcon size={12} color={badge.text} />
                    <Text style={[styles.statusText, { color: badge.text }]}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                {/* 30-60 min guarantee note for live order */}
                {isLive && (
                  <View style={styles.liveBanner}>
                    <Zap size={14} color="#D97706" fill="#D97706" />
                    <Text style={styles.liveBannerText}>
                      ⚡ Express delivery in progress • 30–45 mins ETA
                    </Text>
                  </View>
                )}

                {/* Items Thumbnails preview */}
                <View style={styles.itemsPreviewRow}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbsScroll}>
                    {order.items.map((item, idx) => (
                      <View key={idx} style={styles.itemThumbWrap}>
                        <Image source={{ uri: item.product.imageUrl }} style={styles.thumbImage} />
                        <View style={styles.qtyPill}>
                          <Text style={styles.qtyPillText}>x{item.quantity}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>

                  <View style={styles.orderSummaryCol}>
                    <Text style={styles.itemsCountText}>
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </Text>
                    <Text style={styles.totalPriceText}>₹{order.totalAmount}</Text>
                  </View>
                </View>

                {/* Delivery Address summary */}
                <View style={styles.addressSummaryRow}>
                  <MapPin size={12} color="#64748B" />
                  <Text style={styles.addressSummaryText} numberOfLines={1}>
                    {order.deliveryAddress.tag}: {order.deliveryAddress.houseNo}, {order.deliveryAddress.street}
                  </Text>
                </View>

                {/* Actions Row */}
                <View style={styles.orderCardActions}>
                  {isLive ? (
                    <Pressable 
                      style={styles.trackOrderBtn}
                      onPress={() => handleTrackOrder(order)}
                    >
                      <Text style={styles.trackOrderBtnText}>Track Order Live</Text>
                      <ArrowRight size={14} color="#FFFFFF" />
                    </Pressable>
                  ) : (
                    <>
                      <Pressable 
                        style={styles.viewDetailsBtn}
                        onPress={() => handleTrackOrder(order)}
                      >
                        <Text style={styles.viewDetailsBtnText}>View Timeline</Text>
                      </Pressable>

                      <Pressable 
                        style={styles.reorderBtn}
                        onPress={() => handleReorder(order)}
                      >
                        <RotateCw size={13} color="#059669" />
                        <Text style={styles.reorderBtnText}>Reorder</Text>
                      </Pressable>
                    </>
                  )}
                </View>
              </View>
            );
          })
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
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterTabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  filterTabBtnActive: {
    backgroundColor: '#059669',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  shopNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  shopNowText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  orderCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  orderDate: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  liveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
    marginBottom: 12,
  },
  liveBannerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  itemsPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  thumbsScroll: {
    flex: 1,
    marginRight: 10,
  },
  itemThumbWrap: {
    position: 'relative',
    marginRight: 8,
  },
  thumbImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  qtyPill: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#0F172A',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  qtyPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  orderSummaryCol: {
    alignItems: 'flex-end',
  },
  itemsCountText: {
    fontSize: 11,
    color: '#64748B',
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  addressSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 14,
  },
  addressSummaryText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  orderCardActions: {
    flexDirection: 'row',
    gap: 10,
  },
  trackOrderBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  trackOrderBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  viewDetailsBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingVertical: 9,
  },
  viewDetailsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
    gap: 6,
  },
  reorderBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
});
