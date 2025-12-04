import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type PokemonDetailScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;
type PokemonDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonDetail'>;
import { Pokemon } from '../types';
import { colors } from '../theme/colors';
import { textStyles } from '../theme/text';
import { Header } from '../components';

export const PokemonDetailScreen: React.FC = () => {
  const route = useRoute<PokemonDetailScreenRouteProp>();
  const navigation = useNavigation<PokemonDetailScreenNavigationProp>();
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Header title="Detalhes" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        </View>
        <Text style={[textStyles.h1, styles.name]}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <View style={styles.section}>
          <Text style={[textStyles.h3, styles.sectionTitle]}>Tipos</Text>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type, index) => (
              <View key={index} style={styles.typeBadge}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[textStyles.h3, styles.sectionTitle]}>Habilidades</Text>
          {pokemon.abilities.map((ability, index) => (
            <View key={index} style={styles.abilityItem}>
              <Text style={textStyles.body}>
                {ability.charAt(0).toUpperCase() + ability.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  typeText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
  abilityItem: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

