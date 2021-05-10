import React, { useEffect } from "react"

//Call this whenever the logout page is navigated to.
export default function Logout() {
    useEffect(() => {
        console.log("token was " + localStorage.getItem("token"));
        localStorage.removeItem("token");
        console.log("token is " + localStorage.getItem("token"));
    }, [])
    return (
        <div>
            You are logged out.
        </div>
    );
}