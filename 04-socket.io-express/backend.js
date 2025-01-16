// Підключаю express:
const express = require('express');
const app = express();

// Користуємось стандартним пакетом  http
const http = require('http');
// створюю сервер
const httpServer = http.createServer(app); // поєдную express з socket.io
const { Server } = require('socket.io');

// об'єкт налаштувань (при express вже не потрібен???)
const io = new Server(
  httpServer
  // після підключення express,  cors вже не потрібен, бо запуск йде на одному порті
  // , { cors: { origin: '*' }, // дозволяю робити запити будь-звідки
  // }
);

app.get('/', (req, res) => {
  return res.sendFile(__dirname + 'index.html');
});

// слухаю подію коннкшн
io.on('connection', ws => {
  console.log('new client was connected');

  // Відправляємо повідомлення новому користувачу
  ws.emit('chatInfo', 'Wellcome to chat, new user!'); // перший параметр - тип повідомлення (довільний?), другий - саме повідомлення

  // Для надсилання повідомлення іншим юзерам вже не тре робити масив юзерів, як у webSocket - socket.io має його у себе під капотом:
  ws.broadcast.emit('chatInfo', 'New user connected to chat just now!');

  // Додаю обробник подій на chatMessage
  ws.on('chatMessage', message => {
    console.log('message:', message);

    // Надсилаємо це повідомлення всім користувачам
    ws.broadcast.emit('chatMessage', message);
  });
});

const { PORT = 5000 } = process.env;
// запускаю сервер
httpServer.listen(PORT, () => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Sever is listening on port ${PORT}`);
}); // як app.listen() в express
