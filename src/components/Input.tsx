import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={[typography.bodySmall, styles.label]}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.textLight}
        {...props}
      />
      {error && <Text style={[typography.caption, styles.errorText]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
  },
  label: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.m,
    height: 52,
    paddingHorizontal: spacing.m,
    color: colors.text,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.warning,
  },
  errorText: {
    color: colors.warning,
    marginTop: spacing.xs,
  },
});
