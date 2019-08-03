import { Module } from "@nestjs/common";
import { MateriaService } from "./materia.service";
import { MateriaController } from "./materia.controller";
import { LoginModule } from "../Login/login.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MateriaEntity } from "./materia.entity";

@Module({
    imports:[
        LoginModule,
        TypeOrmModule.forFeature([
                MateriaEntity
            ],
            'default'),
    ],
    controllers:[
        MateriaController
    ],
    providers:[
        MateriaService
    ],
    exports:[
        MateriaService
    ]
})
export class MateriaModule{

}