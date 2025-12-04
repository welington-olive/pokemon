import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { textStyles } from '../theme/text';
import { colors } from '../theme/colors';

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[textStyles.h1, { color: colors.primary }]}>
        Pokémon
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
});

