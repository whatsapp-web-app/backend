import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './entities/chat.entity';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createChatDto: CreateChatDto, id: string) {
    try {
      const newChat = new this.chatModel({
        name: createChatDto.name,
        description: createChatDto.description,
        avatar: createChatDto.avatar,
        isGroup: createChatDto.isGroup,
        participants: [id, ...createChatDto.participants],
        admins: createChatDto.admins,
        bannedUsers: createChatDto.bannedUsers,
        messages: [],
      });
      return await newChat.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(id: string) {
    try {
      return await this.chatModel
        .find({ participants: { $in: [id] } })
        .populate('participants')
        .populate('admins')
        .populate('bannedUsers')
        .populate('messages');
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.chatModel.findById(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(id: string, updateChatDto: CreateChatDto) {
    try {
      return await this.chatModel.findByIdAndUpdate(id, updateChatDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.chatModel.findByIdAndDelete(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async sendChatRequest(requestID: string, userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const requsertedUser = await this.userModel.findById(requestID);
      if (!requsertedUser) {
        throw new BadRequestException('User not found');
      }
      user.friendRequests.push(requsertedUser);
      return user.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
