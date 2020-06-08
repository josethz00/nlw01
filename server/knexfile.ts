import path from 'path';

module.exports = {  //o knex ainda não suporta a sintaxe es6 de exports
    client:'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'src', 'database','database.sqlite3'),
    },
    migrations:{
        directory:path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds:{
        directory:path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault:true,
}