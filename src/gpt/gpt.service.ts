import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GptService {
  constructor(private prisma: PrismaService) {}

  async chat(query: string) {
    const subject = new Subject<string>();

    const llm = new ChatOpenAI({
      temperature: 0.7,
      modelName: 'gpt-4o-mini',
    });
    const chatResponse = await llm.stream([
      {
        role: 'system',
        content: `You are a helpful assistant that answers questions based on the provided context. If you don't know the answer, just say that you don't know, don't try to make up an answer. Your name is ImnAi. You have been created by Imna Digital, an organization that strives to revolutionize the web.`,
      },
      {
        role: 'user',
        content: query,
      },
    ]);

    const reader = chatResponse.getReader();
    reader.read().then(function processText({ done, value }) {
      if (done) {
        subject.complete();
        return;
      }
      console.log(value);
      subject.next(value.content.toString());
      return reader.read().then(processText);
    });

    return subject;
  }
}
