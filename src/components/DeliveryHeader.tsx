import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MapPin, ChevronDown, Zap, User } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export const DeliveryHeader: React.FC = () => {
  const { selectedAddress, setActiveModal, setActiveTab, user } = useApp();

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.addressButton} 
        onPress={() => setActiveModal('address-select')}
      >
        <View style={styles.pinCircle}>
          <MapPin size={18} color="#059669" />
        </View>
        <View style={styles.addressInfo}>
          <View style={styles.locationHeaderRow}>
            <Text style={styles.tagText}>{selectedAddress?.tag || 'Delivery to'}</Text>
            <View style={styles.speedBadge}>
              <Zap size={11} color="#D97706" fill="#D97706" />
              <Text style={styles.speedText}>30-45 MINS</Text>
            </View>
          </View>
          <View style={styles.streetRow}>
            <Text style={styles.streetText} numberOfLines={1}>
              {selectedAddress ? `${selectedAddress.houseNo}, ${selectedAddress.street}` : 'Select your location'}
            </Text>
            <ChevronDown size={14} color="#64748B" />
          </View>
        </View>
      </Pressable>

      <Pressable 
        style={styles.profileButton}
        onPress={() => setActiveTab('profile')}
      >
        <View style={styles.avatarPlaceholder}>
          <User size={18} color="#0F766E" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  addressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  pinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addressInfo: {
    flex: 1,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  speedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    gap: 3,
  },
  speedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.3,
  },
  streetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  streetText: {
    fontSize: 12,
    color: '#64748B',
    maxWidth: '90%',
  },
  profileButton: {
    padding: 2,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#CCFBF1',
  },
});
