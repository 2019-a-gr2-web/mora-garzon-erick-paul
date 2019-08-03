import { Controller, Get, Res, Req, Session, Body, Post, Query } from "@nestjs/common";
import { MateriaService } from "./materia.service";
import { LoginService } from "../Login/login.service";
import { MateriaCreateDto } from "./dto/materia.create.dto";
import { MateriaEntity } from "./materia.entity";
import { validate } from "class-validator";

@Controller('api/tienda/gestion')
export class MateriaController {
    constructor(
        private readonly _productosService: MateriaService,
        private readonly _loginService: LoginService
    ) {

    }
    @Get(':idPadre')
    async gestionar(
        @Res() res,
        @Req() req,
        @Session() session
    ) {
        console.log(Number(req.params.idPadre));
        try {
            const listaProductos = await this._productosService.
            listaProductos(Number(req.params.idPadre));
            console.log(listaProductos);
            res.render('Administrador/gestionProductos.ejs', {
                usuario: session.username,
                listaProductos: listaProductos,
                idPadre: Number(req.params.idPadre)
            });
        } catch (e) {
            console.error(e)
        }
    }
    @Get('crear/:idPadre')
    crear(
        @Res() res,
        @Req() req,
        @Query() query,
        @Session() session

    ) {
        //console.log("Ha llegado: ",query);
        const hoy = new Date();

        let fecha;
        //console.log(query.fechaCreacion)
        if (query.fechaCreacion == null) {
            fecha = hoy
        } else {
            fecha = new Date(query.fechaCreacion)
        }

        let mes = fecha.getMonth() + 1;
        let dia = fecha.getDate();
        if (mes < 10) {
            mes = "0" + mes;
        };
        if (dia < 10) {
            dia = "0" + dia;
        }
        const fechaLanzamiento = fecha.getFullYear() + "-" + mes + "-" + dia;

        //console.log(fecha);
        //if(this._loginService.validarCookies(req,res)){
        res.render('Administrador/crear-editar.ejs', {
            //usuario:req.signedCookies.usuario,
            usuario: session.username,
            idPadre: req.params.idPadre,
            mensaje: query.mensaje,
            campos: query.campos,
            nombre: query.nombre,
            fechaLanzamiento: fechaLanzamiento,
            aniosGarantia: query.numHoras,
            precio: query.precio,
            descripcion: query.descripcion
        });
        //}
    }

    @Post('crear/:idPadre')
    async crearPost(
        @Res() res,
        @Body() producto: MateriaEntity,
        @Req() req
    ) {
        console.log("ha llegado el producto:  ",producto);
        producto.EstudianteId = req.params.idPadre;
        //producto.tiendaId = Number(producto.tiendaId);
        producto.precio = Number(producto.precio);
        producto.numHoras = Number(producto.numHoras);
        producto.fechaCreacion = producto.fechaCreacion ? new Date(producto.fechaCreacion) : undefined;

        console.log("transformado:  ",producto);

        //console.log(producto);
        let productoValidar = new MateriaCreateDto()

        productoValidar.nombre = producto.nombre;
        productoValidar.fechaCreacion = producto.fechaCreacion;
        productoValidar.numHoras = producto.numHoras;
        productoValidar.descripcion = producto.descripcion;
        productoValidar.precio = producto.precio;
        productoValidar.EstudianteId = producto.EstudianteId;
        try {
            const errores = await validate(productoValidar);
            console.log("error: ",errores);
            if (errores.length > 0) {
                const valores = (<MateriaCreateDto>errores[0].target)

                const campos = [];
                errores.forEach(value => {
                    console.log(value.property);
                    campos.push(value.property);
                });
                const inputs = "&nombre=" + valores.nombre + "&fechaLanzamiento=" + valores.fechaCreacion + "&aniosGarantia=" + valores.numHoras + "&precio=" + valores.precio + "&descripcion=" + valores.descripcion
                res.redirect('/api/tienda/gestion/crear/' + Number(req.params.idPadre) + "?mensaje=Complete los campos obligatorios " + inputs);
            } else {
                const respuestaCrear = await this._productosService.crear(producto);
                res.redirect('/api/tienda/gestion/' + Number(req.params.idPadre));
            }


        } catch (e) {
            //console.error(e);
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }
    }

    @Post('eliminar/:idPadre')
    async eliminar(
        @Res() res,
        @Req() req,
        @Body('materiaId') productoId: number
    ) {
        //console.log(productoId)

        try {
            const respuestaEliminar = await this._productosService.eliminarPorId(productoId);
            //console.log(respuestaEliminar);
            res.redirect('/api/tienda/gestion/' + Number(req.params.idPadre));
        } catch (e) {
            console.error(e)
        }

    }

    @Post('editar/:idPadre')
    async editar(
        @Res() res,
        @Req() req,
        @Body('materiaId') productoId: number,
        @Session() session
    ) {
        console.log(productoId);

        try {
            //const respuestaEditar=await this._productosService.eliminarPorId(productoId);
            const producto = await this._productosService.buscarXid(productoId)
            res.render('Administrador/crear-editar.ejs', {
                //usuario:req.signedCookies.usuario,
                usuario: session.username,
                idPadre: req.params.idPadre,


            });

        } catch (e) {
            console.error(e)
        }

    }

    @Post('buscar/:idPadre')
    async buscar(
        @Res() res,
        @Req() req,
        @Body() body,
        @Session() session
    ) {

        console.log(body);

        //if(this._loginService.validarCookies(req,res)){


        try {
            const listaProductos = await this._productosService.buscar(body.nombreBusqueda);
            res.render('Administrador/gestionProductos.ejs', {
                //usuario:req.signedCookies.usuario,
                usuario: session.username,
                listaProductos: listaProductos,
                idPadre: req.params.idPadre
            });
        } catch (e) {
            console.log(e)
        }
        //}
    }


    @Get('consultaProductos')
    async productos(@Res() res,
                    @Req() req
    ) {
        console.log(Number(req.params.idPadre));

        try {

            const listaProductos = await this._productosService.listarTodo();

            console.log(listaProductos);
            res.render({
                listaProductos: listaProductos
            });

        }
        catch (e) {
            console.error(e)
        }
    }

    @Post('consultar-por-id/:pedido')
    //@Render ('api/menu')
    async consultar(
        @Req() req,
        @Body() body,
        @Session() session,
        @Res() res
    ) {
        try {

            const listaProductos = await this._productosService.listaProductos(Number(body.tiendaId));
            console.log(listaProductos);
            res.redirect('/api/menu?pedido=' + req.params.pedido + "&tienda=" + body.tiendaId);
        }
        catch (e) {
            console.error(e)
        }
    }
}