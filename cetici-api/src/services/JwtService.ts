import { Injectable } from "@tsed/di";
import { sign } from "jsonwebtoken";
import { User } from "../entities/User";

@Injectable()
class JwtService {
  createToken(user: User) {
    return sign(
      {
        iss: process.env.JWT_ISSUER,
        aud: process.env.JWT_AUDIENCE,
        sub: user.id
        // exp: now + maxAge * 1000,
        // iat: now
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h"
      }
    );
  }
}

export default JwtService;
