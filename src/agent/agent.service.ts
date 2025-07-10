import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CreateAgentDto,
  UpdateAgentDto,
  PreviewAgentDto,
  ChatResponseDto,
  ChatCompletionDto,
} from './dto';
import { PrismaService } from 'src/common/prisma.service';
import { Agent } from './entities/agent.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AgentService {
  constructor(
    private readonly db: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private logger = new Logger(AgentService.name);

  async create(req: CreateAgentDto, userId: string): Promise<Agent> {
    return await this.db.agent.create({
      data: {
        language: req.language,
        personality: req.personality,
        userId: userId,
      },
    });
  }

  findAll(userId: string): Promise<Agent[]> {
    return this.db.agent.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string): Promise<Agent> {
    return this.db.agent.findUniqueOrThrow({
      where: { id: id },
    });
  }

  update(id: string, req: UpdateAgentDto): Promise<Agent> {
    return this.db.agent.update({
      where: { id: id },
      data: {
        personality: req.personality,
        language: req.language,
      },
    });
  }

  async remove(id: string): Promise<Agent> {
    // Check if the agent exists before attempting to delete
    await this.db.agent
      .findUniqueOrThrow({
        where: { id: id },
      })
      .catch(() => {
        throw new NotFoundException(`Agent with ID ${id} not found`);
      });

    return this.db.agent.delete({
      where: { id: id },
    });
  }

  async preview(id: string, req: PreviewAgentDto): Promise<{ output: string }> {
    try {
      const agent = await this.db.agent.findUnique({
        where: { id: id },
      });

      if (!agent) {
        throw new NotFoundException(`Agent with ID ${id} not found`);
      }

      // Create a system prompt that incorporates the agent's personality
      const systemPrompt = `You are a customer service agent with a ${agent.personality} tone, communicating in ${agent.language}. Keep your responses concise, helpful, and aligned with your ${agent.personality} personality. Avoid unnecessary repetition or translations unless explicitly requested by the user. Focus on addressing the user's needs directly.`;

      // Generate AI response using DeepSeek
      const response = await this.createChatCompletion({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: req.input,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const output = response.choices[0].message.content;

      return { output };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(`Error in preview: ${error.message}`, error.stack);
      return {
        output: '',
      };
    }
  }

  /**
   * Create a chat completion using DeepSeek API
   * @param chatCompletionDto - The chat completion request data
   * @returns Promise<ChatResponseDto> - The AI response
   */
  async createChatCompletion(
    chatCompletionDto: ChatCompletionDto,
  ): Promise<ChatResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.post<ChatResponseDto>('/chat/completions', {
        model: this.configService.get<string>('DEEPSEEK_MODEL'),
        ...chatCompletionDto,
      }),
    );
    this.logger.debug(data.usage);
    return data;
  }
}
