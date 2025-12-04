import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PokemonQueryDto {
  @ApiProperty({
    description: 'Número de Pokémon por página (padrão: 20)',
    example: 20,
    minimum: 1,
    required: false,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit deve ser um número inteiro' })
  @Min(1, { message: 'Limit deve ser maior ou igual a 1' })
  limit?: number = 20;

  @ApiProperty({
    description: 'Ponto de início da lista para paginação (padrão: 0)',
    example: 0,
    minimum: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Offset deve ser um número inteiro' })
  @Min(0, { message: 'Offset deve ser maior ou igual a 0' })
  offset?: number = 0;

  @ApiProperty({
    description: 'String para filtrar Pokémon por nome (opcional)',
    example: 'pikachu',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'NameFilter deve ser uma string' })
  nameFilter?: string;
}

