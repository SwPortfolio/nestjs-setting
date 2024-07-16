import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseUtil {
  private res: any;
  private statusCode: number;
  private resCode: string;
  private message: { kor: string; eng: string } | string;
  private body: any;

  messageUtil(resCode: string): {kor: string, eng: string} {
    const message = {
      // status 200
      '0000': { kor: '성공', eng: 'success' },

      // status 409

      // status 500
      '9999': { kor: '서버오류', eng: 'server error' },
      '9998': { kor: 'DB 오류', eng: 'database error' },
    };
    return message[resCode];
  }

  response(
    res: Response,
    statusCode: number,
    resCode: string,
    message: {kor: string, eng: string},
    body: object,
  ): Response {
    this.res = res;
    this.statusCode = statusCode;
    this.resCode = resCode;
    this.body = body;
    this.message = message === undefined ? this.messageUtil(resCode) !== undefined ? this.messageUtil(resCode) : '' : message;

    return this.res
      .status(this.statusCode)
      .json({ resCode: this.resCode, message: this.message, body: this.body });
  }
}
