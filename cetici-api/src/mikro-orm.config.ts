import { MikroORMOptions } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const MikroOrmConfig: Partial<MikroORMOptions<PostgreSqlDriver>> = {
  contextName: "default",
  type: "postgresql",
  dbName: "db", // TODO make dynamic
  entities: [`./dist/entities/*.js`],
  entitiesTs: [`./src/entities/*.ts`],
  // TODO use env variables
  port: 5467,
  password: "postgres",
  user: "postgres",
  allowGlobalContext: true,
  metadataProvider: TsMorphMetadataProvider
};

export default MikroOrmConfig;
