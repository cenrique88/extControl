
import Menu from "./Menu";
import "../styles/NavBar.css"; 

import {AppContext} from "./AppContext";
import {useContext, useState} from "react";

function NavBar() {
  const {selectedPage} = useContext(AppContext);

  // Estado para controlar si el menú lateral está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Al hacer clic en el botón hamburguesa
  const onSelectMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <nav>
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
      </nav>

      {/* Menú lateral desplegable (fuera de <nav>) */}
      <Menu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );

}

export default NavBar;
