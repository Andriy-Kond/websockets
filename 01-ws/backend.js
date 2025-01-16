const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 5000 });

// Для надсилання повідомлення, що приєднався новий клієнт треба спочатку створити базу клієнтів - десь їх зберігати
const clients = [];

// Обробник подій на коннект - коли хтось законектиться, то виконується цей cb
// перший аргумент cb - вебсокет
wss.on('connection', ws => {
  console.log('new user was connected');
  clients.push(ws);
  for (const client of clients) {
    if (client === ws) {
      client.send('Welcome to chat, new user!');
    } else {
      client.send('new user connected just now');
    }
  }

  // // відправляємо повідомлення тому, хто законектився:
  // ws.send('Welcome to chat!');

  // Якщо хочемо реагувати на якесь повідомлення, то треба додати додатковий обробник подій на прийдешнє повідомлення:
  ws.on('message', message => {
    // приймається буфер і виводиться:
    console.log('Got message from frontend:', message);
    // приймається буфер, а виводиться рядок
    console.log('Got message from frontend:', message.toString());
  });

  // // Відсилання повідомлення з беку кожні 2сек
  // setInterval(() => {
  //   ws.send('It is ping from backend');
  // }, 2000);
});

console.log('Server listening on port 5000');
