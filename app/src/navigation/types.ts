import { Pokemon } from '../types';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  PokemonList: undefined;
  PokemonDetail: { pokemon: Pokemon };
};

