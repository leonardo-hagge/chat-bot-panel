import { io, Manager } from "socket.io-client";

export const Socket = io('http://localhost:4000', {
    autoConnect: false,
    transports: ['websocket', 'polling', 'flashsocket']
});



// const manager = new Manager("http://localhost:4000", {
//     reconnectionDelayMax: 10000,

// });

// export const Socket = manager.socket("/manter", {
//    ori
// });


export function startConnection() {
    Socket.connect();
}


export function stopConnection() {
    Socket.disconnect();
}

