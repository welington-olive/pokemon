import { apiPokeApi } from "../api";

interface ListPokemonsResponse {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
}

export const listPokemons = async ({ limit, offset }: { limit: number, offset: number }) => {
    const response = await apiPokeApi.get(`/api/v2/pokemon?limit=${limit}&offset=${offset}`);

    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("List pokemons failed");
    }
};