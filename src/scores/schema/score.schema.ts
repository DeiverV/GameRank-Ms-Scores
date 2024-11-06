import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { paginate } from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Score extends Document {
  @Prop({ type: String, default: uuidv4 })
  userId: string;

  @Prop({ type: Number, required: true })
  score: number;

  @Prop({ type: String, required: true })
  game: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);

ScoreSchema.plugin(paginate as any);