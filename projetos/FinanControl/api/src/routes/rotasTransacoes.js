import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todas as transacoes
router.get('/transacoes', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT
                       t.id_transacao,
                       t.valor,
                       t.descricao,
                       TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                       TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                       TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                       t.tipo,
                       c.nome AS categoria,
                       s.nome AS subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    ORDER BY t.data_vencimento DESC`;

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(query);

        //retorno para a pagina, o json com os dados
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar transacoes', error.message);
        return res.status(500).json({ error: 'Erro ao listar transacoes' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/transacoes', async (req, res) => {
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        const comando = `INSERT INTO transacoes(valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria) VALUES($1, $2, $3, $4, $5, $6, $7)`
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Transacao cadastrada.");
    } catch (error) {
        console.error('Erro ao cadastrar transacao', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar transacao' })
    }
})

// endpoint para atualizar uma unica transacao
// recebendo o parametro pelo id e buscando a transacao
router.put('/transacoes/:id_transacao', async (req, res) => {
    // Id recebido via parametro
    const { id_transacao } = req.params;

    // Dados da transacao recebido via Corpo da página
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        //Verificar se a transacao existe
        const verificarTransacao = await BD.query(`SELECT * FROM transacoes
            WHERE id_transacao = $1`, [id_transacao])
        if (verificarTransacao.rows.length === 0) {
            return res.status(404).json({ message: 'Transacao não encontrada' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE transacoes SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo = $5, id_subcategoria = $6, id_categoria = $7 WHERE
        id_transacao = $8`;
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_transacao];
        await BD.query(comando, valores);

        return res.status(200).json('Transacao foi atualizada!');
    } catch (error) {
        console.error('Erro ao atualizar transacao', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar transacao' })
    }
})


router.delete('/transacoes/:id_transacao', async (req, res) => {
    const { id_transacao } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM transacoes WHERE id_transacao = $1`
        await BD.query(comando, [id_transacao])
        return res.status(200).json({ message: "Transacao removida com sucesso" })
    } catch (error) {
        console.error('Erro ao remover transacao', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

// Listando transações por tipo (E ou S)
router.get('/transacoes/tipo/:tipo', async (req, res) => {
    const { tipo } = req.params;
    try {
        if (tipo !== 'E' && tipo !== 'S') {
            return res.status(400).json({ message: 'Tipo de transação inválido. Use "E" para entrada ou "S" para saída.' });
        }
 const query = `SELECT
                       t.id_transacao,
                       t.valor,
                       t.descricao,
                       TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                       TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                       TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                       t.tipo,
                       c.nome AS categoria,
                       s.nome AS subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    WHERE t.tipo = $1
                    ORDER BY t.data_registro DESC`;
        const transacoes = await BD.query(query, [tipo]);
        return res.status(200).json(transacoes.rows);

    } catch (error) {
        console.error('Erro ao listar transacoes por tipo', error.message);
        return res.status(500).json({ error: 'Erro ao listar transacoes por tipo' + error.message });
    }
});



export default router
