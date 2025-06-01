const http = require('http');
const fs = require('fs');

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const params = new URLSearchParams(body);
      const name = params.get('name') || '';
      const email = params.get('email') || '';
      const message = params.get('message') || '';

      const data = `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}\n----------------\n`;

      fs.appendFile('form_data.txt', data, { encoding: 'utf8' }, (err) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Ошибка сервера');
          return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Данные получены и сохранены!');
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`
      <form method="POST" action="/submit">
        <input type="text" name="name" placeholder="Имя" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <textarea name="message" placeholder="Сообщение" required></textarea><br>
        <button type="submit">Отправить</button>
      </form>`
    );
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});