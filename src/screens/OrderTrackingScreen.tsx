import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Image 
} from 'react-native';
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Store, 
  Package, 
  Bike, 
  Home as HomeIcon,
  ChevronRight,
  Sparkles
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';

export const OrderTrackingScreen: React.FC = () => {
  const { 
    activeOrder, 
    orders, 
    updateOrderStatus, 
    advanceOrderStatus, 
    setActiveModal, 
    setActiveTab 
  } = useApp();

  // If activeOrder is not set, pick the first order from history
  const order = activeOrder || orders[0];

  if (!order) {
    return null;
  }

  const stages: { status: OrderStatus; label: string; desc: string; icon: any; time: string }[] = [
    {
      status: 'Order Placed',
      label: 'Order Placed',
      desc: 'Received and verified by system',
      icon: CheckCircle2,
      time: '12:30 PM',
    },
    {
      status: 'Confirmed',
      label: 'Order Confirmed',
      desc: 'Dark store accepted your order',
      icon: Store,
      time: '12:31 PM',
    },
    {
      status: 'Preparing',
      label: 'Preparing Items',
      desc: 'Handpicked and cold-chain packed',
      icon: Package,
      time: '12:35 PM',
    },
    {
      status: 'Out for Delivery',
      label: 'Out for Delivery',
      desc: 'Rider is on the way to your door',
      icon: Bike,
      time: '12:45 PM',
    },
    {
      status: 'Delivered',
      label: 'Order Delivered',
      desc: 'Delivered safely at your doorstep',
      icon: HomeIcon,
      time: '01:05 PM',
    },
  ];

  const currentStageIndex = stages.findIndex((s) => s.status === order.status);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backBtn}
          onPress={() => {
            setActiveModal(null);
            setActiveTab('orders');
          }}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Tracking Order</Text>
          <Text style={styles.headerSub}>{order.orderNumber}</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Estimated Arrival Banner */}
        <View style={styles.etaCard}>
          <View style={styles.etaHeader}>
            <View style={styles.livePulseDot} />
            <Text style={styles.liveTag}>LIVE TRACKING</Text>
          </View>
          <Text style={styles.etaBigText}>
            {order.status === 'Delivered' ? 'Delivered!' : 'Arriving in ~28 mins'}
          </Text>
          <Text style={styles.etaSubText}>
            {order.status === 'Delivered'
              ? 'Thank you for shopping with FlashCart'
              : '⚡ Guaranteed fast delivery within 30–60 minutes'}
          </Text>
        </View>

        {/* Map Placeholder Graphic */}
        <View style={styles.mapContainer}>
          <View style={styles.mapCanvas}>
            {/* Grid overlay lines simulating street map */}
            <View style={styles.mapRoadH1} />
            <View style={styles.mapRoadH2} />
            <View style={styles.mapRoadV1} />
            <View style={styles.mapRoadV2} />

            {/* Dark store origin point */}
            <View style={styles.storeMarkerWrap}>
              <View style={styles.storeMarker}>
                <Store size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.markerLabel}>Dark Store</Text>
            </View>

            {/* Dashed route line */}
            <View style={styles.dashedRouteLine} />

            {/* Moving delivery partner scooter marker */}
            <View 
              style={[
                styles.scooterMarkerWrap,
                order.status === 'Delivered' 
                  ? { bottom: 35, right: 35 } 
                  : order.status === 'Out for Delivery' 
                    ? { top: '50%', left: '50%' } 
                    : { top: 40, left: 40 }
              ]}
            >
              <View style={styles.scooterCircle}>
                <Bike size={16} color="#FFFFFF" />
              </View>
              <View style={styles.riderPill}>
                <Text style={styles.riderPillText}>Rider 🛵</Text>
              </View>
            </View>

            {/* Customer destination point */}
            <View style={styles.destMarkerWrap}>
              <View style={styles.destMarker}>
                <MapPin size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.markerLabelDest}>You ({order.deliveryAddress.tag})</Text>
            </View>
          </View>

          {/* Map bottom strip */}
          <View style={styles.mapBottomStrip}>
            <MapPin size={13} color="#059669" />
            <Text style={styles.mapAddressText} numberOfLines={1}>
              {order.deliveryAddress.houseNo}, {order.deliveryAddress.street}
            </Text>
          </View>
        </View>

        {/* Delivery Partner Details Card */}
        <View style={styles.riderCard}>
          <Image 
            source={{ uri: order.rider.avatarUrl }} 
            style={styles.riderAvatar} 
          />
          <View style={styles.riderInfo}>
            <Text style={styles.riderName}>{order.rider.name}</Text>
            <Text style={styles.riderVehicle}>
              {order.rider.vehicleNumber} • Rating {order.rider.rating} ★
            </Text>
          </View>

          <View style={styles.riderActions}>
            <Pressable style={styles.actionBtn}>
              <Phone size={16} color="#059669" />
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <MessageSquare size={16} color="#059669" />
            </Pressable>
          </View>
        </View>

        {/* Order Status Progression Steps */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsHeading}>Delivery Progress</Text>

          {stages.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const IconComponent = stage.icon;

            return (
              <View key={stage.status} style={styles.stepRow}>
                {/* Timeline vertical bar & circle */}
                <View style={styles.timelineCol}>
                  <View 
                    style={[
                      styles.stepCircle,
                      isCompleted && styles.stepCircleCompleted,
                      isCurrent && styles.stepCircleCurrent
                    ]}
                  >
                    <IconComponent 
                      size={13} 
                      color={isCompleted ? '#FFFFFF' : '#94A3B8'} 
                    />
                  </View>
                  {idx < stages.length - 1 && (
                    <View 
                      style={[
                        styles.timelineLine,
                        idx < currentStageIndex && styles.timelineLineCompleted
                      ]} 
                    />
                  )}
                </View>

                {/* Step text content */}
                <View style={styles.stepContent}>
                  <View style={styles.stepTitleRow}>
                    <Text 
                      style={[
                        styles.stepTitle,
                        isCompleted && styles.stepTitleCompleted,
                        isCurrent && styles.stepTitleCurrent
                      ]}
                    >
                      {stage.label}
                    </Text>
                    {isCompleted && (
                      <Text style={styles.stepTime}>{stage.time}</Text>
                    )}
                  </View>
                  <Text style={styles.stepDesc}>{stage.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Interactive MVP Status Simulator */}
        <View style={styles.simulatorCard}>
          <View style={styles.simulatorHeader}>
            <Sparkles size={16} color="#059669" />
            <Text style={styles.simulatorTitle}>MVP Status Simulator</Text>
          </View>
          <Text style={styles.simulatorDesc}>
            Test the entire customer journey by advancing through each delivery stage:
          </Text>

          <View style={styles.simulatorButtonsRow}>
            {stages.map((s) => (
              <Pressable
                key={s.status}
                style={[
                  styles.simChip,
                  order.status === s.status && styles.simChipActive
                ]}
                onPress={() => updateOrderStatus(order.id, s.status)}
              >
                <Text 
                  style={[
                    styles.simChipText,
                    order.status === s.status && styles.simChipTextActive
                  ]}
                >
                  {s.status}
                </Text>
              </Pressable>
            ))}
          </View>

          {order.status !== 'Delivered' && (
            <Pressable 
              style={styles.advanceStatusBtn}
              onPress={() => advanceOrderStatus(order.id)}
            >
              <Text style={styles.advanceBtnText}>Advance to Next Status →</Text>
            </Pressable>
          )}
        </View>
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
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  etaCard: {
    backgroundColor: '#059669',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  etaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34D399',
  },
  liveTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D1FAE5',
    letterSpacing: 0.5,
  },
  etaBigText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  etaSubText: {
    fontSize: 12,
    color: '#ECFDF5',
  },
  mapContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  mapCanvas: {
    height: 180,
    backgroundColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
  },
  mapRoadH1: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#CBD5E1',
  },
  mapRoadH2: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#CBD5E1',
  },
  mapRoadV1: {
    position: 'absolute',
    left: 70,
    top: 0,
    bottom: 0,
    width: 16,
    backgroundColor: '#CBD5E1',
  },
  mapRoadV2: {
    position: 'absolute',
    right: 70,
    top: 0,
    bottom: 0,
    width: 16,
    backgroundColor: '#CBD5E1',
  },
  storeMarkerWrap: {
    position: 'absolute',
    top: 20,
    left: 20,
    alignItems: 'center',
  },
  storeMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  markerLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F172A',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
  },
  destMarkerWrap: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  destMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  markerLabelDest: {
    fontSize: 9,
    fontWeight: '800',
    color: '#DC2626',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
  },
  dashedRouteLine: {
    position: 'absolute',
    top: 36,
    left: 36,
    right: 36,
    bottom: 36,
    borderWidth: 2,
    borderColor: '#059669',
    borderStyle: 'dashed',
    borderRadius: 20,
  },
  scooterMarkerWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  scooterCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  riderPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginTop: 2,
  },
  riderPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },
  mapBottomStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  mapAddressText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    flex: 1,
  },
  riderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  riderAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F1F5F9',
    marginRight: 12,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  riderVehicle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  riderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  stepsHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
  },
  timelineCol: {
    alignItems: 'center',
    width: 24,
    marginRight: 12,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepCircleCompleted: {
    backgroundColor: '#059669',
  },
  stepCircleCurrent: {
    backgroundColor: '#059669',
    borderWidth: 3,
    borderColor: '#A7F3D0',
  },
  timelineLine: {
    width: 2,
    height: 36,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  timelineLineCompleted: {
    backgroundColor: '#059669',
  },
  stepContent: {
    flex: 1,
    paddingBottom: 16,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  stepTitleCompleted: {
    color: '#0F172A',
    fontWeight: '700',
  },
  stepTitleCurrent: {
    color: '#059669',
    fontWeight: '800',
  },
  stepTime: {
    fontSize: 11,
    color: '#64748B',
  },
  stepDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  simulatorCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  simulatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  simulatorTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46',
  },
  simulatorDesc: {
    fontSize: 12,
    color: '#047857',
    marginBottom: 12,
    lineHeight: 16,
  },
  simulatorButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  simChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  simChipActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  simChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#065F46',
  },
  simChipTextActive: {
    color: '#FFFFFF',
  },
  advanceStatusBtn: {
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  advanceBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
