import React from 'react';
import { View, StyleSheet, ViewProps, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../theme/Theme';

interface CardProps extends ViewProps {
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, ...props }) => {
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} style={[styles.card, style]} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.m,
    padding: spacing.m,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: '#F1F5F9', // subtle inner border
  },
});
