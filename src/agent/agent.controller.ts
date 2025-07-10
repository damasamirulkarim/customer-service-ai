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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PreviewAgentDto } from './dto/preview-agent.dto';
import { GetUserId } from 'src/auth/auth.decorator';

@ApiTags('Agents')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async create(@Body() req: CreateAgentDto, @GetUserId() userId: string) {
    const result = await this.agentService.create(req, userId);
    return {
      message: 'Agent created successfully',
      data: result,
    };
  }

  @Get()
  async findAll(@GetUserId() userId: string) {
    const result = await this.agentService.findAll(userId);
    return {
      message: 'Agents retrieved successfully',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.agentService.findOne(id);
    return {
      message: 'Agent retrieved successfully',
      data: result,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: UpdateAgentDto) {
    const result = await this.agentService.update(id, req);
    return {
      message: 'Agent updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.agentService.remove(id);
    return {
      message: 'Agent deleted successfully',
      data: result,
    };
  }

  @Post(':id/preview')
  async preview(@Param('id') id: string, @Body() req: PreviewAgentDto) {
    const result = await this.agentService.preview(id, req);
    return {
      message: 'Agent preview generated successfully',
      data: result,
    };
  }
}
