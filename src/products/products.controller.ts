import {Response} from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  private handleServiceResponse(res: Response, result: any, successMessage: string) {
    if (typeof result === 'object' && 'message' in result) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: result.message || 'Error en la operación',
        response: null,
      });
    }

    return res.status(HttpStatus.OK).json({
      status: true,
      message: successMessage,
      response: result,
    });
  }

  private handleErrorResponse(res: Response, error: any, action: string) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: `Error al ${action}: ${error.message}`,
      response: null,
    });
  }

  @Post()
  @ApiOperation({summary: 'Crear producto'})
  @ApiResponse({status: 201, description: 'Producto creado correctamente'})
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    try {
      const product = await this.productsService.create(createProductDto);
      return this.handleServiceResponse(res, product, 'Producto creado correctamente');
    } catch (error) {
      return this.handleErrorResponse(res, error, 'crear el producto');
    }
  }

  @Get()
  @ApiOperation({summary: 'Listar productos'})
  @ApiResponse({status: 200, description: 'Productos obtenidos correctamente'})
  async findAll(@Res() res: Response) {
    try {
      const productos = await this.productsService.findAll();

      if (Array.isArray(productos) && productos.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontraron productos',
          response: null,
        });
      }

      return this.handleServiceResponse(res, productos, 'Productos obtenidos correctamente');
    } catch (error) {
      return this.handleErrorResponse(res, error, 'obtener los productos');
    }
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener producto'})
  @ApiResponse({status: 200, description: 'Producto obtenido correctamente'})
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const producto = await this.productsService.findOne(+id);

      if (!producto) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró el producto',
          response: null,
        });
      }

      return this.handleServiceResponse(res, producto, 'Producto obtenido correctamente');
    } catch (error) {
      return this.handleErrorResponse(res, error, 'obtener el producto');
    }
  }

  @Patch(':id')
  @ApiOperation({summary: 'Actualizar producto'})
  @ApiResponse({status: 200, description: 'Producto actualizado correctamente'})
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    try {
      const product = await this.productsService.update(+id, updateProductDto);

      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró el producto',
          response: null,
        });
      }

      return this.handleServiceResponse(res, product, 'Producto actualizado correctamente');
    } catch (error) {
      return this.handleErrorResponse(res, error, 'actualizar el producto');
    }
  }

  @Delete(':id')
  @ApiOperation({summary: 'Eliminar producto'})
  @ApiResponse({status: 200, description: 'Producto eliminado correctamente'})
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productsService.remove(+id);

      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró el producto',
          response: null,
        });
      }

      return this.handleServiceResponse(res, product, 'Producto eliminado correctamente');
    } catch (error) {
      return this.handleErrorResponse(res, error, 'eliminar el producto');
    }
  }
}
