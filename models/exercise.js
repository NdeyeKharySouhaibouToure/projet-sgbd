const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const Exercise = {
  create: async (professor_id, title, filePath) => {
    const query = 'INSERT INTO exercises (professor_id, title, content) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [professor_id, title, filePath]);
    return { id: result.insertId, professor_id, title, content: filePath };
  },
  findAll: async () => {
    const query = 'SELECT * FROM exercises';
    const [rows] = await pool.execute(query);
    return rows;
  },
};

module.exports = Exercise;