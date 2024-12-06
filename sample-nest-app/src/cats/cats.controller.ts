import { Controller, Get } from '@nestjs/common';

interface Respondible {
  response: string;
}

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): Respondible[] {
    const response: Respondible = {
      response: 'This action returns all cats',
    };

    return [response];
  }
}
