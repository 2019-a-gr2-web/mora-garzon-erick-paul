import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/trago";
import {TragosEntity} from "./tragos.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {error} from "util";

@Injectable()
export class TragosService {

    bddTragos: Trago[] = [];
    recnum = 1;

    constructor(@InjectRepository(TragosEntity)
                private readonly _tragosRepository: Repository<TragosEntity>,
    ){



        const traguito:Trago = {
            nombre:'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad: new Date(2019,5,10),
            precio:1.75,
            tipo:'Cerveza'
        };

        const objetoEntidad = this._tragosRepository.create(traguito);
        console.log(' linea 1:');//linea 1
        this._tragosRepository
            .save(objetoEntidad) //promesa
            .then(
            (datos)=>{
                console.log('Dato creado:', datos);//linea 2
                console.log('linea 2:');
            }
        ).catch(
            (error)=> {
                console.log('linea 3:');
                console.error('Error:',error); //linea 3
            }
        );
    console.log('linea 4:');
        //linea 4











        this.crear(traguito);
    }

   /* crear(nuevoTrago: Trago):Trago {
        nuevoTrago.id = this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }*/

    crear(nuevoTrago: Trago):Promise<Trago> {
        const objetoEntidad = this._tragosRepository.create(nuevoTrago);

        return this._tragosRepository.save(objetoEntidad); //promesa

    }

    buscar(parametrosBusqueda?):Promise<Trago[]>{ //Trago[] o TragosEntity[]
        return this._tragosRepository.find(parametrosBusqueda);
    }

    buscarPorId(id: number):Trago {
        return this.bddTragos.find(
            (trago) => {
                return trago.id === id;
            }
        );
    }

    buscarPorNombre(nombre: string):Trago {
        return this.bddTragos.find(
            (trago) => {
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        );
    }

    eliminarPorId(id: number):Trago[] {
        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id === id
            }
        );
        this.bddTragos.splice(indice,1);
        return this.bddTragos;
    }

    eliminar(id: number):Promise<DeleteResult> {
        const objetoEntidad = this._tragosRepository.delete(id);
        return objetoEntidad;
    }

    /*actualizar(tragoActualizado: Trago, id:number):Trago[] {

        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id === id
            }
        );
        tragoActualizado.id = this.bddTragos[indice].id;
        this.bddTragos[indice] = tragoActualizado;

        return this.bddTragos;
    }*/

    actualizar(tragoActualizado: Trago, id:number):Promise<UpdateResult> {
        const objetoEntidad = this._tragosRepository.update(id,
            {
                nombre: tragoActualizado.nombre,
                tipo: tragoActualizado.tipo,
                gradosAlcohol: tragoActualizado.gradosAlcohol,
                precio: tragoActualizado.precio,
                fechaCaducidad: tragoActualizado.fechaCaducidad
            });
        return objetoEntidad;
    }
}