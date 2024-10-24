import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('message')
@UseGuards(JwtAuthGuard)
export class MessageController{

  constructor(private messageService: MessageService){}


  @Post()
  sendMessage(@Body() createMessageDto: CreateMessageDto,@Request() req) {
    return this.messageService.sendMessage(createMessageDto,req.user.userId)
  }

}
