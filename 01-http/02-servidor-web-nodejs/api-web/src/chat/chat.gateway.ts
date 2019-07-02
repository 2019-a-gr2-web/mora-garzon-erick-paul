import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client} from "socket.io";

// ws://localhost:3001/websockets
@WebSocketGateway(3002,{
    namespace:'/websockets'
})
export class ChatGateway{
    @WebSocketServer() server;
    constructor(){
        console.log(this.server);
    }

    @SubscribeMessage('holaMundo')
    //findAll(client: Client, data: any){
    findAll(client: Client | any, data: any){

        console.log(data);
        console.log('Nos hacen la peticion');
        console.log(this.server);
        client.broadcast.emit('saludaron',data);
        return 'Hola '+ data.nombre;
    }

}