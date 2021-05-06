import React from "react";

export default function Home () {
    if (localStorage.getItem("token") === null){
      return (
        <div>
          <h1>No token</h1>
        </div>
      );
    }
    else {
      return (
        <div>
          <h1>Yes token</h1>
        </div>
      )
    }
  }