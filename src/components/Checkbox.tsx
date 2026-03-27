import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onChange(!checked)}
      activeOpacity={0.7}
    >
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && <View style={styles.innerCheck} />}
      </View>
      {label && <Text style={[typography.body, styles.label, checked && styles.checkedLabel]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.textLight,
    borderRadius: radius.s,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  checkedBox: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  innerCheck: {
    width: 12,
    height: 12,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    transform: [{ rotate: '45deg' }, { translateY: -2 }, { translateX: -1 }],
  },
  label: {
    color: colors.text,
  },
  checkedLabel: {
    color: colors.textLight,
    textDecorationLine: 'line-through',
  },
});
