import { Link } from "react-router-dom";
import "./styles/Menu.css";

const Menu = ({ isOpen, setIsOpen, setSelectedMenu }) => {
  return (
    <div
      tabIndex="0"
      className={`menu-container ${isOpen ? "open" : ""}`}
      onBlur={() => setIsOpen(false)}
    >
      <ul className="menu-list">
        <li className="menu-item">
          <Link
            to="/"
            id="home"
            onClick={() => {
              setIsOpen(false);
              setSelectedMenu("Home");
            }}
          >
            <img className="menu-img" src="/src/img/home.png" alt="Home" />
            <span>Home</span>
          </Link>
        </li>

        <li className="menu-item">
          <Link
            to="/clientes"
            id="clientes"
            onClick={() => {
              setIsOpen(false);
              setSelectedMenu("Clientes");
            }}
          >
            <img
              className="menu-img"
              src="/src/img/clientes.png"
              alt="Clientes"
            />
            <span>Clientes</span>
          </Link>
        </li>

        <li className="menu-item">
          <Link
            to="/controles"
            id="controles"
            onClick={() => {
              setIsOpen(false);
              setSelectedMenu("Controles");
            }}
          >
            <img
              className="menu-img"
              src="/src/img/control.png"
              alt="Controles"
            />
            <span>Controles</span>
          </Link>
        </li>

        <li className="menu-item">
          <Link>
            <img
              className="menu-img"
              src="/src/img/informe2.png"
              alt="Informes"
            />
            <span>Informes</span>
          </Link>
        </li>

        <li className="menu-item">
          <Link>
            <img
              className="menu-img"
              src="/src/img/tecnico.png"
              alt="Técnico"
            />
            <span>Técnico</span>
          </Link>
        </li>

        <li className="menu-user">
          <span>Nombre del usuario</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
