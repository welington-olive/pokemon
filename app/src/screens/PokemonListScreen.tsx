import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type PokemonListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonList'>;
import { pokemonService } from '../services/pokemonService';
import { Pokemon } from '../types';
import { Header, Toast } from '../components';
import { useAuthContext, useDebounce } from '../hooks';
import { colors } from '../theme/colors';

export const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<PokemonListScreenNavigationProp>();
  const { logout } = useAuthContext();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadPokemons();
  }, [debouncedSearchQuery]);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      // Se houver busca, sempre reseta para página 0 (comportamento comum de busca)
      const data = await pokemonService.getAll(20, 0, debouncedSearchQuery || undefined);
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
      className="flex-1 bg-surface rounded-xl p-3 m-1.5 items-center border border-border"
      onPress={() => handlePokemonPress(item)}
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-24 h-24 mb-2"
        resizeMode="contain"
      />
      <View className="items-center w-full">
        <Text className="mb-2 text-center text-xl font-semibold text-text-primary capitalize">
          {item.name}
        </Text>
        <View className="flex-row flex-wrap justify-center gap-1">
          {item.types.map((type, index) => (
            <View key={index} className="bg-primary px-2 py-1 rounded-xl m-0.5">
              <Text className="text-background text-xs font-medium capitalize">
                {type}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Pokémons"
        rightAction={
          <Text
            className="text-base font-medium text-background"
            onPress={logout}
          >
            Sair
          </Text>
        }
      />
      <View className="flex-1 p-4">
        <Searchbar
          placeholder="Buscar pokémon..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginBottom: 16, backgroundColor: colors.surface }}
        />
        {loading && pokemons.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={pokemons}
            renderItem={renderPokemon}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 16 }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
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
