import React, { useState } from 'react';
import { z } from 'zod';
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
import Toast from 'react-native-toast-message';

const BASE_URL = 'http://127.0.0.1:3000'; // Replace with actual API URL

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const forgotSchema = z.object({
    email: z.string().email('Invalid email address'),
  });

  const verifySchema = z.object({
    code: z.string().length(6, 'Verification code must be 6 digits'),
  });

  const resetSchema = z
    .object({
      newPassword: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z
        .string()
        .min(6, 'Password must be at least 6 characters'),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const changeMode = (newMode: LoginMode) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMode(newMode);
    setErrors({});
  };

  const validate = (mode: LoginMode) => {
    try {
      setErrors({});
      if (mode === 'login') loginSchema.parse({ email, password });
      if (mode === 'forgot') forgotSchema.parse({ email });
      if (mode === 'verify') verifySchema.parse({ code });
      if (mode === 'reset') resetSchema.parse({ newPassword, confirmPassword });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        err.issues.forEach(e => {
          if (e.path[0]) formattedErrors[e.path[0].toString()] = e.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleLogin = async () => {
    if (validate('login')) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Logged in successfully!',
          });
          onLogin();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Error',
            text2: data.message || 'Invalid email or password.',
          });
        }
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Connection Error',
          text2: 'Unable to connect to service. Check your internet.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendLink = async () => {
    if (validate('forgot')) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        
        if (response.ok) {
          changeMode('verify');
          Toast.show({
            type: 'success',
            text1: 'Code Sent',
            text2: 'A verification code has been sent to your email.',
          });
        } else {
          const data = await response.json();
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: data.message || 'Failed to send reset code.',
          });
        }
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Connection Error',
          text2: 'Unable to connect to service.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerify = async () => {
    if (validate('verify')) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/auth/verify-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code }),
        });

        if (response.ok) {
          changeMode('reset');
          Toast.show({
            type: 'success',
            text1: 'Verified',
            text2: 'Enter your new password.',
          });
        } else {
          const data = await response.json();
          Toast.show({
            type: 'error',
            text1: 'Verification Failed',
            text2: data.message || 'Invalid verification code.',
          });
        }
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Connection Error',
          text2: 'Unable to connect to service.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (validate('reset')) {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code, newPassword }),
        });

        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Your password has been reset successfully.',
          });
          changeMode('login');
        } else {
          const data = await response.json();
          Toast.show({
            type: 'error',
            text1: 'Reset Failed',
            text2: data.message || 'Failed to reset password.',
          });
        }
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Connection Error',
          text2: 'Unable to connect to service.',
        });
      } finally {
        setIsLoading(false);
      }
    }
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
              error={errors.email}
              icon={<Mail color={colors.textLight} size={20} strokeWidth={2} />}
            />
            <Input
              label="Password"
              placeholder="Enter your security code"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              icon={<Lock color={colors.textLight} size={20} strokeWidth={2} />}
            />
            {/* <TouchableOpacity
              onPress={() => changeMode('forgot')}
              style={styles.forgotBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity> */}
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
              error={errors.email}
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
              error={errors.code}
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
              error={errors.newPassword}
              icon={<Lock color={colors.textLight} size={20} strokeWidth={2} />}
            />
            <Input
              label="Confirm New Password"
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
              icon={<Lock color={colors.textLight} size={20} strokeWidth={2} />}
            />
          </View>
        );
    }
  };

  const renderAction = () => {
    let title = 'Log In Now';
    let action = handleLogin;

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

    return (
      <Button
        title={title}
        onPress={action}
        style={styles.loginButton}
        loading={isLoading}
      />
    );
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

          {/* <TouchableOpacity
            onPress={() => changeMode(mode === 'login' ? 'forgot' : 'login')}
            style={styles.backLink}
          >
            <Text style={styles.backText}>
              {mode === 'login'
                ? "Don't have an account? Contact Support"
                : 'Back to Login Screen'}
            </Text>
          </TouchableOpacity> */}
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
