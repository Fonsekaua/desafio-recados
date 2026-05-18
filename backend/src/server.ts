import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import app from './routes';
import cors from 'cors'
dotenv.config();

const port: string = process.env.PORT as string
const server = express();

server.use(express.json())
server.use(urlencoded({extended: true}));
server.use(cors())
server.use(app)
server.listen(port, ()=> {
    console.log(`server rodando em http://localhost:${port}`)
})



