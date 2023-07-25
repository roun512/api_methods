import { Module } from "@nestjs/common";
import { PrismaModule } from "./api/prisma/prisma.module";
import { AppController } from "./app.controller";
import { UserModule } from "./api/users/users.module";
import { grpcClientOptions } from "./core/config/grpc.config";
import { GrpcReflectionModule } from "nestjs-grpc-reflection";

@Module({
  imports: [
    PrismaModule,
    GrpcReflectionModule.register(grpcClientOptions),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
