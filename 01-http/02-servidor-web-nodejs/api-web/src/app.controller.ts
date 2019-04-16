import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(200)
  postHello(){
    return 'Hola mundo en post';
  }
}

@nombreDecoradorClase
class usuario{
  @decoradorAtributo
  atributoPublico; //sin modificador, por defecto es publico
  private atributoPrivado;
  protected atributoProtegido;

  constructor(@Parametro() atributoPublico, @OtroParametro() atributoPrivado, atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }

   @MetodoA() /* @decorador funcion*/
  public metodoPublico(){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}
}