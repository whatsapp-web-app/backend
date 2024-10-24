import { IsArray, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  text: string;
  @IsString()
  chatId: string;

  @IsArray()
  @IsString({ each: true })
  receiverId: string;
}
