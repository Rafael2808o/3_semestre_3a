import { useEffect, useState } from "react"
import Grupo from "./Grupo"

const CRUDGrupos = () => {
    const [listaGrupos, setListaGrupos] = useState([])
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [vagas, setVagas] = useState('')
    const [categoriaId, setCategoriaId] = useState('')
    const [editando, setEditando] = useState(false)
    const [idEditando, setIdEditando] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')
    const [categorias, setCategorias] = useState([])

    const URL_API = 'http://localhost:3000'

    async function botaoAdicionar() {
        if (!nome || !vagas || !categoriaId) {
            setErro('Preencha os campos: Nome, Vagas e Categoria!')
            return
        }

        setCarregando(true)
        setErro('')

        const novoGrupo = {
            nome: nome,
            descricao: descricao,
            vagas: parseInt(vagas),
            categoria_id: parseInt(categoriaId)
        }

        try {
            const url = editando
                ? `${URL_API}/grupos/${idEditando}`
                : `${URL_API}/grupos`

            const metodo = editando ? 'PUT' : 'POST'

            const resposta = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoGrupo)
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
            console.error('Erro ao salvar grupo', erro.message)
            setErro('Erro ao salvar grupo: ' + erro.message)
        } finally {
            setCarregando(false)
        }
    }

    async function botaoExcluir(id) {
        if (window.confirm('Deseja realmente excluir este grupo?')) {
            setCarregando(true)
            setErro('')
            try {
                const resposta = await fetch(`${URL_API}/grupos/${id}`, {
                    method: 'DELETE'
                })

                if (!resposta.ok) {
                    const respostaErro = await resposta.json()
                    throw new Error(respostaErro.error || `Erro: ${resposta.statusText}`)
                }

                await buscarDados()

            } catch (erro) {
                console.error('Erro ao excluir grupo', erro.message)
                setErro('Erro ao excluir grupo: ' + erro.message)
            } finally {
                setCarregando(false)
            }
        }
    }

    async function botaoEditar(grupo) {
        setNome(grupo.nome)
        setDescricao(grupo.descricao)
        setVagas(grupo.vagas)
        setCategoriaId(grupo.categoria_id)
        setEditando(true)
        setIdEditando(grupo.id)
        window.scrollTo(0, 0)
    }

    function LimparCamposFormularios() {
        setNome('')
        setDescricao('')
        setVagas('')
        setCategoriaId('')
        setEditando(false)
        setIdEditando(null)
    }

    useEffect(() => {
        carregarCategorias()
        buscarDados()
    }, [])

    async function carregarCategorias() {
        try {
            const resposta = await fetch(`${URL_API}/categorias`)
            if (!resposta.ok) {
                throw new Error('Erro ao carregar categorias')
            }
            const dados = await resposta.json()
            setCategorias(dados)
        } catch (erro) {
            console.error('Erro ao carregar categorias', erro.message)
        }
    }

    async function buscarDados() {
        setCarregando(true)
        setErro('')
        try {
            const resposta = await fetch(`${URL_API}/grupos`)

            if (!resposta.ok) {
                throw new Error('Erro ao carregar grupos: ' + resposta.statusText)
            }

            const dados = await resposta.json()
            console.log('Grupos carregados:', dados)
            setListaGrupos(Array.isArray(dados) ? dados : [])

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
            setErro('Erro ao carregar grupos: ' + erro.message)
            setListaGrupos([])
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className="crud-container">
            <h1 className="crud-titulo">Gerenciamento de Grupos</h1>

            {erro && (
                <div className="crud-alerta">
                    {erro}
                </div>
            )}

            <div className="crud-formulario">
                <h2>{editando ? 'Editar Grupo' : 'Cadastrar Novo Grupo'}</h2>

                <input
                    type="text"
                    placeholder="Nome do grupo"
                    className="crud-input"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    disabled={carregando}
                />

                <textarea
                    placeholder="Descrição"
                    className="crud-textarea"
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                    rows="3"
                    disabled={carregando}
                />

                <input
                    type="number"
                    placeholder="Vagas"
                    className="crud-input"
                    value={vagas}
                    onChange={(event) => setVagas(event.target.value)}
                    disabled={carregando}
                />

                <select
                    className="crud-select"
                    value={categoriaId}
                    onChange={(event) => setCategoriaId(event.target.value)}
                    disabled={carregando}
                >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>

                <div className="crud-botoes">
                    <button
                        className="crud-botao-salvar"
                        onClick={botaoAdicionar}
                        disabled={carregando}
                    >
                        {carregando ? 'Processando...' : (editando ? 'Atualizar Grupo' : 'Adicionar Grupo')}
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

            <h2 className="crud-lista-titulo">Lista de Grupos ({listaGrupos.length})</h2>
            {carregando && <p className="crud-carregando">Carregando...</p>}
            <div className="crud-lista">
                {listaGrupos.length === 0 && !carregando ? (
                    <p>Nenhum grupo cadastrado ainda.</p>
                ) : (
                    listaGrupos.map((grupo) => (
                        <Grupo
                            key={grupo.id}
                            grupo={grupo}
                            botaoExcluir={botaoExcluir}
                            botaoEditar={botaoEditar}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default CRUDGrupos
