// Deve exibir um titulo "Entre em Contato" e um link para pagina "Inicio"

import { Link } from "react-router-dom"
function Contato() {
    return (
        <div>
            <h1>Entre em Contato</h1>
            <Link to="/">Voltar para Página Principal</Link>
        </div>
    )
}

export default Contato

