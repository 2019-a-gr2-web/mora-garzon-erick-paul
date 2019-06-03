import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';
import {Paciente} from "./interfaces/paciente";
import {Medicamento} from "./interfaces/medicamento";


//import * as Joi from '@hapi/joi';
//import {log} from "util";

//const Joi = require('@hapi/joi');

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login') //Método HTTP
  getLogin(@Response() res){
    return res.render(
        'login')
  }

  @Get('/inicio')
  getInicio(@Response() res, @Request() req) {
    const cookieSegura = req.signedCookies;
    return res.render('inicio', {
      nombre: cookieSegura.nombreUsuario
    })
  }

  @Get('/pacientes')
  getPacientes(@Response() res, @Request() req){
    const cookieSegura = req.signedCookies;
    const arregloPacientes= this.appService.bddPacientes;

    if (cookieSegura.nombreUsuario) {

      res.render('gestionar_paciente', {arregloPacientes: arregloPacientes, nombre: cookieSegura.nombreUsuario});
    }else {
      return res.redirect('/api/login');
    }
  }

  @Get('/crear-paciente')
  getCrearPaciente(@Response() res, @Request() req){
    const cookieSegura = req.signedCookies;

    return res.render('crear_paciente', {nombre: cookieSegura.nombreUsuario});
  }

  @Post('/login')
  postLogin(@Request() req, @Response() resp, @Headers() header, @Body('nombre') nombre: string) {
    const cookieSegura = req.signedCookies;
    if (!cookieSegura.nombreUsuario) {

      resp.cookie('nombreUsuario', nombre,{signed: true});
      cookieSegura.nombreUsuario=nombre;


    }
    if (cookieSegura.nombreUsuario) {

      resp.redirect('/api/inicio');
    }
    else{
      return resp.redirect('/api/login');
    }

  }

  @Post('/salir')
  postEliminarCookie(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string){
    response.clearCookie("nombreUsuario");
    response.redirect('/api/login')
  }

  @Post('/crear-paciente')
  postCrearPaciente(
      @Body() paciente:Paciente,
      @Response() res
  ){
    paciente.nombres = String(paciente.nombres);
    paciente.apellidos = String(paciente.apellidos);
    paciente.fechaNacimiento =new Date(paciente.fechaNacimiento);
    paciente.hijos=Number(paciente.hijos);
    paciente.tieneSeguro = Boolean(paciente.tieneSeguro);
      console.log(paciente);
      this.appService.crearPaciente(paciente);
      res.redirect('/api/pacientes');

  }

  @Post('/eliminarPaciente')
  postEliminarPaciente(@Response() res, @Body('id') id: number, @Request() request) {
    this.appService.eliminarPacientePorId(Number(id));
    res.redirect('/api/pacientes');
  }

  @Post('/buscarPaciente')
  postBuscarPaciente(@Response() res, @Body('busquedaConductor') nombre: string, @Request() request) {
    const cookieSegura = request.signedCookies;
    var arregloPacientes=this.appService.buscarPacientePorNombre(nombre);
    if(arregloPacientes!=null){
      res.render('gestionar_paciente', {arregloPacientes:arregloPacientes,nombre:cookieSegura.nombreUsuario})
    }else {
      res.redirect('/api/pacientes');
    }
  }






  @Get('/medicamento/:id')
  getMedicamentos(@Param() params, @Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {

    this.appService.idPaciente = Number(params.id);
    const cookieSegura = request.signedCookies;
    const arregloMed= this.appService.bddMedicamentos;

    if (cookieSegura.nombreUsuario) {
      return response.render('gestionar_medicamento',{id:this.appService.idPaciente, arregloMed:arregloMed, nombre:cookieSegura.nombreUsuario})
    }
    else{
      return response.render('login');
    }

  }


  @Get('/crear-medicamento')
  getCrearMedicamento(@Response() res, @Request() req){
    const cookieSegura = req.signedCookies;

    return res.render('crear_medicamento', {nombre: cookieSegura.nombreUsuario});
  }





  @Post('/crear-medicamento')
  postCrearMedicamento(
      @Body() medicamento:Medicamento,
      @Response() res
  ){

    medicamento.gramosAIngerir = Number(medicamento.gramosAIngerir);
    medicamento.nombre = String(medicamento.nombre);
    medicamento.composicion = String(medicamento.composicion);
    medicamento.usadoPara = String(medicamento.usadoPara);
    medicamento.fechaCaducidad =new Date(medicamento.fechaCaducidad);
    medicamento.numeroPastillas = Number(medicamento.numeroPastillas);
    medicamento.pacienteId = Number(medicamento.pacienteId);
    console.log(medicamento);
    this.appService.crearMedicamento(medicamento);
    res.redirect('/api/medicamento/:1');

  }

  @Post('/eliminarMedicamento')
  postEliminarMedicamento(@Response() res, @Body('id') id: number, @Request() request) {
    this.appService.eliminarMedicamentoPorId(Number(id));
    res.redirect('/api/medicamento/:1');
  }


}
