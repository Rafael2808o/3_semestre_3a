const Usuario = ({ usuario, botaoExcluir, botaoEditar }) => {
    return (
        <div className="usuario-card">
            <h2 className="usuario-titulo">{usuario.nome}</h2>
            <p className="usuario-texto"><strong>Email:</strong> {usuario.email}</p>
            <p className="usuario-texto-mini"><strong>ID:</strong> {usuario.id}</p>
            <div className="usuario-botoes">
                <button className="usuario-botao usuario-botao-editar" onClick={() => botaoEditar(usuario)}>Editar</button>
                <button className="usuario-botao usuario-botao-excluir" onClick={() => botaoExcluir(usuario.id)}>Excluir</button>
            </div>
        </div>
    )
}

export default Usuario
