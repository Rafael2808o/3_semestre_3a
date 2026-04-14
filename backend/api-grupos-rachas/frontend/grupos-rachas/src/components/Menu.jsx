const Menu = ({ paginaAtiva, setPaginaAtiva }) => {
    return (
        <nav style={estilos.nav}>
            <div style={estilos.container}>
                <h1 style={estilos.logo}>Grupos Rachas</h1>
                <ul style={estilos.lista}>
                    <li>
                        <button
                            style={{
                                ...estilos.botao,
                                ...(paginaAtiva === 'grupos' ? estilos.botaoAtivo : {})
                            }}
                            onClick={() => setPaginaAtiva('grupos')}
                        >
                            Grupos
                        </button>
                    </li>
                    <li>
                        <button
                            style={{
                                ...estilos.botao,
                                ...(paginaAtiva === 'categorias' ? estilos.botaoAtivo : {})
                            }}
                            onClick={() => setPaginaAtiva('categorias')}
                        >
                            Categorias
                        </button>
                    </li>
                    <li>
                        <button
                            style={{
                                ...estilos.botao,
                                ...(paginaAtiva === 'usuarios' ? estilos.botaoAtivo : {})
                            }}
                            onClick={() => setPaginaAtiva('usuarios')}
                        >
                            Usuários
                        </button>
                    </li>
                    <li>
                        <button
                            style={{
                                ...estilos.botao,
                                ...(paginaAtiva === 'membros' ? estilos.botaoAtivo : {})
                            }}
                            onClick={() => setPaginaAtiva('membros')}
                        >
                            Membros
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

const estilos = {
    nav: {
        backgroundColor: "#333",
        padding: "0",
        position: "sticky",
        top: 0,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "15px 20px"
    },
    logo: {
        color: "#fff",
        margin: 0,
        fontSize: "24px",
        fontWeight: "bold"
    },
    lista: {
        display: "flex",
        list: "none",
        gap: "10px",
        margin: 0,
        padding: 0
    },
    botao: {
        backgroundColor: "transparent",
        color: "#fff",
        border: "2px solid transparent",
        padding: "8px 16px",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "all 0.3s ease"
    },
    botaoAtivo: {
        backgroundColor: "#e30613",
        borderColor: "#e30613",
        fontWeight: "bold"
    }
}

export default Menu
