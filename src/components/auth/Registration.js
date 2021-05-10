import React, { useState } from "react"

const API_URL = "http://131.181.190.87:3000"

export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }

        fetch(`${API_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log(response.status + ": " + response.statusText);
                if (response.status > 200 && response.status < 300) {
                    alert("Success! Registration complete.");
                }
                else if (response.status > 399) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(`There was an error: ${error}`);
                setEmail("");
                setPassword("");
            });
    }
    return (
        <div>
            <h1>Register</h1>
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
        </div>
    );
}