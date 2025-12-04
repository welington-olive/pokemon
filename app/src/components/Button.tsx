import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { colors } from '../theme/colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  mode?: 'contained' | 'outlined' | 'text';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  mode = 'contained',
}) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      style={styles.button}
      buttonColor={mode === 'contained' ? colors.primary : undefined}
      textColor={mode === 'contained' ? colors.background : colors.primary}
    >
      {label}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
});

