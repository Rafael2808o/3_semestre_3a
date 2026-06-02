import { Router } from 'express';
import { BD } from '../../db.js';

const router = Router();

const gerarRodada = async (req, res) => {
    try {
        const comando = `SELECT * FROM questoes`;
        const resultado = await BD.query(comando);
        const todasQuestoes = resultado.rows;

        if (todasQuestoes.length === 0) {
            return res.status(404).json({
                message: 'Nenhuma questão cadastrada'
            });
        }

        const indice = Math.floor(Math.random() * todasQuestoes.length);
        const perguntaSorteada = todasQuestoes[indice];

        console.log('Pergunta sorteada:', perguntaSorteada);

        const opcoes = [
            perguntaSorteada.opcao1,
            perguntaSorteada.opcao2,
            perguntaSorteada.opcao3,
            perguntaSorteada.opcao4,
        ].map((texto) => ({
            nome: texto,
            correta: texto === perguntaSorteada.resposta_correta,
        }));

        return res.status(200).json({
            bandeira: perguntaSorteada.foto,
            opcoes,
        });

    } catch (erro) {
        console.error('Erro ao gerar rodada:', erro);

        return res.status(500).json({
            erro: 'Erro interno ao gerar rodada'
        });
    }
};

router.get('/rodada', gerarRodada);
router.get('/jogo', gerarRodada);

export default router;