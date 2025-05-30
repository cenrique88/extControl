import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState } from "react";

function NavBar() {
	const [menuHome, setMenuHome] = useState("/src/img/home.png");
	const [menuCliente, setMenuCliente] = useState("/src/img/clientes.png");
	const [menuControles, setMenuControles] = useState("/src/img/qr-rev1.png");
	const [menuExtintor, setMenuExtintor] = useState("/src/img/extintor.png");

	const onSelectMenu = (e) => {
		let id = e.target.id;
		if (id == "home") {
			setMenuHome("/src/img/home-blue.png");
		} else {
			setMenuHome("/src/img/home.png");
		}

		if (id == "clientes") {
			setMenuCliente("/src/img/clientes-blue.png");
		} else {
			setMenuCliente("/src/img/clientes.png");
		}

		if (id == "controles") {
			setMenuControles("/src/img/qr-rev1-blue.png");
		} else {
			setMenuControles("/src/img/qr-rev1.png");
		}

		if (id == "extintores") {
			setMenuExtintor("/src/img/extintor-blue.png");
		} else {
			setMenuExtintor("/src/img/extintor.png");
		}
	};

	return (
		<nav>
			<ul>
				<li>
					<img className='logo-img' src='/src/img/marrero01.png' />
				</li>
				<li>
					<Link to='/' id='home' onClick={(e) => onSelectMenu(e)}>
						<img id='home' className='menu-img' src={menuHome} alt='Home' />
						Home
					</Link>
				</li>
				<li>
					<Link to='/clientes' id='clientes' onClick={(e) => onSelectMenu(e)}>
						<img id='clientes' className='menu-img' src={menuCliente} alt='Home' />
						Clientes
					</Link>
				</li>
				<li>
					<Link id='controles' to='/controles' onClick={(e) => onSelectMenu(e)}>
						<img id='controles' className='menu-img' src={menuControles} alt='Home' />
						Controles
					</Link>
				</li>
				<li>
					<Link id='extintores' to='/showext' onClick={(e) => onSelectMenu(e)}>
						<img id='extintores' className='menu-img' src={menuExtintor} alt='Home' />
						Extintor
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
