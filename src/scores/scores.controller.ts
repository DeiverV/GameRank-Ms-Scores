import { Controller } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateScoreDto, GetUserScoresDto, GetUsersRankingDto } from './dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  //-----------gRPC Communication

  @GrpcMethod('ScoresService', 'GetUsersRankingByGame')
  getUsersRankingByGame(data: GetUsersRankingDto) {
    return this.scoresService.getUsersRankingByGame(data);
  }

  @GrpcMethod('ScoresService', 'GetUserScores')
  getUserScores(getUserScoresDto: GetUserScoresDto) {
    return this.scoresService.getUserScores(getUserScoresDto);
  }

  @GrpcMethod('ScoresService', 'GetGames')
  getGames() {
    return this.scoresService.getGames();
  }

  @GrpcMethod('ScoresService', 'CreateScore')
  createScore(createScoreDto: CreateScoreDto) {
    return this.scoresService.createScore(createScoreDto);
  }

  @GrpcMethod('ScoresService', 'DeleteScore')
  deleteScore({ scoreId }: { scoreId: string }) {
    return this.scoresService.deleteScore({ scoreId });
  }
}
