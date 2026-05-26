import { Router } from "express";
import { BD } from "../../db.js";
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();

router.get('/', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM agendamentos ORDER BY data_hora DESC`
        const agendamentos = await BD.query(query);
        return res.status(200).json(agendamentos.rows);
    } catch (error) {
        console.error('Erro ao listar agendamentos', error.message);
        return res.status(500).json({ error: 'Erro ao listar agendamentos' })
    }
})

router.post('/', autenticarToken, async (req, res) => {
    const { id_cliente, id_servico, id_barbeiro, data_hora, status } = req.body;
    try {
        const comando = `INSERT INTO agendamentos(id_cliente, id_servico, id_barbeiro, data_hora, status) VALUES($1, $2, $3, $4, $5)`
        const valores = [id_cliente, id_servico, id_barbeiro, data_hora, status];

        await BD.query(comando, valores);
        return res.status(201).json({ message: "Agendamento cadastrado." });
    } catch (error) {
        console.error('Erro ao cadastrar agendamento', error.message);
        console.error('Detalhes do erro:', error);
        return res.status(500).json({ error: 'Erro ao cadastrar agendamento', detalhes: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM agendamentos WHERE id_agendamento = $1`
        const agendamento = await BD.query(query, [id]);

        if (agendamento.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' })
        }

        return res.status(200).json(agendamento.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar agendamento', error.message);
        return res.status(500).json({ error: 'Erro ao buscar agendamento' })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_cliente, id_servico, id_barbeiro, data_hora, status } = req.body;
    try {
        const verificarAgendamento = await BD.query(`SELECT * FROM agendamentos WHERE id_agendamento = $1`, [id])
        if (verificarAgendamento.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' })
        }

        const comando = `UPDATE agendamentos SET id_cliente = $1, id_servico = $2, id_barbeiro = $3, data_hora = $4, status = $5 WHERE id_agendamento = $6`;
        const valores = [id_cliente, id_servico, id_barbeiro, data_hora, status, id];
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Agendamento foi atualizado!' });
    } catch (error) {
        console.error('Erro ao atualizar agendamento', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar agendamento' })
    }
})

// Remover agendamento: DELETE /agendamentos/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comando = `DELETE FROM agendamentos WHERE id_agendamento = $1`
        await BD.query(comando, [id])
        return res.status(200).json({ message: "Agendamento removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover agendamento', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
})

export default router;