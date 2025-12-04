import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PokemonQueryDto {
  @ApiProperty({
    description: 'Number of Pokemons per page (default: 20)',
    example: 20,
    minimum: 1,
    required: false,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be greater than or equal to 1' })
  limit?: number = 20;

  @ApiProperty({
    description: 'List offset for pagination (default: 0)',
    example: 0,
    minimum: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Offset must be an integer' })
  @Min(0, { message: 'Offset must be greater than or equal to 0' })
  offset?: number = 0;

  @ApiProperty({
    description: 'String to filter Pokemon by name (optional)',
    example: 'pikachu',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'NameFilter must be a string' })
  nameFilter?: string;
}

