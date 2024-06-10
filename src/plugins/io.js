import io from 'socket.io-client'

export function socket({ connection }) {
    var socket = io(connection);
    
    return socket
}