import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma.service';
import { comparePassword } from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
  ) {}

  private logger = new Logger(AuthService.name);

  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      this.logger.warn(`Login attempt with non-existent email: ${email}`);
      throw new UnauthorizedException();
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      this.logger.warn(`Failed login attempt for user: ${user.id}`);
      throw new UnauthorizedException();
    }

    // Create JWT payload
    const payload = {
      id: user.id,
    };

    return {
      token: await this.jwt.signAsync(payload),
    };
  }
}
