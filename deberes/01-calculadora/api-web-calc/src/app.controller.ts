import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Body} from '@nestjs/common';
import { AppService } from './app.service';

// @Controller(segmentoInicial)
@Controller('/calc')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

// @Controller(segmentoAccion)
  @Get('/suma') //Método HTTP GET
  @HttpCode(200)
  getSuma(@Headers() headers): string {
    const total = Number(headers.num1) + Number(headers.num2);
    console.log(total);
    return total.toString();
  }

  @Post('/resta') //Método HTTP POST
  @HttpCode(201)
  postResta(@Body() body): string {
    const total = Number(body.num1) - Number(body.num2);
    console.log(total);
    return total.toString();
  }

  @Put('/multi') //Método HTTP PUT
  @HttpCode(202)
  putMulti(@Query() query): string {
    const total = Number(query.num1) * Number(query.num2);
    console.log(total);
    return total.toString();
  }

  @Delete('/div') //Método HTTP DELETE
  @HttpCode(203)
  deleteDiv(@Headers() headers, @Body() body): string {
    const total = Number(headers.num1) / Number(body.num2);
    console.log(total);
    return total.toString();
  }
}

