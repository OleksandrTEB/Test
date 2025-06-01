const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const formData = req.body;

  // Формируем строку для записи
  const dataString = `Имя: ${formData.name}, Email: ${formData.email}\n`;

  // Добавляем в файл data.txt
  fs.appendFile('data.txt', dataString, (err) => {
    if (err) {
      console.error('Ошибка записи в файл:', err);
      return res.status(500).send('Ошибка сервера');
    }
    console.log('Данные сохранены в файл');
    res.send('Спасибо! Данные получены и сохранены.');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server запущен на порту ${PORT}`);
});
