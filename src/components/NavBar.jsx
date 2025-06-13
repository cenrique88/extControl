
import { useState } from "react";
import Menu from "./Menu";
import "./styles/App.css";


function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState('Home');


	const onSelectMenu = () => {
		setIsOpen(!isOpen);
	}
	

	

	return (
		<nav style={{height: "50px"}}>

			
			<ul>
				<li>
					<img id='menu_button' 
					tabIndex="0"
					className={`menu-button ${isOpen ? "open" : ""}`}
					src='/src/img/menu_white.png' 
					alt='Menu' 
					onBlur={() => setIsOpen(false)}
					onClick={onSelectMenu} />

				</li>
				<li>
					{selectedMenu}					
				</li>
				<li>
					<Menu isOpen={isOpen} setIsOpen={setIsOpen} setSelectedMenu={setSelectedMenu}/>
				</li>



				{/*
					<Link id='extintores' to='/showext' onClick={(e) => onSelectMenu(e)}>
						<img id='extintores' className='menu-img' src={menuExtintor} alt='Home' />
						Extintor
					</Link>
				</li> */}
			</ul>
		</nav>
	);
}

export default NavBar;
