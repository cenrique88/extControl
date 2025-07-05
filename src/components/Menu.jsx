import { Link } from "react-router-dom";
import "./styles/Menu.css";

import {AppContext} from "./AppContext";
import {useContext, useState} from "react";

const Menu = ({ isOpen, setIsOpen}) => {
  const {setSelectedPage} = useContext(AppContext);


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
              setSelectedPage("Home");
            }}
          >
            <img className="menu-img" src="/src/img/home 3D.png" alt="Home" />
            <span>Home</span>
          </Link>
        </li>

        <li className="menu-item">
          <Link
            to="/clientes"
            id="clientes"
            onClick={() => {
              setIsOpen(false);
              setSelectedPage("Clientes");
            }}
          >
            <img
              className="menu-img"
              src="/src/img/clientes 3D.png"
              alt="Clientes"
            />
            <span>Clientes</span>
          </Link>
        </li>

        <li className="menu-item">
          <Link
            to="/Configuración"
            id="configuración"
            onClick={() => {
              setIsOpen(false);

              setSelectedMenu("Configuración");

            }}
          >
            <img
              className="menu-img"
              src="/src/img/configuraciones 3D.png"
              alt="Configuración"
            />
            <span>Configuración</span>
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

      <li className="menu-logout">
        <Link to="/logout">
          <span>Cerrar sesión</span>
        </Link>
      </li>
      </ul>
    </div>
  );
}

export default Menu;
