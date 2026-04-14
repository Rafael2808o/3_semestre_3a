const Membro = ({ membro, botaoExcluir, botaoEditar }) => {
    return (
        <div className="membro-card">
            <h2 className="membro-titulo">Membro #{membro.id}</h2>
            <p className="membro-texto"><strong>Usuário ID:</strong> {membro.usuario_id}</p>
            <p className="membro-texto"><strong>Grupo ID:</strong> {membro.grupo_id}</p>
            <p className="membro-texto"><strong>Papel:</strong> {membro.papel}</p>
            <div className="membro-botoes">
                <button className="membro-botao membro-botao-editar" onClick={() => botaoEditar(membro)}>Editar</button>
                <button className="membro-botao membro-botao-excluir" onClick={() => botaoExcluir(membro.id)}>Excluir</button>
            </div>
        </div>
    )
}

export default Membro
