import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Chat } from '../../chat/entities/chat.entity';
import { User } from '../../user/entities/user.entity';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: true,
})
export class Message {
  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' })
  chatId: Chat;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  receiver: User[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
