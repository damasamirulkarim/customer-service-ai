import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty()
  serviceType: string;

  @ApiProperty()
  communicationStyle: string;

  @ApiPropertyOptional()
  personality?: string;
}
