import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MateriaEntity } from "../Materia/materia.entity";

@Entity('Estudiante')
export class EstudianteEntity{
    @PrimaryGeneratedColumn()
    EstudianteId:number;

    @Column({
        length:100,
    })
    nombre:string;

    @Column({
        length:300,
    })
    apellido:string;

    @Column({
        default:'2019-07-30',
    })
    fechaNacimiento:Date;

    @Column({
        length:13,
    })
    semestreActual: string; //number se sale del rango

    @Column({
        default:true,
    })
    graduado: boolean;

    @OneToMany(
        type => MateriaEntity,
        producto => producto.EstudianteId
    )
    productos:MateriaEntity[];

}