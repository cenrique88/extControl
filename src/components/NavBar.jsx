
import { useState } from "react";
import Menu from "./Menu"; // Menú lateral con opciones
import "./styles/NavBar.css"; // Estilos específicos del navBar

function NavBar() {

  // Estado para controlar si el menú lateral está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Estado para mostrar qué sección está activa (texto al lado del botón)
  const [selectedMenu, setSelectedMenu] = useState("Home");

  // Al hacer clic en el botón hamburguesa
  const onSelectMenu = () => {
    setIsOpen(!isOpen); // Alterna abierto/cerrado
  };

  return (
    <>
      {/* Barra azul superior */}
      <nav>
        {/* Ícono de menú hamburguesa */}
        <img
          id="menu_button"
          tabIndex="0"
          className={`menu-button ${isOpen ? "open" : ""}`}
          src="/src/img/menu_white.png"
          alt="Menu"
          onBlur={() => setIsOpen(false)}
          onClick={onSelectMenu}
        />

        {/* Texto del menú seleccionado */}
        <span className="nav-title">{selectedMenu}</span>
      </nav>

      {/* Menú lateral desplegable (fuera de <nav>) */}
      <Menu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelectedMenu={setSelectedMenu}
      />
    </>
  );

}

export default NavBar;
