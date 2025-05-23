import "./styles/Home.css";
import "./styles/Components.css";
import useDataBase from "./hooks/useDataBase.js";
import AppContext from "./AppContext";
import {useState, useEffect, useContext} from "react";


const Home = () => {
	const {getDB} = useDataBase();
	const [dataClient, setDataClient] = useState([]);
	const {selectedClient, setSelectedClient} = useContext(AppContext)


	useEffect(() => {
	  getData();
	}, [])
	
	

	const getData = async () => {
		const data = await getDB("clientes");

		if (data){
			setDataClient(data)
		}
	}


	const dataList = ["Total de Extintores", "Con Problemas", "Proximos a Vencer", "data4"];

	return (
		<>
			<div className='home-container'>
				<div className='home-select'>
					<select value={selectedClient} onChange={(e)=>{setSelectedClient(e.target.value)}}>
							<option>Selecciona Cliente</option>	
						{dataClient.map((client) => (
							<option key={client._id}>{client.nombre_cliente}</option>
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
