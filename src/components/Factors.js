import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Badge } from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { useHistory } from "react-router";

const API_URL = "http://131.181.190.87:3000";


export default function Factors() {
    const [year, setYear] = useState(2020)
    const [rowData, setRowData] = useState([]);
    const columns = [
        { headerName: "Rank", field: "rank", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Country", field: "country", sortable: true, filter: 'agTextColumnFilter' },
        { headerName: "Score", field: "score", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Economy", field: "economy", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Family", field: "family", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Health", field: "health", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Freedom", field: "freedom", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Generosity", field: "generosity", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Trust", field: "trust", sortable: true, filter: 'agNumberColumnFilter' }
    ];
    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetch(API_URL+`/factors/${year}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(res => {
                    console.log(res.status + " - " + res.statusText)
                    if (res.status > 300) {
                        alert("Error: " + res.status + " - " + res.statusText);
                    }
                    return res.json();
                })
                .then(listings =>
                    listings.map(listing => {
                        return {
                            rank: listing.rank,
                            country: listing.country,
                            score: listing.score,
                            economy: listing.economy,
                            family: listing.family,
                            health: listing.health,
                            freedom: listing.freedom,
                            generosity: listing.generosity,
                            trust: listing.trust
                        };
                    })
                )
                .then(listings => setRowData(listings));
        }
        else {
            alert("You are not authorised to view this resource.")
        }
    }, [year])

    function refreshFactors() {

    }

    return (
        <div className="container">
            <h1>Country Happiness Rankings</h1>
            <p>
                <Badge color="success">{rowData.length}</Badge> Rankings loaded.
            </p>

            <div>
                <select value={year} onChange={((e) => setYear(e.target.value))}>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                </select>
            </div>

            <div
                className="ag-theme-balham-dark"
                style={{
                    height: "400px",
                    width: "1300px"
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
    );
}