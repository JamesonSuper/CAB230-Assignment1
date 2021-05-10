import React, { useState } from "react"

// Called whenever the registration page is navigated to.
export default function Registration() {
    const API_URL = "http://131.181.190.87:3000";
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
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}