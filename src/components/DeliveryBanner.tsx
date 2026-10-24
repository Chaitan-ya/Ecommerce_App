import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Zap, Clock, ShieldCheck } from 'lucide-react-native';

export const DeliveryBanner: React.FC = () => {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.topRow}>
        <View style={styles.speedIconWrap}>
          <Zap size={16} color="#FFFFFF" fill="#FFFFFF" />
        </View>
        <Text style={styles.mainTitle}>30–60 Minute Superfast Delivery</Text>
      </View>

      <Text style={styles.subtitle}>
        Packed fresh from your local dark store & delivered straight to your doorstep.
      </Text>

      <View style={styles.perksRow}>
        <View style={styles.perkItem}>
          <Clock size={13} color="#047857" />
          <Text style={styles.perkText}>Avg 35 mins</Text>
        </View>
        <View style={styles.dot} />
        <View style={styles.perkItem}>
          <ShieldCheck size={13} color="#047857" />
          <Text style={styles.perkText}>Free Delivery &gt; ₹199</Text>
        </View>
        <View style={styles.dot} />
        <View style={styles.perkItem}>
          <Zap size={13} color="#047857" />
          <Text style={styles.perkText}>Live Tracking</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 14,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  speedIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#065F46',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    color: '#047857',
    marginBottom: 8,
    lineHeight: 16,
  },
  perksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
    paddingTop: 8,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  perkText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#065F46',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#10B981',
  },
});
