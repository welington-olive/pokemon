import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
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
      style={styles.input}
      outlineColor={colors.border}
      activeOutlineColor={colors.primary}
      textColor={colors.text.primary}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: colors.background,
  },
});

