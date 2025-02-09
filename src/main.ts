import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import express, {Express} from 'express'; // ✅ Importación correcta

const server: Express = express(); // ✅ Definir correctamente el servidor Express

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  app.setGlobalPrefix('api');

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Organniza API')
    .setDescription('API para el proyecto Organniza')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();

  if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    await app.listen(PORT);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/api`);
  }
}

if (!process.env.VERCEL) {
  bootstrap(); // Solo ejecuta en local
}

export default server; // ✅ Exportar correctamente para Vercel
