import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { EstudianteEntity } from "../Estudiante/estudiante.entity";
import { DetalleEntity } from "../Detalle/detalle.entity";

@Entity('Materia')
export class MateriaEntity{
    @PrimaryGeneratedColumn()
    materiaId:number;

    @Column({
        length:100,
    })
    nombre:string;

    @Column({
        length:300,
    })
    descripcion:string;

    @Column({
    })
    precio: number;

    @Column({
        default:'2019-07-30',
    })
    fechaCreacion:Date;

    @Column({
        default: 1,
    })
    numHoras: number;

    @ManyToOne(
        type => EstudianteEntity,
        tienda=> tienda.productos
    )
    EstudianteId:EstudianteEntity;

    @OneToMany(
        type => DetalleEntity,
        detalle=> detalle.materiaId
    )
    detalles:DetalleEntity[];


}