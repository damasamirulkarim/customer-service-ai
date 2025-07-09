import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PreviewAgentDto {
  @ApiProperty()
  @IsNotEmpty()
  input: string;
}
