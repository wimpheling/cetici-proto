// import { Authenticate } from "@tsed/passport";
import { BodyParams } from "@tsed/platform-params";
import { Get, Post, Property, Returns } from "@tsed/schema";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { UserService } from "../../services/UserService";
import JwtService from "../../services/JwtService";
import RegisterUserDto from "../../dtos/RegisterUserDto";
import { Req } from "@tsed/common";
import { User } from "../../entities/User";
import { BadRequest } from "@tsed/exceptions";

class Token {
  @Property() token: string;
}

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthController {
  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  @Post("/login")
  @Returns(200, Token)
  async login(@BodyParams("email") email: string, @BodyParams("password") password: string): Promise<Token> {
    const user = await this.userService.findByEmailAndPassword(email, password);
    if (user) {
      const token = this.jwtService.createToken(user);
      return { token };
    }
    throw new BadRequest("Invalid credentials");
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
