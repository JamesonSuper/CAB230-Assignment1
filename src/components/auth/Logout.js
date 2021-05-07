import React, { useEffect } from "react"


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