import "./styles/Home.css";
import "./styles/Components.css";
import useDataBase from "./hooks/useDataBase.js";
import AppContext from "./AppContext";
import {useState, useEffect, useContext} from "react";
import Extintor from "./Extintor";


const Home = () => {
	const {getDB} = useDataBase();
	const [dataClient, setDataClient] = useState([]);
	const [dataExtintores, setDataExtintores] = useState([]);
	const {selectedClient, setSelectedClient} = useContext(AppContext)


	useEffect(() => {
	  getDataClient();
	  getDataExtintores();
	}, [dataClient])
	
	

	const getDataClient = async () => {
		const data = await getDB("clientes");
		if (data){
			setDataClient(data);
		}
	}

	const getDataExtintores = async () => {
		const data = await getDB("extintores");
		if (data) {
			const temp = [];
			data.map((extintor) => {
				if(extintor.cliente == selectedClient) {
					temp.push(extintor);
				}
			})
			setDataExtintores(temp);
		}
	}


	const dataList = [`Total de Extintores: ${dataExtintores.length}`, "Vencidos", "Proximos a Vencer", "Ultima Revision"];

	return (
		<>
			<div className='home-container'>
				<div className='home-select'>
					<select value={selectedClient} onChange={(e)=>{setSelectedClient(e.target.value)}}>
							<option value="Select Client">Selecciona Cliente</option>	
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
