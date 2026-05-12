import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function logar() {
        try {
            const resposta = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    senha
                })
            })

            const dados = await resposta.json()

            if (dados.token) {
                localStorage.setItem('token', dados.token)
                alert('Login realizado!')
            } else {
                alert(dados.error)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <button onClick={logar}>
                Entrar
            </button>
        </div>
    )
}

export default Login