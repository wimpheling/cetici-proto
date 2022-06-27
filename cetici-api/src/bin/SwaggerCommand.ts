import { Command, CommandProvider } from "@tsed/cli-core";
import { PlatformExpress } from "@tsed/platform-express";
import { SwaggerService } from "@tsed/swagger";
import { Server } from "../Server";
import fs from "fs";
import path from "path";

const outFile = path.resolve(__dirname, "../../spec/swagger.json");

@Command({
  name: "generate-swagger",
  description: "Generate swagger",
  args: {},
  options: {},
  allowUnknownOption: false
})
export class SwaggerCommand implements CommandProvider {
  async generateSpec() {
    const platform = await PlatformExpress.bootstrap(Server);
    const swaggerService = await platform.injector.get<SwaggerService>(SwaggerService);
    if (!swaggerService) {
      console.log("Swagger Service not found");
      return;
    }
    console.log({ outFile });
    const spec = await swaggerService.getOpenAPISpec(platform.settings.get("swagger")[0]);
    const jsonSpec = JSON.stringify(spec, null, 2);
    fs.writeFileSync(outFile, jsonSpec, { encoding: "utf-8" });
    console.log(`File generated at ${outFile}`);
    process.exit();
  }

  /**
   *  This step run your tasks with Listr module
   */
  async $exec(): Promise<any> {
    return [
      {
        title: "Generating spec",
        task: () => {
          return this.generateSpec();
        }
      }
    ];
  }
}
