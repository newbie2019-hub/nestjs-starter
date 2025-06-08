import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

@Injectable()
export class AppService {
  private context = `AppService`;
  constructor(private readonly logger: LoggerService) {}

  getHello() {
    this.logger.log(`calling from inside of app service`, this.context, {
      id: 1,
    });
    return 'Hello';
  }
}
