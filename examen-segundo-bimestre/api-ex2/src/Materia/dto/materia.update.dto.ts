import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { EstudianteEntity } from "../../Estudiante/estudiante.entity";


export class MateriaUpdateDto{

    @IsEmpty()
    materiaId?:number;

    @IsString()
    @IsOptional()
    descripcion:string;

    @IsNumber()
    precio:number;

    @IsDate()
    @IsOptional()
    fechaCreacion:Date;

    @IsNumber()
    @IsOptional()
    numHoras:number;

    @IsNotEmpty()
    EstudianteId:EstudianteEntity;

}