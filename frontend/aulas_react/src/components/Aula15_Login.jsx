import { useState } from 'react'
import { enderecoServidor } from '../utils'
import { useNavigate } from 'react-router-dom'

const Aula15_Login = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate()

    const botaoEntrar = async () => {
        try {
            if (email === '' || senha === '') {
                setMensagem('Preencha todos os campos')
                return
            }

            const dadosLogin = {
                "email": email,
                "senha": senha
            }

            // Utilizando autenticação com a API do backend
            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            })
                if (resposta.ok) {
                    const dadosResposta = await resposta.json()
                    setMensagem(`Login realizado com sucesso! Token: ${dadosResposta.token}`)
                    localStorage.setItem('token', dadosResposta.token)
                    navigate('/inicio')
                } else {
                    setMensagem('Login falhou. Verifique suas credenciais.')
                }
                
        } catch (error) {
            console.error(error)
            setMensagem('Erro ao realizar login')
        }

    }

    return (
        <div style={estilos.loginConteudo}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbde4nriDD9cTH89oI4wefdHBvHXZtappHGA&s" 
                style={estilos.logo}/>
            <h2>Login</h2>
            <div style={estilos.grupoInput}>
                <label style={estilos.label} >Email</label>
                <input type="text" placeholder='Digite seu email' style={estilos.input} 
                    onChange={(event) => setEmail(event.target.value)} value={email} />
            </div>
            <div style={estilos.grupoInput}>
                <label style={estilos.label}>Senha</label>
                <input type="password" placeholder='Digite sua senha' style={estilos.input} 
                    onChange={(event) => setSenha(event.target.value)} value={senha}/>
            </div>
            <button onClick={botaoEntrar} style={estilos.botao}>Entrar</button>
            <p style={{fontStyle:'bold'}}>{mensagem}</p>
        </div>
    )

   
}

/** @type {{ [key: string]: import('react').CSSProperties }} */
const estilos = {
    loginConteudo : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        margin: '10px auto',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        gap: '5px'
    },
    logo: {
        height: '50px'
    },
    label: {
        display: 'block',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    botao: {
        width: '100%',
        backgroundColor: '#e30613',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '4px'
    }, 
    grupoInput: {
        width: '100%'
    }
}

export default Aula15_Login