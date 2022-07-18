import { MikroORMOptions } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const MikroOrmConfig: Partial<MikroORMOptions<PostgreSqlDriver>> = {
  contextName: "default",
  type: "postgresql",
  dbName: "db", // TODO make dynamic
  entities: [`./src/entities/*{.ts,.js}`],
  entitiesTs: [`./src/entities/*{.ts,.js}`],
  // TODO use env variables
  port: 5467,
  password: "postgres",
  user: "postgres",
  allowGlobalContext: true,
  metadataProvider: TsMorphMetadataProvider
};

export default MikroOrmConfig;
