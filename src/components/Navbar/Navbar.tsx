import { useState, useEffect } from "react";
import image from "../../assets/menu-bars.svg";
import "./Navbar.css";
import Menu from "./Menu/Menu";

function Navbar() {
  const [state, changeState] = useState(false);

  //useEffect(() => {
  //  localStorage.setItem('navState', JSON.stringify(state));
  //}, [state]);

  //useEffect(() => {
  //  const oldState = localStorage.getItem('navState');
  //  if (oldState) {
  //    changeState(!!oldState);
  //  }
  //}, []);
  const openMenu = () => {
    changeState(!state);
  };

  return (
    <nav>
      {state && <Menu />}
      <img
        id={state ? "menubutton-open" : "menubutton"}
        src={image}
        onClick={openMenu}
      />
    </nav>
  );
}

export default Navbar;
