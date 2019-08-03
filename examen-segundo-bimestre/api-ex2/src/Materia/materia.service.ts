import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MateriaEntity } from "./materia.entity";
import { Repository } from "typeorm";

@Injectable()
export class MateriaService {
    recnum = 1;
    constructor(@InjectRepository(MateriaEntity)
                private readonly _productoRepository: Repository<MateriaEntity>, ) {
    }

    listaProductos(id): Promise<MateriaEntity[]> {
        return this._productoRepository.find({
            where: { materiaId: id }
        });
    }

    crear(nuevoProducto: MateriaEntity):Promise<MateriaEntity>{
        const objetoEntidad = this._productoRepository.create(nuevoProducto);
        return this._productoRepository.save(objetoEntidad);
    }

    eliminarPorId(id?:number):Promise<object>{
        return this._productoRepository.delete({
            materiaId:id
        });
    }

    buscar(parametrosBusquedaNombre?):Promise<MateriaEntity[]>{
        if(parametrosBusquedaNombre!=""){
            return this._productoRepository.find({
                nombre:parametrosBusquedaNombre,

            });
        }else{
            if(parametrosBusquedaNombre==""){
                return this._productoRepository.find({
                    nombre:parametrosBusquedaNombre
                });
            }else if(parametrosBusquedaNombre!=""){
                return this._productoRepository.find({
                    nombre:parametrosBusquedaNombre
                });
            }else{
                return this._productoRepository.find();
            }
        }
    }
    buscarXid(id?:number):Promise<object>{
        return this._productoRepository.find({
            materiaId:id
        });
    }

    listarTodo():Promise<MateriaEntity[]>{
        return this._productoRepository.find();
    }
}