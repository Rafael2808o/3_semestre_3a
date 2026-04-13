import { Pool } from 'pg';

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'bd_grupos_rachas',
    port: 5432
})

const testarConexao = async () =>{
    try{
        const cliente = await BD.connect();
        console.log('Conexão estabelecida');
        cliente.release();
    }catch(error){
        console.error('Erro ao conectar com o banco', error.message);
    }
}

export {BD, testarConexao}