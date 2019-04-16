import {Controller, Delete, Get, HttpCode, Post, Put, Headers} from '@nestjs/common';
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