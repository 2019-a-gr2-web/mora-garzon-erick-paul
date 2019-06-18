import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {OneToMany} from "typeorm/browser";
import {TragosEntity} from "../tragos/tragos.entity";

@Entity('db_distribuidor') // Nombre tabla
export class DistribuidorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(type => TragosEntity, trago => trago.distribuidorId)
    tragos:TragosEntity[];

}