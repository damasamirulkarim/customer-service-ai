import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty()
  @IsNotEmpty()
  communicationStyle: string;

  @ApiPropertyOptional()
  @IsOptional()
  personality?: string;
}
