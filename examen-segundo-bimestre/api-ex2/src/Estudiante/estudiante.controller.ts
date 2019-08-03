import { Controller } from "@nestjs/common";
import { EstudianteService } from "./estudiante.service";
import { LoginService } from "../Login/login.service";

@Controller('api/padre')
export class EstudianteController{
    constructor(
        private readonly _tiendaService:EstudianteService,
        private readonly _loginService_:LoginService
    ){

    }
}