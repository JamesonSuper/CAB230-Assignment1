import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

const API_URL = "http://131.181.190.87:3000";

export default function Search() {
    // const [results, setResults] = useState([]);
    // useEffect(() => {
    //     fetch(API_URL + "/rankings")
    //         .then(res => res.json())
    //         .then(listings =>
    //             listings.map(listing => {
    //                 return {
    //                     rank: listing.rank,
    //                     country: listing.country,
    //                     score: listing.score,
    //                     year: listing.year
    //                 };
    //             })
    //         )
    //         .then(listings => setResults(listings));
    // }, [])
    return (
        <div className="container">
            <h1>Search</h1>
            <div>
                <p></p>
            </div>
        </div>
    );
}