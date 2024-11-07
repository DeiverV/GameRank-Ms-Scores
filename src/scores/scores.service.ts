import { Injectable } from '@nestjs/common';
import { Score as ScoreEntity } from './entities';
import { CreateScoreDto, GetUserScoresDto, GetUsersRankingDto } from './dto';
import { PaginatorDto } from 'src/common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './schema';
import { DeleteResult, PaginateModel } from 'mongoose';

@Injectable()
export class ScoresService {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: PaginateModel<Score>,
  ) {}

  async getUserScores({
    userId,
    limit,
    page,
  }: GetUserScoresDto): Promise<PaginatorDto<ScoreEntity>> {
    const userScores = await this.scoreModel.paginate(
      { userId },
      { limit, page },
    );
    const formatted: ScoreEntity[] = userScores.docs.map((score) => ({
      createdAt: score.createdAt.toISOString(),
      game: score.game,
      score: score.score,
      userId: score.userId,
      id: score._id as string,
    }));

    return {
      data: formatted,
      limit: userScores.limit,
      page: userScores.page,
      totalCount: userScores.totalDocs,
      totalPages: userScores.totalPages,
    };
  }

  async createScore(createScoreDto: CreateScoreDto) {
    return await this.scoreModel.create(createScoreDto);
  }

  async getGames(): Promise<{ games: string[] }> {
    const games = await this.scoreModel.distinct('game');
    return { games };
  }

  async getUsersRankingByGame({
    game,
    limit,
    page,
  }: GetUsersRankingDto): Promise<
    PaginatorDto<{ score: number; userId: string }>
  > {
    const res = await this.scoreModel.paginate(
      { game },
      { limit, page, sort: { score: 1 } },
    );

    const formatted = res.docs.map((score) => ({
      score: score.score,
      userId: score.userId,
    }));

    const usersRanking: { score: number; userId: string }[] = formatted.reduce(
      (acc, score) => {
        const user = acc.find((user) => user.userId === score.userId);
        if (user) {
          return acc;
        }

        return [...acc, score];
      },
      [],
    );

    return {
      data: usersRanking.slice(page * limit - limit, page * limit),
      limit: res.limit,
      page: res.page,
      totalCount: res.totalDocs,
      totalPages: res.totalPages,
    };
  }

  async deleteScore({ scoreId }: { scoreId: string }): Promise<DeleteResult> {
    return await this.scoreModel.deleteOne({ _id: scoreId });
  }
}
