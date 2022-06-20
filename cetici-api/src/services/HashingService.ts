import { Injectable } from "@tsed/di";
import * as bcrypt from "bcrypt";

@Injectable()
class HashingService {
  encrypt(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  genSalt() {
    return bcrypt.genSalt(10);
  }
}

export default HashingService;
