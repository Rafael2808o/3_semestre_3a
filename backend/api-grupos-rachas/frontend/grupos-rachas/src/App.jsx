import { useState } from 'react'
import CRUDGrupos from './components/CRUDGrupos'
import CRUDCategorias from './components/CRUDCategorias'
import CRUDUsuarios from './components/CRUDUsuarios'
import CRUDMembros from './components/CRUDMembros'
import Menu from './components/Menu'

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('grupos')

  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case 'grupos':
        return <CRUDGrupos />
      case 'categorias':
        return <CRUDCategorias />
      case 'usuarios':
        return <CRUDUsuarios />
      case 'membros':
        return <CRUDMembros />
      default:
        return <CRUDGrupos />
    }
  }

  return (
    <>
      <Menu paginaAtiva={paginaAtiva} setPaginaAtiva={setPaginaAtiva} />
      {renderizarPagina()}
    </>
  )
}

export default App
