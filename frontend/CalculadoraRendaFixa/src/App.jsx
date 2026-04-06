import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Calculadora from './pages/Calculadora'
import Navbar from './components/Navbar'
import Sobre from './pages/Sobre'
import './App.css'

function App() {
  return (
    // Habilita o sistema de navegação por rotas
    <BrowserRouter>
      <Navbar />
      <main className='conteudo-principal'>
        <Routes>
          {/* Define as rotas da aplicação */}
          <Route path="/" element={<Calculadora />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>

      </main>

    </BrowserRouter>
  )
}

export default App
