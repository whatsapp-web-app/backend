import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  username:string;

  @IsString()
  phoneNumber:string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
