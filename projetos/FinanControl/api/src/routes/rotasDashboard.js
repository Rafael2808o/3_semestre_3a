import { Router } from 'express';
import { BD } from '../../db.js';
import { autenticarToken } from '../middlewares/autenticacao.js';
import jwt from 'jsonwebtoken'

const router = Router()
const SECRET_KEY = 'sua_chave_secreta';

router.get('/dashboard', async (req, res) => {
    try {
        // buscar resumo do mes atual
        const resumoMes = `SELECT 
    SUM(CASE WHEN tipo = 'R' THEN valor ELSE 0 END) AS entradas,
    SUM(CASE WHEN tipo = 'D' THEN valor ELSE 0 END) AS saidas,
    SUM(CASE WHEN tipo = 'R' THEN valor ELSE -valor END) AS saldo
FROM transacoes
WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)`;

const resResumo = await BD.query(resumoMes);

        // gastos por categoria - grafico de pizza
        const gastosCategoria = `SELECT 
    categoria,
    SUM(valor) AS total
FROM transacoes
WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY categoria`;

const resGastosCategoria = await BD.query(gastosCategoria);


        // maiores gastos do mes - grafico de barras
        const maioresGastos = `SELECT 
    descricao,
    valor
FROM transacoes
WHERE tipo = 'D' AND DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
ORDER BY valor DESC
LIMIT 5`;

const resMaioresGastos = await BD.query(maioresGastos);

        // ultima movimentacoes do extrato

        const extrato = `SELECT
    descricao,
    valor,
    data_registro
FROM transacoes
WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
ORDER BY data_registro DESC
LIMIT 5`;

const resExtrato = await BD.query(extrato);

        // ultimas transacoes

        const ultimasTransacoes = `SELECT
    descricao,
    valor,
    data_registro
FROM transacoes
WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
ORDER BY data_registro DESC
LIMIT 5`;

const resUltimasTransacoes = await BD.query(ultimasTransacoes);

         const evolucao = `SELECT
    DATE_TRUNC('week', data_registro) AS semana,
    SUM(CASE WHEN tipo = 'R' THEN valor ELSE 0 END) AS entradas,
    SUM(CASE WHEN tipo = 'D' THEN valor ELSE 0 END) AS saidas,
    SUM(CASE WHEN tipo = 'R' THEN valor ELSE -valor END) AS saldo
FROM transacoes
WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY semana
ORDER BY semana`;

        const resEvolucao = await BD.query(evolucao);

        const dadosDashboard = {
            resumoMesAtual: resResumo.rows[0],
            gastosPorCategoria: resGastosCategoria.rows,
            maioresGastos: resMaioresGastos.rows,
            extrato: resExtrato.rows,
            ultimasTransacoes: resUltimasTransacoes.rows,
            evolucao: resEvolucao.rows
        };

return res.status(200).json(dadosDashboard);
    }
    catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        return res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
})

export default router