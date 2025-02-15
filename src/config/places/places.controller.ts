import {Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {PlacesService} from './places.service';
import {CreatePlaceDto} from './dto/create-place.dto';
import {UpdatePlaceDto} from './dto/update-place.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Lugares')
@Controller('config/places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) { }

  @Post()
  @ApiOperation({summary: 'Crear lugar'})
  @ApiResponse({status: 201, description: 'Lugar creado correctamente'})
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      const place = await this.placesService.create(createPlaceDto);
      return {
        status: true,
        message: 'Lugar creado correctamente',
        response: place,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el lugar: ${error.message}`);
    }
  }

  @Get()
  @ApiOperation({summary: 'Listar lugares'})
  @ApiResponse({status: 200, description: 'Lugares obtenidos correctamente'})
  async findAll() {
    try {
      const places = await this.placesService.findAll();
      if (!places.length) {
        throw new NotFoundException('No se encontraron lugares');
      }
      return {
        status: true,
        message: 'Lugares obtenidos correctamente',
        response: places,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los lugares: ${error.message}`);
    }
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener lugar'})
  @ApiResponse({status: 200, description: 'Lugar obtenido correctamente'})
  async findOne(@Param('id') id: string) {
    const place = await this.placesService.findOne(+id);
    if (!place) {
      throw new NotFoundException(`No se encontró lugar con id ${id}`);
    }
    return {
      status: true,
      message: 'Lugar obtenido correctamente',
      response: place,
    };
  }

  @Patch(':id')
  @ApiOperation({summary: 'Actualizar lugar'})
  @ApiResponse({status: 200, description: 'Lugar actualizado correctamente'})
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    try {
      const place = await this.placesService.update(+id, updatePlaceDto);
      return {
        status: true,
        message: 'Lugar actualizado correctamente',
        response: place,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el lugar: ${error.message}`);
    }
  }


  @Delete(':id')
  @ApiOperation({summary: 'Eliminar lugar'})
  @ApiResponse({status: 200, description: 'Lugar eliminado correctamente'})
  async remove(@Param('id') id: string) {
    try {
      const place = await this.placesService.remove(+id);
      return {
        status: true,
        message: 'Lugar eliminado correctamente',
        response: place,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el lugar: ${error.message}`);
    }
  }
}
