import express from 'express';
import {BD, testarConexao} from './db.js';
import cors from 'cors';
import rotasQuiz from './src/routes/rotasQuiz.js';



const app = express();
app.use(express.json());
app.use(cors())
app.use(rotasQuiz)


app.get('/', async(req, res) =>{
    await testarConexao();
    res.status(200).json("Api Funcionando");
})


const porta = 3000;
app.listen(porta, () =>{
    console.log(`http://localhost:${porta}`);
})
