import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { globalValidationPipeConfig } from "./core/config/app.config";

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(globalValidationPipeConfig));

  await app.listen(PORT);
}

bootstrap();
