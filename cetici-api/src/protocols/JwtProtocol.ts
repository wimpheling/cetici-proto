import { EntityManager } from "@mikro-orm/postgresql";
import { Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Em } from "@tsed/mikro-orm";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/User";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "thisismydevelopmentjwtsecret",
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
  }
})
export class JwtProtocol implements OnVerify {
  @Em()
  private readonly em!: EntityManager;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = await this.em.getRepository(User).findOne({
      id: jwtPayload.sub
    });

    if (!user) {
      throw new Unauthorized("Wrong token");
    }

    // req.user = user;

    return user;
  }
}
