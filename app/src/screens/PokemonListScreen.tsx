import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type PokemonListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonList'>;
import { pokemonService } from '../services/pokemonService';
import { Pokemon } from '../types';
import { colors } from '../theme/colors';
import { textStyles } from '../theme/text';
import { Header, Toast } from '../components';
import { useAuthContext } from '../contexts/AuthContext';

export const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<PokemonListScreenNavigationProp>();
  const { logout } = useAuthContext();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadPokemons();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const data = await pokemonService.getAll(20, 0, searchQuery || undefined);
      setPokemons(data);
    } catch (error: any) {
      setToastMessage(error.message || 'Erro ao carregar pokemons');
      setToastVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePokemonPress = (pokemon: Pokemon) => {
    navigation.navigate('PokemonDetail', { pokemon });
  };

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity
      style={styles.pokemonCard}
      onPress={() => handlePokemonPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.pokemonImage} />
      <View style={styles.pokemonInfo}>
        <Text style={[textStyles.h3, styles.pokemonName]}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <View style={styles.typesContainer}>
          {item.types.map((type, index) => (
            <View key={index} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Pokémons"
        rightAction={
          <Text
            style={[textStyles.link, { color: colors.background }]}
            onPress={logout}
          >
            Sair
          </Text>
        }
      />
      <View style={styles.content}>
        <Searchbar
          placeholder="Buscar pokémon..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        {loading && pokemons.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={pokemons}
            renderItem={renderPokemon}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onDismiss={() => setToastVisible(false)}
        type="error"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  pokemonCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  pokemonInfo: {
    alignItems: 'center',
    width: '100%',
  },
  pokemonName: {
    marginBottom: 8,
    textAlign: 'center',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  typeBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 2,
  },
  typeText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

