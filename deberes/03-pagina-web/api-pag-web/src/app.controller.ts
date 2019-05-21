import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/

  //controlador
  @Get('inicio') //endpoint
  inicio(
      @Response() res
  ){
    return res.render(
        'inicio');

  }
/*
  @Get('estilos') //endpoint renderizar
  estilos(
      @Response() res
  ){
    return res.render(
        'peliculas/estilos');


  }*/
}
