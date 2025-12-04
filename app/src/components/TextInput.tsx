import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { colors } from '../theme/colors';

interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'off' | 'email' | 'password';
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete = 'off',
}) => {
  return (
    <PaperTextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      error={!!error}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      className="mb-4 bg-background"
      outlineColor={colors.border}
      activeOutlineColor={colors.primary}
      textColor={colors.text.primary}
    />
  );
};

