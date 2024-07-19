import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseUtil {
  private res: any;
  private statusCode: number;
  private resCode: string;
  private message: { kor: string; eng: string } | string;

  private static readonly STATUSCODE: number[] = [
    200, 201, 202, 204, 301, 302, 303, 307, 400, 401, 403, 404, 502, 503, 504,
  ];

  private static readonly MESSAGES: object = {
    // status 200
    '0000': { kor: '성공', eng: 'success' },

    // status 409

    // status 500
    '9999': { kor: '서버오류', eng: 'server error' },
    '9998': { kor: 'DB 오류', eng: 'database error' },
  };

  getMessageByCode(resCode: string): object {
    return ResponseUtil.MESSAGES[resCode];
  }

  isEmptyObject(message: object): boolean {
    return Object.keys(message).length === 0 && message.constructor === Object;
  }

  statusCodeValid(statusCode: number) {
    return ResponseUtil.STATUSCODE.indexOf(statusCode);
  }

  response(
    res: Response,
    statusCode: number,
    resCode: string,
    message: any,
    body: object,
  ): Response {
    try {
      this.res = res;
      this.statusCode = statusCode;
      this.resCode = resCode;

      this.message =
        this.isEmptyObject(message) === false
          ? message
          : this.getMessageByCode(resCode) !== undefined
          ? this.getMessageByCode(resCode)
          : { kor: '', eng: '' };

      const valid = this.statusCodeValid(statusCode);
      if (valid === -1) {
        throw new HttpException(
          { message: 'status code not available' },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        return this.res
          .status(this.statusCode)
          .json({ resCode: this.resCode, message: this.message, body: body });
      }
    } catch (err) {
      throw err;
    }
  }
}
