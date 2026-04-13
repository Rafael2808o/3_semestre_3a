import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

const gerarCodigoConvite = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
        codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
}

router.get('/grupos', async (req, res) => {
    try {
        const { categoria_id, com_vagas } = req.query;
        let query = `SELECT g.*, c.nome as categoria_nome,
                    (SELECT COUNT(*) FROM membros WHERE grupo_id = g.id) as membros_atuais
                    FROM grupos g LEFT JOIN categorias c ON g.categoria_id = c.id
                    WHERE g.ativo = true`
        const valores = [];

        if (categoria_id) {
            query += ` AND g.categoria_id = $${valores.length + 1}`;
            valores.push(categoria_id);
        }

        if (com_vagas === 'true') {
            query += ` AND g.vagas > (SELECT COUNT(*) FROM membros WHERE grupo_id = g.id)`;
        }

        query += ` ORDER BY g.criado_em DESC`;
        const grupos = await BD.query(query, valores);
        return res.status(200).json(grupos.rows);
    } catch (error) {
        console.error('Erro ao listar grupos', error.message);
        return res.status(500).json({ error: 'Erro ao listar grupos' })
    }
})

router.post('/grupos', async (req, res) => {
    const { nome, descricao, vagas, categoria_id, usuario_id } = req.body;
    try {
        let codigo = gerarCodigoConvite();
        let codigoExists = await BD.query('SELECT id FROM grupos WHERE codigo_convite = $1', [codigo]);
        while (codigoExists.rows.length > 0) {
            codigo = gerarCodigoConvite();
            codigoExists = await BD.query('SELECT id FROM grupos WHERE codigo_convite = $1', [codigo]);
        }

        const comando = `INSERT INTO grupos(nome, descricao, vagas, categoria_id, criador_id, codigo_convite, ativo) VALUES($1, $2, $3, $4, $5, $6, true) RETURNING id`
        const valores = [nome, descricao, vagas, categoria_id, usuario_id, codigo];
        const resultado = await BD.query(comando, valores);
        const grupo_id = resultado.rows[0].id;

        await BD.query(`INSERT INTO membros(usuario_id, grupo_id, papel) VALUES($1, $2, $3)`, [usuario_id, grupo_id, 'dono']);

        return res.status(201).json({ message: 'Grupo cadastrado', grupo_id, codigo_convite: codigo });
    } catch (error) {
        console.error('Erro ao cadastrar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar grupo' })
    }
})

router.get('/grupos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM grupos WHERE id = $1`
        const grupo = await BD.query(query, [id]);

        if (grupo.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' })
        }

        return res.status(200).json(grupo.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao buscar grupo' })
    }
})

router.put('/grupos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, vagas, categoria_id, usuario_id } = req.body;
    try {
        const verificarGrupo = await BD.query(`SELECT criador_id FROM grupos WHERE id = $1`, [id])
        if (verificarGrupo.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' })
        }

        if (verificarGrupo.rows[0].criador_id !== usuario_id) {
            return res.status(403).json({ message: 'Apenas o dono pode editar o grupo' })
        }

        if (vagas && vagas > 0) {
            const membrosCount = await BD.query('SELECT COUNT(*) FROM membros WHERE grupo_id = $1', [id]);
            if (parseInt(membrosCount.rows[0].count) > vagas) {
                return res.status(400).json({ message: 'Não pode reduzir vagas abaixo do número de membros' })
            }
        }

        const comando = `UPDATE grupos SET nome = $1, descricao = $2, vagas = $3, categoria_id = $4 WHERE id = $5`;
        const valores = [nome, descricao, vagas, categoria_id, id];
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Grupo foi atualizado!' });
    } catch (error) {
        console.error('Erro ao atualizar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar grupo' })
    }
})

router.delete('/grupos/:id', async (req, res) => {
    const { id } = req.params;
    const { usuario_id } = req.body;
    try {
        const grupo = await BD.query('SELECT criador_id FROM grupos WHERE id = $1', [id]);
        if (grupo.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' })
        }

        if (grupo.rows[0].criador_id !== usuario_id) {
            return res.status(403).json({ message: 'Apenas o dono pode deletar o grupo' })
        }

        await BD.query(`UPDATE grupos SET ativo = false WHERE id = $1`, [id]);
        return res.status(200).json({ message: "Grupo encerrado com sucesso" })
    } catch (error) {
        console.error('Erro ao remover grupo', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
})

router.post('/grupos/:id/encerrar', async (req, res) => {
    const { id } = req.params;
    const { usuario_id } = req.body;
    try {
        const grupo = await BD.query('SELECT criador_id FROM grupos WHERE id = $1', [id]);
        if (grupo.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' })
        }
        if (grupo.rows[0].criador_id !== usuario_id) {
            return res.status(403).json({ message: 'Apenas o dono pode encerrar' })
        }
        await BD.query(`UPDATE grupos SET ativo = false WHERE id = $1`, [id]);
        return res.status(200).json({ message: 'Grupo encerrado com sucesso' });
    } catch (error) {
        console.error('Erro ao encerrar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao encerrar grupo' })
    }
})

export default router;
