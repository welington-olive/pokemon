import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../theme/colors';

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  error,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      secureTextEntry={secureTextEntry}
      error={!!error}
      style={styles.input}
      outlineColor={colors.border}
      activeOutlineColor={colors.primary}
      textColor={colors.text.primary}
      right={
        <TextInput.Icon
          icon={secureTextEntry ? 'eye' : 'eye-off'}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: colors.background,
  },
});

