
const io = require('socket.io-client');
const config = require('./logOpt.json');
const chalk = require('chalk');

let url = 'https://test.ezbim.net/';
let socket = io(url, {
    secure: true, //boolean
    transports: ['websocket', 'polling']
});
let logOpt = {
    levels: config.levels,
    devices: config.devices
};
let types = {
    1: 'address',
    2: 'method',
    3: 'api',
    4: 'status',
    5: 'time',
    6: 'time',
    7: '-', //emit
    8: 'length',
    9: 'pid',
    10: '--',  //emit
    11: 'client',
    12: 'device'
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
    let msg = data.data.msg;
    let createdAt = data.data.createdAt;
    let device = data.data.device;
    splitMsg(msg);
});

socket.emit('notification', {type: 'registerLog', data: logOpt});

function splitMsg(msg) {
    console.log(msg);
    if (!msg || (typeof msg !== 'string')) return;
    let msgs = msg.split(" ");
    let formatted = {};
    msgs.forEach((val, index) => {
        if (index < 12) {
            let indexNum = index + 1;
            let name = types[indexNum];
            if (indexNum == 6) {
                formatted[name] = formatted[name] + ' ' + val;
            } else {
                formatted[name] = val;
            }
        } else {
            formatted.device = formatted.device + ' ' + val;
        }
    });

    delete formatted['-'];
    delete formatted['--'];

    let formattedMsg = '';
    for (let prop in formatted) {
        formattedMsg += color(prop, formatted[prop]);
    }
    console.log(formattedMsg);
}

function color(prop, value) {
    if (prop == 'address') {
        return `${chalk.black.bgGreen(value)} `;
    } else if (prop == 'status') {
        if (value == '200') {
            return `${chalk.black.bgGreen(value)} `;
        } else {
            return `${chalk.white.bgRed(value)} `;
        }
    } else if (prop == 'api') {
        return `${chalk.white.bgBlue(value)} `;
    } else if (prop == 'client') {
        return `${chalk.dim.bgYellow(value)} `;
    } else {
        return `${chalk.inverse(value)} `;
    }
}









