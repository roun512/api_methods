import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { globalValidationPipeConfig } from "./core/config/app.config";
import { grpcClientOptions } from "./core/config/grpc.config";

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(globalValidationPipeConfig));

  app.connectMicroservice(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(PORT);
}

bootstrap();
