import { Global, Module } from '@nestjs/common';
import { DatabaseConnection } from './database/database.connection';
import { AwsS3 } from './aws/aws.s3';
import { ExternalApi } from './externalApi/external.api';
import { ResponseUtil } from './response/response.util';

/**
 * Shared Module: 여러 Feature 모듈에서 사용할 수 있는 서비스나 팩토리 등을 공유하기 위한 모듈입니다.
 * 반복적으로 사용되는 기능 추상화하여 한 곳에서 관리할 수 있습니다.
 * 'DatabaseModule', 'CacheModule' 등이 여기에 해당됩니다.
 */
@Global()
@Module({
  providers: [DatabaseConnection, AwsS3, ExternalApi, ResponseUtil],
  exports: [DatabaseConnection, AwsS3, ExternalApi, ResponseUtil],
})
export class SharedModule {}
