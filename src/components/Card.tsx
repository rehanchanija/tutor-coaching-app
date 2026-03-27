import React from 'react';
import { View, StyleSheet, ViewProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { colors, radius, spacing } from '../theme/Theme';

interface CardProps extends ViewProps {
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, ...props }) => {
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.card, style]} onPress={onPress}>
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
    borderRadius: radius.l,
    padding: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
});
