import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'scores',
        protoPath: join(__dirname, 'scores/scores.proto'),
        url: 'localhost:50201',
      },
    },
  );

  return app.listen();
}
bootstrap();
