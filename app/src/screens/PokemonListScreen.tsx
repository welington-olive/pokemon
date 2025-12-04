import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator, Text, Keyboard } from 'react-native';
import { Searchbar, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type PokemonListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonList'>;
import { Pokemon } from '../types';
import { Header, Toast } from '../components';
import { useAuthContext } from '../contexts/AuthContext';
import { colors } from '../theme/colors';
import { usePokemons } from '../hooks/queries/usePokemons';
import { useDebounce } from '../hooks/useDebounce';

export const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<PokemonListScreenNavigationProp>();
  const { logout } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePokemons(
    {
      nameFilter: debouncedSearchQuery || undefined,
      enabled: true,
    }
  );

  const pokemons: Pokemon[] = useMemo(() => {
    return (data?.pages.flat() ?? []) as Pokemon[];
  }, [data]);

  useEffect(() => {
    if (error) {
      setToastMessage((error as Error).message || 'Erro ao carregar pokemons');
      setToastVisible(true);
    }
  }, [error]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !debouncedSearchQuery) {
      fetchNextPage();
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
            }}
          />
        </View>
        {isLoading ? (
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
              hasNextPage && !debouncedSearchQuery ? (
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

