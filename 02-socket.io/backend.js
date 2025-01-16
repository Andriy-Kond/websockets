// Користуємось стандартним пакетом  http
const http = require('http');
const { Server } = require('socket.io');

// створюю сервер
const httpServer = new http.createServer();

// об'єкт налаштувань
const io = new Server(httpServer, {
  cors: { origin: '*' }, // дозволяю робити запити будь-звідки
});

// слухаю подію коннкшн
io.on('connection', ws => {
  console.log('new client was connected');

  // Відправляємо повідомлення новому користувачу
  ws.emit('chatInfo', 'Wellcome to chat, new user!'); // перший параметр - тип повідомлення (довільний?), другий - саме повідомлення

  // Для надсилання повідомлення іншим юзерам вже не тре робити масив юзерів, як у webSocket - socket.io має його у себе під капотом:
  ws.broadcast.emit('chatInfo', 'New user connected to chat just now!');
});

// запускаю сервер
httpServer.listen(5000, () => {
  console.log('Sever is listening on port 5000');
}); // як app.listen() в express
