// db.js

import mysql from 'mysql';

// Create a connection pool
export const pool = mysql.createPool({
    host: 'localhost:3306',
    user: 'express1',
    password: 'Azerty123321!',
    database: 'apireviews',
});