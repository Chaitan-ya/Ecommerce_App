import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Pressable 
} from 'react-native';
import { 
  ArrowLeft, 
  Plus, 
  MapPin, 
  Check, 
  Home, 
  Briefcase, 
  Building 
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { AddressTag } from '../types';

export const AddressModal: React.FC = () => {
  const { 
    addresses, 
    selectedAddress, 
    selectAddress, 
    addAddress, 
    setActiveModal 
  } = useApp();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [tag, setTag] = useState<AddressTag>('Home');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('560038');
  const [landmark, setLandmark] = useState('');
  const [formError, setFormError] = useState('');

  const handleSaveNewAddress = () => {
    if (!houseNo.trim() || !street.trim() || !pincode.trim()) {
      setFormError('Please fill in Flat No, Street area, and Pincode');
      return;
    }

    addAddress({
      tag,
      houseNo: houseNo.trim(),
      street: street.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      landmark: landmark.trim() || undefined,
    });

    setIsAddingNew(false);
    setFormError('');
  };

  const getTagIcon = (addressTag: AddressTag) => {
    switch (addressTag) {
      case 'Home':
        return <Home size={16} color="#059669" />;
      case 'Work':
        return <Briefcase size={16} color="#0284C7" />;
      default:
        return <Building size={16} color="#7C3AED" />;
    }
  };

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
        <Text style={styles.headerTitle}>Select Delivery Address</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Toggle to Add New Address Form */}
        {!isAddingNew && (
          <Pressable 
            style={styles.addNewCard}
            onPress={() => setIsAddingNew(true)}
          >
            <View style={styles.plusIconWrap}>
              <Plus size={18} color="#059669" />
            </View>
            <View style={styles.addNewTextWrap}>
              <Text style={styles.addNewTitle}>+ Add New Address</Text>
              <Text style={styles.addNewSub}>
                Add house/flat, street, landmark, and pincode
              </Text>
            </View>
          </Pressable>
        )}

        {/* Add New Address Form */}
        {isAddingNew && (
          <View style={styles.formCard}>
            <Text style={styles.formHeading}>Add New Delivery Address</Text>

            {/* Address Tag Selector */}
            <Text style={styles.inputLabel}>SAVE AS</Text>
            <View style={styles.tagSelectorRow}>
              {(['Home', 'Work', 'Other'] as AddressTag[]).map((t) => (
                <Pressable
                  key={t}
                  style={[styles.tagOption, tag === t && styles.tagOptionSelected]}
                  onPress={() => setTag(t)}
                >
                  {getTagIcon(t)}
                  <Text style={[styles.tagOptionText, tag === t && styles.tagOptionTextSelected]}>
                    {t}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Inputs */}
            <Text style={styles.inputLabel}>HOUSE / FLAT / BLOCK NO. *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Flat 301, Tower 2"
              placeholderTextColor="#94A3B8"
              value={houseNo}
              onChangeText={setHouseNo}
            />

            <Text style={styles.inputLabel}>STREET / AREA / ROAD *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 100 Feet Road, Indiranagar"
              placeholderTextColor="#94A3B8"
              value={street}
              onChangeText={setStreet}
            />

            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>CITY *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  placeholderTextColor="#94A3B8"
                  value={city}
                  onChangeText={setCity}
                />
              </View>

              <View style={styles.formCol}>
                <Text style={styles.inputLabel}>PINCODE *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Pincode"
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={pincode}
                  onChangeText={setPincode}
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>LANDMARK (OPTIONAL)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Near Metro Station / Corner House"
              placeholderTextColor="#94A3B8"
              value={landmark}
              onChangeText={setLandmark}
            />

            {formError !== '' && (
              <Text style={styles.errorText}>{formError}</Text>
            )}

            <View style={styles.formActionsRow}>
              <Pressable 
                style={styles.cancelBtn}
                onPress={() => {
                  setIsAddingNew(false);
                  setFormError('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>

              <Pressable 
                style={styles.saveBtn}
                onPress={handleSaveNewAddress}
              >
                <Text style={styles.saveBtnText}>Save Address</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Saved Addresses List */}
        <Text style={styles.savedSectionTitle}>SAVED ADDRESSES</Text>

        {addresses.map((addr) => {
          const isSelected = selectedAddress.id === addr.id;

          return (
            <Pressable
              key={addr.id}
              style={[styles.addressItemCard, isSelected && styles.addressItemCardSelected]}
              onPress={() => selectAddress(addr.id)}
            >
              <View style={styles.addressLeft}>
                <View style={styles.tagBadge}>
                  {getTagIcon(addr.tag)}
                  <Text style={styles.tagText}>{addr.tag}</Text>
                </View>

                <Text style={styles.addressLine1}>
                  {addr.houseNo}, {addr.street}
                </Text>
                <Text style={styles.addressLine2}>
                  {addr.city} - {addr.pincode}
                </Text>
                {addr.landmark && (
                  <Text style={styles.landmarkLine}>Landmark: {addr.landmark}</Text>
                )}
                
                <View style={styles.etaRow}>
                  <MapPin size={12} color="#059669" />
                  <Text style={styles.etaText}>⚡ 30–45 mins express delivery to this location</Text>
                </View>
              </View>

              {/* Radio Indicator */}
              <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Bottom Confirm Button */}
      <View style={styles.bottomBar}>
        <Pressable 
          style={styles.confirmBtn}
          onPress={() => setActiveModal(null)}
        >
          <Text style={styles.confirmBtnText}>Deliver to This Address</Text>
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
    paddingBottom: 90,
  },
  addNewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#D1FAE5',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  plusIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addNewTextWrap: {
    flex: 1,
  },
  addNewTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669',
  },
  addNewSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  formHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 6,
    marginTop: 8,
  },
  tagSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tagOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  tagOptionSelected: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  tagOptionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  tagOptionTextSelected: {
    color: '#059669',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
  },
  formCol: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
    marginTop: 8,
  },
  formActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  saveBtn: {
    flex: 2,
    backgroundColor: '#059669',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  savedSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  addressItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  addressItemCardSelected: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  addressLeft: {
    flex: 1,
    marginRight: 12,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  addressLine1: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
    lineHeight: 18,
  },
  addressLine2: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  landmarkLine: {
    fontSize: 11,
    color: '#64748B',
    fontStyle: 'italic',
    marginTop: 2,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  etaText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#059669',
    backgroundColor: '#059669',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    padding: 16,
  },
  confirmBtn: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
