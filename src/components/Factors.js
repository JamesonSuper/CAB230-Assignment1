import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Badge } from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import SearchBar from "./SearchBar.js"
import HorizontalBar from "./HorizontalBar.js";
const API_URL = "http://131.181.190.87:3000";


export default function Factors() {
    const [gridApi, setGridApi] = useState(null);
    const [search, setSearch] = useState("");
    const [year, setYear] = useState(2020);
    const [rowData, setRowData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const columns = [
        { headerName: "Rank", field: "rank", width: 68, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Country", field: "country", width: 140, sortable: true, filter: 'agTextColumnFilter' },
        { headerName: "Score", field: "score", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Economy", field: "economy", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Family", field: "family", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Health", field: "health", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Freedom", field: "freedom", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Generosity", field: "generosity", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Trust", field: "trust", width: 90, sortable: true, filter: 'agNumberColumnFilter' }
    ];
    const gridOptions = {
        columnDefs: columns,
        pagination: true,
        paginationPageSize: 10,
        onPaginationChanged: getDisplayedRowData,
        onGridReady: params => setGridApi(params.api),
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetch(API_URL + `/factors/${year}/?country=${search}`, {
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
    }, [year, search])

    function getDisplayedRowData() {
        console.log('onPaginationPageLoaded');
        let toUpdate = []
        // Multiplying pageNumber by 10 so that the index below is incremented by 10, as 10 records per page.
        let pageNumber = gridApi.paginationGetCurrentPage() * 10;
        // Checking if data displayed is less than 10 rows (e.g on the last page)
        setDisplayedData([]);
        if (gridApi.paginationGetCurrentPage() + 1 == gridApi.paginationGetTotalPages()) {
            for (let i = 0; i < rowData.length % 10; i++) {
                toUpdate.push(gridApi.getDisplayedRowAtIndex(pageNumber + i).data)
            }
        }
        else {
            for (let i = 0; i < 10; i++) {
                toUpdate.push(gridApi.getDisplayedRowAtIndex(pageNumber + i).data)
            }
        }
        setDisplayedData(toUpdate);
        console.log('displayedData', toUpdate);
    }
    return (
        <div className="container">
            <h1>Country Happiness Rankings</h1>
            <div>
                <select value={year} onChange={((e) => setYear(e.target.value))}>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                </select>
            </div>
            <SearchBar onSubmit={setSearch} />
            <p>
                {rowData.length > 0 ? (<Badge color="success">{rowData.length}</Badge>) : (<Badge color="danger">{rowData.length}</Badge>)} Rankings loaded.
            </p>
            <div
                className="ag-theme-balham-dark"
                style={{
                    height: "347px",
                    width: "840px"
                }}
            >
                <AgGridReact rowData={rowData} gridOptions={gridOptions} />
            </div>
            <div>
                {displayedData.length > 0 ? <HorizontalBar columns={columns} rowData={displayedData} /> : null}
            </div>
        </div>
    );
}