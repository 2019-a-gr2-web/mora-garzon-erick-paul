import { Injectable } from '@nestjs/common';
import {Paciente} from "./interfaces/paciente";
import {Medicamento} from "./interfaces/medicamento";

//import * as Joi from '@hapi/joi';

@Injectable()
export class AppService {
  bddPacientes: Paciente[] = [];
  bddMedicamentos: Medicamento[] = [];
  recnumP = 1;
  recnumM = 1;
  idPaciente = 0;

  constructor(){
    const paciente:Paciente = {
      nombres:'Erick',
      apellidos:'Mora',
      fechaNacimiento: new Date(1996,10,10),
      hijos:0,
      tieneSeguro:true
    };
    this.crearPaciente(paciente);

    const medicamento:Medicamento = {
      gramosAIngerir:50,
      nombre:'Paracetamol',
      composicion:'50% excipiente 50% coadyuvante',
      usadoPara:'Dolor de cabeza',
      fechaCaducidad:new Date(2020,10,10),
      numeroPastillas:10,
      pacienteId:1
    };
    this.crearMedicamento(medicamento);
  }

  crearPaciente(nuevoPaciente: Paciente):Paciente {
    nuevoPaciente.id = this.recnumP;
    this.recnumP++;
    this.bddPacientes.push(nuevoPaciente);
    return nuevoPaciente;
  }



  buscarPacientePorId(id: number):Paciente {
    return this.bddPacientes.find(
        (paciente) => {
          return paciente.id === id;
        }
    );
  }

  buscarPacientePorNombre(nombre: string):Paciente[] {
    return this.bddPacientes.filter(
        (paciente)=>{
          return paciente.nombres.includes(nombre);
        }
    );
  }

  eliminarPacientePorId(id: number):Paciente[] {
    const indice = this.bddPacientes.findIndex(
        (paciente) => {
          return paciente.id === id
        }
    );
    this.bddPacientes.splice(indice,1);
    return this.bddPacientes;
  }

  actualizarPaciente(pacienteActualizado: Paciente, id:number):Paciente[] {

    const indice = this.bddPacientes.findIndex(
        (paciente) => {
          return paciente.id === id
        }
    );
    pacienteActualizado.id = this.bddPacientes[indice].id;
    this.bddPacientes[indice] = pacienteActualizado;

    return this.bddPacientes;
  }





  crearMedicamento(nuevoMedicamento: Medicamento):Medicamento {
    nuevoMedicamento.id = this.recnumM;
    this.recnumM++;
    this.bddMedicamentos.push(nuevoMedicamento);
    return nuevoMedicamento;
  }

  buscarMedPorId(id: number) {
    console.log('id:', id);
    const resultado=this.bddMedicamentos.filter(
        (med)=>{
          return med.pacienteId===id;
        }
    );
    console.log('resultado:',resultado);
    return resultado;


  }

  eliminarMedicamentoPorId(id: number):Medicamento[] {
    const indice = this.bddMedicamentos.findIndex(
        (medicamento) => {
          return medicamento.id === id
        }
    );
    this.bddMedicamentos.splice(indice,1);
    return this.bddMedicamentos;
  }

}