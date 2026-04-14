import { useEffect, useState } from "react"
import Categoria from "./Categoria"

const CRUDCategorias = () => {
    const [listaCategorias, setListaCategorias] = useState([])
    const [nome, setNome] = useState('')
    const [editando, setEditando] = useState(false)
    const [idEditando, setIdEditando] = useState(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState('')

    const URL_API = 'http://localhost:3000'

    async function botaoAdicionar() {
        if (!nome) {
            setErro('Preencha o campo: Nome!')
            return
        }

        setCarregando(true)
        setErro('')

        const novaCategoria = {
            nome: nome
        }

        try {
            const url = editando
                ? `${URL_API}/categorias/${idEditando}`
                : `${URL_API}/categorias`

            const metodo = editando ? 'PUT' : 'POST'

            const resposta = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaCategoria)
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
            console.error('Erro ao salvar categoria', erro.message)
            setErro('Erro ao salvar categoria: ' + erro.message)
        } finally {
            setCarregando(false)
        }
    }

    async function botaoExcluir(id) {
        if (window.confirm('Deseja realmente excluir esta categoria?')) {
            setCarregando(true)
            setErro('')
            try {
                const resposta = await fetch(`${URL_API}/categorias/${id}`, {
                    method: 'DELETE'
                })

                if (!resposta.ok) {
                    const respostaErro = await resposta.json()
                    throw new Error(respostaErro.error || `Erro: ${resposta.statusText}`)
                }

                await buscarDados()

            } catch (erro) {
                console.error('Erro ao excluir categoria', erro.message)
                setErro('Erro ao excluir categoria: ' + erro.message)
            } finally {
                setCarregando(false)
            }
        }
    }

    async function botaoEditar(categoria) {
        setNome(categoria.nome)
        setEditando(true)
        setIdEditando(categoria.id)
        window.scrollTo(0, 0)
    }

    function LimparCamposFormularios() {
        setNome('')
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
            const resposta = await fetch(`${URL_API}/categorias`)

            if (!resposta.ok) {
                throw new Error('Erro ao carregar categorias: ' + resposta.statusText)
            }

            const dados = await resposta.json()
            console.log('Categorias carregadas:', dados)
            setListaCategorias(Array.isArray(dados) ? dados : [])

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
            setErro('Erro ao carregar categorias: ' + erro.message)
            setListaCategorias([])
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div style={estilos.container}>
            <h1 style={estilos.titulo}>Gerenciamento de Categorias</h1>

            {erro && (
                <div style={estilos.alerta}>
                    {erro}
                </div>
            )}

            <div style={estilos.formulario}>
                <h2>{editando ? 'Editar Categoria' : 'Cadastrar Nova Categoria'}</h2>

                <input
                    type="text"
                    placeholder="Nome da categoria"
                    style={estilos.inputs}
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    disabled={carregando}
                />

                <div style={estilos.botoesFormulario}>
                    <button
                        style={estilos.botaoSalvar}
                        onClick={botaoAdicionar}
                        disabled={carregando}
                    >
                        {carregando ? 'Processando...' : (editando ? 'Atualizar Categoria' : 'Adicionar Categoria')}
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

            <h2>Lista de Categorias ({listaCategorias.length})</h2>
            {carregando && <p style={estilos.carregando}>Carregando...</p>}
            <div style={estilos.lista}>
                {listaCategorias.length === 0 && !carregando ? (
                    <p>Nenhuma categoria cadastrada ainda.</p>
                ) : (
                    listaCategorias.map((categoria) => (
                        <Categoria
                            key={categoria.id}
                            categoria={categoria}
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

export default CRUDCategorias
