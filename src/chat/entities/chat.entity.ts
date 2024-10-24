import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Message } from '../../message/entity/message.entity';
import { HydratedDocument } from 'mongoose';


export type ChatDocument = HydratedDocument<Chat>

@Schema({
  timestamps: true,
})
export class Chat {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  avatar: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  participants: User[];


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  admins: User[];


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  bannedUsers: User[];


  @Prop()
  isGroup: boolean;


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  messages: Message[];


}

export const ChatSchema = SchemaFactory.createForClass(Chat)
