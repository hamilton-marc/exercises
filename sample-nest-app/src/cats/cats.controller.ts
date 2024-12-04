import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

interface Respondale {
  response: string;
}

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): Respondale[] {
    const response: Respondale = {
      response: 'This action returns all cats',
    };

    return [response];
  }
}
