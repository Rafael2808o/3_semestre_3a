import { useEffect, useState } from 'react'

function CRUDAgendamentos() {

    const [agendamentos, setAgendamentos] = useState([])

    const [idCliente, setIdCliente] = useState('')
    const [idServico, setIdServico] = useState('')
    const [idBarbeiro, setIdBarbeiro] = useState('')
    const [dataHora, setDataHora] = useState('')
    const [status, setStatus] = useState('')

    const [idEditando, setIdEditando] = useState(null)

    const token = localStorage.getItem('token')

    async function listarAgendamentos() {
        try {
            const resposta = await fetch('https://apibarbearia-rho.vercel.app/agendamentos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const dados = await resposta.json()
            setAgendamentos(dados)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        listarAgendamentos()
    }, [])

    async function cadastrarAgendamento() {

        const metodo = idEditando ? 'PUT' : 'POST'

        const url = idEditando
            ? `https://apibarbearia-rho.vercel.app/agendamentos/${idEditando}`
            : 'https://apibarbearia-rho.vercel.app/agendamentos'

        try {
            await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_cliente: idCliente,
                    id_servico: idServico,
                    id_barbeiro: idBarbeiro,
                    data_hora: dataHora,
                    status
                })
            })

            limparCampos()
            listarAgendamentos()

        } catch (error) {
            console.error(error)
        }
    }

    function editarAgendamento(agendamento) {
        setIdEditando(agendamento.id_agendamento)
        setIdCliente(agendamento.id_cliente)
        setIdServico(agendamento.id_servico)
        setIdBarbeiro(agendamento.id_barbeiro)
        setDataHora(agendamento.data_hora)
        setStatus(agendamento.status)
    }

    async function deletarAgendamento(id) {
        try {
            await fetch(`https://apibarbearia-rho.vercel.app/agendamentos/${id}`, {
                method: 'DELETE'
            })

            listarAgendamentos()

        } catch (error) {
            console.error(error)
        }
    }

    function limparCampos() {
        setIdCliente('')
        setIdServico('')
        setIdBarbeiro('')
        setDataHora('')
        setStatus('')
        setIdEditando(null)
    }

    return (
        <div>
            <h1>CRUD Agendamentos</h1>

            <input
                type="number"
                placeholder="ID Cliente"
                value={idCliente}
                onChange={(e) => setIdCliente(e.target.value)}
            />

            <input
                type="number"
                placeholder="ID Serviço"
                value={idServico}
                onChange={(e) => setIdServico(e.target.value)}
            />

            <input
                type="number"
                placeholder="ID Barbeiro"
                value={idBarbeiro}
                onChange={(e) => setIdBarbeiro(e.target.value)}
            />

            <input
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
            />

            <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />

            <button onClick={cadastrarAgendamento}>
                {idEditando ? 'Atualizar' : 'Cadastrar'}
            </button>

            <hr />

            {
                agendamentos.map((agendamento) => (
                    <div key={agendamento.id_agendamento}>
                        <p>
                            Cliente: {agendamento.id_cliente} |
                            Serviço: {agendamento.id_servico} |
                            Status: {agendamento.status}
                        </p>

                        <button onClick={() => editarAgendamento(agendamento)}>
                            Editar
                        </button>

                        <button onClick={() => deletarAgendamento(agendamento.id_agendamento)}>
                            Deletar
                        </button>
                    </div>
                ))
            }

        </div>
    )
}

export default CRUDAgendamentos