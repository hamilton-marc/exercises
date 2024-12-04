import { Controller, Get } from '@nestjs/common';

interface Respondale {
  response: string;
}

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): Respondale[] {
    const response: Respondale = {
      response: 'This action returns all cats',
    };

    return [response];
  }
}
