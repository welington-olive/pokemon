export const queryKeys = {
  pokemons: {
    all: ['pokemons'] as const,
    lists: () => [...queryKeys.pokemons.all, 'list'] as const,
    list: (filters: { limit?: number; offset?: number; nameFilter?: string }) =>
      [...queryKeys.pokemons.lists(), filters] as const,
    infinite: (filters: { limit?: number; nameFilter?: string }) =>
      [...queryKeys.pokemons.all, 'infinite', filters] as const,
  },
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },
} as const;

