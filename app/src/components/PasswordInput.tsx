import React, { useState } from 'react';
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
      className="mb-4 bg-background"
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

