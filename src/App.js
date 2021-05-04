import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";
import Rankings from "./components/Rankings.js"
import Registration from "./components/auth/Registration.js";
import Authenticate from "./components/auth/Authenticate.js";
import Nav from "./Nav.js";

const Home = () => (
    <div>
        <header className="AppHeader">
            <h2>World Happiness Data</h2>
        </header>
        <p>Home</p>
    </div>
);

const Search = () => (
    <div>
        <header className="AppHeader">
            <h2>Search</h2>
        </header>
        <p>Search</p>
    </div>
);

const Factors = () => (
    <div>
        <header className="AppHeader">
            <h2>Factors</h2>
        </header>
        <p>Factors</p>
    </div>
);

const Login = () => (
    <div>
        <header className="AppHeader">
            <h2>Login</h2>
        </header>
        <Authenticate />
        <div>
            <p></p>
        </div>
    </div>
);


export default function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <main>
                    <Route exact path="/" component={Home} />
                    <Route path="/rankings" component={Rankings} />
                    <Route path="/search" component={Search} />
                    <Route path="/factors" component={Factors} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                </main>
            </div>
        </Router>
    );
}