import { MikroORMOptions } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const MikroOrmConfig: Partial<MikroORMOptions<PostgreSqlDriver>> = {
  contextName: "default",
  type: "postgresql",
  dbName: "db2", // TODO make dynamic
  entities: [`./src/entities/*{.ts,.js}`],
  entitiesTs: [`./src/entities/*{.ts,.js}`],
  port: 5467,
  password: "postgres",
  user: "postgres",
  allowGlobalContext: true,
  metadataProvider: TsMorphMetadataProvider
};

export default MikroOrmConfig;
