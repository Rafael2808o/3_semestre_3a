import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

router.get('/membros', async (req, res) => {
    try {
        const query = `SELECT * FROM membros ORDER BY id`
        const membros = await BD.query(query);
        return res.status(200).json(membros.rows);
    } catch (error) {
        console.error('Erro ao listar membros', error.message);
        return res.status(500).json({ error: 'Erro ao listar membros' })
    }
})

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

        console.log('Tentando inserir:', { usuario_id, grupo_id, papel });
        await BD.query(comando, valores)
        console.log('Membro inserido com sucesso');

        return res.status(201).json("Membro cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar membro:', error.message);
        console.error('Stack:', error);
        return res.status(500).json({ error: 'Erro ao cadastrar membro: ' + error.message })
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

//Rota patch atualizando parcialmente as informações
router.patch('/membros/:id', async (req, res) => {
    const { id } = req.params;
    const { papel } = req.body;

    try {
        //Verificar se o membro existe
        const verificarMembro = await BD.query(`SELECT * FROM membros WHERE id = $1`, [id])
        if (verificarMembro.rows.length === 0) {
            return res.status(404).json({ message: 'Membro não encontrado' })
        }

        //Montar o update dinamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (papel !== undefined) {
            campos.push(`papel = $${contador}`);
            valores.push(papel);
            contador++;
        }

        //se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        //Adicionando ID ao final de valores
        valores.push(id)

        //montando a query dinamicamente
        const comando = `UPDATE membros SET ${campos.join(', ')} WHERE id = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Membro atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar membro', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

router.delete('/membros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM membros WHERE id = $1`
        await BD.query(comando, [id])
        return res.status(200).json({ message: "Membro removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover membro', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

export default router;
