import { Injectable } from '@nestjs/common';
import { ExternalApi } from '../../../shared/externalApi/external.api';
import { JwtSignService } from '../../../core/auth/jwt/jwt-sign.service';

@Injectable()
export class TestService {
  constructor(
    private readonly externalApi: ExternalApi,
    private readonly jwtSignService: JwtSignService,
  ) {}

  async test() {
    try {
      // 알리고 문자 전송 테스트
      this.externalApi.aligoSendSms(['01066868286'], '테스트 메세지'); // 비동기 전송

      // await this.externalApi.aligoSendSms(['01066868286'], '테스트 메세지') // 동기 전송
    } catch (err) {
      throw err;
    }
  }

  async jwtSign() {
    try {
      // 토큰 발급 테스트
      const accessToken = await this.jwtSignService.generateAccessToken({
        name: '홍길동',
      });
      const refreshToken = await this.jwtSignService.generateRefreshToken({
        name: '홍길동',
      });
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
    } catch (err) {
      throw err;
    }
  }
}
