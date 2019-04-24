import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';

import * as Joi from '@hapi/joi';
const Joi = require('@hapi/joi');

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/setNombre')
  setNombre(@Request() request, @Query() query, @Response() response){
    console.log(request.cookies);
    const cookies = request.cookies; //JSON

    const nombreUsuario = (request.cookies).nombre;
    const resultado = (request.cookies).numero;
    response.cookie('nombreUsuario', query.nombreUsuario);
    response.send(
        {
          'nombreUsuario': nombreUsuario,
          'resultado':  resultado
        });

  }
}
