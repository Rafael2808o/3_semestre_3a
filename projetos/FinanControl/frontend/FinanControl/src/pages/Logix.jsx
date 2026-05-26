import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { EnderecoServidor } from "../utils"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('ria@email.com')
    const [senha, setSenha] = useState('123')
    const [mensagem, setMensagem] = useState('')

        async function botaoEntrar(event) {
    event.preventDefault();

    try {
        if (!email.trim() || !senha.trim()) {
            setMensagem('Preencha todos os campos');
            return;
        }

        setMensagem('Login realizado com sucesso!');
        navigate('/principal');

        const login = {
            "email": email,
            "senha": senha
        };

            const resposta = await fetch(EnderecoServidor + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });
            if (resposta.status === 404) {
                setMensagem('Rota não encontrada: ' + resposta.url);
                return;
            }
            const dados = await resposta.json();
                        if (resposta.status === 500) {
                setMensagem('Erro no servidor: ' + dados.message);
                return;
            }
            if (resposta.ok) {
                localStorage.setItem('UsuarioLogado', JSON.stringify(dados));
                setMensagem('Login realizado com sucesso!');
                navigate('/principal');
            }
                else {  
                setMensagem('Email ou senha incorretos: ' + dados.message);
            }

    } catch (error) {
        console.error('Erro ao fazer login', error.message);
        setMensagem('Erro ao fazer login: ' + error.message);
    }
}


        return (
        <div className="login">
            <h1>Tela de Login</h1>
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" 
            value={email} onChange={(e) => setEmail(e.target.value)}
            />
        
            <br />
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" 
            value={senha} onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={botaoEntrar}>Entrar</button>
            <p style={{color: '#f00'}}>{mensagem}</p>            
        </div>
    )

    }



