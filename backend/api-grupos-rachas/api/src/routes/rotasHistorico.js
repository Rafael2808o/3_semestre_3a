import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get('/historico/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const query = `SELECT g.id, g.nome, g.descricao, g.ativo, g.vagas, c.nome as categoria, m.papel, m.entrou_em,
                       CASE WHEN g.ativo = true THEN 'ativo' ELSE 'encerrado' END as status
                FROM membros m
                JOIN grupos g ON m.grupo_id = g.id
                LEFT JOIN categorias c ON g.categoria_id = c.id
                WHERE m.usuario_id = $1
                ORDER BY m.entrou_em DESC`

        const historico = await BD.query(query, [usuario_id]);
        return res.status(200).json(historico.rows);
    } catch (error) {
        console.error('Erro ao listar historico', error.message);
        return res.status(500).json({ error: 'Erro ao listar historico' })
    }
})

router.post('/historico', async (req, res) => {
    const { usuario_id, grupo_id, acao } = req.body;
    try {
        const comando = `INSERT INTO historico(usuario_id, grupo_id, acao) VALUES($1, $2, $3)`
        const valores = [usuario_id, grupo_id, acao];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Historico cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar historico', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar historico' })
    }
})

router.get('/historico/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM historico WHERE id = $1`
        const item = await BD.query(query, [id]);

        if (item.rows.length === 0) {
            return res.status(404).json({ message: 'Histórico não encontrado' })
        }

        return res.status(200).json(item.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar historico', error.message);
        return res.status(500).json({ error: 'Erro ao buscar historico' })
    }
})

router.put('/historico/:id', async (req, res) => {
    const { id } = req.params;
    const { acao } = req.body;
    try {
        const verificarItem = await BD.query(`SELECT * FROM historico WHERE id = $1`, [id])
        if (verificarItem.rows.length === 0) {
            return res.status(404).json({ message: 'Histórico não encontrado' })
        }

        const comando = `UPDATE historico SET acao = $1 WHERE id = $2`;
        const valores = [acao, id];
        await BD.query(comando, valores);

        return res.status(200).json('Historico foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar historico', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar historico' })
    }
})

router.delete('/historico/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comando = `DELETE FROM historico WHERE id = $1`
        await BD.query(comando, [id])
        return res.status(200).json({ message: "Histórico removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover historico', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

export default router;
