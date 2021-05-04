import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

const API_URL = "http://131.181.190.87:3000";


export default function Rankings() {
    const [rowData, setRowData] = useState([]);
    const columns = [
        { headerName: "Rank", field: "rank" },
        { headerName: "Country", field: "country" },
        { headerName: "Score", field: "score" },
        { headerName: "Year", field: "year" }
    ];

    useEffect(() => {
        fetch(API_URL + "/rankings")
            .then(res => res.json())
            .then(listings => 
                listings.map(listing => {
                    return {
                        rank: listing.rank,
                        country: listing.country,
                        score: listing.score,
                        year: listing.year
                    };
                })
            )
            .then(listings => setRowData(listings));
    }, [])

    return (
        <div
            className="ag-theme-balham-dark"
            style={{
                height: "400px",
                width: "900px"
            }}
        >
            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
            />
        </div>
    );
}