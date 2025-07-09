import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.db.user.findUniqueOrThrow({
      where: { email },
    });

    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    // Create JWT payload
    const payload = {
      id: user.id,
    };

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
