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


    // @Controller(segmentoAccion)
    @Get('/suma') //Método HTTP GET
    @HttpCode(200)
    getSuma(@Headers() headers, @Request() request, @Response() response){
        const cookieSeguraPuntos = request.signedCookies.puntos;
        const cookieSeguraNombre = request.signedCookies.nombre;

        const total = Number(headers.num1) + Number(headers.num2);
        const puntosSobrantes = cookieSeguraPuntos - total;

        if(!cookieSeguraPuntos){
            response.cookie('puntos', 100, {signed:true});
        }
        if(!cookieSeguraNombre){
            response.cookie('nombre','Erick', {signed:true});
        }

        if(puntosSobrantes > 0){
            response.cookie('puntos', puntosSobrantes,{signed:true});
            response.cookie('resultado', total, {signed:true});
            const jsonRespuesta={
                'nombreUsuario': cookieSeguraNombre,
                'resultado': total,

            };
            response.send(jsonRespuesta);
        }else {
            const jsonRespuesta={
                'nombreUsuario': cookieSeguraNombre,
                'resultado': total,
                'mensaje': 'Se le terminaron los puntos'
            };
            response.send(jsonRespuesta);
        }
        console.log('Suma: ' + total);
        console.log('Puntos: ' + puntosSobrantes);

        //console.log(total);
        //return total.toString();
    }

    @Post('/resta') //Método HTTP POST
    @HttpCode(201)
    postResta(@Body() body, @Request() request, @Response() response) {
        const cookieSeguraPuntos = request.signedCookies.puntos;
        const cookieSeguraNombre = request.signedCookies.nombre;

        const total = Number(body.num1) - Number(body.num2);
        const puntosSobrantes = cookieSeguraPuntos - total;

        if(!cookieSeguraPuntos){
            response.cookie('puntos', 100, {signed:true});
        }
        if(!cookieSeguraNombre){
            response.cookie('nombre','Erick', {signed:true});
        }

        if(puntosSobrantes > 0){
            response.cookie('puntos', puntosSobrantes,{signed:true});
            response.cookie('resultado', total, {signed:true});
            const jsonRespuesta={
                'nombreUsuario': cookieSeguraNombre,
                'resultado': total,

            };
            response.send(jsonRespuesta);
        }else {
            const jsonRespuesta={
                'nombreUsuario': cookieSeguraNombre,
                'resultado': total,
                'mensaje': 'Se le terminaron los puntos'
            };
            response.send(jsonRespuesta);
        }
        console.log('Resta: ' + total);
        console.log('Puntos: ' + puntosSobrantes);

    }

    @Put('/multi') //Método HTTP PUT
    @HttpCode(202)
    putMulti(@Query() query, @Request() request, @Response() response) {
        const cookieSeguraPuntos = request.signedCookies.puntos;
        const cookieSeguraNombre = request.signedCookies.nombre;

        const total = Number(query.num1) * Number(query.num2);
        const puntosSobrantes = cookieSeguraPuntos - total;

        if(!cookieSeguraPuntos){
            response.cookie('puntos', 100, {signed:true});
        }
        if(!cookieSeguraNombre){
            response.cookie('nombre','Erick', {signed:true});
        }

        if(puntosSobrantes > 0){
            response.cookie('puntos', puntosSobrantes,{signed:true});
            response.cookie('resultado', total, {signed:true});
            const jsonRespuesta={
                'nombreUsuario': cookieSeguraNombre,
                'resultado': total,

            };
            response.send(jsonRespuesta);
        }else {
            const jsonRespuesta={
                'nombreUsuario': cookieSeguraNombre,
                'resultado': total,
                'mensaje': 'Se le terminaron los puntos'
            };
            response.send(jsonRespuesta);
        }
        console.log('Producto: ' + total);
        console.log('Puntos: ' + puntosSobrantes);
    }

    @Delete('/div') //Método HTTP DELETE
    @HttpCode(203)
    deleteDiv(@Headers() headers, @Body() body, @Request() request, @Response() response){
        const cookieSeguraPuntos = request.signedCookies.puntos;
        const cookieSeguraNombre = request.signedCookies.nombre;

        const total = Number(headers.num1) / Number(body.num2);
        const puntosSobrantes = cookieSeguraPuntos - total;

        if(!cookieSeguraPuntos){
            response.cookie('puntos', 100, {signed:true});
        }
        if(!cookieSeguraNombre){
            response.cookie('nombre','Erick', {signed:true});
        }

        if(puntosSobrantes > 0){
            response.cookie('puntos', puntosSobrantes,{signed:true});
            response.cookie('resultado', total, {signed:true});
            const jsonRespuesta={
                'nombreUsuario': cookieSeguraNombre,
                'resultado': total,

            };
            response.send(jsonRespuesta);

        }else {
            const jsonRespuesta={
                'nombreUsuario': cookieSeguraNombre,
                'resultado': total,
                'mensaje': 'Se le terminaron los puntos'
            };
            response.send(jsonRespuesta);
        }
        console.log('Cociente: ' + total);
        console.log('Puntos: ' + puntosSobrantes);

    }
}
