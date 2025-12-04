import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokemonQueryDto } from './dto/pokemon-query.dto';
import { PokemonDetailDto } from './dto/pokemon-response.dto';

@Injectable()
export class PokemonsService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private readonly httpService: HttpService) {}

  async findAll(
    limit: number = 20,
    offset: number = 0,
    nameFilter?: string,
  ): Promise<PokemonDetailDto[]> {
    try {
      if (nameFilter) {
        return await this.findByNameFilter(nameFilter);
      }

      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon`, {
          params: {
            limit,
            offset,
          },
        }),
      );

      const { results } = response.data;

      const pokemonPromises = results.map((pokemon: any) =>
        this.getPokemonDetails(pokemon.url),
      );

      const pokemons = await Promise.all(pokemonPromises);

      return pokemons;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Pokemon not found');
      }
      throw new HttpException(
        'Error fetching pokemons from API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async findByNameFilter(
    nameFilter: string,
  ): Promise<PokemonDetailDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/pokemon/${nameFilter.toLowerCase()}`,
        ),
      );

      const pokemon = await this.mapPokemonData(response.data);
      return [pokemon];
    } catch (error) {
      if (error.response?.status === 404) {
        return [];
      }
      throw new HttpException(
        'Error fetching pokemon',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getPokemonDetails(url: string): Promise<PokemonDetailDto> {
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return this.mapPokemonData(response.data);
    } catch (error) {
      throw new HttpException(
        'Error fetching pokemon details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private mapPokemonData(data: any): PokemonDetailDto {
    const types: string[] = data.types.map(
      (type: any) => type.type.name,
    );

    const abilities: string[] = data.abilities
      .map((ability: any) => ability.ability.name)
      .sort((a: string, b: string) => a.localeCompare(b));

    return {
      id: data.id,
      name: data.name,
      types,
      image: data.sprites.front_default || '',
      abilities,
    };
  }
}
