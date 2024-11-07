import { Controller } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateScoreDto, GetUserScoresDto, GetUsersRankingDto } from './dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  //-----------gRPC Communication

  @GrpcMethod('ScoresService', 'GetUsersRankingByGame')
  async getUsersRankingByGame(data: GetUsersRankingDto) {
    const res = await this.scoresService.getUsersRankingByGame(data);
    return res;
  }

  @GrpcMethod('ScoresService', 'GetUserScores')
  async getUserScores(getUserScoresDto: GetUserScoresDto) {
    const res = await this.scoresService.getUserScores(getUserScoresDto);
    return res;
  }

  @GrpcMethod('ScoresService', 'GetGames')
  async getGames() {
    const res = await this.scoresService.getGames();
    return res;
  }

  @GrpcMethod('ScoresService', 'CreateScore')
  async createScore(createScoreDto: CreateScoreDto) {
    await this.scoresService.createScore(createScoreDto);
  }

  @GrpcMethod('ScoresService', 'DeleteScore')
  async deleteScore({ scoreId }: { scoreId: string }) {
    await this.scoresService.deleteScore({ scoreId });
  }
}
