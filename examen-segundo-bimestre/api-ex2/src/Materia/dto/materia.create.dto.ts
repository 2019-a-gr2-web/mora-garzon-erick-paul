import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { EstudianteEntity } from "../../Estudiante/estudiante.entity";


export class MateriaCreateDto{

    @IsEmpty()
    materiaId?:number;

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsString()
    @IsOptional()
    descripcion:string;

    @IsNumber()
    @IsNotEmpty()
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