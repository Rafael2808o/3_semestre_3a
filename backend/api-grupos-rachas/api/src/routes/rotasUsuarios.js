import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';

const router = Router();

router.get('/usuarios', async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios ORDER BY id`
        const usuarios = await BD.query(query);
        return res.status(200).json(usuarios.rows);
    } catch (error) {
        console.error('Erro ao listar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
})

router.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

        const comando = `INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3)`
        const valores = [nome, email, senhaCriptografada];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Usuário cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
    }
})

router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios WHERE id = $1`, [id])
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }

        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4`;
        const valores = [nome, email, senhaCriptografada, id];
        await BD.query(comando, valores);

        return res.status(200).json('Usuário foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar usuário', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuario' })
    }
})

router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comando = `DELETE FROM usuarios WHERE id = $1`
        await BD.query(comando, [id])
        return res.status(200).json({ message: "Usuário removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover usuario', error.message)
        return res.status(500).json({ message: "Erro interno do servidor" + error.message })
    }
})

router.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM usuarios WHERE id = $1`
        const usuario = await BD.query(query, [id]);

        if (usuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }

        return res.status(200).json(usuario.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar usuario', error.message);
        return res.status(500).json({ error: 'Erro ao buscar usuario' })
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const comando = 'SELECT * FROM usuarios WHERE email = $1';
        const resultado = await BD.query(comando, [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        });
    } catch (error) {
        console.error('Erro ao realizar login', error.message);
        return res.status(500).json({ error: 'Erro ao realizar login' })
    }
})

export default router;
