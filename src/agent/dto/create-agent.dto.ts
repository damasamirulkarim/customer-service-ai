import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty({
    description: 'The language of the agent, e.g., "indonesian"',
    example: 'indonesian',
  })
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    description: 'The personality of the agent, e.g., "friendly"',
    example: 'friendly',
  })
  @IsNotEmpty()
  personality: string;
}
