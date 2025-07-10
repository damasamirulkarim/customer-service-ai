import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('DEEPSEEK_API_URL'),
        headers: {
          Authorization: `Bearer ${configService.get('DEEPSEEK_API_KEY')}`,
          'Content-Type': 'application/json',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
