import React, { useState } from "react"

const API_URL = "http://131.181.190.87:3000"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log(response.status + ": " + response.statusText);
                if (response.status > 399) {
                    alert("Error - " + response.status + ": " + response.statusText);
                }
                return response.json()
            })
            .then(data => {
                if (data.token !== undefined) {
                    localStorage.setItem("token", data.token);
                    setEmail("");
                    setPassword("");
                    alert("Success! You are logged in.");
                }
                else {
                    console.log("Token returned was null.");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("There was a network error!" + error);
                setEmail("");
                setPassword("");
            });
    }
    return (

        <div>
            <h1>Login</h1>
            <div>
                {localStorage.getItem("token") ?
                    (<p>You are logged in.</p>) :
                    (<div>
                        <p>You are not logged in.</p>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    )}
            </div>
        </div >
    );
}