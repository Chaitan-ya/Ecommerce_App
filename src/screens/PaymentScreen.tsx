import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Pressable, 
  ActivityIndicator 
} from 'react-native';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Check, 
  Lock, 
  Banknote 
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';

export const PaymentScreen: React.FC = () => {
  const { finalPayable, placeOrder, setActiveModal } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('UPI');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'custom'>('gpay');
  const [upiId, setUpiId] = useState('');
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8921 4410 7829');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('382');
  const [cardName, setCardName] = useState('Alex Johnson');

  // Gateway processing simulation state
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);

    // Simulate 1.2s bank gateway latency for realistic MVP polish
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(selectedMethod);
      setActiveModal('payment-success');
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backBtn}
          onPress={() => setActiveModal('checkout')}
          disabled={isProcessing}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>Select Payment Method</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Payable Header Banner */}
        <View style={styles.amountBanner}>
          <View>
            <Text style={styles.amountBannerLabel}>TOTAL PAYABLE</Text>
            <Text style={styles.amountBannerValue}>₹{finalPayable}</Text>
          </View>
          <View style={styles.secureBadge}>
            <Lock size={12} color="#047857" />
            <Text style={styles.secureBadgeText}>128-bit Encrypted</Text>
          </View>
        </View>

        {/* 1. UPI Payment Option */}
        <Pressable
          style={[styles.paymentMethodCard, selectedMethod === 'UPI' && styles.methodSelected]}
          onPress={() => setSelectedMethod('UPI')}
        >
          <View style={styles.methodHeaderRow}>
            <View style={styles.methodTitleRow}>
              <View style={[styles.methodIconBox, { backgroundColor: '#ECFDF5' }]}>
                <Text style={styles.upiIconText}>UPI</Text>
              </View>
              <View>
                <Text style={styles.methodTitle}>UPI (Instant & Zero Fee)</Text>
                <Text style={styles.methodSub}>Google Pay, PhonePe, Paytm, or UPI ID</Text>
              </View>
            </View>

            <View style={[styles.radioCircle, selectedMethod === 'UPI' && styles.radioCircleActive]}>
              {selectedMethod === 'UPI' && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>
          </View>

          {/* UPI Sub-options */}
          {selectedMethod === 'UPI' && (
            <View style={styles.upiDetailsWrap}>
              <Text style={styles.subHeading}>POPULAR UPI APPS</Text>
              
              <View style={styles.upiAppsGrid}>
                {[
                  { id: 'gpay', name: 'Google Pay', icon: '🟢' },
                  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                  { id: 'paytm', name: 'Paytm UPI', icon: '🔵' },
                  { id: 'custom', name: 'Other UPI ID', icon: '⚡' },
                ].map((app) => (
                  <Pressable
                    key={app.id}
                    style={[
                      styles.upiAppPill,
                      selectedUpiApp === app.id && styles.upiAppPillActive
                    ]}
                    onPress={() => setSelectedUpiApp(app.id as any)}
                  >
                    <Text style={styles.upiAppIcon}>{app.icon}</Text>
                    <Text 
                      style={[
                        styles.upiAppName,
                        selectedUpiApp === app.id && styles.upiAppNameActive
                      ]}
                    >
                      {app.name}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {selectedUpiApp === 'custom' && (
                <View style={styles.customUpiWrap}>
                  <TextInput
                    style={styles.customUpiInput}
                    placeholder="Enter UPI ID (e.g. mobile@upi)"
                    placeholderTextColor="#94A3B8"
                    value={upiId}
                    onChangeText={setUpiId}
                  />
                </View>
              )}
            </View>
          )}
        </Pressable>

        {/* 2. Credit / Debit Card Option */}
        <Pressable
          style={[styles.paymentMethodCard, selectedMethod === 'Card' && styles.methodSelected]}
          onPress={() => setSelectedMethod('Card')}
        >
          <View style={styles.methodHeaderRow}>
            <View style={styles.methodTitleRow}>
              <View style={[styles.methodIconBox, { backgroundColor: '#EFF6FF' }]}>
                <CreditCard size={18} color="#2563EB" />
              </View>
              <View>
                <Text style={styles.methodTitle}>Credit or Debit Card</Text>
                <Text style={styles.methodSub}>Visa, MasterCard, RuPay, Maestro</Text>
              </View>
            </View>

            <View style={[styles.radioCircle, selectedMethod === 'Card' && styles.radioCircleActive]}>
              {selectedMethod === 'Card' && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>
          </View>

          {/* Card Form */}
          {selectedMethod === 'Card' && (
            <View style={styles.cardFormWrap}>
              <Text style={styles.inputLabel}>CARD NUMBER</Text>
              <TextInput
                style={styles.input}
                placeholder="XXXX XXXX XXXX XXXX"
                placeholderTextColor="#94A3B8"
                value={cardNumber}
                onChangeText={setCardNumber}
              />

              <View style={styles.cardRow}>
                <View style={styles.cardCol}>
                  <Text style={styles.inputLabel}>EXPIRY (MM/YY)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    placeholderTextColor="#94A3B8"
                    value={cardExpiry}
                    onChangeText={setCardExpiry}
                  />
                </View>

                <View style={styles.cardCol}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry
                    maxLength={4}
                    value={cardCvv}
                    onChangeText={setCardCvv}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>NAME ON CARD</Text>
              <TextInput
                style={styles.input}
                placeholder="Cardholder Name"
                placeholderTextColor="#94A3B8"
                value={cardName}
                onChangeText={setCardName}
              />
            </View>
          )}
        </Pressable>

        {/* 3. Cash / Pay on Delivery */}
        <Pressable
          style={[styles.paymentMethodCard, selectedMethod === 'COD' && styles.methodSelected]}
          onPress={() => setSelectedMethod('COD')}
        >
          <View style={styles.methodHeaderRow}>
            <View style={styles.methodTitleRow}>
              <View style={[styles.methodIconBox, { backgroundColor: '#FEF3C7' }]}>
                <Banknote size={18} color="#D97706" />
              </View>
              <View>
                <Text style={styles.methodTitle}>Pay on Delivery</Text>
                <Text style={styles.methodSub}>Cash or QR scan at doorstep</Text>
              </View>
            </View>

            <View style={[styles.radioCircle, selectedMethod === 'COD' && styles.radioCircleActive]}>
              {selectedMethod === 'COD' && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>
          </View>
        </Pressable>

        {/* Security assurance */}
        <View style={styles.securityNote}>
          <ShieldCheck size={18} color="#059669" />
          <Text style={styles.securityNoteText}>
            PCI-DSS Compliant 256-Bit SSL Payment Gateway
          </Text>
        </View>
      </ScrollView>

      {/* Pay CTA Button */}
      <View style={styles.bottomBar}>
        <Pressable 
          style={[styles.paySubmitBtn, isProcessing && styles.paySubmitBtnDisabled]}
          onPress={handlePay}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <View style={styles.processingRow}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={styles.paySubmitText}>Processing Secure Payment...</Text>
            </View>
          ) : (
            <Text style={styles.paySubmitText}>
              Pay ₹{finalPayable} via {selectedMethod}
            </Text>
          )}
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
    paddingBottom: 100,
  },
  amountBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  amountBannerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: 0.5,
  },
  amountBannerValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#065F46',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  secureBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#047857',
  },
  paymentMethodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  methodSelected: {
    borderColor: '#059669',
    backgroundColor: '#FFFFFF',
  },
  methodHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  methodTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  methodIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upiIconText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#059669',
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  methodSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#059669',
    backgroundColor: '#059669',
  },
  upiDetailsWrap: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  subHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  upiAppsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  upiAppPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    width: '48%',
  },
  upiAppPillActive: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  upiAppIcon: {
    fontSize: 14,
  },
  upiAppName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  upiAppNameActive: {
    fontWeight: '800',
    color: '#059669',
  },
  customUpiWrap: {
    marginTop: 10,
  },
  customUpiInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  cardFormWrap: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 6,
    marginTop: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cardCol: {
    flex: 1,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  securityNoteText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
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
  paySubmitBtn: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  paySubmitBtnDisabled: {
    backgroundColor: '#6EE7B7',
  },
  processingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  paySubmitText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
