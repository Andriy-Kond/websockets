// Create web-socket server

const { INSPECT_MAX_BYTES } = require('buffer');

// Пакет ws імпортуємо через new тому що він повертає клас.
const ws = new require('ws');

// Створюємо web-socket server. Єдиний обов'язковий параметр - це port
const wsServer = new ws.Server({ port: 5000 });
// Запускати сервер на відміну від http не треба - як тільки ми його створили він вже є запущений.

// Для перевірки, що сервер запущений на нього можна повісити слухач подій (по типу button.addEventListener('click', listener, options))
// Для цього треба викликати на ньому метод on(). Це аналог addEventListener
// Подія connection - це подія, яка відбувається кожен раз, коли підключається новий фронтенд

// Реалізацію надсилання повідомлення на всі підключення одночасно роблять через масив, в який додають всі підключення.
const socketList = [];

wsServer.on('connection', socket => {
  console.log('New frontend connected');
  // socket - це об'єкт, який може відправляти і приймати повідомлення від фронтенду, який тільки що підключився
  // Відкриття копії html-файлу у браузері - це нове підключення

  socketList.push(socket); // Додаємо кожне підключення до масиву

  // Надсилаємо повідомлення через 3 секунди після підключення
  setTimeout(() => {
    socket.send('Welcome to web-socket server'); // send() відправляє повідомлення на фронтенд, що щойно підключився. На старі підключення не відправляє.
  }, 3000);

  socketList.forEach(item => {
    if (item !== socket) {
      item.send('New member connect');
    }
  });
});
