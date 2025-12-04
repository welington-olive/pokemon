import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator, Text, Keyboard } from 'react-native';
import { Searchbar, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type PokemonListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonList'>;
import { pokemonService } from '../services/pokemonService';
import { Pokemon } from '../types';
import { Header, Toast } from '../components';
import { useAuthContext } from '../contexts/AuthContext';
import { colors } from '../theme/colors';

const LIMIT = 20;

export const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<PokemonListScreenNavigationProp>();
  const { logout } = useAuthContext();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    resetAndLoad();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndLoad();
      Keyboard.dismiss();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const resetAndLoad = async () => {
    setOffset(0);
    setHasMore(true);
    setPokemons([]);
    await loadPokemons(0, true);
  };

  const loadPokemons = async (currentOffset: number = offset, isInitialLoad: boolean = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const data = await pokemonService.getAll(LIMIT, currentOffset, searchQuery || undefined);
      
      if (isInitialLoad) {
        setPokemons(data);
      } else {
        setPokemons(prev => [...prev, ...data]);
      }
      
      // Update offset for next load
      const nextOffset = currentOffset + data.length;
      setOffset(nextOffset);
      
      // If we got fewer items than requested, we've reached the end
      if (data.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error: any) {
      setToastMessage(error.message || 'Erro ao carregar pokemons');
      setToastVisible(true);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !loading && !searchQuery) {
      loadPokemons(offset, false);
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
        className="w-[100px] h-[100px] mb-2"
      />
      <View className="items-center w-full">
        <Text className="text-lg font-semibold mb-2 text-center text-gray-900">
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <View className="flex-row flex-wrap justify-center">
          {item.types.map((type, index) => (
            <View key={index} className="bg-primary px-2 py-1 rounded-xl m-0.5">
              <Text className="text-background text-xs font-medium">{type}</Text>
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
          <Appbar.Action
            icon="power"
            onPress={logout}
            color={colors.background}
          />
        }
      />
      <View className="flex-1 p-4">
        <View className="mb-4">
          <Searchbar
            placeholder="Buscar pokémon..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ backgroundColor: colors.surface }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              resetAndLoad();
            }}
          />
        </View>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={pokemons}
            renderItem={renderPokemon}
            keyExtractor={(item) => item.id.toString()}
            className="pb-4"
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              hasMore && !searchQuery ? (
                <View className="py-4 items-center">
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              ) : null
            }
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

