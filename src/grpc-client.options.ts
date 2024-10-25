import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'scores',
    protoPath: join(__dirname, 'proto/scores.proto'),
    url: 'localhost:50051',
  },
};
