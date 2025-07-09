import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty()
  communicationStyle: string;

  @ApiPropertyOptional()
  personality?: string;
}
