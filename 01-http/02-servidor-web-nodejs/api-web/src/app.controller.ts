import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Put,
    Headers,
    Query,
    Param,
    Body,
    Request,
    Response,
    Session, Res
} from '@nestjs/common';
import {AppService} from './app.service';

import * as Joi from '@hapi/joi';
import {log} from "util";

const Joi = require('@hapi/joi');


// http://192.168.1.10:3000/segmentoInicial
// http://192.168.1.10:3000/mascotas/crear
// http://192.168.1.10:3000/mascotas/crear

// @Controller(segmentoInicial)
//

@Controller('/api')
export class AppController {
    arregloUsuarios = [];

    constructor(private readonly appService: AppService) {


    }


    @Get('session')
    session(
        @Query('nombre') nombre,
        @Session() session
    ) {
        console.log(session);

        session.autenticado = true;
        session.nombreUsuario = nombre;

        return 'ok';
    }


    @Get('login')
    loginVista(
        @Res() res
    ) {
        res.render('login')
    }

    @Post('login')
    login(
        @Body() usuario,
        @Session() session,
        @Res() res
    ){
        if(usuario.username === 'erick' && usuario.password === '123456789'){
// QUE HACEMOS
            session.username = usuario.username;
            res.redirect('/api/protegida');
        }else{
            res.status(400);
            res.send({mensaje:'Error login',error:400})
        }
    }

    @Get('protegida')
    protegida(
        @Session() session,
        @Res() res
    ){
        if(session.username){
            res.render('/api/protegida',{
                nombre:session.username});
        }else{
            res.redirect('/login');
        }
    }


    @Get('logout')
    logout(
        @Res() res,
        @Session() session,
    ){
        session.username = undefined;
        session.destroy();
        res.redirect('/login');
    }


// @Controller(segmentoAccion)
    @Get('/hello-world') //Método HTTP
    getHello(): string {
        //return this.appService.getSuma();
        return 'Hello world';
    }

    //POST: http://localhost:3000/api

    @Post('/hola-mundo') //Método HTTP
    postHello(): string {
        //return this.appService.getSuma();
        return 'Hola mundo';
    }

    @Put('/salut-monde') //Método HTTP
    putHello(): string {
        //return this.appService.getSuma();
        return 'Salut Monde';
    }

    @Delete('/ciao-mondo') //Método HTTP
    deleteHello(): string {
        //return this.appService.getSuma();
        return 'Ciao mondo';
    }


    @Get('/adivina') //Método HTTP
    adivina(@Headers() headers): string {
        console.log('Headers: ', headers);
        const numeroRandomico = Math.round(Math.random() * 10);
        const numeroDeCabecera = Number(headers.numero);

        if (numeroDeCabecera == numeroRandomico) {
            return 'OK';
        } else {
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
    consultar(@Query() queryParams) {
        if (queryParams.nombre) {
            return `Hola ${queryParams.nombre}`
        } else {
            return 'Hola extraño'
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta) {
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
    ) {
        //console.log(request.body);
        //console.log(parametrosCuerpo);
        /*if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
            return 'Registro creado';
        }else{
            return 'ERROR, no envia nombre o cantidad';
        }*/

        if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if (cantidad > 1) {
                response.set('Premio', 'Fanesca');
            }
            return response.send({mensaje: 'Registro Creado'});
        } else {
            return response.status(400).send({
                mensaje: 'ERROR, no envia nombre o cantidad',
                error: 400

            });
        }


        //return 'ok';
    }


    @Get('/semilla')
    semilla(@Request() request, @Response() response) {
        console.log(request.cookies);
        //const noHayCookies = !request.cookies;
        const cookies = request.cookies; //JSON
        const esquemaValidacionNumero = Joi.object().keys({
            numero: Joi.number().integer().required()
        });

        const objetoValidacion = {
            numero: cookies.numero
        };

        const resultado = Joi.validate(
            objetoValidacion, esquemaValidacionNumero
        );
        if (resultado.error) {
            console.log('Resultado: ', resultado);
        }
        else {
            console.log('Número valido');
        }

        const cookieSegura = request.signedCookies.fechaServidor;
        if (cookieSegura) {
            console.log('Cookie segura', cookieSegura);
        }
        else {
            console.log('No es valida esta cookie');
        }
        /*
              if(cookies.micookie){
                  return 'ok'

              }else{
                  return ':('
              }*/
        if (cookies.micookie) {
            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);
            response.cookie('fechaServidor' //NOMBRE (key)
                , new Date().getTime(),    //VALOR (value)
                { //opciones
                    //expires: horaFechaServidor
                    signed: true
                }
            );
            return response.send('ok')

        } else {
            return response.send(':(')
        }

    }


//controlador
    @Get('inicio') //endpoint
    inicio(
        @Response() res
    ) {
        return res.render(
            'inicio',
            {
                estaVivo: true
            });

    }

    @Get('peliculas') //endpoint
    peliculas(
        @Response() res
    ) {
        return res.render(
            'peliculas/inicio',
            {
                //estaVivo: false
            });

    }


    @Get('estilos') //endpoint renderizar
    estilos(
        @Response() res
    ) {
        return res.render(
            'peliculas/estilos');


    }


    /*
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
    */


    //@HttpCode(200)
    /*postResta(){
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
class usuario {
    //@decoradorAtributo
    atributoPublico; //sin modificador, por defecto es publico
    private atributoPrivado;
    protected atributoProtegido;

    constructor(/*@Parametro()*/ atributoPublico, /*@OtroParametro()*/ atributoPrivado, atributoProtegido) {
        this.atributoPublico = atributoPublico;
        this.atributoPrivado = atributoPrivado;
        this.atributoProtegido = atributoProtegido;
    }

