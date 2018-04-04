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
                resolve( httpServer )
            }
        });

    });
}

async function CreateBrowserSyncServer() {
    return new Promise( async (resolve, reject) => {
        
        const bs = require("browser-sync").create();

        // .init starts the server
        bs.init({
            server: "./",
            port: CONFIG.ports.browsersync,
            open: false
        }, () => {
            resolve( bs );
        });
    });
}

async function CreateWebSocketServer() {
    return new Promise( (resolve, reject) => {

        const http = require( 'http' );
        
        // Loading the index file . html displayed to the client
        const server = http.createServer(function(req, res) {
            fs.readFile('./index.html', 'utf-8', function(error, content) {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(content);
            });
        });

        // Loading socket.io
        var io = require('socket.io').listen(server);
        var connections = [];

        // When a client connects, we note it in the console
        io.sockets.on('connection', function (socket) {
            connections.push( socket ); 
            console.log( 'Connections [+]', connections.length );

            socket.on( 'MESSAGE', (data) => {
                connections.forEach( client => {
                    if (data.toAll === true || client !== socket) {
                        client.emit( 'MESSAGE', data );
                    }
                })
            });

            socket.on('disconnect', () => {
                const ix = connections.findIndex( item => item === socket );
                if (ix>=0) {
                    connections.splice( ix );
                }
                console.log( 'Connections [-]', connections.length );
            });

        });

        server.listen(CONFIG.ports.websocket, '0.0.0.0', null,  (err) => {
            if (err) {
                console.log( `WebSocket Server failed to start on port ${CONFIG.ports.websocket}`, err );

                reject(err);
            } else {
                console.log( `[WS Server] Running on port ${CONFIG.ports.websocket}` );
                resolve( server );
            }
        });

    });
}

(async () => {
    
    console.log( 'Starting Server...' );

    let httpServer = await CreateHttpServer();
    let ws = await CreateWebSocketServer();
    let bs = await CreateBrowserSyncServer();
    

})();