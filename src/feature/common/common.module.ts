import { Global, Module } from '@nestjs/common';
import { JwtSignService } from '../../core/auth/jwt/jwt-sign.service';
import { PasswordService } from './password.service';

@Global()
@Module({
  providers: [PasswordService],
  exports: [PasswordService],
})
export class CommonModule {}
