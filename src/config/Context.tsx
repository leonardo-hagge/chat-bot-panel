import React, { createContext } from 'react';
import { Socket } from 'socket.io-client';

type ConextValues = {
    socketActive?: Socket;
    devicesActives?: DevicesActive[];
}






type DevicesActive = {
    id?: number;
    name?: string;
    qrcode?: string;
}


const Context = createContext<ConextValues>({});

export default Context;