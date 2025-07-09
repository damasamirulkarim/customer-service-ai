import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AgentModule } from './agent/agent.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, AuthModule, AgentModule],
})
export class AppModule {}
