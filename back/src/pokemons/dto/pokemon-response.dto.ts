import { ApiProperty } from '@nestjs/swagger';

export class PokemonDetailDto {
  @ApiProperty({ description: 'Pokemon ID', example: 25 })
  id: number;

  @ApiProperty({ description: 'Pokemon name', example: 'pikachu' })
  name: string;

  @ApiProperty({
    description: 'List of pokemon types',
    example: ['electric'],
    type: [String],
  })
  types: string[];

  @ApiProperty({
    description: 'Pokemon image URL',
    example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  })
  image: string;

  @ApiProperty({
    description: 'List of pokemon abilities (alphabetically ordered)',
    example: ['lightning-rod', 'static'],
    type: [String],
  })
  abilities: string[];
}

