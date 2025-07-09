import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    try {
      if (!this.isConnected) {
        this.logger.log('Connecting to database...');
        await this.$connect();
        this.isConnected = true;
        this.logger.log('Successfully connected to database');
      } else {
        this.logger.log('Database already connected, skipping initialization');
      }
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      if (this.isConnected) {
        this.logger.log('Disconnecting from database...');
        await this.$disconnect();
        this.isConnected = false;
        this.logger.log('Successfully disconnected from database');
      }
    } catch (error) {
      this.logger.error('Error during database disconnection', error);
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Database health check failed', error);
      return false;
    }
  }
}
