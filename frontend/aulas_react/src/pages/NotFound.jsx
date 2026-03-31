import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div>
            <h1>Página não encontrada</h1>
            <Link to="/">Voltar para Página Principal</Link>
        </div>
    )
}

export default NotFound