import { Router } from 'express';
import { BD } from '../../db.js';

const router = Router();

let idsSorteados = [];

let pontuacoes = {};

const gerarQuiz = async (req, res) => {
    try {

        const { acertou, id_usuario } = req.query;

        if (id_usuario) {

            if (!pontuacoes[id_usuario]) {
                pontuacoes[id_usuario] = 0;
            }

            if (acertou === 'true') {
                pontuacoes[id_usuario] += 10;
            }
        }

        let comando = `
            SELECT *
            FROM quiz
        `;

        if (idsSorteados.length > 0) {
            comando += `
                WHERE id_quiz NOT IN (${idsSorteados.join(',')})
            `;
        }

        comando += `
            ORDER BY RANDOM()
            LIMIT 1
        `;

        const resultado = await BD.query(comando);

        if (resultado.rows.length === 0) {
            idsSorteados = [];

            return res.status(200).json({
                acabou: true,
                mensagem: 'Todas as perguntas já foram utilizadas',
                pontuacao: id_usuario ? pontuacoes[id_usuario] : 0
            });
        }

        const perguntaSorteada = resultado.rows[0];

        idsSorteados.push(perguntaSorteada.id_quiz);

        const opcoes = [
            perguntaSorteada.opcao_1,
            perguntaSorteada.opcao_2,
            perguntaSorteada.opcao_3,
            perguntaSorteada.opcao_4
        ].map((texto) => ({
            nome: texto,
            correta: texto === perguntaSorteada.respostacorreta
        }));

        return res.status(200).json({
            id: perguntaSorteada.id_quiz,
            pergunta: perguntaSorteada.pergunta,
            categoria: perguntaSorteada.categoria,
            opcoes,
            pontuacao: id_usuario ? pontuacoes[id_usuario] : 0
        });

    } catch (erro) {
        console.error('Erro ao gerar quiz:', erro);

        return res.status(500).json({
            erro: 'Erro interno ao gerar quiz'
        });
    }
};

router.get('/quiz', gerarQuiz);
router.get('/jogo', gerarQuiz);

export default router;