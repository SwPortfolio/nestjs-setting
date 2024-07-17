import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../configuration/configuration.interface';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<Configuration['jwt']>('jwt').access_secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const { name } = payload;
    // 추가 token 검증 로직 추가
    return payload;
  }
}
