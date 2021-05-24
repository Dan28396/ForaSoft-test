import io from 'socket.io-client';

const url = process.env.URL || 'http://localhost:5000';

export const socket = io(url);
