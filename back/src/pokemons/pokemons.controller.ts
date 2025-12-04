import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PokemonsService } from './pokemons.service';
import { PokemonQueryDto } from './dto/pokemon-query.dto';
import { PokemonDetailDto } from './dto/pokemon-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Pokemons')
@ApiBearerAuth('JWT-auth')
@Controller('pokemons')
@UseGuards(JwtAuthGuard)
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar pokemons',
    description:
      'Retorna uma lista paginada de pokemons. Pode ser filtrada por nome. As habilidades são retornadas em ordem alfabética.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pokemons retornada com sucesso',
    type: [PokemonDetailDto],
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Pokémon não encontrado' })
  async findAll(
    @Query(ValidationPipe) query: PokemonQueryDto,
  ): Promise<PokemonDetailDto[]> {
    return this.pokemonsService.findAll(
      query.limit,
      query.offset,
      query.nameFilter,
    );
  }
}

