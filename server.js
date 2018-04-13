const CONFIG = require( './server.config.json' );

process.on( 'uncaughtException', (e) => {
    console.log('ERROR!', e.toString() );
});

async function CreateHttpServer() {
    return new Promise( async (resolve, reject) => {

        const HttpServerFactory = require( 'http-server' );

        const httpServer = HttpServerFactory.createServer({
            cors: true,
            root: __dirname
        });

        httpServer.listen( CONFIG.ports.http, (err) => {
            if (err) {
                console.log( `HTTP Server failed to start on port ${CONFIG.ports.http}`, err );
                reject(err);
            } else {
                console.log( `[HTTP Server] Running on port ${CONFIG.ports.http}` );
                resolve( httpServer );
            }
        });

    });
}

async function CreateBrowserSyncServer() {
    return new Promise( async (resolve, reject) => {
        
        const bs = require("browser-sync");

        // .init starts the server
        bs.init({
            server: "./",
            port: CONFIG.ports.browsersync,
            open: false,
            notify: false
        }, ()=>{  
			resolve();
		});
    });
}

async function CreateWebSocketServer() {
    const websocket = require( 'maf-websocket-node' );
    return websocket.create({
        port:CONFIG.ports.websocket,
        ns:CONFIG.ports.websocketNS
    });
}

(async () => {
    
    console.log( 'Starting Server...' );

    let httpServer = await CreateHttpServer();
    let ws = await CreateWebSocketServer();
    let bs = await CreateBrowserSyncServer();

})();