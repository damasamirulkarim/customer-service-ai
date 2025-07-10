import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AgentModule } from './agent/agent.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    AuthModule,
    AgentModule,
  ],
})
export class AppModule {}
