import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TragosModule } from "./tragos/tragos.module";
import { DistribuidorModule } from "./distribuidor/distribuidor.module";
import { FiestaModule } from "./fiesta/fiesta.module";
import { TypeOrmModule } from '@nestjs/typeorm'; //para usar orm
import {ChatModule} from "./chat/chat.module";

@Module({
  imports: [/*TragosModule,
            DistribuidorModule,
            FiestaModule,//modulos*/
      ChatModule

        /*TypeOrmModule.forRoot({
            name: 'default', //Nombre cadena de conexion por defecto de TYPEORM
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',*/
           // entities: [__dirname + '/**/*.entity{.ts,.js}'],
/*            synchronize: true,*/
            //extra:{
               /* insecureAuth:true,*/
            //}
            /*dropSchema: false*/
       /* }),*/
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
