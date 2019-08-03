import { Module } from "@nestjs/common";
import { EstudianteController } from "./estudiante.controller";
import { EstudianteService } from "./estudiante.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstudianteEntity } from "./estudiante.entity";
import { LoginModule } from "../Login/login.module";

@Module({
    imports:[
        LoginModule,
        TypeOrmModule.forFeature(
            [
                EstudianteEntity
            ],
            'default'
        )
    ],
    controllers:[
        EstudianteController,
    ],
    providers:[
        EstudianteService,
    ],
    exports:[
        EstudianteService,
    ]
})

export class EstudianteModule{

}