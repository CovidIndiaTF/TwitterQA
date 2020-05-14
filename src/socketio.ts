import { Server } from 'http'
import * as ioserver from 'socket.io'
import { Server as IOServer } from 'socket.io'

let io: IOServer


export const init = (s: Server) => {
  io = ioserver(s, {
    // path: '/test',
    // serveClient: false,
    // origins:	'*',

    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  })


  io.sockets.on('error', (error) => {
    console.log('error', error)
  });

  io.sockets.on('disconnect', function(){
    console.log('disconnected')
  })

  return io
}


export const getIO = () => io
