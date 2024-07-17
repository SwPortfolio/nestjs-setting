import { Controller, Get, Req, Res, Request, Response, UseGuards, Post } from '@nestjs/common';
import { TestService } from './service/test.service';
import { ResponseUtil } from '../../shared/response/response.util';
import { AuthGuard } from '@nestjs/passport';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService, private readonly responseUtil: ResponseUtil) {}

  /**
   * aligo send sms test
   * @param req
   * @param res
   */
  @Get()
  async index(@Req() req: Request, @Res() res: Response) {
    try {
      await this.testService.test()
      return this.responseUtil.response(res, 200, '0000', {}, {});
    } catch (err) {
      return this.responseUtil.response(res, 500, '9999', {}, {});
    }
  }

  /**
   * guard 사용법
   * @param req
   * @param res
   */
  @Get('/jwt-auth')
  @UseGuards(AuthGuard('access'))
  async auth(@Req() req: Request, @Res() res: Response) {
    try {
      return this.responseUtil.response(res, 200, '0000', {}, {});
    } catch (err) {
      return this.responseUtil.response(res, 500, '9999', {}, {});
    }
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      // 회원 조회 (유효성 체크)

      // access token, refresh token 발급
      await this.testService.jwtSign();
      return this.responseUtil.response(res, 200, '0000', {}, {});
    } catch (err) {
      return this.responseUtil.response(res, 500, '9999', {}, {});
    }
  }
}
