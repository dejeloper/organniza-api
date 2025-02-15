import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {CreatePlaceDto} from './dto/create-place.dto';
import {UpdatePlaceDto} from './dto/update-place.dto';
import {PrismaService} from '@/prisma/prisma.service';
import {Place} from '@/prisma';

@Injectable()
export class PlacesService {
  constructor(private prismaService: PrismaService) { }

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    try {
      return await this.prismaService.place.create({data: createPlaceDto});
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el lugar: ${error.message}`);
    }
  }

  async findAll(): Promise<Place[]> {
    try {
      return await this.prismaService.place.findMany({
        where: {enabled: true},
        orderBy: {id: 'asc'},
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los lugares: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Place> {
    try {
      const place = await this.prismaService.place.findFirst({
        where: {id, enabled: true},
      });
      if (!place) {
        throw new NotFoundException(`No se encontró lugar con id ${id}`);
      }
      return place;
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el lugar: ${error.message}`);
    }
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    try {
      return await this.prismaService.place.update({where: {id}, data: updatePlaceDto});
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el lugar: ${error.message}`);
    }
  }

  async remove(id: number): Promise<Place> {
    try {
      const place = await this.prismaService.place.update({
        where: {id},
        data: {enabled: false},
      });
      return place;
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el lugar: ${error.message}`);
    }
  }
}
