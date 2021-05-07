import React from "react";
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch , Redirect} from "react-router-dom";

import "./index.css";
import Rankings from "./components/Rankings.js";
import Factors from "./components/Factors.js";
import Search from "./components/SearchBar.js";
import Registration from "./components/auth/Registration.js";
import Login from "./components/auth/Login.js";
import Logout from "./components/auth/Logout.js";

export default function App() {
    const links = [
        { name: "Rankings", path: "/rankings" },
        { name: "Factors", path: "/factors" },
        { name: "Register", path: "/register" },
        { name: "Login", path: "/login" },
        { name: "Logout", path: "/logout" }
    ]

    function Navbar() {
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
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Rankings}>
                        <Redirect to="/rankings" />
                    </Route>
                    <Route exact path="/rankings" component={Rankings} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/factors" component={Factors} />
                    <Route exact path="/register" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </div>
        </Router >
    );
}