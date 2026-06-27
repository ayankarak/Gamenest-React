import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">GameNest</div>

      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li><a href="#">Home</a></li>
        <li><a href="#games">Games</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">Sign Up</a></li>
      </ul>

      <div
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </div>
    </nav>
  );
}

export default Navbar;