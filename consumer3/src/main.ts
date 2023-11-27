import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { PartitionAssigners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `test-kafka`,
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: `test-group`,
        partitionAssigners: [PartitionAssigners.roundRobin]
      },
      subscribe: {
        fromBeginning: false
      },
    },
  }, {
    inheritAppConfig: true
  });

  await app.startAllMicroservices();
  await app.listen(3003);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
