import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Badge } from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import SearchBar from "./SearchBar.js"

const API_URL = "http://131.181.190.87:3000";


export default function Rankings() {
    const [search, setSearch] = useState("");
    const [rowData, setRowData] = useState([]);
    const [year, setYear] = useState();
    const [countriesArray, setCountriesArray] = useState([]);
    const columns = [
        { headerName: "Rank", field: "rank", width: "170px", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Country", field: "country", width: "270px", sortable: true, filter: 'agTextColumnFilter' },
        { headerName: "Score", field: "score", width: "220px", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Year", field: "year", width: "220px", sortable: true, filter: 'agNumberColumnFilter' }
    ];
    useEffect(() => {
        let url = `${API_URL}/rankings?`
        if (year !== undefined) {
            url += `year=${year}&`
        }
        if (search !== "") {
            url += `country=${search}`
        }
        fetch(url)
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
            .then(listings => setRowData(listings))
            .catch(error => {
                console.log("There was an error: ", error);
            });
        fetch(API_URL + `/countries`)
            .then(res => {
                console.log(res.status + " - " + res.statusText)
                if (res.status > 300) {
                    alert("Error: " + res.status + " - " + res.statusText);

                }
                return res.json();
            }).then(countries => countries.map(country => {
                return country
            })
            ).then(countries => {
                setCountriesArray(countries)
            }).catch(error => {
                console.log("There was a network error!", error);
            });
    }, [search, year])

    return (
        <div className="container">
            <h1>Country Happiness Rankings</h1>
            <p>{rowData.length > 0 ? (<Badge color="success">{rowData.length}</Badge>) : (<Badge color="danger">{rowData.length}</Badge>)} Rankings loaded.</p>
            <div>
                <select value={year} onChange={((e) => setYear(e.target.value))}>
                    <option value=""></option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                </select>
            </div>
            <div>
                <SearchBar
                    onSubmit={setSearch}
                    innerSearch={search}
                    countries={countriesArray} />
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