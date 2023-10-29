const mysql = require('mysql2/promise');

module.exports = async () => {
    const db = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'rootroot',
            database: 'employeetracker_db'
        }
    )
    return db;
}