import io from 'socket.io-client';
import Config from '../data/config.js';

export class Socket {

    constructor() {
    }

    static get instance() {
        if (!Socket._instance) {
            Socket._instance = new Socket();
            console.log( `http://${location.hostname}:${Config.server.wsPort}/${Config.server.wsNS}` );
            Socket._instance.io = io( `http://${location.hostname}:${Config.server.wsPort}/${Config.server.wsNS}` );
        }
        return Socket._instance.io;
    }

}