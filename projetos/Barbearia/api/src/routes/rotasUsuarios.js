import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import { Router } from "express";
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const router = Router();
const SECRET_KEY = 'sua_chave_secreta';

router.get('/', autenticarToken, async (req, res) => {
    try {
        const usuarios = await BD.query(`SELECT * FROM usuarios ORDER BY id_usuario`);
        return res.status(200).json(usuarios.rows);
    } catch (error) {
        console.error('Erro ao listar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
})

router.post('/', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

        await BD.query(
            `INSERT INTO usuarios(nome, email, senha, tipo) VALUES($1, $2, $3, $4)`,
            [nome, email, senhaCriptografada, tipo]
        );

        return res.status(201).json({ message: "Usuário cadastrado." });
    } catch (error) {
        console.error('Erro ao cadastrar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await BD.query(`SELECT * FROM usuarios WHERE id_usuario = $1`, [id]);
        if (usuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }
        return res.status(200).json(usuario.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar usuario', error.message);
        return res.status(500).json({ error: 'Erro ao buscar usuario' })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;
    try {
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios WHERE id_usuario = $1`, [id])
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }

        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

        await BD.query(
            `UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo = $4 WHERE id_usuario = $5`,
            [nome, email, senhaCriptografada, tipo, id]
        );

        return res.status(200).json({ message: 'Usuário foi atualizado!' });
    } catch (error) {
        console.error('Erro ao atualizar usuário', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuario' })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;

    try {
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios WHERE id_usuario = $1`, [id])
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }
        if (email !== undefined) {
            campos.push(`email = $${contador}`);
            valores.push(email);
            contador++;
        }
        if (senha !== undefined) {
            const saltRounds = 10
            const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
            campos.push(`senha = $${contador}`);
            valores.push(senhaCriptografada);
            contador++;
        }
        if (tipo !== undefined) {
            campos.push(`tipo = $${contador}`);
            valores.push(tipo);
            contador++;
        }

        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        valores.push(id)

        const comando = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Usuário atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await BD.query(`DELETE FROM usuarios WHERE id_usuario = $1`, [id]);
        return res.status(200).json({ message: "Usuário removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover usuario', error.message)
        return res.status(500).json({ error: "Erro ao remover usuario" })
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const resultado = await BD.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
// Gerar token JWT
// Gerar token JWT com os dados do usuário logado
        const token = jwt.sign(
            { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
            SECRET_KEY,
            // { expiresIn: '15m' }
        );         

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
            token: token
        });
    } catch (error) {
        console.error('Erro ao realizar login', error.message);
        return res.status(500).json({ error: 'Erro ao realizar login' })
    }
})

export default router;
