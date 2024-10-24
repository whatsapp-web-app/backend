import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import bcrypt, { compare } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>,private jwtService:JwtService) {
  }

  async validateUser(authCredentials: AuthDto): Promise<any> {
    const {email, password}=authCredentials
    try {
      const user = await this.userModel.findOne({email}).select('+password').exec();
      if (!user){
        throw new BadRequestException('Invalid credentials')
      }

      const isMatch = await compare(authCredentials.password, user.password);
      if (!isMatch){
        throw new BadRequestException('Invalid credentials')
      }

      const {password, ...result}=user;
      return result
    }
    catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async login(authCredentials: AuthDto) {
    try {
      const user = await this.validateUser(authCredentials);
      const payload = { username: user._doc.username, sub: user._doc._id };
      const {password, ...result}=user._doc;
      return {
        access_token: this.jwtService.sign(payload),
        user:result
      };
    }
    catch (e) {
      throw new BadRequestException(e.message)
    }
  }


}
