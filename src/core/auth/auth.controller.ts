import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtSignService } from './jwt/jwt-sign.service';
import { ResponseUtil } from '../../shared/response/response.util';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtSignService: JwtSignService,
    private responseUtil: ResponseUtil,
  ) {}

  /**
   * access token 만료시 refresh token으로 인증 후 새 access token 발급
   * @param req
   * @param res
   */
  @Post('/verify/refresh-token')
  @UseGuards(AuthGuard('refresh'))
  async verifyRefreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const accessToken = this.jwtSignService.generateAccessToken({});
      return this.responseUtil.response(
        res,
        200,
        '0000',
        {},
        { accessToken: accessToken },
      );
    } catch (err) {
      return this.responseUtil.response(res, 500, '9999', {}, {});
    }
  }
}
