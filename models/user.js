const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const User = {
  create: async (email, password, role) => {
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [email, password, role]);
    return { id: result.insertId, email, password, role };
  },
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
  },
};

module.exports = User;