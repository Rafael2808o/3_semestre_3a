import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Principal() {
    const navigate = useNavigate();
    const [dadosLogin, setDadosLogin] = useState(null);

    useEffect(() => {
        async function buscarUsuario() {
            const dadosUsuario = localStorage.getItem('UsuarioLogado');
            if (!dadosUsuario) {
                navigate('/login');
            } else {
                setDadosLogin(JSON.parse(dadosUsuario));
            }
        }
        buscarUsuario();
    }, [navigate]);

    const fazerLogout = () => {
        if (confirm('Tem certeza que deseja sair?')) {
            localStorage.removeItem('UsuarioLogado');
            localStorage.removeItem('CredenciaisSalvas');
            setDadosLogin(null);
            navigate('/login');
        }
    };

    return (
        <div className="principal">
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#f0f0f0',
                borderBottom: '1px solid #ccc'
            }}>
                <h1>Tela Principal</h1>
                <button
                    onClick={fazerLogout}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Sair
                </button>
            </header>

            {dadosLogin && (
                <div style={{ padding: '20px' }}>
                    <p><strong>Bem-vindo, {dadosLogin.nome}!</strong></p>
                    <p>Email: {dadosLogin.email}</p>
                    <p>Lembrar-me: {dadosLogin.lembrar ? '✓ Ativado' : '✗ Desativado'}</p>
                </div>
            )}
        </div>
    )
}