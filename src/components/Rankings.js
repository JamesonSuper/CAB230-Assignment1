import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Badge } from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import SearchBar from "./SearchBar.js"
import HorizontalBar from "./HorizontalBar.js";
import LineGraph from "./LineGraph.js";
import "../index.css"



export default function Rankings() {
    const [isReady, useIsReady] = useState(false);
    const [search, setSearch] = useState("");
    const [year, setYear] = useState();
    const [countriesArray, setCountriesArray] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const API_URL = "http://131.181.190.87:3000";
    const columns = [
        { headerName: "Country", field: "country", width: "270px", sortable: true, filter: 'agTextColumnFilter' },
        { headerName: "Year", field: "year", width: "220px", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Rank", field: "rank", width: "170px", sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Score", field: "score", width: "220px", sortable: true, filter: 'agNumberColumnFilter' }
    ];
    useEffect(() => {
        let url = `${API_URL}/rankings?`
        if (year !== undefined)
            url += `year=${year}&`
        if (search !== "")
            url += `country=${search}`
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

    // Setting up a callback reference to the gridApi to avoid stale closures
    function useDynamicCallback(callback) {
        const ref = useRef();
        ref.current = callback;
        return useCallback((...args) => ref.current.apply(this, args), []);
    }

    // For the program to know that the ag-grid and its API is ready to be called upon
    const onGridReady = params => {
        useIsReady(true);
    }

    // Update the variables with the displayed data after the user changes ag-grid page/filter/sort options
    const getDisplayedRowData = useDynamicCallback((params) => {
        if (isReady) {
            let toUpdate = []
            // Multiplying pageNumber by 10 so that the index below is incremented by 10, as 10 records per page.
            let pageNumber = params.api.paginationGetCurrentPage() * 10;

            // Checking if data displayed is less than 10 rows (e.g on the last page)
            setDisplayedData([]);
            if (rowData.length > 0) {
                if (params.api.paginationGetCurrentPage() + 1 === params.api.paginationGetTotalPages()) {
                    for (let i = 0; i < rowData.length % 10; i++) {
                        if (params.api.getDisplayedRowAtIndex(pageNumber + i) !== undefined) {
                            toUpdate.push(params.api.getDisplayedRowAtIndex(pageNumber + i).data)
                        }
                    }
                }
                else {
                    for (let i = 0; i < 10; i++) {
                        if (params.api.getDisplayedRowAtIndex(pageNumber + i) !== undefined) {
                            toUpdate.push(params.api.getDisplayedRowAtIndex(pageNumber + i).data)
                        }
                    }
                }
            }
            if (search !== "") {
                params.columnApi.applyColumnState({
                    state: [
                        {
                            colId: 'year',
                            sort: 'asc',
                        }
                    ]
                })
            }
            else {
                params.columnApi.applyColumnState({
                    state: [
                        {
                            colId: 'year',
                            sort: null,
                        }
                    ]
                })
            }
            setDisplayedData(toUpdate);
        }
    });

    return (
        <div className="container">
            <h1>Country Happiness Rankings</h1>
            <p>{rowData.length > 0 ? (<Badge color="success">{rowData.length}</Badge>) : (<Badge color="danger">{rowData.length}</Badge>)} Rankings loaded.</p>
            <div>
                <select value={year} onChange={((e) => setYear(e.target.value))}>
                    <option value="">*</option>
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
                    countries={countriesArray}
                />
            </div>
            <div
                className="ag-theme-alpine-dark"
                style={{
                    height: "508px",
                    width: "882px"
                }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    onPaginationChanged={getDisplayedRowData}
                    onGridReady={onGridReady}
                />
            </div>
            {/* If search is null, display bar graphs */}
            {search === "" ? (<div>
                {displayedData.length > 1 ? <HorizontalBar
                    label="Score"
                    metricData={displayedData.map(row => { return row.score })}
                    countries={displayedData.map(row => { return row.country })}
                /> : null}

            </div>) : (
                // If Search is not null, display line graphs
                <div>
                    {displayedData.length > 1 ? <LineGraph
                        label="Rank"
                        metricData={displayedData.map(row => { return row.rank })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}
                    {displayedData.length > 1 ? <LineGraph
                        label="Score"
                        metricData={displayedData.map(row => { return row.score })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}
                </div>
            )}
        </div>
    );
}