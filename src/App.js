import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";
import Registration from "./auth/Registration.js";
import Authenticate from "./auth/Authenticate.js";
import Nav from "./Nav.js";

const Home = () => (
    <div>
        <header className="AppHeader">
            <h2>World Happiness Data</h2>
        </header>
        <p>Home</p>
        <footer class="footer">
        <div class="text-center py-2 bg-secondary">
            <span class="text-light">Copyright &copy; 2019</span>
        </div>
    </footer>
    </div>
    
);

const Rankings = () => (
    <div>
        <header className="AppHeader">
            <h2>Rankings</h2>
        </header>
        <p>Rankings</p>
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

const Register = () => (
    <div>
        <header className="AppHeader">
            <h2>Register</h2>
        </header>
        <Registration />
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
                    <Route path="/register" component={Register} />
                </main>
            </div>
        </Router>
    );
}