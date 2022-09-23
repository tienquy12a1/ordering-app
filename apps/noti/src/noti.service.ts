import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotiService {
  private readonly logger = new Logger(NotiService.name);

  getHello(): string {
    return 'Hello World!';
  }

  generate(data: any) {
    this.logger.log('Noti...', data);
  }
}
