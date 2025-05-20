const express = require('express');
const cors = require('cors'); // Import the cors module
const mysql = require('mysql2');

const app = express();
const port = 3000;



// Enable CORS for all routes
app.use(cors()); // This allows all origins to access your server

// Your routes and other middleware...
app.use(express.json());

// Подключение к MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sLaCd3mRJB6eL8R',
  database: 'mybookshop'
});

db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе:', err);
    process.exit();
  }
  console.log('Подключение к базе успешно');
});

// Эндпоинт для получения книг
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Ошибка при запросе:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});


// Эндпоинт для обработки платежа
app.post('/node/api/creditcard', (req, res) => {
  // Handle the POST request
  console.log(req.body);
  res.json({ message: "YYYYYThank you for your payment." });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// Поиск книг по названию (параметр передаётся через query, например ?title=ключ)
app.get('/api/books/search', (req, res) => {
  const title = req.query.title;

  if (!title) {
    return res.status(400).json({ error: 'Параметр title обязателен' });
  }

  // Используем оператор LIKE для поиска подстроки в названии
  const sql = 'SELECT * FROM books WHERE title LIKE ?';
  const searchTerm = `%${title}%`; // ищем вхождение подстроки

  db.query(sql, [searchTerm], (err, results) => {
    if (err) {
      console.error('Ошибка при запросе:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});