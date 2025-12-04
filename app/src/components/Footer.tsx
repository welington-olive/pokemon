import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import { textStyles } from '../theme/text';

interface FooterProps {
  text: string;
  linkText: string;
  onLinkPress: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  text,
  linkText,
  onLinkPress,
}) => {
  return (
    <View className="mt-6 items-center">
      <Text style={[textStyles.bodySmall, { color: colors.text.secondary }]}>
        {text}{' '}
        <Text
          style={[textStyles.link, { color: colors.primary }]}
          onPress={onLinkPress}
        >
          {linkText}
        </Text>
      </Text>
    </View>
  );
};

