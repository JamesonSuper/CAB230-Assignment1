import React from "react";
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const links = [
        { name: "Rankings", path: "/rankings" },
        { name: "Factors", path: "/factors" },
        { name: "Register", path: "/register" },
        { name: "Login", path: "/login" },
        { name: "Logout", path: "/logout" }
    ]
    return (
        <div>
            <nav>
                <ul>
                    {links.map((link, index) => (
                        <NavLink key={index} to={link.path} exact activeClassName="selected">
                            <li className="navLink">{link.name}</li>
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </div>
    );
}