import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM servicos ORDER BY id_servico`
        const servicos = await BD.query(query);
        return res.status(200).json(servicos.rows);
    } catch (error) {
        console.error('Erro ao listar servicos', error.message);
        return res.status(500).json({ error: 'Erro ao listar servicos' })
    }
})

router.post('/', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    try {
        const comando = `INSERT INTO servicos(nome, descricao, preco) VALUES($1, $2, $3)`
        const valores = [nome, descricao, preco];

        await BD.query(comando, valores);
        return res.status(201).json({ message: "Serviço cadastrado." });
    } catch (error) {
        console.error('Erro ao cadastrar serviço', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar serviço' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM servicos WHERE id_servico = $1`
        const servico = await BD.query(query, [id]);

        if (servico.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado' })
        }

        return res.status(200).json(servico.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar serviço', error.message);
        return res.status(500).json({ error: 'Erro ao buscar serviço' })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    try {
        const verificarServico = await BD.query(`SELECT * FROM servicos WHERE id_servico = $1`, [id])
        if (verificarServico.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado' })
        }
        
        const comando = `UPDATE servicos SET nome = $1, descricao = $2, preco = $3 WHERE id_servico = $4`;
        const valores = [nome, descricao, preco, id];
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Serviço foi atualizado!' });
    } catch (error) {
        console.error('Erro ao atualizar serviço', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar serviço' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comando = `DELETE FROM servicos WHERE id_servico = $1`
        const resultado = await BD.query(comando, [id])
        
        return res.status(200).json({ message: "Serviço removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover serviço', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
})

export default router;