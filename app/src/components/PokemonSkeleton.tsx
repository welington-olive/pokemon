import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const PokemonSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textPlaceholder} />
      <View style={styles.badgesContainer}>
        <View style={styles.badgePlaceholder} />
        <View style={styles.badgePlaceholder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    // Approximate height of the real card
    height: 180, 
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#E1E9EE',
    borderRadius: 8,
    marginBottom: 8,
  },
  textPlaceholder: {
    width: '80%',
    height: 20,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    marginBottom: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  badgePlaceholder: {
    width: 40,
    height: 20,
    backgroundColor: '#E1E9EE',
    borderRadius: 12,
  },
});

