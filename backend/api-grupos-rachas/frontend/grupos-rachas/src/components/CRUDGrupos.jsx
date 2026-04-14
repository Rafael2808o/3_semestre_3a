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
        <div style={estilos.container}>
            <h1 style={estilos.titulo}>Gerenciamento de Grupos</h1>

            {erro && (
                <div style={estilos.alerta}>
                    {erro}
                </div>
            )}

            <div style={estilos.formulario}>
                <h2>{editando ? 'Editar Grupo' : 'Cadastrar Novo Grupo'}</h2>

                <input
                    type="text"
                    placeholder="Nome do grupo"
                    style={estilos.inputs}
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    disabled={carregando}
                />

                <textarea
                    placeholder="Descrição"
                    style={estilos.textarea}
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                    rows="3"
                    disabled={carregando}
                />

                <input
                    type="number"
                    placeholder="Vagas"
                    style={estilos.inputs}
                    value={vagas}
                    onChange={(event) => setVagas(event.target.value)}
                    disabled={carregando}
                />

                <select
                    style={estilos.inputs}
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

                <div style={estilos.botoesFormulario}>
                    <button
                        style={estilos.botaoSalvar}
                        onClick={botaoAdicionar}
                        disabled={carregando}
                    >
                        {carregando ? 'Processando...' : (editando ? 'Atualizar Grupo' : 'Adicionar Grupo')}
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

            <h2>Lista de Grupos ({listaGrupos.length})</h2>
            {carregando && <p style={estilos.carregando}>Carregando...</p>}
            <div style={estilos.lista}>
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

    textarea: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif"
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

export default CRUDGrupos
