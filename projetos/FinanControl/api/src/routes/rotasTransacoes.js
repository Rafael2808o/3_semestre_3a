import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from "../../../../Barbearia/api/src/middlewares/autenticacao.js";

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
router.post('/transacoes', autenticarToken, async (req, res) => {
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        const id_usuario = req.usuario.id_usuario; // Supondo que o ID do usuário esteja disponível no token de autenticação
        const comandoComUsuario = `INSERT INTO transacoes(valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_usuario) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
        const valoresComUsuario = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_usuario];

        await BD.query(comandoComUsuario, valoresComUsuario)
        console.log(comandoComUsuario, valoresComUsuario);

        return res.status(201).json("Transacao cadastrada.");
    } catch (error) {
        console.error('Erro ao cadastrar transacao', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar transacao' })
    }
})

// endpoint para atualizar uma unica transacao
// recebendo o parametro pelo id e buscando a transacao
router.put('/transacoes/:id_transacao', autenticarToken, async (req, res) => {
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


router.delete('/transacoes/:id_transacao', autenticarToken, async (req, res) => {
    const { id_transacao } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM transacoes WHERE id_transacao = $1`
        const resultado = await BD.query(comando, [id_transacao])

        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: "Transacao não encontrada" })
        }

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

// Listando transações por categoria
router.get('/transacoes/categoria/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params;
    try {
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
                    WHERE t.id_categoria = $1
                    ORDER BY t.data_registro DESC`;
        const transacoes = await BD.query(query, [id_categoria]);
        return res.status(200).json(transacoes.rows);

    } catch (error) {
        console.error('Erro ao listar transacoes por categoria', error.message);
        return res.status(500).json({ error: 'Erro ao listar transacoes por categoria' + error.message });
    }
});

// listar transações por periodo
router.get('/transacoes/periodo', async (req, res) => {
    const { data_inicio, data_fim } = req.query;
    try {
        if (!data_inicio || !data_fim) {
            return res.status(400).json({ message: 'Data de início e data de fim são obrigatórias. Use formato YYYY-MM-DD' });
        }

        // Validar formato das datas (YYYY-MM-DD)
        const regexData = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexData.test(data_inicio) || !regexData.test(data_fim)) {
            return res.status(400).json({ message: 'Formato de data inválido. Use YYYY-MM-DD' });
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
                    WHERE t.data_registro::date BETWEEN $1::date AND $2::date
                    ORDER BY t.data_registro DESC`;

        const transacoes = await BD.query(query, [data_inicio, data_fim]);
        return res.status(200).json(transacoes.rows);
    } catch (error) {
        console.error('Erro ao listar transacoes por periodo', error.message);
        return res.status(500).json({ error: 'Erro ao listar transacoes por periodo: ' + error.message });
    }
});

// Listando transações por subcategoria
router.get('/transacoes/subcategoria/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params;
    try {
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
                    WHERE t.id_subcategoria = $1
                    ORDER BY t.data_registro DESC`;
        const transacoes = await BD.query(query, [id_subcategoria]);
        return res.status(200).json(transacoes.rows);

    } catch (error) {
        console.error('Erro ao listar transacoes por subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao listar transacoes por subcategoria' + error.message });
    }
});

// Agendar compromisso, trabalhando com limite de datas e horarios

router.post('/transacoes/agendar', autenticarToken, async (req, res) => {
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        const hoje = new Date();
        hoje.setHours(0,0,0,0);

        const consulta = `SELECT id_transacao FROM transacoes WHERE data_vencimento = TO_DATE($1, 'YYYY-MM-DD') AND id_categoria = $2 AND id_usuario = $3
        `;
        const conflito = await BD.query(consulta, [data_vencimento, id_categoria, req.usuario.id_usuario]);
        if (conflito.rows.length > 0) {
            return res.status(409).json({ message: 'Já existe uma transação agendada para esta data, categoria e usuário.' });
        }

        const dataVencimento = new Date(data_vencimento);
        dataVencimento.setHours(0,0,0,0);

        if (dataVencimento < hoje) {
            return res.status(400).json({ message: 'Data de vencimento deve ser futura.' });
        }

        const comando = `INSERT INTO transacoes(valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_usuario) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, req.usuario.id_usuario];
        await BD.query(comando, valores)
        return res.status(201).json("Transacao agendada com sucesso.");
    }
    catch (error) { 
        console.error('Erro ao agendar transacao', error.message);
        return res.status(500).json({ error: 'Erro ao agendar transacao' + error.message })
    }
})

export default router