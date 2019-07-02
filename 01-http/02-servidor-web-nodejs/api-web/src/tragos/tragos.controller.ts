import {Body, Controller, Get, Param, Post, Query, Res, Response} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";
import {TragosUpdateDto} from "./dto/tragos.update.dto";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {

    }

    @Get('lista')
    async listaTragos(
        @Res() res
    ) {
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos', {
            arregloTragos: arregloTragos
        })

    }

    @Get('crear')
    crearTrago(
        @Res() res,
        @Query('mensaje') mensaje: string,
    ) {
        res.render(
            'tragos/crear-editar', {
                mensaje: mensaje
            }
        )
    }


    @Post('crear')
    async crearTragoPost(
        @Body() trago: Trago,
        @Res() res,
        /*@Body('nombre') nombre:string,
        @Body('tipo') tipo:string,
        @Body('gradosAlcohol') gradosAlcohol:number,
        @Body('fechaCaducidad') fechaCaducidad:Date,
        @Body('precio') precio:number,*/
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;


        let tragoAValidar = new TragosCreateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;


        try {

            const errores = await validate(tragoAValidar);

            if (errores.length > 0) {
                console.error(errores);
                //res.status(400);
                //res.send({mensaje: 'Error', codigo: 400});
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario&campos=nombre');
            } else {

                const respuestaCrear = await this._tragosService
                    .crear(trago); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);

                res.redirect('/api/traguito/lista');
            }

            const respuestaCrear = await this._tragosService.crear(trago); //promesa

            console.log('Respuesta: ', respuestaCrear);
            res.redirect('/api/traguito/lista');
        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }


        /* console.log('Trago: ', trago, typeof trago);
         console.log('Nombre: ', nombre, typeof nombre);
         console.log('Tipo: ', tipo, typeof tipo);
         console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
         console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
         console.log('Precio: ', precio, typeof precio);*/

    }

    @Post('eliminar')
    async eliminarTragoPost(
        @Body() trago: Trago,
        @Res() res,
    ) {

        try {
            const respuestaEliminar = await this._tragosService.eliminar(trago.id); //promesa

            console.log('Respuesta: ', respuestaEliminar);
            res.redirect('/api/traguito/lista');
            /*trago.id = Number(trago.id);

            this._tragosService.eliminarPorId(trago.id);

            res.redirect('/api/traguito/lista')*/
        }
        catch (e) {
                console.error(e);
                res.status(500);
                res.send({mensaje: 'Error', codigo: 500})
            }
    }


    @Get('editar/:id')
    editarTrago(
        @Res() res,
        @Param() param,
        @Query('mensaje') mensaje: string,
    ) {
        res.render(
            'tragos/crear-editar', {
                mensaje: mensaje
            }
        )
    }



    @Post('editar')
    async editarTragoPost(
        @Body() trago: Trago,
        @Res() res,
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;

        let tragoAValidar = new TragosUpdateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try {
            const errores = await validate(tragoAValidar);

            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/traguito/editar/'+trago.id+'?mensaje=Tienes un error en el formulario&campos=nombre');
            } else {

                const respuestaEditar = await this._tragosService
                    .actualizar(trago, trago.id); // Promesa

                console.log('RESPUESTA: ', respuestaEditar);

                res.redirect('/api/traguito/lista');
            }
        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500})
        }
    }




}