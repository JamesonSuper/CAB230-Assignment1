import React, { Component } from "react"

const API_URL = "http://131.181.190.87:3000"

export default class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const url = `${API_URL}/user/login`
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        fetch(url, {
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
                console.log("Token received: " + data.token);
                localStorage.setItem("token", data.token);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("Error: " + error)
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}