import { Module } from "@nestjs/common";
import { PrismaModule } from "./api/prisma/prisma.module";
import { AppController } from "./app.controller";
import { UserModule } from "./api/users/users.module";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
