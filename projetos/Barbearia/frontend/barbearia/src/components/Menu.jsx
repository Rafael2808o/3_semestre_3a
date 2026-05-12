function Menu({ paginaAtiva, setPaginaAtiva }) {
    return (
        <div className="menu">
            <button onClick={() => setPaginaAtiva('login')}>
                Login
            </button>

            <button onClick={() => setPaginaAtiva('usuarios')}>
                Usuários
            </button>

            <button onClick={() => setPaginaAtiva('servicos')}>
                Serviços
            </button>

            <button onClick={() => setPaginaAtiva('agendamentos')}>
                Agendamentos
            </button>
        </div>
    )
}

export default Menu