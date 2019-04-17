import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';


// http://192.168.1.10:3000/segmentoInicial
// http://192.168.1.10:3000/mascotas/crear
// http://192.168.1.10:3000/mascotas/crear

// @Controller(segmentoInicial)
//


@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

// @Controller(segmentoAccion)
  @Get('/hello-world') //Método HTTP
  getHello(): string {
    //return this.appService.getHello();
      return 'Hello world';
  }

  //POST: http://localhost:3000/api

  @Post('/hola-mundo') //Método HTTP
  postHello(): string {
      //return this.appService.getHello();
      return 'Hola mundo';
  }

    @Put('/salut-monde') //Método HTTP
    putHello(): string {
        //return this.appService.getHello();
        return 'Salut Monde';
    }

    @Delete('/ciao-mondo') //Método HTTP
    deleteHello(): string {
        //return this.appService.getHello();
        return 'Ciao mondo';
    }



    @Get('/adivina') //Método HTTP
    adivina(@Headers() headers): string {
        console.log('Headers: ', headers);
        const numeroRandomico = Math.round(Math.random()*10);
        const numeroDeCabecera = Number(headers.numero);

        if(numeroDeCabecera == numeroRandomico){
          return 'OK';
        }else{
            return ':(';
        }



/*
        let nombre: string = 'Erick'  //string
        let edad: number = 22;  //number
        let sueldo = 1.20;  //number
        let casado = false; //boolean
        let hijos = null;  //null
        let alas = undefined;  //undefined
*/

    }

    //?llave=valor&llave2=valor2
    @Get('/consultar')
    consultar(@Query() queryParams){
      if(queryParams.nombre){
          return `Hola ${queryParams.nombre}`
      }else{
          return 'Hola extraño'
      }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta){
      switch (parametrosRuta.idCiudad.toLowerCase()) {
          case 'quito':
              return 'Que fueff';

          case 'guayaquil':
              return 'Que maah ñañoshh';

          default:
              return 'Buenas tardes';
      }
      //return 'OK'
    }

    @Post('registroComida')
    registroComida(
        @Body() parametrosCuerpo,
        //@Request() request,
        @Response() response
    ){
      //console.log(request.body);
      //console.log(parametrosCuerpo);
        /*if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
            return 'Registro creado';
        }else{
            return 'ERROR, no envia nombre o cantidad';
        }*/

        if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
            const cantidad = Number(parametrosCuerpo.cantidad);
            if(cantidad>1){
                response.set('Premio','Fanesca');
            }
            return response.send({mensaje:'Registro Creado'});
        }else{
            return response.status(400).send({
                mensaje: 'ERROR, no envia nombre o cantidad',
                error: 400

            });
        }



      //return 'ok';
    }


    @Get('/semilla')
    semilla(@Request() request){
      console.log(request.cookies);
      //const noHayCookies = !request.cookies;
        const cookies = request.cookies;
      if(cookies.micookie){
          return 'ok'

      }else{
          return ':('
      }

    }



  //@HttpCode(200)
  /*postHello(){
    return 'Hola mundo en post';
  }*/
}


/* Segmento inicial: /api
    1) Segmento accion: GET 'hello-world' -> 'Hello world'
    2) Segmento accion: POST 'hola-mundo' -> 'Hola mundo'
    3) Segmento accion: PUT 'salut-monde' -> 'Salut monde'
    4) Segmento accion: DELETE 'ciao-mondo' -> 'Ciao mondo'
 */

//@nombreDecoradorClase
class usuario{
  //@decoradorAtributo
  atributoPublico; //sin modificador, por defecto es publico
  private atributoPrivado;
  protected atributoProtegido;

  constructor(/*@Parametro()*/ atributoPublico, /*@OtroParametro()*/ atributoPrivado, atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }

   /*@MetodoA() *//* @decorador funcion*/
  public metodoPublico(){}
 /* @MetodoB()*/
  private metodoPrivado(){}
  protected metodoProtegido(){}
}



const json = [
    {
        llave:'valor',
        "key":"value",
        "nombre":"Erick",
        edad: 22,
        sueldo: 10.21,
        casado: false,
        hijos: null,
        mascotas: ["cachetes",1,1.01,false,null,
            {
                "nombre":"cachetes"
            }
        ]

    }
];



//JS -> JSON

const erick = 'erick';

//TS

let mora: any = 'mora';


let objeto: any = {
  propiedad: 'valor',
    propiedad2: 'valor2'
};

objeto.propiedad //devuelve valor
objeto.propiedad2 //devuelve valor2


objeto.propiedad3 = 'valor3';
objeto['propiedad3'] = 'valor3';

//eliminar propiedad:
delete objeto.propiedad3; // ->destruir, peligroso
objeto.propiedad3 = undefined; // ->destruir, no peligroso