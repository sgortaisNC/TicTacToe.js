const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({port: 1234});

wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

wss.on('connection', function (ws) {

    ws.on("message", function (str) {
        wss.broadcast(str);
    })

    ws.on("close", function () {
        console.log("Browser gone.")
    })
});


