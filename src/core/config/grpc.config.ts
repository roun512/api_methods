import { ClientOptions, GrpcOptions, Transport } from "@nestjs/microservices";
import { addReflectionToGrpcConfig } from "nestjs-grpc-reflection";
import { join } from "path";

const protoPackages = ["users"];

export let grpcClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: protoPackages,
    protoPath: protoPackages.map((p) =>
      join(__dirname, `../../api/${p}/${p}.proto`),
    ),
    url: `localhost:${process.env.GRPC_PORT || 8081}`,
  },
} satisfies ClientOptions & GrpcOptions;

if (process.env.NODE_ENV !== "production") {
  grpcClientOptions = addReflectionToGrpcConfig(
    grpcClientOptions,
  ) as typeof grpcClientOptions;
}
