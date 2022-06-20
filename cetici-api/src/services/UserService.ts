import { EntityManager, SqlEntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@tsed/di";
import { Em } from "@tsed/mikro-orm";
import { User } from "../entities/User";
import HashingService from "./HashingService";

@Injectable()
export class UserService {
  @Em() em: EntityManager;

  getRepo() {
    return this.em.getRepository(User);
  }

  constructor(private readonly hashingService: HashingService) {}

  async findByEmailAndPassword(email: string, password: string): Promise<User | void> {
    const user = await this.getRepo().findOne({ email });
    if (!user) {
      return;
    }
    const encryptedPassword = await this.hashingService.encrypt(password, user.salt);
    const passwordIsRight = encryptedPassword === user.password;
    if (passwordIsRight) {
      return user;
    }
  }

  async create(data: Pick<User, "email" | "name" | "password">) {
    const salt = await this.hashingService.genSalt();
    const encryptedPassword = await this.hashingService.encrypt(data.password, salt);
    const user = new User({
      email: data.email,
      name: data.name,
      password: encryptedPassword,
      salt
    });
    await this.getRepo().persistAndFlush(user);
    return user;
  }
}
