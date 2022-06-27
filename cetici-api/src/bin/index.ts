#!/usr/bin/env node
import { CliCore } from "@tsed/cli-core";
import { config } from "../config";
import { HelloCommand } from "./HelloCommand";
import { SwaggerCommand } from "./SwaggerCommand";

CliCore.bootstrap({
  ...config,
  commands: [HelloCommand, SwaggerCommand]
}).catch(console.error);
