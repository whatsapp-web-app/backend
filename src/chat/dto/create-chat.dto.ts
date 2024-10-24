import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';

export class CreateChatDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  avatar: string

  @IsArray()
  @ValidateNested({ each: true })
  participants: string[]

  @IsArray()
  @ValidateNested({ each: true })
  admins: string[]

  @IsArray()
  @ValidateNested({ each: true })
  bannedUsers: string[]

  @IsBoolean()
  isGroup: boolean
}
