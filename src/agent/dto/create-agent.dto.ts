import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty()
  @IsNotEmpty()
  personality: string;
}
