import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './service/test.service';

@Module({
  // imports: [CommonModule],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
