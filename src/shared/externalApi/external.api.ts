import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

/**
 * 외부 API 연동 Service
 */
@Injectable()
export class ExternalApi {
  constructor(private readonly configService: ConfigService) {}

  /**
   * 알리고 문자 전송
   */
  async aligoSendSms(receivers: string[], msg: string): Promise<any> {
    try {
      const response = await axios.post('https://apis.aligo.in/send/', null, {
        params: {
          key: '1fapk21yu9trp89kq0xipy2ibil1uli1',
          user_id: 'yconslab',
          sender: '023920700',
          receiver: receivers.join(','),
          msg: msg,
          testmode_yn: 'Y',
        },
      });
      console.log(response);
    } catch (err) {
      throw err;
    }
  }

  async postAxiosTest() {
    try {
      const response = await axios({
        method: 'POST',
        url: this.configService.get('yammiDomain'),
        data: {},
      });

      return response.data;
    } catch (err) {
      // throw err;
      throw new ForbiddenException('API not available');
    }
  }
}
