import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const BASE_URL_POKE_API = process.env.EXPO_PUBLIC_API_POKE_API_URL || "https://pokeapi.co";

export const api = axios.create({
    baseURL: BASE_URL,
});

export const apiPokeApi = axios.create({
    baseURL: BASE_URL_POKE_API,
});