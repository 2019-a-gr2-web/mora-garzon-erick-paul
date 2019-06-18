import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ManyToOne} from "typeorm/browser";
import {TragosEntity} from "../tragos/tragos.entity";

@Entity('db_fiesta') // Nombre tabla
export class FiestaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(type => TragosEntity, trago=>trago.fiestas)
    tragoId: TragosEntity;

}