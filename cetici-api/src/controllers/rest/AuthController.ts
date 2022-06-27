// import { Authenticate } from "@tsed/passport";
import { BodyParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { UserService } from "../../services/UserService";
import JwtService from "../../services/JwtService";
import RegisterUserDto from "../../dtos/RegisterUserDto";
import { Req } from "@tsed/common";
import { User } from "../../entities/User";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthController {
  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  @Post("/login")
  async login(@BodyParams("email") email: string, @BodyParams("password") password: string) {
    const user = await this.userService.findByEmailAndPassword(email, password);
    if (user) {
      const token = this.jwtService.createToken(user);
      return token;
    }

    // TODO : throw error if wrong
  }

  @Post("/register")
  async register(@BodyParams() data: RegisterUserDto) {
    await this.userService.create(data);
  }

  @Get("/whoami")
  async whoami(@Req("user") user?: User) {
    return user;
  }
}
