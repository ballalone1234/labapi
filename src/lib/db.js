import mysql from 'mysql';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 8889,
    password: 'root',
    database: 'storeapi',
});

connection.connect();

export { connection };