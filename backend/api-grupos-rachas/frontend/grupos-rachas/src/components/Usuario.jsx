const Usuario = ({ usuario, botaoExcluir, botaoEditar }) => {
    return (
        <div style={estilos.card}>
            <h2 style={estilos.titulo}>{usuario.nome}</h2>
            <p style={estilos.texto}><strong>Email:</strong> {usuario.email}</p>
            <p style={estilos.textoMini}><strong>ID:</strong> {usuario.id}</p>
            <div style={estilos.botoes}>
                <button style={estilos.botaoEditar} onClick={() => botaoEditar(usuario)}>Editar</button>
                <button style={estilos.botaoExcluir} onClick={() => botaoExcluir(usuario.id)}>Excluir</button>
            </div>
        </div>
    )
}

const estilos = {
    card: {
        border: "1px solid #ccc",
        padding: 15,
        width: 300,
        textAlign: 'left',
        borderRadius: 8,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },

    titulo: {
        fontSize: 18,
        color: "#333",
        margin: "0 0 10px 0"
    },

    texto: {
        fontSize: 14,
        color: "#666",
        margin: "5px 0"
    },

    textoMini: {
        fontSize: 12,
        color: "#999",
        margin: "5px 0"
    },

    botoes: {
        display: "flex",
        gap: 10,
        marginTop: 10
    },

    botaoEditar: {
        flex: 1,
        background: "#007bff",
        color: "white",
        padding: "8px 12px",
        borderRadius: 5,
        border: "none",
        fontWeight: "bold",
        cursor: "pointer"
    },

    botaoExcluir: {
        flex: 1,
        background: "#e30613",
        color: "white",
        padding: "8px 12px",
        borderRadius: 5,
        border: "none",
        fontWeight: "bold",
        cursor: "pointer"
    }
};

export default Usuario
