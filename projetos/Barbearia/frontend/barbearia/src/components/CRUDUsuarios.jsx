import { useEffect, useState } from 'react'

function CRUDUsuarios() {

    const [usuarios, setUsuarios] = useState([])

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [tipo, setTipo] = useState('')

    const [idEditando, setIdEditando] = useState(null)

    const token = localStorage.getItem('token')

    async function listarUsuarios() {
        try {
            const resposta = await fetch('http://localhost:3000/usuarios', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const dados = await resposta.json()
            setUsuarios(dados)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        listarUsuarios()
    }, [])

    async function cadastrarUsuario() {

        const metodo = idEditando ? 'PUT' : 'POST'
        const url = idEditando
            ? `http://localhost:3000/usuarios/${idEditando}`
            : 'http://localhost:3000/usuarios'

        try {
            await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    tipo
                })
            })

            limparCampos()
            listarUsuarios()

        } catch (error) {
            console.error(error)
        }
    }

    function editarUsuario(usuario) {
        setIdEditando(usuario.id_usuario)
        setNome(usuario.nome)
        setEmail(usuario.email)
        setSenha('')
        setTipo(usuario.tipo)
    }

    async function deletarUsuario(id) {
        try {
            await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'DELETE'
            })

            listarUsuarios()

        } catch (error) {
            console.error(error)
        }
    }

    function limparCampos() {
        setNome('')
        setEmail('')
        setSenha('')
        setTipo('')
        setIdEditando(null)
    }

    return (
        <div>
            <h1>CRUD Usuários</h1>

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

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

            <input
                type="text"
                placeholder="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
            />

            <button onClick={cadastrarUsuario}>
                {idEditando ? 'Atualizar' : 'Cadastrar'}
            </button>

            <hr />

            {
                usuarios.map((usuario) => (
                    <div key={usuario.id_usuario}>
                        <p>
                            {usuario.nome} - {usuario.email} - {usuario.tipo}
                        </p>

                        <button onClick={() => editarUsuario(usuario)}>
                            Editar
                        </button>

                        <button onClick={() => deletarUsuario(usuario.id_usuario)}>
                            Deletar
                        </button>
                    </div>
                ))
            }

        </div>
    )
}

export default CRUDUsuarios