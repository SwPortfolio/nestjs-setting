import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../configuration/configuration.interface';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { JwtSignService } from './jwt/jwt-sign.service';

/**
 * 인증
 * 1. id, password 정보와 함께 로그인 요청
 * 2. 데이터베이스에서 id와 password 대조
 *  - 일치할 경우, access token, refresh token 응답
 *  - 클라이언트에서 두 토큰 저장
 *
 * 인가
 * 1. header에 access token을 포함시켜 API 요청
 * 2. 토큰의 유효성 검증
 *  - access token 만료가 되지 않고 토큰 유효성 검증 완료 시 API 요청을 처리하고 응답
 *
 * 재발급
 * 1. access token 이 만료 될 경우, 만료가 되었음을 응답
 * 2. header 에 refresh token 을 포함시켜 access token 재발급 요청
 * 3. refresh token 의 유효성 검증하고, 새로운 access token 을 응답
 *  - 클라이언트에서 access token 저장
 */

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<Configuration['jwt']>('jwt').access_secret,
        // signOptions: { expiresIn: '90d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [JwtAccessStrategy, JwtRefreshStrategy, JwtSignService],
  exports: [JwtSignService],
})
export class AuthModule {}
