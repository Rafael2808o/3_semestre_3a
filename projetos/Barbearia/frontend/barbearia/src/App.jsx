import { useState } from 'react'
import CRUDUsuarios from './components/CRUDUsuarios'
import CRUDServicos from './components/CRUDServicos'
import CRUDAgendamentos from './components/CRUDAgendamentos'
import Login from './components/Login'
import Menu from './components/Menu'
import './App.css'

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('login')

  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case 'usuarios':
        return <CRUDUsuarios />

      case 'servicos':
        return <CRUDServicos />

      case 'agendamentos':
        return <CRUDAgendamentos />

      case 'login':
        return <Login />

      default:
        return <Login />
    }
  }

  return (
    <>
      <Menu
        paginaAtiva={paginaAtiva}
        setPaginaAtiva={setPaginaAtiva}
      />

      {renderizarPagina()}
    </>
  )
}

export default App