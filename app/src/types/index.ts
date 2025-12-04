export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  abilities: string[];
}

export interface PokemonListResponse {
  data: Pokemon[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

