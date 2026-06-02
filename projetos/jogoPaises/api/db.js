import { Pool } from 'pg';


// Utilizando banco do Supabase
const BD = new Pool({
    connectionString: "postgres://postgres.mvozmdaztzhfarssanjs:Vpycm0vPjO1Ap8qL@aws-1-us-east-1.pooler.supabase.com:6543/postgres",
    ssl: {
        rejectUnauthorized: false
    }
})

//Conexao local - PGADMIN
// const BD = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     password: 'admin',
//     database: 'bd_jogo_bandeiras',
//     port: 5432
// })



const testarConexao = async () => {
    try {
        const cliente = await BD.connect();
        console.log('Conexão estabelecida');
        cliente.release(); //libera a conexao
    } catch (error) {
        console.error('Erro ao conectar com o banco', error.message)
    }
}

export { BD, testarConexao }