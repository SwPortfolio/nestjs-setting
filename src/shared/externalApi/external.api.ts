import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExternalApi {
  constructor(private readonly configService: ConfigService) {}


}
