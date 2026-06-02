import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { autenticarToken } from "../middlewares/autenticacao.js";

const SECRET_KEY = 'sua_chave_secreta';

const router = Router();

router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios ORDER BY id_usuario`

        const usuarios = await BD.query(query);


        return res.status(200).json(usuarios.rows);//200 ok
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

        const comando = `INSERT INTO USUARIOS(nome, email, senha) VALUES($1, $2, $3)`
        const valores = [nome, email, senhaCriptografada];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Usuário cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
    }
})


router.put('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;

    const { nome, email, senha } = req.body;
    try {
        const verificarUsuario = await BD.query(`SELECT * FROM USUARIOS
            WHERE id_usuario = $1`, [id_usuario])
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }
        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        const comando = `UPDATE USUARIOS SET nome = $1, email = $2, senha = $3 WHERE
        id_usuario = $4`;
        const valores = [nome, email, senhaCriptografada, id_usuario];
        await BD.query(comando, valores);

        return res.status(200).json('Usuario foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' })
    }
})

router.patch('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const verificarUsuario = await BD.query(`SELECT * FROM USUARIOS
            WHERE id_usuario = $1`, [id_usuario])
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

        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        valores.push(id_usuario)

        const comando = `UPDATE USUARIOS SET ${campos.join(', ')} WHERE id_usuario = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Usuário atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.delete('/usuarios/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const comando = `DELETE FROM USUARIOS WHERE id_usuario = $1`
        await BD.query(comando, [id_usuario])
        return res.status(200).json({ message: "Usuario removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {

        console.log(email);
        console.log(senha);

        const comando = 'SELECT * FROM usuarios WHERE email = $1';
        const resultado = await BD.query(comando, [email]);

        console.log(resultado.rows);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        const usuario = resultado.rows[0];

        console.log(usuario.senha);

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        console.log(senhaCorreta);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email,
                tipo_acesso: usuario.tipo_acesso
            },
            SECRET_KEY
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email,
            tipo_acesso: usuario.tipo_acesso
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro interno'
        });
    }
});


export default router