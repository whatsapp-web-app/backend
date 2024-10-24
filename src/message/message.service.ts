import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entity/message.entity';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Chat } from '../chat/entities/chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}

  async sendMessage(createMessageDto: CreateMessageDto, userId: string) {
    try {
      const newMessage = new this.messageModel({
        text: createMessageDto.text,
        chatId: createMessageDto.chatId,
        sender: userId,
        receiver: createMessageDto.receiverId,
      });
      const savedMessage = await newMessage.save();
      const chat = await this.chatModel.findById(createMessageDto.chatId);
      chat.messages.push(savedMessage);
      await chat.save();
      return savedMessage;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
