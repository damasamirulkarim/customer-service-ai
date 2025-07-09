import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [AuthModule, AgentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
