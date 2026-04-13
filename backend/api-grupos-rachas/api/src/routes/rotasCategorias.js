import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get('/categorias', async (req, res) => {
    try {
        const query = `SELECT * FROM categorias ORDER BY id`
        const categorias = await BD.query(query);
        return res.status(200).json(categorias.rows);
    } catch (error) {
        console.error('Erro ao listar categorias', error.message);
        return res.status(500).json({ error: 'Erro ao listar categorias' })
    }
})

router.post('/categorias', async (req, res) => {
    const { nome } = req.body;
    try {
        const comando = `INSERT INTO categorias(nome) VALUES($1)`
        const valores = [nome];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Categoria cadastrada.");
    } catch (error) {
        console.error('Erro ao cadastrar categoria', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar categoria' })
    }
})

router.get('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM categorias WHERE id = $1`
        const categoria = await BD.query(query, [id]);

        if (categoria.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' })
        }

        return res.status(200).json(categoria.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar categoria', error.message);
        return res.status(500).json({ error: 'Erro ao buscar categoria' })
    }
})

router.put('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const verificarCategoria = await BD.query(`SELECT * FROM categorias WHERE id = $1`, [id])
        if (verificarCategoria.rows.length === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada' })
        }
        const comando = `UPDATE categorias SET nome = $1 WHERE id = $2`;
        const valores = [nome, id];
        await BD.query(comando, valores);

        return res.status(200).json('Categoria foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar categoria', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar categoria' })
    }
})

router.delete('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comando = `DELETE FROM categorias WHERE id = $1`
        await BD.query(comando, [id])
        return res.status(200).json({ message: "Categoria removida com sucesso" })
    } catch (error) {
        console.error('Erro ao remover categoria', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

export default router;
