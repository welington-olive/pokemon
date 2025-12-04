import { api } from '../config/api';
import { Pokemon } from '../types';

export const pokemonService = {
  getAll: async (limit: number = 20, offset: number = 0, nameFilter?: string) => {
    const params: any = { limit, offset };
    if (nameFilter) {
      params.nameFilter = nameFilter;
    }
    const response = await api.get<Pokemon[]>('/pokemons', { params });
    return response.data;
  },
};

