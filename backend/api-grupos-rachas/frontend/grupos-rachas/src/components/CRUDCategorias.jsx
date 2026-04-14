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
        <div className="crud-container">
            <h1 className="crud-titulo">Gerenciamento de Categorias</h1>

            {erro && (
                <div className="crud-alerta">
                    {erro}
                </div>
            )}

            <div className="crud-formulario">
                <h2>{editando ? 'Editar Categoria' : 'Cadastrar Nova Categoria'}</h2>

                <input
                    type="text"
                    placeholder="Nome da categoria"
                    className="crud-input"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    disabled={carregando}
                />

                <div className="crud-botoes">
                    <button
                        className="crud-botao-salvar"
                        onClick={botaoAdicionar}
                        disabled={carregando}
                    >
                        {carregando ? 'Processando...' : (editando ? 'Atualizar Categoria' : 'Adicionar Categoria')}
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

            <h2 className="crud-lista-titulo">Lista de Categorias ({listaCategorias.length})</h2>
            {carregando && <p className="crud-carregando">Carregando...</p>}
            <div className="crud-lista">
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

export default CRUDCategorias
