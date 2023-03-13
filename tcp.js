const net = require('net');
require('dotenv').config();
var init = {
    ClientID: null,
    ServerDist: 1,
};

var dummy = {
    SimID: '139928XXXXX',
    SignalType: 'Locate',
    DateTime: '2019-10-24 13:31:40'
};


function send_data(socket) {
    let temp = JSON.stringify(dummy) + '# ';
    socket.write(temp);
}

const server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.on('data', data => {
        console.log("Receive any data")
        console.log(data)
        if (data.toString() === 'init') {
            init.ClientID = socket.remoteAddress + ':' + socket.remotePort;
            let temp = JSON.stringify(init) + '# ';
            socket.write(temp);
        }
        else {

        }
    });
});

server.listen(process.env.PORT, '127.0.0.1');
