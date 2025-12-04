import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { pokemonService } from '../../services/pokemonService';
import { Pokemon } from '../../types';
import { queryKeys } from '../../lib/react-query/queryKeys';

const LIMIT = 20;

interface UsePokemonsParams {
  nameFilter?: string;
  enabled?: boolean;
}

interface UsePokemonsOptions extends Omit<UseInfiniteQueryOptions<Pokemon[], Error>, 'queryKey' | 'queryFn'> {}

export const usePokemons = (
  params: UsePokemonsParams = {},
  options?: UsePokemonsOptions
) => {
  const { nameFilter, enabled = true } = params;

  return useInfiniteQuery<Pokemon[], Error>({
    queryKey: queryKeys.pokemons.infinite({ limit: LIMIT, nameFilter }),
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const offset = pageParam as number;
        return await pokemonService.getAll(LIMIT, offset, nameFilter);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Error loading pokemons';
        throw new Error(errorMessage);
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT) {
        return undefined;
      }
      return allPages.length * LIMIT;
    },
    initialPageParam: 0,
    enabled,
    ...options,
  });
};

