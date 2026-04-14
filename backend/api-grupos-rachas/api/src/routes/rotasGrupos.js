import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get('/grupos', async (req, res) => {
    try {
        const query = `SELECT * FROM grupos ORDER BY id`
        const grupos = await BD.query(query);
        return res.status(200).json(grupos.rows);
    } catch (error) {
        console.error('Erro ao listar grupos', error.message);
        return res.status(500).json({ error: 'Erro ao listar grupos' })
    }
})

router.post('/grupos', async (req, res) => {
    const { nome, descricao, vagas, categoria_id } = req.body;
    try {
        const comando = `INSERT INTO grupos(nome, descricao, vagas, categoria_id) VALUES($1, $2, $3, $4)`
        const valores = [nome, descricao, vagas, categoria_id];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Grupo cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar grupo' })
    }
})

router.get('/grupos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const grupo = await BD.query('SELECT * FROM grupos WHERE id = $1', [id]);
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
    const { nome, descricao, vagas, categoria_id } = req.body;
    try {
        //Verificar se a grupo existe
        const verificarGrupo = await BD.query(`SELECT * FROM grupos WHERE id = $1`, [id])
        if (verificarGrupo.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' })
        }

        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE grupos SET nome = $1, descricao = $2, vagas = $3, categoria_id = $4 WHERE id = $5`;
        const valores = [nome, descricao, vagas, categoria_id, id];
        await BD.query(comando, valores);

        return res.status(200).json('Grupo foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar grupo' })
    }
})

//Rota patch atualizando parcialmente as informações
router.patch('/grupos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, vagas, categoria_id } = req.body;

    try {
        //Verificar se a grupo existe
        const verificarGrupo = await BD.query(`SELECT * FROM grupos WHERE id = $1`, [id])
        if (verificarGrupo.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' })
        }

        //Montar o update dinamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }
        if (descricao !== undefined) {
            campos.push(`descricao = $${contador}`);
            valores.push(descricao);
            contador++;
        }
        if (vagas !== undefined) {
            campos.push(`vagas = $${contador}`);
            valores.push(vagas);
            contador++;
        }
        if (categoria_id !== undefined) {
            campos.push(`categoria_id = $${contador}`);
            valores.push(categoria_id);
            contador++;
        }

        //se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        //Adicionando ID ao final de valores
        valores.push(id)

        //montando a query dinamicamente
        const comando = `UPDATE grupos SET ${campos.join(', ')} WHERE id = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Grupo atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar grupo', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

router.delete('/grupos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM grupos WHERE id = $1`
        await BD.query(comando, [id])
        return res.status(200).json({ message: "Grupo removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover grupo', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

export default router;
