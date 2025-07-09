import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}
