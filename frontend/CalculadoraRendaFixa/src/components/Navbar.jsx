import './Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
      <header className='navbar'>
        <div className='navbar-conteudo'>
            {/* logo */}
            <Link to="/" className='navbar-logo'> 📈 Renda Fixa </Link>

            <div className='navbar-links'>
                {/* navegação */}
                <Link to="/" className='navbar-link'> 🧮 Calculadora</Link>
                <Link to="/sobre" className='navbar-link'> ℹ️ Sobre</Link>
            </div>
        </div>
      </header>
  )
}

export default Navbar