import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { PlacesModule } from './config/places/places.module';

@Module({
  imports: [ProductsModule, PlacesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
