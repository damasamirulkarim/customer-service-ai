import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PreviewAgentDto } from './dto/preview-agent.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  create(@Body() req: CreateAgentDto) {
    const userId = 'x';
    return this.agentService.create(req, userId);
  }

  @Get()
  findAll() {
    const userId = 'x';
    return this.agentService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() req: UpdateAgentDto) {
    return this.agentService.update(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentService.remove(id);
  }

  @Post(':id/preview')
  preview(@Param('id') id: string, @Body() req: PreviewAgentDto) {
    return this.agentService.preview(id, req);
  }
}
