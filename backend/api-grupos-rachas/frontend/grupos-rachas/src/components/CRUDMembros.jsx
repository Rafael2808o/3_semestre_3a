import { useEffect, useState } from "react"
import Membro from "./Membro"

const CRUDMembros = () => {
    const [listaMembros, setListaMembros] = useState([])
    const [usuarioId, setUsuarioId] = useState('')
    const [grupoId, setGrupoId] = useState('')
    const [papel, setPapel] = useState('')
    const [editando, setEditando] = useState(false)
    const [idEditando, setIdEditando] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [grupos, setGrupos] = useState([])

    const URL_API = 'http://localhost:3000'

    async function botaoAdicionar() {
        if (!usuarioId || !grupoId || !papel) {
            setErro('Preencha os campos: Usuário, Grupo e Papel!')
            return
        }

        setCarregando(true)
        setErro('')

        const novoMembro = {
            usuario_id: parseInt(usuarioId),
            grupo_id: parseInt(grupoId),
            papel: papel
        }

        try {
            const url = editando
                ? `${URL_API}/membros/${idEditando}`
                : `${URL_API}/membros`

            const metodo = editando ? 'PUT' : 'POST'

            const resposta = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoMembro)
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
            console.error('Erro ao salvar membro', erro.message)
            setErro('Erro ao salvar membro: ' + erro.message)
        } finally {
            setCarregando(false)
        }
    }

    async function botaoExcluir(id) {
        if (window.confirm('Deseja realmente excluir este membro?')) {
            setCarregando(true)
            setErro('')
            try {
                const resposta = await fetch(`${URL_API}/membros/${id}`, {
                    method: 'DELETE'
                })

                if (!resposta.ok) {
                    const respostaErro = await resposta.json()
                    throw new Error(respostaErro.error || `Erro: ${resposta.statusText}`)
                }

                await buscarDados()

            } catch (erro) {
                console.error('Erro ao excluir membro', erro.message)
                setErro('Erro ao excluir membro: ' + erro.message)
            } finally {
                setCarregando(false)
            }
        }
    }

    async function botaoEditar(membro) {
        setUsuarioId(membro.usuario_id)
        setGrupoId(membro.grupo_id)
        setPapel(membro.papel)
        setEditando(true)
        setIdEditando(membro.id)
        window.scrollTo(0, 0)
    }

    function LimparCamposFormularios() {
        setUsuarioId('')
        setGrupoId('')
        setPapel('')
        setEditando(false)
        setIdEditando(null)
    }

    useEffect(() => {
        carregarUsuariosGrupos()
        buscarDados()
    }, [])

    async function carregarUsuariosGrupos() {
        try {
            const respostaUsuarios = await fetch(`${URL_API}/usuarios`)
            const respostaGrupos = await fetch(`${URL_API}/grupos`)

            if (!respostaUsuarios.ok || !respostaGrupos.ok) {
                throw new Error('Erro ao carregar usuários ou grupos')
            }

            const dadosUsuarios = await respostaUsuarios.json()
            const dadosGrupos = await respostaGrupos.json()

            setUsuarios(dadosUsuarios)
            setGrupos(dadosGrupos)
        } catch (erro) {
            console.error('Erro ao carregar usuários e grupos', erro.message)
        }
    }

    async function buscarDados() {
        setCarregando(true)
        setErro('')
        try {
            const resposta = await fetch(`${URL_API}/membros`)

            if (!resposta.ok) {
                throw new Error('Erro ao carregar membros: ' + resposta.statusText)
            }

            const dados = await resposta.json()
            console.log('Membros carregados:', dados)
            setListaMembros(Array.isArray(dados) ? dados : [])

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
            setErro('Erro ao carregar membros: ' + erro.message)
            setListaMembros([])
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className="crud-container">
            <h1 className="crud-titulo">Gerenciamento de Membros</h1>

            {erro && (
                <div className="crud-alerta">
                    {erro}
                </div>
            )}

            <div className="crud-formulario">
                <h2>{editando ? 'Editar Membro' : 'Cadastrar Novo Membro'}</h2>

                <select
                    className="crud-select"
                    value={usuarioId}
                    onChange={(event) => setUsuarioId(event.target.value)}
                    disabled={carregando}
                >
                    <option value="">Selecione um usuário</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nome}
                        </option>
                    ))}
                </select>

                <select
                    className="crud-select"
                    value={grupoId}
                    onChange={(event) => setGrupoId(event.target.value)}
                    disabled={carregando}
                >
                    <option value="">Selecione um grupo</option>
                    {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>
                            {grupo.nome}
                        </option>
                    ))}
                </select>

                <select
                    className="crud-select"
                    value={papel}
                    onChange={(event) => setPapel(event.target.value)}
                    disabled={carregando}
                >
                    <option value="">Selecione um papel</option>
                    <option value="membro">Membro</option>
                    <option value="admin">Admin</option>
                    <option value="moderador">Moderador</option>
                </select>

                <div className="crud-botoes">
                    <button
                        className="crud-botao-salvar"
                        onClick={botaoAdicionar}
                        disabled={carregando}
                    >
                        {carregando ? 'Processando...' : (editando ? 'Atualizar Membro' : 'Adicionar Membro')}
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

            <h2 className="crud-lista-titulo">Lista de Membros ({listaMembros.length})</h2>
            {carregando && <p className="crud-carregando">Carregando...</p>}
            <div className="crud-lista">
                {listaMembros.length === 0 && !carregando ? (
                    <p>Nenhum membro cadastrado ainda.</p>
                ) : (
                    listaMembros.map((membro) => (
                        <Membro
                            key={membro.id}
                            membro={membro}
                            botaoExcluir={botaoExcluir}
                            botaoEditar={botaoEditar}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default CRUDMembros
