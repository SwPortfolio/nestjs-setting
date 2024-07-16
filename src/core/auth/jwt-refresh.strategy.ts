import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../configuration/configuration.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req) => {
        return req.cookies['refreshToken'];
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<Configuration['jwt']>('jwt').refresh_secret,
      passReqToCallback: true,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
