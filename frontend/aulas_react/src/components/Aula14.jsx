import { estilos } from "../style/Estilos"
import { Link, useNavigate } from "react-router-dom"
const Aula14 = () => {
const navigate = useNavigate();

    return (
        <div style={estilos.cardAula}>
            <h2>Aula 14 - React Router - Navegação em React</h2>
            <h3>Biblioteca que permite criar e gerenciar rotas em React</h3>
            <hr/>
            <h3>Navegação com Link</h3>
            {/* O Link é um componente do React Router que permite criar links de navegação entre as rotas definidas na aplicação. Ele é usado para substituir as tags <a> tradicionais, pois o Link evita o recarregamento da página e mantém a navegação fluida dentro da aplicação React. */ }
            <Link to="/">Navegue para a página principal</Link>
            <br />
            <Link to="/sobre">Navegue para a página sobre</Link>
            <br />
            <Link to="/blablabla">Navegue Não Encontrada</Link>
            <br/>
            <h3>Navegação com useNavigate</h3>
            {/* O useNavigate é um hook do React Router que permite programaticamente navegar para uma rota específica. Ele é útil quando você deseja redirecionar o usuário para outra página após uma ação, como o envio de um formulário ou o clique em um botão. */ }
            <button onClick={() => navigate("/sobre")}>Navegue para a página sobre</button>
            <hr/>

            <h3>Rotas Dinâmicas</h3>
            {/* As rotas dinâmicas permitem criar rotas que aceitam parâmetros, tornando a navegação mais flexível. Por exemplo, você pode criar uma rota para exibir detalhes de um item específico usando um parâmetro de ID. */ }
            <button onClick={() => navigate("/perfil/Rafael")}>Perfil do Rafael</button>
            <button onClick={() => navigate("/perfil/Rafaela")}>Perfil do Rafaela</button>
            <hr/>
            <button onClick={() => navigate("/filme/1234")}>Detalhes do Filme</button>
            <br />
            <Link to="/inicio">Ir para Inicio</Link>
            <br />
            <Link to="/contato">Ir para Contato</Link>
            <br />
            <Link to="/detalhes">Ir para Detalhes</Link>
            

        </div>
    )
}

export default Aula14