
const io = require('socket.io-client');
const config = require('./logOpt.json');

let url = 'https://test.ezbim.net/';
let socket = io(url, {
    secure: true, //boolean
    transports: ['websocket', 'polling']
});
let logOpt = {
    levels: config.levels,
    devices: config.devices
};

socket.on('connect', () => {
    console.log('connect');
});

socket.on('event', (data) => {
    console.log(data);
});

socket.on('disconnect',() => {
    console.log('disconnect');
});

socket.on('notification', data => {
    let msg = `【${data.data.device}】---【${data.data.createdAt}】--- ${data.data.msg}`;
    console.log(msg);
});

socket.emit('notification', {type: 'registerLog', data: logOpt});






