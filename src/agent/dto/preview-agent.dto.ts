import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PreviewAgentDto {
  @ApiProperty({
    description: 'Question or input to preview the agent response',
    example: 'Good morning, how are you?',
  })
  @IsNotEmpty()
  input: string;
}
