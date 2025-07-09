import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'src/common/prisma.service';
import { Agent } from './entities/agent.entity';

@Injectable()
export class AgentService {
  constructor(private readonly db: PrismaService) {}

  async create(req: CreateAgentDto, userId: string): Promise<Agent> {
    return await this.db.agent.create({
      data: {
        communicationStyle: req.communicationStyle,
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
        communicationStyle: req.communicationStyle,
        personality: req.personality,
      },
    });
  }

  remove(id: string): Promise<Agent> {
    return this.db.agent.delete({
      where: { id: id },
    });
  }
}
