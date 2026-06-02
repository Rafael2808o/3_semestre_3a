import express from 'express';
import {BD, testarConexao} from './db.js';
import cors from 'cors';
import rotasJogo from './src/routes/rotasJogo.js';



const app = express();
app.use(express.json());
app.use(cors())
app.use(rotasJogo)


app.get('/', async(req, res) =>{
    await testarConexao();
    res.status(200).json("Api Funcionando");
})


const porta = 3000;
app.listen(porta, () =>{
    console.log(`http://localhost:${porta}`);
})
