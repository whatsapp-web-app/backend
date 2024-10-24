import { ChatService } from './../chat/chat.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { Server } from 'socket.io';
import { OnModuleInit, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMessageDto } from './dto/createMessage.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('a user connected', socket.id);
    });
  }

  constructor(
    private readonly messageService: MessageService,
    private chatService: ChatService,
  ) {}

  @SubscribeMessage('createMessage')
  async handleMessage(
    client,
    payload: { createMessageDto: CreateMessageDto; userId: string },
  ) {
    const message = await this.messageService.sendMessage(
      payload.createMessageDto,
      payload.userId,
    );

    this.server.to(payload.createMessageDto.chatId).emit('message', message);
  }

  @SubscribeMessage('joinChat')
  async handleJoin(client, payload: string) {
    console.log(`User with id ${client.id} joined room ${payload}`);
    client.join(payload);
  }

  @SubscribeMessage('typing-status')
  handleTyping(client, payload: string) {
    console.log(payload);
    client.broadcast.to(payload).emit('typing', payload);
  }

  @SubscribeMessage('sendChatRequest')
  async handleChatRequest(
    client,
    payload: { requestID: string; userId: string },
  ) {
    const user = await this.chatService.sendChatRequest(
      payload.requestID,
      payload.userId,
    );
    this.server.to(payload.userId).emit('chatRequest', user);
  }
}
