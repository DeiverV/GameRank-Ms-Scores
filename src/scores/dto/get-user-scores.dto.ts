import { PaginationReceivedDto } from 'src/common/dto/pagination.dto';

export class GetUserScoresDto extends PaginationReceivedDto {
  userId: string;
}
