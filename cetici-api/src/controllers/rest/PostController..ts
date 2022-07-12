import { EntityManager } from "@mikro-orm/postgresql";
import { Req } from "@tsed/common";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Em } from "@tsed/mikro-orm";
import { Authenticate } from "@tsed/passport";
import { BodyParams } from "@tsed/platform-params";
import { Post as PostVerb, Returns, Security } from "@tsed/schema";
import { PostDto } from "../../dtos/PostDto";
import { FlatPostListingDto, PostListingDto } from "../../dtos/PostListingDto";
import { PostListingQueryDto } from "../../dtos/PostListingQueryDto";
import { NominatimLocation } from "../../entities/NominatimLocation";
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";
import { PostService } from "../../services/PostService";

@Controller("/posts")
@Scope(ProviderScope.SINGLETON)
export class PostController {
  @Inject() postService: PostService;
  @Em() em: EntityManager;

  @PostVerb("/")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  @Returns(200, Array).Of(PostListingDto)
  async list(@BodyParams() data: PostListingQueryDto): Promise<PostListingDto[]> {
    const qb = this.em.getRepository(NominatimLocation).createQueryBuilder("l");
    qb.select([
      "placeId",
      "displayName",
      "l.last_updated_post_id as id",
      "p.content",
      "p.createdAt",
      "author.id as authorId",
      "author.name as authorName",
      qb.raw("ST_Distance(l.location, ST_MakePoint(?, ?)::geography) as distance", [data.location.longitude, data.location.latitude])
    ])
      .join("l.lastUpdatedPost", "p")
      .join("p.author", "author")
      .orderBy({
        "ST_Distance(l.location, ST_MakePoint(?, ?)::geography)": "ASC"
      });
    const results = await qb.execute<FlatPostListingDto[]>();
    return this.postService.getPostDtoWithComments(results);
  }

  @PostVerb("/create")
  @Authenticate("jwt", { session: false })
  @Security("jwt")
  async create(@BodyParams() data: PostDto, @Req("user") user: User) {
    const nominationRepository = this.em.getRepository(NominatimLocation);
    const location = await nominationRepository.findOneOrFail({ placeId: data.nominatimLocationId });
    const post = new Post({ content: data.content, location, author: user });
    await this.em.getRepository(Post).persistAndFlush(post);

    // we index the last updated Post
    location.lastUpdatedPost = post;
    await nominationRepository.persistAndFlush(location);
    return post;
  }
}
