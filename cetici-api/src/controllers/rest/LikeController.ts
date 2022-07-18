import { EntityManager } from "@mikro-orm/postgresql";
import { Controller, ProviderScope, Scope } from "@tsed/di";
import { Em } from "@tsed/mikro-orm";
import { Post as PostVerb, Returns, Security } from "@tsed/schema";
import { Authenticate } from "@tsed/passport";
import { PathParams, Req } from "@tsed/common";
import { User } from "../../entities/User";
import { Like } from "../../entities/Like";
import { Post } from "../../entities/Post";

@Controller("/likes")
@Scope(ProviderScope.SINGLETON)
export class LikeController {
  @Em() em: EntityManager;

  @PostVerb("/create/:id")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  @Returns(200, Like)
  async like(@PathParams("id") id: string, @Req("user") user: User) {
    const post = await this.em.getRepository(Post).findOneOrFail({
      id
    });
    const existingLike = await this.em.getRepository(Like).findOne({
      post,
      user
    });
    if (existingLike) {
      return existingLike;
    }
    const like = new Like({
      post,
      user
    });
    await this.em.getRepository(Like).persistAndFlush(like);
    return like;
  }

  @PostVerb("/unlike/:id")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  @Returns(200)
  async unlike(@PathParams("id") id: string, @Req("user") user: User) {
    const post = await this.em.getRepository(Post).findOneOrFail({
      id
    });
    const like = await this.em.getRepository(Like).findOneOrFail({
      post,
      user
    });
    await this.em.getRepository(Like).removeAndFlush(like);
  }
}
