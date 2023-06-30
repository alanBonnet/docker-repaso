import express from 'express';
import cors from 'cors';
import mariadb from 'mariadb';
import { connect } from 'mongoose';
import * as mysql2 from 'mysql2';
const port = process.env.PORT

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log("fgfgdassdd")
    return res.json({
        links: [
            `http://localhost:${port}/check-mariadb-connection`,
            `http://localhost:${port}/check-mysql-connection`,
            `http://localhost:${port}/check-mongodb-connection`
        ]
    })
})
app.get('/check-mongodb-connection', async (_req, res) => {
    try {
        await connect(process.env.MONGODB_URI)
        res.send("Conectado a mongodb")
    } catch (error) {
        res.send("No se conectó a mongodb")
    }
})

app.get('/check-mariadb-connection', async (_req, res) => {
    try {
        const query  = await mariadb.createPool({
            host: process.env.DB_HOST_MARIADB,
            port: process.env.DB_PORT_MARIADB,
            user: process.env.DB_USER_MARIADB,
            password: process.env.DB_PASSWORD_MARIADB,
            database: process.env.DB_DATABASE_MARIADB,
            connectionLimit: 32
        })
        .query("select 1")
        if(!query){
            return res.send("No se conectó a mariadb")
        }
        return res.send("Conectado a mariadb")
    } catch (error) {

    }
})

app.get('/check-mysql-connection', async (_req,res) => {
    try {
        const connection  = mysql2.createPool({
            host: process.env.DB_HOST_MYSQL,
            port: process.env.DB_PORT_MYSQL,
            user: process.env.DB_USER_MYSQL,
            password: process.env.DB_PASSWORD_MYSQL,
            database: process.env.DB_DATABASE_MYSQL,
            connectionLimit: 32
        })
        const query = connection.query('select 1')
        if(!query){
            return res.send("No se conectó a mysql")
        }
        return res.send("Conectado a mysql")

    } catch (error) {
        return res.send("Error: " + error)
    }
})

app.listen(port,
    () => {
        console.log(`http://localhost:${port}/check-mariadb-connection`)
        console.log(`http://localhost:${port}/check-mysql-connection`)
        console.log(`http://localhost:${port}/check-mongodb-connection`)
    }
)
