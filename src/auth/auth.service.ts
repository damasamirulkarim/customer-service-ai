import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
  ) {}

  private logger = new Logger(AuthService.name);

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      this.logger.warn(`Login attempt with non-existent email: ${email}`);
      throw new UnauthorizedException();
    }

    if (user.password !== password) {
      this.logger.warn(`Failed login attempt for user: ${user.id}`);
      throw new UnauthorizedException();
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
