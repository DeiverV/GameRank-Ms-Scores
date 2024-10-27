import { PaginationReceivedDto } from 'src/common/dto/pagination.dto';

export class GetUsersRankingDto extends PaginationReceivedDto {
  game: string;
}
