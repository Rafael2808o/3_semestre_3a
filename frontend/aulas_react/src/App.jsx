import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Principal from './pages/Principal';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';
import Perfil from './pages/Perfil';
import Inicio from './pages/Inicio';
import Contato from './pages/Contato';
import Detalhes from './pages/Detalhes';
import Filme from './pages/Filme';
import Aula15_Login from './components/Aula15_Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Principal />} />
                <Route path="/login" element={<Aula15_Login />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/perfil/:nome" element={<Perfil />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/detalhes" element={<Detalhes />} />
                <Route path="/filme/:id" element={<Filme />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;