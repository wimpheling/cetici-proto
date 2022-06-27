import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/passport";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import { config } from "./config";
import * as rest from "./controllers/rest";
import * as pages from "./controllers/pages";
import { MikroOrmModule } from "@tsed/mikro-orm";
import MikroOrmConfig from "./mikro-orm.config";
import "./protocols";
import { User } from "./entities/User";

@Configuration({
  ...config,
  imports: [MikroOrmModule],
  mikroOrm: [MikroOrmConfig],
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  passport: {
    disableSession: true,
    userInfoModel: User
  },
  mount: {
    "/rest": [...Object.values(rest)],
    "/": [...Object.values(pages)]
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1"
    }
  ],
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    })
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: ["**/*.spec.ts"]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
