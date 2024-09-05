import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import client from 'twilio';
import * as readline from 'readline';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (await this.checkUserExists(createUserDto.username)) {
        throw new BadRequestException('User already exists');
      }
      const user = new this.userModel(createUserDto);
      const savedUser = await user.save();
      console.log(savedUser);
      return {
        message: 'User created successfully',
        user: savedUser,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  checkUserExists(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async serachUsers(searchTerm: string) {
    const users = await this.userModel
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { username: { $regex: searchTerm, $options: 'i' } },
        ],
      })
      .exec();
    return users;
  }
}
