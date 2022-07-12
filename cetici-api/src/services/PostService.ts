import { Reference } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@tsed/di";
import { Em } from "@tsed/mikro-orm";
import { FlatPostListingDto, PostListingDto } from "../dtos/PostListingDto";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";

type CommentResult = {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
};

@Injectable()
export class PostService {
  @Em() em: EntityManager;

  getRepo() {
    return this.em.getRepository(Post);
  }

  async getPostDtoWithComments(results: FlatPostListingDto[]): Promise<PostListingDto[]> {
    // Fetch the comments
    return Promise.all(
      results.map(async (data) => {
        const commentsQb = this.em.getRepository(Comment).createQueryBuilder("c");
        commentsQb
          .select(["c.id", "c.content", "c.createdAt", "author.id as authorId", "author.name as authorName"])
          .join("c.author", "author")
          .where({
            parentPost: Reference.createFromPK(Post, data.id)
          })
          .orderBy({ "c.createdAt": "DESC" });
        const comments = await commentsQb.execute<CommentResult[]>();

        return {
          id: data.id,
          content: data.content,
          createdAt: data.createdAt,
          distance: data.distance,
          location: {
            displayName: data.displayName,
            placeId: data.placeId
          },
          author: {
            name: data.authorName,
            id: data.authorId
          },
          comments: comments.map((comment) => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            author: {
              id: comment.authorId,
              name: comment.authorName
            }
          }))
        };
      })
    );
  }
}
