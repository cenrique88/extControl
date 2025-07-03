import "./styles/Home.css";
import "./styles/Components.css";
import Login from "./Login.jsx";


const Home = () => {


  return (
    <div className="home-container">
      
      <img
        className="logo-img"
        src="/src/img/logo-blue-banner.png"
        alt="Logo Marrero Seguridad Electrónica"
      />

      <div className="home-card">
        <ul>
          <li>
            Incidencias
            <br />
            0
          </li>
          <li>
            Próximos a Vencer
            <br />
            0
          </li >
          <li className="list-end">
            Vencidosssss
            <br />
            0
          </li>
        </ul>

        <Login />
      </div>
    </div>
  );
};

export default Home;
