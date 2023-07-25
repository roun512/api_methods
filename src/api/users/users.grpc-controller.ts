import { Controller } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  Id,
  UpdateUser,
  UsersServiceController,
  UsersServiceControllerMethods,
} from "./entities/user.grpc-entities";
import { UsersService } from "./users.service";
import { Metadata } from "@grpc/grpc-js";

// protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --experimental_allow_proto3_optional  --ts_proto_out=. --ts_proto_opt=nestJs=true --ts_proto_opt=addGrpcMetadata=true  ./src/api/users/user.proto

@Controller("users")
@UsersServiceControllerMethods()
export class UsersGrpcController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  create(data: CreateUserDto) {
    return this.usersService.create(data);
  }

  async findMany() {
    const users = await this.usersService.findAll();
    return { users };
  }

  findOne(data: Id) {
    return this.usersService.findOne(data.id);
  }

  update(req: UpdateUser) {
    const { id, ...data } = req;
    return this.usersService.update(id, data);
  }
}
