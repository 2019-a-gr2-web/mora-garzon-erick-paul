import {Body, Controller, Get, Post, Res, Response} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService:TragosService){

    }

    @Get('lista')
    listaTragos (
        @Res() res
    ){
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })

    }

    @Get('crear')
    crearTrago(
        @Res() res
    ){
        res.render('tragos/crearPaciente-editar')
    }


    @Post('crear')
    crearTragoPost(
        @Body() trago:Trago,
        @Res() res,
        /*@Body('nombre') nombre:string,
        @Body('tipo') tipo:string,
        @Body('gradosAlcohol') gradosAlcohol:number,
        @Body('fechaCaducidad') fechaCaducidad:Date,
        @Body('precio') precio:number,*/
    ){
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);


        this._tragosService.crear(trago);

        res.redirect('/api/traguito/lista')

        /* console.log('Trago: ', trago, typeof trago);
         console.log('Nombre: ', nombre, typeof nombre);
         console.log('Tipo: ', tipo, typeof tipo);
         console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
         console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
         console.log('Precio: ', precio, typeof precio);*/

    }

    @Post('eliminar')
    eliminarTragoPost(
        @Body() trago:Trago,
        @Res() res,

    ){
        trago.id = Number(trago.id);

        this._tragosService.eliminarPorId(trago.id);

        res.redirect('/api/traguito/lista')

    }
}