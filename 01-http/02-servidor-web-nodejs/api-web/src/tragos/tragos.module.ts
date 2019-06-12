
import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";
import {TypeOrmModule} from '@nestjs/typeorm'; //para usar orm
import {TragosEntity} from "./tragos.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                TragosEntity
            ],
            'default'
        ),
    ], //Modulos
    controllers:[
        TragosController
    ], //Controladores
    providers:[
        TragosService
    ], //Servicios
    exports:[
        TragosService
    ] //Exportar servicios
})

export class TragosModule{

}