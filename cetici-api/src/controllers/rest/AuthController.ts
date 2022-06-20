// import { Authenticate } from "@tsed/passport";
import { BodyParams } from "@tsed/platform-params";
import { Post } from "@tsed/schema";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { UserService } from "../../services/UserService";
import JwtService from "../../services/JwtService";
import RegisterUserDto from "../../dtos/RegisterUserDto";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthController {
  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  @Post("/login")
  // @Authenticate("login")
  async login(@BodyParams("email") email: string, @BodyParams("password") password: string) {
    const user = await this.userService.findByEmailAndPassword(email, password);
    if (user) {
      const token = this.jwtService.createToken(user);
      return token;
    }

    // TODO : throw error if wrong
  }

  @Post("/register")
  async register(@BodyParams("data") data: RegisterUserDto) {
    try {
      await this.userService.create(data);
    } catch (e) {
      console.log(e);
    }
  }
}
