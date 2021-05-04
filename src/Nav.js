import React from "react"
import { NavLink } from "react-router-dom";
import "./index.css";

const links = [
  { name: "Home", path: "/" },
  { name: "Rankings", path: "/rankings" },
  { name: "Factors", path: "/factors" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" }
]

export default function Nav() {
  return (
    <nav>
      <ul >
        {links.map((link, index) => (
          <NavLink key={index} to={link.path} exact activeClassName="selected">
            <li className="navLink">{link.name}</li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}