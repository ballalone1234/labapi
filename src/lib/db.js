import mysql from 'mysql';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'storeapi',
});

connection.connect();

export { connection };