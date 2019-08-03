import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { MateriaEntity } from "../MAteria/materia.entity";
import { PedidoEntity } from "../Pedido/pedido.entity";

@Entity('detalle')
export  class DetalleEntity {

    @PrimaryGeneratedColumn()
    detalleId:number;

    /*  @Column({
          default: 1,
      })
      cantidad:number;
  */
    @ManyToOne(
        type => MateriaEntity,
        materia=> materia.detalles
    )
    materiaId:MateriaEntity;

    @ManyToOne(type => PedidoEntity,
        pedido=> pedido.detalles)
    pedidoId:PedidoEntity;

}