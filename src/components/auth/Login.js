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
                localStorage.setItem("token", data.token);
                alert("Success! You are logged in.");
                setEmail("");
                setPassword("");
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
    );
}