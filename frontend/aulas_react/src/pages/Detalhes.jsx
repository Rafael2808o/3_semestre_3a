// Deve exibir um titulo "Mais Informações" e um botão que redireciona para a pagina "Contato"

import { Link } from "react-router-dom"
function Detalhes() {
    return (
        <div>
            <h1>Mais Informações</h1>
            <Link to="/contato">Ir para Contato</Link>
        </div>
    )
}

export default Detalhes