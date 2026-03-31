import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos as subcategorias
router.get('/subcategorias', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM subcategorias ORDER BY id_subcategoria`

        //cria uma variavel para receber o retorno do sql
        const subcategorias = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(subcategorias.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar subcategorias', error.message);
        return res.status(500).json({ error: 'Erro ao listar subcategorias' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/subcategorias', async (req, res) => {
    const { nome, ativo, id_categoria } = req.body;
    try {
        const comando = `INSERT INTO subcategorias(nome, ativo, id_categoria) VALUES($1, $2, $3)`
        const valores = [nome, ativo, id_categoria];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Subcategoria cadastrada.");
    } catch (error) {
        console.error('Erro ao cadastrar subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar subcategoria' })
    }
})

// endpoint para atualizar uma unica subcategoria
// recebendo o parametro pelo id e buscando a subcategoria
router.put('/subcategorias/:id_subcategoria', async (req, res) => {
    // Id recebido via parametro
    const { id_subcategoria } = req.params;

    // Dados da subcategoria recebido via Corpo da página
    const { nome, ativo, id_categoria } = req.body;
    try {
        //Verificar se a subcategoria existe
        const verificarSubcategoria = await BD.query(`SELECT * FROM subcategorias
            WHERE id_subcategoria = $1`, [id_subcategoria])
        if (verificarSubcategoria.rows.length === 0) {
            return res.status(404).json({ message: 'Subcategoria não encontrada' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE subcategorias SET nome = $1, ativo = $2, id_categoria = $3 WHERE
        id_subcategoria = $4`;
        const valores = [nome, ativo, id_categoria, id_subcategoria];
        await BD.query(comando, valores);

        return res.status(200).json('Subcategoria foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar subcategoria' })
    }
})

//Rota patch atualizando parcialmente as informações
router.patch('/subcategorias/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;
    const { nome, ativo, id_categoria } = req.body;

    try {
        //Verificar se a subcategoria existe
        const verificarSubcategoria = await BD.query(`SELECT * FROM subcategorias
            WHERE id_subcategoria = $1`, [id_subcategoria])
        if (verificarSubcategoria.rows.length === 0) {
            return res.status(404).json({ message: 'Subcategoria não encontrada' })
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
        if (ativo !== undefined) {
            campos.push(`ativo = $${contador}`);
            valores.push(ativo);
            contador++;
        }
        if (id_categoria !== undefined) {
            campos.push(`id_categoria = $${contador}`);
            valores.push(id_categoria);
            contador++;
        }

        //se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        //Adicionando ID ao final de valores
        valores.push(id_subcategoria)

        //montando a query dinamicamente
        const comando = `UPDATE subcategorias SET ${campos.join(', ')} WHERE id_subcategoria = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Subcategoria atualizada com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar subcategoria', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

router.delete('/subcategorias/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM subcategorias WHERE id_subcategoria = $1`
        await BD.query(comando, [id_subcategoria])
        return res.status(200).json({ message: "Subcategoria removida com sucesso" })
    } catch (error) {
        console.error('Erro ao remover subcategoria', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

export default router
