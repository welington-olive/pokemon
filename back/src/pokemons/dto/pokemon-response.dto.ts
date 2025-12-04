import { ApiProperty } from '@nestjs/swagger';

export class PokemonDetailDto {
  @ApiProperty({ description: 'ID do pokemon', example: 25 })
  id: number;

  @ApiProperty({ description: 'Nome do pokemon', example: 'pikachu' })
  name: string;

  @ApiProperty({
    description: 'Lista de tipos do pokemon',
    example: ['electric'],
    type: [String],
  })
  types: string[];

  @ApiProperty({
    description: 'URL da imagem do pokemon',
    example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  })
  image: string;

  @ApiProperty({
    description: 'Lista de habilidades do pokemon (ordenadas alfabeticamente)',
    example: ['lightning-rod', 'static'],
    type: [String],
  })
  abilities: string[];
}

