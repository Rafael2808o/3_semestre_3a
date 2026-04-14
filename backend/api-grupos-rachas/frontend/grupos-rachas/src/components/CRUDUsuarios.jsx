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
        <div className="crud-container">
            <h1 className="crud-titulo">Gerenciamento de Usuários</h1>

            {erro && (
                <div className="crud-alerta">
                    {erro}
                </div>
            )}

            <div className="crud-formulario">
                <h2>{editando ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</h2>

                <input
                    type="text"
                    placeholder="Nome do usuário"
                    className="crud-input"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    disabled={carregando}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="crud-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={carregando}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="crud-input"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    disabled={carregando}
                />

                <div className="crud-botoes">
                    <button
                        className="crud-botao-salvar"
                        onClick={botaoAdicionar}
                        disabled={carregando}
                    >
                        {carregando ? 'Processando...' : (editando ? 'Atualizar Usuário' : 'Adicionar Usuário')}
                    </button>
                    {editando && (
                        <button
                            className="crud-botao-cancelar"
                            onClick={LimparCamposFormularios}
                            disabled={carregando}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </div>

            <hr className="crud-divisor" />

            <h2 className="crud-lista-titulo">Lista de Usuários ({listaUsuarios.length})</h2>
            {carregando && <p className="crud-carregando">Carregando...</p>}
            <div className="crud-lista">
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

export default CRUDUsuarios
