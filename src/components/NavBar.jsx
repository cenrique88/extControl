
import { useState } from "react";
import Menu from "./Menu";
import "./styles/NavBar.css"; // Reemplaza App.css por un estilo dedicado

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Home");

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
      <span className="nav-title">{selectedMenu}</span>
    </nav>

    {/* Este menú tiene que estar afuera del <nav> */}
    <Menu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      setSelectedMenu={setSelectedMenu}
    />
  </>
);
}

export default NavBar;

