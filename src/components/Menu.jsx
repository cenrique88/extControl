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
              setSelectedPage("Clientes");
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
              setSelectedPage("Controles");
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
          Nombre del usuario
        </li>
      </ul>
    </div>
  );
};

export default Menu;
