import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [AuthModule, AgentModule],
})
export class AppModule {}
