import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({summary: 'Crear producto'})
  @ApiResponse({status: 201, description: 'Producto creado correctamente'})
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productsService.create(createProductDto);
      return {
        status: true,
        message: 'Producto creado correctamente',
        response: product,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el producto: ${error.message}`);
    }
  }

  @Get()
  @ApiOperation({summary: 'Listar productos'})
  @ApiResponse({status: 200, description: 'Productos obtenidos correctamente'})
  async findAll() {
    try {
      const productos = await this.productsService.findAll();
      if (!productos.length) {
        throw new NotFoundException('No se encontraron productos');
      }
      return {
        status: true,
        message: 'Productos obtenidos correctamente',
        response: productos,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los productos: ${error.message}`);
    }
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener producto'})
  @ApiResponse({status: 200, description: 'Producto obtenido correctamente'})
  async findOne(@Param('id') id: string) {
    const producto = await this.productsService.findOne(+id);
    if (!producto) {
      throw new NotFoundException(`No se encontró producto con id ${id}`);
    }
    return {
      status: true,
      message: 'Producto obtenido correctamente',
      response: producto,
    };
  }

  @Patch(':id')
  @ApiOperation({summary: 'Actualizar producto'})
  @ApiResponse({status: 200, description: 'Producto actualizado correctamente'})
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productsService.update(+id, updateProductDto);
      return {
        status: true,
        message: 'Producto actualizado correctamente',
        response: product,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el producto: ${error.message}`);
    }
  }

  @Delete(':id')
  @ApiOperation({summary: 'Eliminar producto'})
  @ApiResponse({status: 200, description: 'Producto eliminado correctamente'})
  async remove(@Param('id') id: string) {
    try {
      const product = await this.productsService.remove(+id);
      return {
        status: true,
        message: 'Producto eliminado correctamente',
        response: product,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el producto: ${error.message}`);
    }
  }
}
