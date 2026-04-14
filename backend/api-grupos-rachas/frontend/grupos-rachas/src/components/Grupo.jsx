const Grupo = ({ grupo, botaoExcluir, botaoEditar }) => {
    return (
        <div className="card">
            <h2 className="card-titulo">{grupo.nome}</h2>
            {grupo.descricao && <p className="card-texto">{grupo.descricao}</p>}
            <p className="card-texto"><strong>Vagas:</strong> {grupo.vagas}</p>
            <p className="card-texto"><strong>Categoria:</strong> {grupo.categoria_id}</p>
            <p className="card-texto-mini"><strong>ID:</strong> {grupo.id}</p>
            <div className="card-botoes">
                <button className="card-botao card-botao-editar" onClick={() => botaoEditar(grupo)}>Editar</button>
                <button className="card-botao card-botao-excluir" onClick={() => botaoExcluir(grupo.id)}>Excluir</button>
            </div>
        </div>
    )
}

export default Grupo
