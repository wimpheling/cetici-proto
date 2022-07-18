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

export type GetPostsQuery = { longitude: number; latitude: number; userId: string };

@Injectable()
export class PostService {
  @Em() em: EntityManager;

  private getFields() {
    return `
        l.place_id as "placeId",
        l.display_name as "displayName",
        l.last_updated_post_id as id,
        p.content,
        author.id as "authorId",
        author.name as "authorName",
        p.created_at as "createdAt",
        ST_Distance(l.location, ST_MakePoint(?, ?)::geography) as distance,
        lk.post_id IS NOT NULL as liked`;
  }

  getLikedPosts({ userId, longitude, latitude }: GetPostsQuery) {
    return this.em.raw(
      `
      SELECT
      ${this.getFields()}
      FROM post p
      JOIN nominatim_location l ON l.place_id = p.location_place_id
      JOIN "user" as author ON author.id = p.author_id
      JOIN "like" as lk ON lk.post_id = p.id AND lk.user_id = ?
      ORDER BY lk.created_at DESC
    `,
      [longitude, latitude, userId]
    );
  }

  getPostsByLocation({ longitude, latitude, userId }: GetPostsQuery) {
    const where = "";
    return this.em.raw(
      `
      SELECT
      ${this.getFields()}
      FROM nominatim_location as l
      ${where}
      JOIN post p ON l.last_updated_post_id = p.id
      JOIN "user" as author ON author.id = p.author_id
      LEFT JOIN "like" as lk ON lk.post_id = p.id AND lk.user_id = ?
      ORDER BY ST_Distance(l.location, ST_MakePoint(?, ?)::geography) ASC
        `,
      [longitude, latitude, userId, longitude, latitude]
    );
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
          liked: data.liked,
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
