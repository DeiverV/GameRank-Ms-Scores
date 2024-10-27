import { Injectable } from '@nestjs/common';
import { Score } from './entities';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { CreateScoreDto, GetUserScoresDto, GetUsersRankingDto } from './dto';
import { PaginatorDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ScoresService {
  private scores: Score[] = [];

  constructor() {
    this.generateMockData();
  }

  private generateMockData(): void {
    for (let i = 0; i < 1000; i++) {
      this.scores.push({
        id: uuidv4(),
        createdAt: faker.date.anytime().toUTCString(),
        game: faker.vehicle.model(),
        score: faker.number.int(),
        userId: uuidv4(),
      });
    }
  }

  getUserScores({
    userId,
    limit,
    page,
  }: GetUserScoresDto): PaginatorDto<Score> {
    const userScores = this.scores.filter((score) => score.userId === userId);
    const filteredScores = userScores.slice(page * limit - limit, page * limit);

    return {
      data: filteredScores,
      limit,
      page,
      totalCount: userScores.length,
      totalPages: Math.ceil(userScores.length / limit),
    };
  }

  createScore(userId: string, createScoreDto: CreateScoreDto) {
    this.scores.push({
      id: uuidv4(),
      createdAt: faker.date.anytime().toUTCString(),
      userId,
      ...createScoreDto,
    });
  }

  getGames(): string[] {
    const games = Array.from(new Set(this.scores.map((score) => score.game)));
    return games;
  }

  getUsersRankingByGame({
    game,
    limit,
    page,
  }: GetUsersRankingDto): PaginatorDto<{ score: number; userId: string }> {
    const filteredScores = this.scores
      .filter((score) => score.game === game)
      .map((score) => ({ score: score.score, userId: score.userId }));

    const usersRanking: { score: number; userId: string }[] =
      filteredScores.reduce((acc, score) => {
        const user = acc.find((user) => user.userId === score.userId);
        if (user) {
          return acc;
        }

        return [...acc, score];
      }, []);

    usersRanking.sort((a, b) => b.score - a.score);

    return {
      data: usersRanking.slice(page * limit - limit, page * limit),
      limit,
      page,
      totalCount: usersRanking.length,
      totalPages: Math.ceil(usersRanking.length / limit),
    };
  }

  deleteScore({ scoreId }: { scoreId: string }) {
    this.scores = this.scores.filter((score) => score.id !== scoreId);
  }
}
