import { BrowserRouter as Router, Link } from "react-router-dom";
import "./styles/Menu.css";
import { useState } from "react";





const Menu = ({isOpen, setIsOpen, setSelectedMenu}) => {

    //const [menuOpen, setMenuOpen] = useState(isOpen);




  return (

    <div tabIndex="0" className={`menu-container ${isOpen ? "open" : ""}`} onBlur={() => setIsOpen(false)}>
        
        <ul className='menu-list'>
            <li className='menu-item'>
                <Link to='/' id='home' onClick={() => {setIsOpen(false); setSelectedMenu('Home')}}>
						<img id='home' className='menu-img' src="/src/img/home.png" alt='Home' />
						<span>Home</span>
					</Link>	
            </li>
            <li className='menu-item'>
                <Link to='/clientes' id='clientes' onClick={() => {setIsOpen(false); setSelectedMenu('Clientes')}}>
						<img id='clientes' className='menu-img' src="/src/img/clientes.png" alt='Clientes' />
						<span>Clientes</span>
				</Link>
            </li>
            <li className='menu-item'>
                <Link id='controles' to='/controles' onClick={() => {setIsOpen(false); setSelectedMenu('Controles')}}>
						<img id='controles' className='menu-img' src="/src/img/qr-rev1.png" alt='controles' />
						<span>Controles</span>
					</Link>
            </li>

            <li className='menu-item'>
                <Link>
                <img id='informes' className='menu-img' src="/src/img/informe2.png" alt='informes' />
				<span>Informes</span>
                </Link>
            </li>

            <li className='menu-item'>
                <Link>
                <img id='informes' className='menu-img' src="/src/img/tecnico.png" alt='informes' />
                <span>Tecnico</span>
                </Link>
            </li>
            <li style={{fontWeight: '100', fontSize:'16px', marginLeft: '45px', marginTop: '-10px'}}>
                Nombre del usuario
            </li>
        </ul>
      </div>

  )
}

export default Menu
