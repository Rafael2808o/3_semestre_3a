// Deve exibir um titulo "Bem Vindo" e um Link para a pagina "Detalhes"

import { Link } from "react-router-dom"

function Inicio() {
    return (
        <div>
            <h1>Bem Vindo</h1>
            <Link to="/detalhes">Ir para Detalhes</Link>
        </div>
    )
}

export default Inicio