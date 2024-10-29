import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
