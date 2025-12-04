import React from 'react';
import { View, ScrollView, Image } from 'react-native';
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
    <View className="flex-1 bg-background">
      <Header title="Details" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
        <View className="mb-6">
          <Image source={{ uri: pokemon.image }} className="w-[200px] h-[200px]" />
        </View>
        <Text style={[textStyles.h1, { marginBottom: 32, textAlign: 'center' }]}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <View className="w-full mb-6">
          <Text style={[textStyles.h3, { marginBottom: 16 }]}>Types</Text>
          <View className="flex-row flex-wrap">
            {pokemon.types.map((type, index) => (
              <View key={index} className="bg-primary px-4 py-2 rounded-2xl mr-2 mb-2">
                <Text className="text-background text-sm font-semibold">{type}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="w-full mb-6">
          <Text style={[textStyles.h3, { marginBottom: 16 }]}>Abilities</Text>
          {pokemon.abilities.map((ability, index) => (
            <View key={index} className="bg-surface p-3 rounded-lg mb-2 border border-border">
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

