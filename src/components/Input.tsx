import React, { ReactNode } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={[typography.bodySmall, styles.label]}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError, style]}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          placeholderTextColor={colors.textLight}
          {...props}
        />
      </View>
      {error && <Text style={[typography.caption, styles.errorText]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.l,
  },
  label: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.m,
    height: 54,
  },
  iconWrapper: {
    paddingLeft: spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing.m,
    color: colors.text,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: spacing.s,
  },
  inputError: {
    borderColor: colors.warning,
  },
  errorText: {
    color: colors.warning,
    marginTop: spacing.xs,
  },
});
