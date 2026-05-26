import { Pool } from 'pg';


const BD = new Pool({
    connectionString:
"postgres://postgres.sqqurssctgvhskauxwtz:cWCVZBRelvOJbim3@aws-1-us-east-1.pooler.supabase.com:5432/postgres",

ssl: {

rejectUnauthorized: false // O Supabase requer SSL

}

});

// const BD = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     password: 'admin',
//     database: 'bd_barbearia_3a',
//     port: 5432
// })

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

