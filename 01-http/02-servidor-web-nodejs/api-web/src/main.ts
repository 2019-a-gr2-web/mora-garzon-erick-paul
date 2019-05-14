import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";

import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';

//import * as cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;



  //@ts-ignore
  //app.set('view engine', 'ejs');
    //app.engine('view engine', 'ejs');
    app.use(favicon(path.join(__dirname, '..', 'publico', 'imagenes', 'pokebola.ico')));


    app.use(cookieParser('Secreto'));


    app.setViewEngine('ejs');
    app.setBaseViewsDir(join( __dirname, '..', 'views'));

    app.use(express.static('publico'));

  await app.listen(3001);
}
bootstrap();