    /*@MetodoA() */

    /* @decorador funcion*/
    public metodoPublico() {
    }

    /* @MetodoB()*/
    private metodoPrivado() {
    }

    protected metodoProtegido() {
    }
}


const json = [
    {
        llave: 'valor',
        "key": "value",
        "nombre": "Erick",
        edad: 22,
        sueldo: 10.21,
        casado: false,
        hijos: null,
        mascotas: ["cachetes", 1, 1.01, false, null,
            {
                "nombre": "cachetes"
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


function holaMundo() {
    console.log('Hola mundo');
}

const respuestaHolaMundo = holaMundo(); // undefined
console.log('resp hola mundo: ', respuestaHolaMundo);

function suma(a: number, b: number): number {
    return a + b;
}

const respuestaSuma = suma(1, 2); //undefined
console.log('Resp suma: ', respuestaSuma);


//Condicionales
//Truty -> true
//Falsy -> false
if (true) { //truty
    console.log('Verdadero');

}
else {
    console.log('falso')
}

if (false) { //falsy
    console.log('Verdadero');

}
else {
    console.log('falso')
}


if ("") { //Falsy
    console.log('Verdadero "" ');

}
else {
    console.log('falso "" ')
}

if ("a") { //Truty
    console.log('Verdadero "a" ');

}
else {
    console.log('falso "a" ')
}

if (0) { //Falsy
    console.log('Verdadero 0 ');

}
else {
    console.log('falso 0 ')
}

if ("0") { //Truty
    console.log('Verdadero "0" ');

}
else {
    console.log('falso "0" ')
}

if (-1) { //Truty
    console.log('Verdadero -1 ');

}
else {
    console.log('falso -1 ')
}

if (1) { //truty
    console.log('Verdadero 1 ');

}
else {
    console.log('falso 1 ')
}

if (undefined) { //falsy
    console.log('Verdadero undefined ');

}
else {
    console.log('falso undefined ')
}

if (null) { //falsy
    console.log('Verdadero null ');

}
else {
    console.log('falso null ')
}

if ({}) { //truty
    console.log('Verdadero null ');

}
else {
    console.log('falso null ')
}


//Operadores de arreglos en JS

const arreglo: any = [
    function () {
        return '0'
    },
    1, 'A', true, null, {}, []];

const arregloNumeros = [1, 2, 3, 4, 5, 6];

// 1) Impriman en consola todos los elementos

const arregloNumerosForEach = [1, 2, 3, 4, 5, 6];
arregloNumerosForEach.forEach(
    function (valorActual, indice, arreglo) {
        console.log(`Valor: ${valorActual}`)
        //console.log(`Indice: ${indice}`)
        //console.log(`Arreglo: ${arreglo}`)
    }
);


const rForEach = arregloNumerosForEach.forEach(
    function (valorActual) {
        console.log(`Valor: ${valorActual}`)

    }
);
console.log(`Respuesta foreach: ${rForEach}`)


const r2ForEach = arregloNumerosForEach.forEach(
    n => console.log(`${n}`)
);
console.log(`Respuesta foreach: ${r2ForEach}`)


// 2) Sumar 2 a los pares y 1 a los impares
const arregloNumerosMap = [1, 2, 3, 4, 5, 6];

const rMap = arregloNumerosMap.map( // Devolver el nuevo valor de ese elemento
    (valorActual) => {
        const esPar = valorActual % 2 == 0;
        if (esPar) {
            const nuevoValor = valorActual + 2;
            return nuevoValor;

        } else {
            const nuevoValor = valorActual + 1;
            return nuevoValor;
        }
    }
);
console.log(`Respuesta map: ${rMap}`); //nuevo arreglo

// 3) Encontrar el numero 4

const arregloNumerosFind = [1, 2, 3, 4, 5, 6];

const rFind = arregloNumerosFind.find( //condicion para devolver ese elemento
    (valorActual) => {
        return valorActual == 4;
    }
);
console.log(`Respuesta FIND: ${rFind}`);

// 4) Filtrar numeros menores a 5

const arregloNumerosFilter = [1, 2, 3, 4, 5, 6];

const rFilter = arregloNumerosFilter.filter( //Condicion true: -> Agrega al arreglo
    //Condicion false: -> Se omite del arreglo
    (valorActual) => {
        return valorActual < 5;
    }
);
console.log(`Respuesta Filter: ${rFilter}`);


// 5) Si todos los valores son positivos

const arregloNumerosEvery = [1, 2, 3, 4, 5, 6];

const respuestaEvery = arregloNumerosEvery.every( //si todos cumplen, devuelve true
    //si alguno no cumple, devuelve false
    (valorActual) => {
        return valorActual > 0
    }
);
console.log(respuestaEvery); //true


// 6) Algun valor es menor a 2

const arregloNumerosSome = [1, 2, 3, 4, 5, 6];

arregloNumerosSome.some( //si alguno cumple la condición, devuelve true
    //si todos no cumplen, devuelve false
    (valorActual) => {
        return valorActual < 2
    }
);

// 7) Sumar todos los valores

const arregloNumerosReduce = [1, 2, 3, 4, 5, 6];
const valorDondeEmpiezaCalculo = 0;

const respuestaReduce = arregloNumerosReduce.reduce(
    /*(0, 1)=>{
        return 0 +1*/
    (acumulado, valorActual) => {
        return acumulado + valorActual;

    },
    valorDondeEmpiezaCalculo
);
console.log(respuestaReduce);

// 8) Restar todos los valores de 100

const arregloNumerosReduce3 = [1, 2, 3, 4, 5, 6];
const valorDondeEmpieza3 = 100;

const respuestaReduce3 = arregloNumerosReduce.reduce(
    (acumulado, valorActual) => {
        //if(valorActual<4) {
        return valorDondeEmpieza3 - valorActual;
        /* }
         else{
             return acumulado + valorActual * 1.15 + 3;
         }*/

    },
    valorDondeEmpieza3
);
console.log(`Respuesta reduce 3: ${respuestaReduce3}`);

//numeros menores a 4: +(10%) + (5)
//>= 4: +(15%) + (3)

const arregloNumerosReduce2 = [1, 2, 3, 4, 5, 6];

const respuestaReduce2 = arregloNumerosReduce.reduce(
    (acumulado, valorActual) => {
        if (valorActual < 4) {
            return acumulado + valorActual * 1.1 + 5;
        }
        else {
            return acumulado + valorActual * 1.15 + 3;
        }

    },
    valorDondeEmpiezaCalculo
);
console.log(`Respuesta reduce 2: ${respuestaReduce2}`);


// 1.1) Sumar 10 a todos
// 1.2) Filtren a los mayores a 15
// 1.3) Si hay algún número mayor a 30

const arregloEjercicio = [1, 2, 3, 4, 5, 6];

arregloEjercicio.map((valorActual) => {
    return valorActual + 10;
}).filter(
    (valorActual) => {
        return valorActual > 15;
    }
).some(
    (valorActual) => {
        return valorActual > 30;
    }
);

