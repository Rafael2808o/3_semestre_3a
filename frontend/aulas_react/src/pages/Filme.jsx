// rota com parametro, deve receber um id como parametro de rota e exibir "Exibindo dados do filme: {id}"

import { Link, useParams } from "react-router-dom"

function Filme() {
    const { id } = useParams();
    return (
        <div>
            <h1>Exibindo dados do filme: {id}</h1>
            <Link to="/">Voltar para Página Principal</Link>
        </div>
    )
}

export default Filme

