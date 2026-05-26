import { Router } from 'express';
import { BD } from '../../db.js';
import { autenticarToken } from '../middlewares/autenticacao.js';

const router = Router();

router.get('/dashboard', autenticarToken, async (req, res) => {
    try {

        // Resumo do mês atual
        const resumoMes = `
            SELECT 
                COALESCE(SUM(CASE WHEN tipo = 'R' THEN valor ELSE 0 END), 0) AS entradas,
                COALESCE(SUM(CASE WHEN tipo = 'D' THEN valor ELSE 0 END), 0) AS saidas,
                COALESCE(SUM(CASE WHEN tipo = 'R' THEN valor ELSE -valor END), 0) AS saldo
            FROM transacoes
            WHERE DATE_TRUNC('month', data_registro) =
                  DATE_TRUNC('month', CURRENT_DATE)
        `;

        const resResumo = await BD.query(resumoMes);

        // Gastos por categoria (gráfico pizza)
        const gastosCategoria = `
            SELECT
                c.nome AS categoria,
                SUM(t.valor) AS total
            FROM transacoes t
            INNER JOIN categorias c
                ON t.id_categoria = c.id_categoria
            WHERE t.tipo = 'D'
              AND DATE_TRUNC('month', t.data_registro) =
                  DATE_TRUNC('month', CURRENT_DATE)
            GROUP BY c.nome
            ORDER BY total DESC
        `;

        const resGastosCategoria = await BD.query(gastosCategoria);

        // Maiores gastos do mês
        const maioresGastos = `
            SELECT
                descricao,
                valor
            FROM transacoes
            WHERE tipo = 'D'
              AND DATE_TRUNC('month', data_registro) =
                  DATE_TRUNC('month', CURRENT_DATE)
            ORDER BY valor DESC
            LIMIT 5
        `;

        const resMaioresGastos = await BD.query(maioresGastos);

        // Extrato
        const extrato = `
            SELECT
                descricao,
                valor,
                tipo,
                data_registro
            FROM transacoes
            WHERE DATE_TRUNC('month', data_registro) =
                  DATE_TRUNC('month', CURRENT_DATE)
            ORDER BY data_registro DESC
            LIMIT 5
        `;

        const resExtrato = await BD.query(extrato);

        // Últimas transações
        const ultimasTransacoes = `
            SELECT
                descricao,
                valor,
                tipo,
                data_registro
            FROM transacoes
            ORDER BY data_registro DESC
            LIMIT 5
        `;

        const resUltimasTransacoes = await BD.query(ultimasTransacoes);

        // Evolução semanal
        const evolucao = `
            SELECT
                DATE_TRUNC('week', data_registro) AS semana,
                COALESCE(SUM(CASE WHEN tipo = 'R' THEN valor ELSE 0 END), 0) AS entradas,
                COALESCE(SUM(CASE WHEN tipo = 'D' THEN valor ELSE 0 END), 0) AS saidas,
                COALESCE(SUM(CASE WHEN tipo = 'R' THEN valor ELSE -valor END), 0) AS saldo
            FROM transacoes
            WHERE DATE_TRUNC('month', data_registro) =
                  DATE_TRUNC('month', CURRENT_DATE)
            GROUP BY semana
            ORDER BY semana
        `;

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

    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);

        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar dados do dashboard',
            erro: error.message
        });
    }
});

export default router;