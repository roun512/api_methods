/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface Empty {}

export interface Id {
  id: number;
}

export interface User {
  id: number;
  name: string;
  age: number;
  isSubscribed: boolean;
}

export interface CreateUser {
  name: string;
  age: number;
  isSubscribed: boolean;
}

export interface UpdateUser {
  id: number;
  name?: string | undefined;
  age?: number | undefined;
  isSubscribed?: boolean | undefined;
}

export interface ManyUsers {
  users: User[];
}

export const USERS_PACKAGE_NAME = "users";

export interface UsersServiceClient {
  create(request: CreateUser, metadata?: Metadata): Observable<User>;

  update(request: UpdateUser, metadata?: Metadata): Observable<User>;

  findOne(request: Id, metadata?: Metadata): Observable<User>;

  findMany(request: Empty, metadata?: Metadata): Observable<ManyUsers>;
}

export interface UsersServiceController {
  create(
    request: CreateUser,
    metadata?: Metadata,
  ): Promise<User> | Observable<User> | User;

  update(
    request: UpdateUser,
    metadata?: Metadata,
  ): Promise<User> | Observable<User> | User;

  findOne(
    request: Id,
    metadata?: Metadata,
  ): Promise<User> | Observable<User> | User;

  findMany(
    request: Empty,
    metadata?: Metadata,
  ): Promise<ManyUsers> | Observable<ManyUsers> | ManyUsers;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "update", "findOne", "findMany"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod("UsersService", method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod("UsersService", method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
