import React from 'react';
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
      className="mt-2 mb-4"
      buttonColor={mode === 'contained' ? colors.primary : undefined}
      textColor={mode === 'contained' ? colors.background : colors.primary}
    >
      {label}
    </PaperButton>
  );
};

