import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';

if (cluster.isPrimary) {
  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({
      PORT: 3000 + i
    });
  }

  setupPrimary();
} else {
const db = await open({
  filename: 'chat.db',
  driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT,
      image_data BLOB
    );
  `);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  adapter: createAdapter()
});

const __dirname = dirname(fileURLToPath(import.meta.url));


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', async (socket) => {


  socket.on('chat message', async (msg, clientOffset, imageData, callback) => {
    let result;
    try {
      if (imageData) {
       
        io.emit('chat message', '', clientOffset, imageData);
        result = await db.run('INSERT INTO messages (content, client_offset, image_data) VALUES (?, ?, ?)', msg, clientOffset, imageData);
      } else {
        result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);
        io.emit('chat message', msg, result.lastID);
      }
    } catch (e) {
      // sqlite constrainer
      if (e.errno === 19) {
        callback();
      } else {
        // nothing to do, just let the client retry
      }
      return;
    }
    callback();
  });


  if (!socket.recovered) {
    try {
      await db.each('SELECT id, content, image_data FROM messages WHERE id > ?',
        [socket.handshake.auth.serverOffset || 0],
        (_err, row) => {
          if (row.image_data) {
            socket.emit('chat message', '', row.id, row.image_data);
          } else {
            socket.emit('chat message', row.content, row.id);
          }
        }
      )
    } catch (error) {
      console.log('socket recovered, something went wrong', error)
    }
  }
});

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
}