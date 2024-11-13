import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { BasicChatDto } from './dto/basic-chat.dto.js';
import { GptService } from './gpt.service.js';
import { Server, Socket } from 'socket.io';
import { from, map } from 'rxjs';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class GptGateway implements OnGatewayConnection {
  constructor(private gptService: GptService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  @SubscribeMessage('chat')
  async basicChat(@MessageBody() body: BasicChatDto) {
    return (await this.gptService.chat(body.query)).pipe(
      map((data) => ({ event: 'chat', data })),
    );
  }
}
