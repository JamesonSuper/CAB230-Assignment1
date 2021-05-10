import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar.js"
import Rankings from "./components/Rankings.js";
import Factors from "./components/Factors.js";
import Registration from "./components/auth/Registration.js";
import Login from "./components/auth/Login.js";
import Logout from "./components/auth/Logout.js";
import "./index.css";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Route exact path="/" component={Rankings}>
                    <Redirect to="/rankings" />
                </Route>
                <Route exact path="/rankings" component={Rankings} />
                <Route exact path="/factors" component={Factors} />
                <Route exact path="/register" component={Registration} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
            </div>
        </Router >
    );
}