import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get('/grupos/:id/membros', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM membros WHERE grupo_id = $1 ORDER BY id`
        const membros = await BD.query(query, [id]);
        return res.status(200).json(membros.rows);
    } catch (error) {
        console.error('Erro ao listar membros', error.message);
        return res.status(500).json({ error: 'Erro ao listar membros' })
    }
})

router.post('/membros', async (req, res) => {
    const { usuario_id, grupo_id, papel } = req.body;
    try {
        const comando = `INSERT INTO membros(usuario_id, grupo_id, papel) VALUES($1, $2, $3)`
        const valores = [usuario_id, grupo_id, papel];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Membro cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar membro', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar membro' })
    }
})

router.get('/membros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM membros WHERE id = $1`
        const membro = await BD.query(query, [id]);

        if (membro.rows.length === 0) {
            return res.status(404).json({ message: 'Membro não encontrado' })
        }

        return res.status(200).json(membro.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar membro', error.message);
        return res.status(500).json({ error: 'Erro ao buscar membro' })
    }
})

router.put('/membros/:id', async (req, res) => {
    const { id } = req.params;
    const { papel } = req.body;
    try {
        const verificarMembro = await BD.query(`SELECT * FROM membros WHERE id = $1`, [id])
        if (verificarMembro.rows.length === 0) {
            return res.status(404).json({ message: 'Membro não encontrado' })
        }

        const comando = `UPDATE membros SET papel = $1 WHERE id = $2`;
        const valores = [papel, id];
        await BD.query(comando, valores);

        return res.status(200).json('Membro foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar membro', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar membro' })
    }
})

router.delete('/membros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comando = `DELETE FROM membros WHERE id = $1`
        await BD.query(comando, [id])
        return res.status(200).json({ message: "Membro removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover membro', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

router.post('/membros/entrar', async (req, res) => {
    const { codigo_convite, usuario_id } = req.body;
    try {
        const grupo = await BD.query('SELECT id, ativo, vagas FROM grupos WHERE codigo_convite = $1', [codigo_convite]);
        if (grupo.rows.length === 0) {
            return res.status(404).json({ message: 'Código inválido' })
        }

        const grupo_id = grupo.rows[0].id;
        const ativo = grupo.rows[0].ativo;
        const vagas = grupo.rows[0].vagas;

        if (!ativo) {
            return res.status(400).json({ message: 'Grupo encerrado' })
        }

        const membroExists = await BD.query('SELECT id FROM membros WHERE usuario_id = $1 AND grupo_id = $2', [usuario_id, grupo_id]);
        if (membroExists.rows.length > 0) {
            return res.status(400).json({ message: 'Você já é membro' })
        }

        const membrosCount = await BD.query('SELECT COUNT(*) FROM membros WHERE grupo_id = $1', [grupo_id]);
        if (parseInt(membrosCount.rows[0].count) >= vagas) {
            return res.status(400).json({ message: 'Grupo cheio' })
        }

        await BD.query(`INSERT INTO membros(usuario_id, grupo_id, papel) VALUES($1, $2, $3)`, [usuario_id, grupo_id, 'membro']);
        return res.status(200).json({ message: 'Entrou no grupo com sucesso' });
    } catch (error) {
        console.error('Erro ao entrar no grupo', error.message);
        return res.status(500).json({ error: 'Erro ao entrar no grupo' })
    }
})

export default router;
