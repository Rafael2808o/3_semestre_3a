const Categoria = ({ categoria, botaoExcluir, botaoEditar }) => {
    return (
        <div className="card">
            <h2 className="card-titulo">{categoria.nome}</h2>
            <p className="card-texto-mini"><strong>ID:</strong> {categoria.id}</p>
            <div className="card-botoes">
                <button className="card-botao card-botao-editar" onClick={() => botaoEditar(categoria)}>Editar</button>
                <button className="card-botao card-botao-excluir" onClick={() => botaoExcluir(categoria.id)}>Excluir</button>
            </div>
        </div>
    )
}

export default Categoria
