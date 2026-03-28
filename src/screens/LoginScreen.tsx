import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Mail,
  Lock,
  LogIn,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from 'lucide-react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, spacing, typography, radius } from '../theme/Theme';

const { width } = Dimensions.get('window');

type LoginMode = 'login' | 'forgot' | 'verify' | 'reset';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<LoginMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeMode = (newMode: LoginMode) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMode(newMode);
  };

  const handleSendLink = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    // Mock API call
    changeMode('verify');
    Alert.alert('Sent!', 'A verification code has been sent to your email.');
  };

  const handleVerify = () => {
    if (code.length < 4) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }
    changeMode('reset');
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    Alert.alert(
      'Success',
      'Your password has been reset successfully. Please log in.',
    );
    changeMode('login');
  };

  const renderHeader = () => {
    let title = 'Welcome to SRK Coaching';

    let icon = <LogIn color={colors.primary} size={42} strokeWidth={2.5} />;

    switch (mode) {
      case 'forgot':
        title = 'Forgot Password';
        icon = (
          <ShieldCheck color={colors.primary} size={42} strokeWidth={2.5} />
        );
        break;
      case 'verify':
        title = 'Verify Code';

        icon = <KeyRound color={colors.primary} size={42} strokeWidth={2.5} />;
        break;
      case 'reset':
        title = 'Create New Password';

        icon = (
          <CheckCircle2 color={colors.primary} size={42} strokeWidth={2.5} />
        );
        break;
    }

    return (
      <View style={styles.header}>
        <View style={styles.brandBadge}>
          <Sparkles size={14} color={colors.primary} />
          <Text style={styles.badgeText}>ELITE EDUCATION</Text>
        </View>

        <View style={styles.logoContainer}>{icon}</View>

        <Text style={[typography.h1, styles.title]}>{title}</Text>
      </View>
    );
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="e.g. admin@srkcoaching.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Mail color={colors.textLight} size={20} strokeWidth={2} />}
            />
            <Input
              label="Password"
              placeholder="Enter your security code"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon={<Lock color={colors.textLight} size={20} strokeWidth={2} />}
            />
            <TouchableOpacity
              onPress={() => changeMode('forgot')}
              style={styles.forgotBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        );
      case 'forgot':
        return (
          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="Enter your registered email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Mail color={colors.textLight} size={20} strokeWidth={2} />}
            />
          </View>
        );
      case 'verify':
        return (
          <View style={styles.form}>
            <Input
              label="Verification Code"
              placeholder="6-digit OTP code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              icon={
                <KeyRound color={colors.textLight} size={20} strokeWidth={2} />
              }
            />
            <TouchableOpacity
              style={styles.forgotBtn}
              activeOpacity={0.7}
              onPress={handleSendLink}
            >
              <Text style={styles.forgotText}>Resend Code?</Text>
            </TouchableOpacity>
          </View>
        );
      case 'reset':
        return (
          <View style={styles.form}>
            <Input
              label="New Password"
              placeholder="At least 6 characters"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              icon={<Lock color={colors.textLight} size={20} strokeWidth={2} />}
            />
            <Input
              label="Confirm New Password"
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon={<Lock color={colors.textLight} size={20} strokeWidth={2} />}
            />
          </View>
        );
    }
  };

  const renderAction = () => {
    let title = 'Log In Now';
    let action = onLogin;

    if (mode === 'forgot') {
      title = 'Send Verification Code';
      action = handleSendLink;
    } else if (mode === 'verify') {
      title = 'Verify & Proceed';
      action = handleVerify;
    } else if (mode === 'reset') {
      title = 'Reset Password';
      action = handleResetPassword;
    }

    return <Button title={title} onPress={action} style={styles.loginButton} />;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={[styles.backIconCircle, mode === 'login' && { opacity: 0 }]}
            onPress={() =>
              changeMode(
                mode === 'verify'
                  ? 'forgot'
                  : mode === 'reset'
                  ? 'verify'
                  : 'login',
              )
            }
            disabled={mode === 'login'}
          >
            <ChevronLeft size={24} color={colors.text} strokeWidth={2.5} />
          </TouchableOpacity>

          {renderHeader()}
          {renderForm()}
          {renderAction()}

          <TouchableOpacity
            onPress={() => changeMode(mode === 'login' ? 'forgot' : 'login')}
            style={styles.backLink}
          >
            <Text style={styles.backText}>
              {mode === 'login'
                ? "Don't have an account? Contact Support"
                : 'Back to Login Screen'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  backIconCircle: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  logoContainer: {
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.l,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  title: {
    marginBottom: spacing.xs,
    textAlign: 'center',
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: spacing.l,
    lineHeight: 22,
    fontSize: 14,
  },
  form: {
    marginBottom: spacing.xl,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -8,
    paddingVertical: 8,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  loginButton: {
    marginTop: spacing.s,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  backLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
  },
});
