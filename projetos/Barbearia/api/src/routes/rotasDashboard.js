import { Router } from 'express';
import { BD } from '../../db.js';
import { autenticarToken } from '../middlewares/autenticacao.js';

const router = Router();

router.get('/', async (req, res) => {
    try {

        const resumoMes = `
            SELECT 
                COALESCE(SUM(s.preco), 0) AS faturamento_total,

                COALESCE(SUM(
                    CASE 
                        WHEN a.status = 'confirmado' 
                        THEN s.preco 
                        ELSE 0 
                    END
                ), 0) AS faturamento_confirmado,

                COUNT(
                    CASE 
                        WHEN a.status = 'cancelado' 
                        THEN 1 
                    END
                ) AS total_cancelados

            FROM agendamentos a
            INNER JOIN servicos s 
                ON a.id_servico = s.id_servico

            WHERE DATE_TRUNC('month', a.data_hora) = DATE_TRUNC('month', CURRENT_DATE)
        `;

        const resResumo = await BD.query(resumoMes);

        const dadosDashboard = {
            resumoMesAtual: resResumo.rows[0]
        };

        return res.status(200).json(dadosDashboard);

    } catch (error) {

        console.error('Erro ao buscar dados do dashboard:', error);

        return res.status(500).json({
            error: 'Erro ao buscar dados do dashboard'
        });
    }
});

export default router;