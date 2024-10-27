import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
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

  //-----------REST Communication

  @Get(':userId')
  getUserScores(@Query() getUserScoresDto: GetUserScoresDto) {
    return this.scoresService.getUserScores(getUserScoresDto);
  }

  @Get('games')
  getGames() {
    return this.scoresService.getGames();
  }

  @Post(':userId')
  createScore(
    @Query() { userId }: { userId: string },
    @Body() createScoreDto: CreateScoreDto,
  ) {
    return this.scoresService.createScore(userId, createScoreDto);
  }

  @Delete(':scoreId')
  deleteScore(@Query() { scoreId }: { scoreId: string }) {
    return this.scoresService.deleteScore({ scoreId });
  }
}
