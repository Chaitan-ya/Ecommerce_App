import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Zap, ShieldCheck, ArrowRight, CheckCircle2, Phone, X } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { loginWithPhone, loginWithGoogle, setActiveModal } = useApp();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(30);

  const handleSendOtp = () => {
    if (phoneNumber.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMessage('');
    setOtpSent(true);
    setOtp('1234'); // Pre-fill with demo OTP for instant MVP testing ease
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      setErrorMessage('Please enter the 4-digit verification code');
      return;
    }
    const success = loginWithPhone(phoneNumber, otp);
    if (!success) {
      setErrorMessage('Invalid verification code');
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handleSkip = () => {
    setActiveModal(null);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Dismiss modal button */}
        <Pressable style={styles.closeBtn} onPress={handleSkip}>
          <X size={20} color="#64748B" />
        </Pressable>

        {/* Hero Branding */}
        <View style={styles.brandHero}>
          <View style={styles.logoBadge}>
            <Zap size={28} color="#FFFFFF" fill="#FFFFFF" />
          </View>
          <Text style={styles.brandTitle}>FlashCart</Text>
          <Text style={styles.brandTagline}>Groceries & Essentials in 30–60 Mins</Text>
          
          <View style={styles.heroPill}>
            <Zap size={12} color="#059669" fill="#059669" />
            <Text style={styles.heroPillText}>Lightning Fast Hyperlocal Delivery</Text>
          </View>
        </View>

        {/* Auth Card */}
        <View style={styles.authCard}>
          <Text style={styles.cardHeader}>Log in or Sign up</Text>
          <Text style={styles.cardSub}>
            {!otpSent 
              ? 'Enter your phone number to receive a one-time password' 
              : `Enter the 4-digit OTP sent to +91 ${phoneNumber}`}
          </Text>

          {/* Phone input step */}
          {!otpSent ? (
            <View style={styles.formSection}>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeWrap}>
                  <Text style={styles.flag}>🇮🇳</Text>
                  <Text style={styles.countryCode}>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter 10-digit mobile"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={(val) => {
                    setPhoneNumber(val.replace(/[^0-9]/g, ''));
                    setErrorMessage('');
                  }}
                />
              </View>

              {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}

              <Pressable 
                style={[
                  styles.primaryButton, 
                  phoneNumber.length < 10 && styles.disabledButton
                ]}
                onPress={handleSendOtp}
              >
                <Text style={styles.primaryButtonText}>Get OTP</Text>
                <ArrowRight size={18} color="#FFFFFF" />
              </Pressable>
            </View>
          ) : (
            /* OTP input step */
            <View style={styles.formSection}>
              <View style={styles.otpInputContainer}>
                <TextInput
                  style={styles.otpInput}
                  placeholder="• • • •"
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
                  autoFocus
                />
              </View>

              <View style={styles.demoHelperBadge}>
                <CheckCircle2 size={14} color="#059669" />
                <Text style={styles.demoHelperText}>
                  Demo auto-filled: Use <Text style={{ fontWeight: '800' }}>1234</Text>
                </Text>
              </View>

              {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}

              <Pressable 
                style={styles.primaryButton}
                onPress={handleVerifyOtp}
              >
                <Text style={styles.primaryButtonText}>Verify & Continue</Text>
                <ArrowRight size={18} color="#FFFFFF" />
              </Pressable>

              <Pressable 
                style={styles.changePhoneBtn}
                onPress={() => setOtpSent(false)}
              >
                <Text style={styles.changePhoneText}>Edit phone number</Text>
              </Pressable>
            </View>
          )}

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Login Button */}
          <Pressable 
            style={styles.googleButton}
            onPress={handleGoogleLogin}
          >
            <View style={styles.googleIconCircle}>
              <Text style={styles.googleG}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>

          {/* Skip for now */}
          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip & explore store</Text>
          </Pressable>
        </View>

        {/* Security badge footer */}
        <View style={styles.footerGuarantees}>
          <ShieldCheck size={16} color="#059669" />
          <Text style={styles.footerText}>
            100% Safe & Secure Login • Zero Spam Guarantee
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandHero: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },
  heroPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  authCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 18,
  },
  formSection: {
    gap: 12,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  countryCodeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#F8FAFC',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    gap: 6,
  },
  flag: {
    fontSize: 18,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
  },
  otpInputContainer: {
    borderWidth: 1.5,
    borderColor: '#059669',
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  otpInput: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 10,
    color: '#0F172A',
    textAlign: 'center',
    width: '100%',
  },
  demoHelperBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  demoHelperText: {
    fontSize: 12,
    color: '#065F46',
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  changePhoneBtn: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  changePhoneText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 10,
  },
  googleIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EA4335',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleG: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    textDecorationLine: 'underline',
  },
  footerGuarantees: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
