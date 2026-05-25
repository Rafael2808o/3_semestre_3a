import jwt from 'jsonwebtoken'

const SECRET_KEY = 'sua_chave_secreta';

export function autenticarToken(req, res, next) {
    const cabecalho = req.headers['authorization'] || req.headers['Authorization'];

    // Extrair o token no padrão Bearer ou aceitar o token cru
    const token = cabecalho?.startsWith('Bearer ') ? cabecalho.slice(7) : cabecalho;

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

