const Menu = ({ paginaAtiva, setPaginaAtiva }) => {
    return (
        <nav className="menu">
            <div className="menu-container">
                <h1 className="menu-logo">Grupos Rachas</h1>
                <ul className="menu-lista">
                    <li>
                        <button
                            className={`menu-botao ${paginaAtiva === 'grupos' ? 'ativo' : ''}`}
                            onClick={() => setPaginaAtiva('grupos')}
                        >
                            Grupos
                        </button>
                    </li>
                    <li>
                        <button
                            className={`menu-botao ${paginaAtiva === 'categorias' ? 'ativo' : ''}`}
                            onClick={() => setPaginaAtiva('categorias')}
                        >
                            Categorias
                        </button>
                    </li>
                    <li>
                        <button
                            className={`menu-botao ${paginaAtiva === 'usuarios' ? 'ativo' : ''}`}
                            onClick={() => setPaginaAtiva('usuarios')}
                        >
                            Usuários
                        </button>
                    </li>
                    <li>
                        <button
                            className={`menu-botao ${paginaAtiva === 'membros' ? 'ativo' : ''}`}
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

export default Menu
