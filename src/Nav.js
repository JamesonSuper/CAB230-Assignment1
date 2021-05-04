import React from "react"
import { NavLink } from "react-router-dom";
import Styled from "styled-components"

const NavUnlisted = Styled.ul`
  display: flex;
  a {
    text-decoration: none;
  }
  li {
    color: white;
    margin: 0 0.8rem;
    font-size: 1.2rem;
    position: relative;
    list-style: none;
  }
  .current {
    li {
      border-bottom: 2px solid black;
    }
  }
`

const links = [
    {name: "Home", path:"/"},
    {name: "Rankings", path:"/rankings"},
    {name: "Search", path:"/search"},
    {name: "Factors", path:"/factors"},
    {name: "Login", path:"/login"},
    {name: "Register", path:"/register"}
]

function Nav() {
    return (
        <NavUnlisted>
            {links.map((link,index) => (
                <NavLink key={index} to={link.path} exact activeClassName="current">
                    <li>{link.name}</li>
                </NavLink>
            ))}
        </NavUnlisted>
    );
}

export default Nav;