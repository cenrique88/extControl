import "./styles/Home.css";
import "./styles/Components.css";

const Home = () => {
	const data = [{ name: "Carlos Enrique", email: "cenrique@gmail.com" }];
	const dataList = ["Total de Extintores", "Con Problemas", "Proximos a Vencer", "data4"];

	return (
		<>
			<div className='home-container'>
				<div className='home-select'>
					<select>
						<option>Selecciona Cliente</option>
						{data.map((client) => (
							<option>{client.name}</option>
						))}
					</select>
				</div>

				<div className='home-card'>
					<ul className='home-list'>
						{dataList.map((element, index) => (
							<li key={index}>{element}</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
