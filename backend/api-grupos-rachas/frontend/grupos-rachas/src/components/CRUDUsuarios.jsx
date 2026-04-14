import { useEffect, useState } from "react"
import Usuario from "./Usuario"

const CRUDUsuarios = () => {
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [editando, setEditando] = useState(false)
    const [idEditando, setIdEditando] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')

    const URL_API = 'http://localhost:3000'

    async function botaoAdicionar() {
        if (!nome || !email || !senha) {
            setErro('Preencha os campos: Nome, Email e Senha!')
            return
        }

        setCarregando(true)
        setErro('')

        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha
        }

        try {
            const url = editando
                ? `${URL_API}/usuarios/${idEditando}`
                : `${URL_API}/usuarios`

            const metodo = editando ? 'PUT' : 'POST'

            const resposta = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            })

            if (!resposta.ok) {
                const respostaErro = await resposta.json()
                throw new Error(respostaErro.error || `Erro: ${resposta.statusText}`)
            }

            await buscarDados()
            LimparCamposFormularios()
            setEditando(false)
            setIdEditando(null)

        } catch (erro) {
            console.error('Erro ao salvar usuário', erro.message)
            setErro('Erro ao salvar usuário: ' + erro.message)
        } finally {
            setCarregando(false)
        }
    }

    async function botaoExcluir(id) {
        if (window.confirm('Deseja realmente excluir este usuário?')) {
            setCarregando(true)
            setErro('')
            try {
                const resposta = await fetch(`${URL_API}/usuarios/${id}`, {
                    method: 'DELETE'
                })

                if (!resposta.ok) {
                    const respostaErro = await resposta.json()
                    throw new Error(respostaErro.error || `Erro: ${resposta.statusText}`)
                }

                await buscarDados()

            } catch (erro) {
                console.error('Erro ao excluir usuário', erro.message)
                setErro('Erro ao excluir usuário: ' + erro.message)
            } finally {
                setCarregando(false)
            }
        }
    }

    async function botaoEditar(usuario) {
        setNome(usuario.nome)
        setEmail(usuario.email)
        setSenha('')
        setEditando(true)
        setIdEditando(usuario.id)
        window.scrollTo(0, 0)
    }

    function LimparCamposFormularios() {
        setNome('')
        setEmail('')
        setSenha('')
        setEditando(false)
        setIdEditando(null)
    }

    useEffect(() => {
        buscarDados()
    }, [])

    async function buscarDados() {
        setCarregando(true)
        setErro('')
        try {
            const resposta = await fetch(`${URL_API}/usuarios`)

            if (!resposta.ok) {
                throw new Error('Erro ao carregar usuários: ' + resposta.statusText)
            }

            const dados = await resposta.json()
            console.log('Usuários carregados:', dados)
            setListaUsuarios(Array.isArray(dados) ? dados : [])

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
            setErro('Erro ao carregar usuários: ' + erro.message)
            setListaUsuarios([])
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div style={estilos.container}>
            <h1 style={estilos.titulo}>Gerenciamento de Usuários</h1>

            {erro && (
                <div style={estilos.alerta}>
                    {erro}
                </div>
            )}

            <div style={estilos.formulario}>
                <h2>{editando ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</h2>

                <input
                    type="text"
                    placeholder="Nome do usuário"
                    style={estilos.inputs}
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    disabled={carregando}
                />

                <input
                    type="email"
                    placeholder="Email"
                    style={estilos.inputs}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={carregando}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    style={estilos.inputs}
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    disabled={carregando}
                />

                <div style={estilos.botoesFormulario}>
                    <button
                        style={estilos.botaoSalvar}
                        onClick={botaoAdicionar}
                        disabled={carregando}
                    >
                        {carregando ? 'Processando...' : (editando ? 'Atualizar Usuário' : 'Adicionar Usuário')}
                    </button>
                    {editando && (
                        <button
                            style={estilos.botaoCancelar}
                            onClick={LimparCamposFormularios}
                            disabled={carregando}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </div>

            <hr style={estilos.divisor} />

            <h2>Lista de Usuários ({listaUsuarios.length})</h2>
            {carregando && <p style={estilos.carregando}>Carregando...</p>}
            <div style={estilos.lista}>
                {listaUsuarios.length === 0 && !carregando ? (
                    <p>Nenhum usuário cadastrado ainda.</p>
                ) : (
                    listaUsuarios.map((usuario) => (
                        <Usuario
                            key={usuario.id}
                            usuario={usuario}
                            botaoExcluir={botaoExcluir}
                            botaoEditar={botaoEditar}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

const estilos = {
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
    },

    titulo: {
        color: "#333",
        textAlign: "center",
        marginBottom: "30px"
    },

    alerta: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "15px",
        borderRadius: "4px",
        marginBottom: "20px",
        border: "1px solid #f5c6cb"
    },

    carregando: {
        color: "#666",
        fontStyle: "italic",
        textAlign: "center"
    },

    formulario: {
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "30px"
    },

    inputs: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxSizing: "border-box"
    },

    botoesFormulario: {
        display: "flex",
        gap: "10px"
    },

    botaoSalvar: {
        flex: 1,
        backgroundColor: "#e30613",
        color: "#fff",
        borderRadius: "5px",
        fontWeight: "bold",
        border: "none",
        padding: "10px",
        fontSize: "16px",
        cursor: "pointer"
    },

    botaoCancelar: {
        backgroundColor: "#999",
        color: "#fff",
        borderRadius: "5px",
        fontWeight: "bold",
        border: "none",
        padding: "10px",
        fontSize: "16px",
        cursor: "pointer"
    },

    divisor: {
        margin: "30px 0"
    },

    lista: {
        display: 'flex',
        gap: 15,
        flexWrap: 'wrap'
    }
}

export default CRUDUsuarios
