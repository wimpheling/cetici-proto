import { Controller } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { Get } from "@tsed/schema";

@Controller("/hello-world")
export class HelloWorldController {
  @Get("/")
  @Authorize("jwt")
  get() {
    return "hello";
  }
}
