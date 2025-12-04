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
    summary: 'List pokemons',
    description:
      'Returns a paginated list of pokemons. Can be filtered by name. Abilities are returned in alphabetical order.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pokemon list returned successfully',
    type: [PokemonDetailDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
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

