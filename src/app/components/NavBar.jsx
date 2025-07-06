import Menu from "./Menu";
import "../styles/NavBar.css"; 

import { AppContext } from "./AppContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {

  const navigate = useNavigate();
  const { selectedPage, modoEliminar, setModoEliminar } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const onSelectMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            id="menu_button"
            tabIndex="0"
            className={`menu-button ${isOpen ? "open" : ""}`}
            src="/src/img/menu_white.png"
            alt="Menu"
            onBlur={() => setIsOpen(false)}
            onClick={onSelectMenu}
          />
          <span className="nav-title">{selectedPage}</span>
        </div>

        {selectedPage === "Clientes" && (
          <div className="navbar-actions">
            <button 
              className="navbar-icon" 
              title="Agregar nuevo cliente"
              onClick={() => navigate('/clientes/add-client')}
              >
              <img src="/src/img/add.png" alt="Agregar" className="navbar-icon-img" />
            </button>
            <button className="navbar-icon" title="Editar cliente">
              <img src="/src/img/edit.png" alt="Editar" className="navbar-icon-img" />
            </button>
            <button
              className="navbar-icon"
              title={modoEliminar ? "Cancelar eliminación" : "Eliminar cliente"}
              onClick={() => setModoEliminar(!modoEliminar)}
            >
              <img src="/src/img/delete.png" alt="Eliminar" className="navbar-icon-img" />
            </button>
          </div>
        )}
      </nav>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default NavBar;

