import { EntityManager } from "@mikro-orm/postgresql";
import { Req } from "@tsed/common";
import { Controller, ProviderScope, Scope } from "@tsed/di";
import { Em } from "@tsed/mikro-orm";
import { Authenticate } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Post as PostVerb, Returns, Security } from "@tsed/schema";
import { CommentPostQueryDto } from "../../dtos/CommentPostQueryDto";
import { PostCommentDto } from "../../dtos/PostListingDto";
import { Comment } from "../../entities/Comment";
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";

@Controller("/comment")
@Scope(ProviderScope.SINGLETON)
export class CommentController {
  @Em() em: EntityManager;

  @PostVerb("/post/:id")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  @Returns(200, PostCommentDto)
  async commentPost(
    @PathParams("id") id: string,
    @Req("user") user: User,
    @BodyParams() data: CommentPostQueryDto
  ): Promise<PostCommentDto> {
    const post = await this.em.getRepository(Post).findOneOrFail({ id });
    const comment = new Comment({
      author: user,
      content: data.content,
      parentPost: post
    });
    await this.em.getRepository(Comment).persistAndFlush(comment);
    return {
      id: comment.id,
      createdAt: comment.createdAt,
      content: comment.content,
      author: {
        id: user.id,
        name: user.name
      }
    };
  }

  @PostVerb("/comment/:id")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  @Returns(200, PostCommentDto)
  async commentComment(@PathParams("id") id: string, @Req("user") user: User, @BodyParams() data: CommentPostQueryDto) {
    const parentComment = await this.em.getRepository(Comment).findOneOrFail({ id });
    const comment = new Comment({
      author: user,
      content: data.content,
      parentComment
    });
    await this.em.getRepository(Comment).persistAndFlush(comment);

    return {
      id: comment.id,
      createdAt: comment.createdAt,
      content: comment.content,
      author: {
        id: user.id,
        name: user.name
      }
    };
  }
}
