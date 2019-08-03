import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './Login/login.module';
import { EstudianteModule } from './Estudiante/estudiante.module';
import { MateriaModule } from './Materia/materia.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { PedidoModule } from './Pedido/pedido.module';
import { DespachoModule } from './Despacho/despacho.module';
import { MateriaEntity } from './Materia/materia.entity';
import { EstudianteEntity } from './Estudiante/estudiante.entity';
import { DetalleEntity } from './Detalle/detalle.entity';
import { PedidoEntity } from './Pedido/pedido.entity';
import { UsuarioEntity } from './Usuario/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    LoginModule,
    EstudianteModule,
    MateriaModule,
    UsuarioModule,
    PedidoModule,
    DespachoModule,
    TypeOrmModule.forRoot({
      name: 'default', // Nombre cadena conex por defecto de TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'examen2',
      entities: [
        MateriaEntity,
        EstudianteEntity,
        DetalleEntity,
        PedidoEntity,
        UsuarioEntity
      ],
      synchronize: true,
      //insecureAuth : true,
      dropSchema: false
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
