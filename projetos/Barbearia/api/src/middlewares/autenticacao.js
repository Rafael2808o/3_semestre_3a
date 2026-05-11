import jwt from 'jsonwebtoken'

     const SECRET_KEY = 'sua_chave_secreta';
    export function autenticarToken(req, res, next) {
        const cabecalho = req.headers['authorization'];

        // Extrair o token, no padrão bearer Token

        const token = cabecalho && cabecalho.split(' ')[1];

        if (!token) {
            return res.status(401).json({ mensagem: 'Token não fornecido' });
        }

        try {
            const usuario = jwt.verify(token, SECRET_KEY);
            req.usuario = usuario;
            next();
        } catch (error) {
            return res.status(403).json({ mensagem: 'Token inválido' });
        }
    }

