import { ValidationPipeOptions } from "@nestjs/common";

export const globalValidationPipeConfig = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  transform: true,
} satisfies ValidationPipeOptions;
