import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../configuration/configuration.interface';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

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
  controllers: [],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
