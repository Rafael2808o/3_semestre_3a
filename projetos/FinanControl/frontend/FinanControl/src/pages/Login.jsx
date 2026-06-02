import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { EnderecoServidor } from "../utils"
import { EstilosLogin } from '../styles/EstilosLogin'
import logo from '../assets/logo.png'

import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'


export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [lembrar, setLembrar] = useState(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('UsuarioLogado');
        const credenciaisSalvas = localStorage.getItem('CredenciaisSalvas');

        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo);
            if (dados.lembrar) {
                navigate('/principal');
            }
        }

        if (credenciaisSalvas) {
            const creds = JSON.parse(credenciaisSalvas);
            setEmail(creds.email);
            setSenha(creds.senha);
            setLembrar(true);
        }
    }, [])

    async function botaoEntrar(event) {
        event.preventDefault();

        try {
            if (!email.trim() || !senha.trim()) {
                setMensagem('Preencha todos os campos');
                return;
            }

            const dadosLogin = {
                "email": email,
                "senha": senha
            };

            const resposta = await fetch(EnderecoServidor + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
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
                const usuarioCompleto = { ...dados, lembrar };
                localStorage.setItem('UsuarioLogado', JSON.stringify(usuarioCompleto));

                if (lembrar) {
                    localStorage.setItem('CredenciaisSalvas', JSON.stringify({ email, senha }));
                } else {
                    localStorage.removeItem('CredenciaisSalvas');
                }

                setMensagem('Login realizado com sucesso!');
                navigate('/principal');
            } else {
                setMensagem('Email ou senha incorretos: ' + dados.message);
            }

        } catch (error) {
            console.error('Erro ao fazer login', error.message);
            setMensagem('Erro ao fazer login: ' + error.message);
        }
    }


    return (
        <div style={EstilosLogin.container}>
            <header style={EstilosLogin.cabecalho}>
                <img src={logo} style={EstilosLogin.iconeLogo} />
                <div>
                    <h1 style={EstilosLogin.nomeApp}>FinanControl</h1>
                    <p style={EstilosLogin.subtituloApp}>O seu Controle Financeiro</p>
                </div>
            </header>

            <main style={EstilosLogin.conteudoPrincipal}>
                <form style={EstilosLogin.formularioLogin}>
                    <h2 style={EstilosLogin.titulo}>Acesse sua conta</h2>

                    <div style={EstilosLogin.grupoInput}>
                        <MdEmail style={EstilosLogin.iconeInput} />
                        <input type="email" style={EstilosLogin.input} placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div style={EstilosLogin.grupoInput}>
                        <MdLock style={EstilosLogin.iconeInput} />
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            style={EstilosLogin.input} placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <button style={EstilosLogin.alternarVisibilidade} type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
                            {mostrarSenha ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                    </div>

                    <div style={EstilosLogin.entreOpcoes}>
                        <div style={EstilosLogin.containerCheckbox}>
                            <input type="checkbox" style={EstilosLogin.checkbox}
                                checked={lembrar} onChange={(e) => setLembrar(e.target.checked)}
                            />
                            <label> Lembrar-me </label>

                        </div>
                        <a href="#" style={EstilosLogin.esqueceuSenha}>Esqueci a senha</a>
                    </div>

                    <button style={EstilosLogin.botaoEntrar} onClick={botaoEntrar}>Entrar</button>

                    <p style={EstilosLogin.mensagemFeedback}>{mensagem}</p>
                </form>

            </main>
        </div>
    )

}



