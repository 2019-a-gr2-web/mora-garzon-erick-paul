
import {Module} from "@nestjs/common";
// {TragosController} from "./tragos.controller";
//import {TragosService} from "./tragos.service";
import {TypeOrmModule} from '@nestjs/typeorm'; //para usar orm
import {FiestaEntity} from "./fiesta.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                FiestaEntity
            ],
            'default'
        ),
    ], //Modulos
    controllers:[
        //TragosController
    ], //Controladores
    providers:[
        //TragosService
    ], //Servicios
    exports:[
        //TragosService
    ] //Exportar servicios
})

export class FiestaModule{

}