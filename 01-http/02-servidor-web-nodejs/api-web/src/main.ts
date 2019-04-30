import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
//import * as cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;

  app.use(cookieParser('Secreto'));

  //@ts-ignore
  //app.set('view engine', 'ejs');
    //app.engine('view engine', 'ejs');
    app.setViewEngine('ejs');
    app.setBaseViewsDir(join( __dirname, '..', 'views'));


  await app.listen(3000);
}
bootstrap();
