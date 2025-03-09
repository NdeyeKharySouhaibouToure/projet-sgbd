const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const Submission = {
  create: async (student_id, exercise_id, filePath) => {
    const query = 'INSERT INTO submissions (student_id, exercise_id, content) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [student_id, exercise_id, filePath]);
    return { id: result.insertId, student_id, exercise_id, content: filePath };
  },
  findByStudent: async (student_id) => {
    const query = 'SELECT * FROM submissions WHERE student_id = ?';
    const [rows] = await pool.execute(query, [student_id]);
    return rows;
  },
};

module.exports = Submission;