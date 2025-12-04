import React from 'react';
import { View, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
  },
});

