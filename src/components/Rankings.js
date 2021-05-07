import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Badge } from "reactstrap";
import SearchBar from "./SearchBar.js"
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const API_URL = "http://131.181.190.87:3000";


export default function Rankings() {
    const [search, setSearch] = useState("");
    const [rowData, setRowData] = useState([]);
    const columns = [
        { headerName: "Rank", field: "rank", width: "170px", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Country", field: "country", width: "270px", sortable: true, filter: 'agTextColumnFilter' },
        { headerName: "Score", field: "score", width: "220px", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Year", field: "year", width: "220px", sortable: true , filter: 'agNumberColumnFilter'}
    ];
    useEffect(() => {
        fetch(API_URL + `/rankings?country=${search}`)
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
    }, [search])

    return (
        <div className="container">
            <h1>Country Happiness Rankings</h1>
            <p>
                <Badge color="success">{rowData.length}</Badge> Rankings loaded.
            </p>
            <div>
                <SearchBar onSubmit={setSearch}/>
            </div>
            <div
                className="ag-theme-alpine-dark"
                style={{
                    height: "627px",
                    width: "900px"
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={20}
                />
            </div>
        </div>
    );
}