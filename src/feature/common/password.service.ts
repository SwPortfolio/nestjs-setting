import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PasswordService {

  /**
   * 비밀번호 암호화
   * @param password : string 평문
   */
  async passwordHash(password: string) {
    const salt = uuidv4().replace(/-/g, '');
    const hash_password = crypto
      .createHash('sha256')
      .update(salt + password)
      .digest('hex');
    return `${hash_password}:${salt}`;
  }

  /**
   * 비밀번호 일치여부 체크
   * @param password : string 평문
   * @param passwordHash : string DB에 저장된 비밀번호
   */
  async passwordCheck(password: string, passwordHash: string) {
    const [pay_password, salt] = passwordHash.split(':');

    // 회원이 입력한 비밀번호
    const hash = crypto
      .createHash('sha256')
      .update(salt + password)
      .digest('hex');

    return { check: pay_password === hash };
  }
}
