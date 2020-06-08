import knex from 'knex';
import path from 'path';

const connection = knex({
    client:'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'database.sqlite3'),
    },
    migrations:{
        directory:path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds:{
        directory:path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault:true,
});

export default connection;