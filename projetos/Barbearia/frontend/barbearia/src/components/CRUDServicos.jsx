import { useEffect, useState } from 'react'

function CRUDServicos() {

    const [servicos, setServicos] = useState([])

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')

    const [idEditando, setIdEditando] = useState(null)

    const token = localStorage.getItem('token')

    async function listarServicos() {
        try {
            const resposta = await fetch('http://localhost:3000/servicos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const dados = await resposta.json()
            setServicos(dados)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        listarServicos()
    }, [])

    async function cadastrarServico() {

        const metodo = idEditando ? 'PUT' : 'POST'

        const url = idEditando
            ? `http://localhost:3000/servicos/${idEditando}`
            : 'http://localhost:3000/servicos'

        try {
            await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome,
                    descricao,
                    preco
                })
            })

            limparCampos()
            listarServicos()

        } catch (error) {
            console.error(error)
        }
    }

    function editarServico(servico) {
        setIdEditando(servico.id_servico)
        setNome(servico.nome)
        setDescricao(servico.descricao)
        setPreco(servico.preco)
    }

    async function deletarServico(id) {
        try {
            await fetch(`http://localhost:3000/servicos/${id}`, {
                method: 'DELETE'
            })

            listarServicos()

        } catch (error) {
            console.error(error)
        }
    }

    function limparCampos() {
        setNome('')
        setDescricao('')
        setPreco('')
        setIdEditando(null)
    }

    return (
        <div>
            <h1>CRUD Serviços</h1>

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <input
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
            />

            <button onClick={cadastrarServico}>
                {idEditando ? 'Atualizar' : 'Cadastrar'}
            </button>

            <hr />

            {
                servicos.map((servico) => (
                    <div key={servico.id_servico}>
                        <p>
                            {servico.nome} - {servico.descricao} - R$ {servico.preco}
                        </p>

                        <button onClick={() => editarServico(servico)}>
                            Editar
                        </button>

                        <button onClick={() => deletarServico(servico.id_servico)}>
                            Deletar
                        </button>
                    </div>
                ))
            }

        </div>
    )
}

export default CRUDServicos