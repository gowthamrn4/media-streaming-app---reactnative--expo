import io from 'socket.io-client';
import { URL } from './constant';
export const socketIO = io(URL)