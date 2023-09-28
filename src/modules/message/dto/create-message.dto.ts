import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateMessageDto {
  @IsNotEmptyObject()
  user: User;
  @IsString()
  @IsNotEmpty()
  text: string;
}
