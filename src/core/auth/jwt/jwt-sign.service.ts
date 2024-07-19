import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../configuration/configuration.interface';

@Injectable()
export class JwtSignService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<Configuration['jwt']>('jwt').access_secret,
      expiresIn: '1h',
    });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret:
        this.configService.get<Configuration['jwt']>('jwt').refresh_secret,
      expiresIn: '90d',
    });
  }
}
