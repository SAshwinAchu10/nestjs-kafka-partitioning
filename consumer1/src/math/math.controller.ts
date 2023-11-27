import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { MATH_SERVICE } from './math.constants';

@Controller()
export class MathController {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

  @EventPattern('topic-test-3')
  sum(data: number[]) {
    console.log('data: ', data);
    return data;
  }
}
