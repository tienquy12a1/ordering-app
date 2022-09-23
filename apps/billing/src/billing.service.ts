import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NOTI_SERVICE } from './constants/services';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  constructor(@Inject(NOTI_SERVICE) private notiClient: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  async bill(data: any) {
    this.logger.log('Billing...', data);
    await lastValueFrom(
      this.notiClient.emit('bill_created', {
        data,
      }),
    );
    // await session.commitTransaction();
  }
}
