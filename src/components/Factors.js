import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Badge } from "reactstrap";
import "../index.css"
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import SearchBar from "./SearchBar.js"
import HorizontalBar from "./HorizontalBar.js";
import LineGraph from "./LineGraph.js";


export default function Factors() {
    const [isReady, useIsReady] = useState(false);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(null);
    const [year, setYear] = useState(2020);
    const [countriesArray, setCountriesArray] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const API_URL = "http://131.181.190.87:3000"
    const columns = [
        { headerName: "Year", field: "year", width: 86, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Rank", field: "rank", width: 68, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Country", field: "country", width: 100, sortable: true, filter: 'agTextColumnFilter' },
        { headerName: "Score", field: "score", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Economy", field: "economy", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Family", field: "family", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Health", field: "health", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Freedom", field: "freedom", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Generosity", field: "generosity", width: 90, sortable: true, filter: 'agNumberColumnFilter' },
        { headerName: "Trust", field: "trust", width: 90, sortable: true, filter: 'agNumberColumnFilter' }
    ];
    useEffect(() => {
        // Check initially if user has a token stored.
        if (localStorage.getItem("token")) {
            let results = [];
            // Check if user has searched for a country, if so, load all year data for that country.
            if (search !== "") {
                let localyear = 2014
                console.log(limit)

                for (let i = 1; i < 7; i++) {
                    let url = `${API_URL}/factors/${localyear + i}?`;
                    if (limit > 0) {
                        if (i > limit) {
                            break;
                        }
                        url += `limit=${limit}&`
                    }
                    if (search !== "")
                        url += `country=${search}`
                    fetch(url, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("token")
                        }
                    })
                        .then(res => {
                            console.log(res.status + " - " + res.statusText)
                            if (res.status > 300)
                                throw new Error(res.statusText);
                            return res.json();
                        })
                        .then(listings =>
                            listings.map(listing => {
                                return {
                                    year: localyear + i,
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
                        .then(listings => {
                            results = results.concat(listings);
                            setRowData(results);
                        })
                        .catch(error => {
                            console.log(`There was an error: `, error);
                            alert(`There was a network error: ${error}`);
                        });

                }
            } // If not, load only the year selected data.
            else {
                let url = `${API_URL}/factors/${year}?`;
                if (limit > 0) {
                    url += `limit=${limit}&`
                }
                if (search !== "") {
                    url += `country=${search}`
                }
                fetch(url, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                })
                    .then(res => {
                        console.log(res.status + " - " + res.statusText)
                        if (res.status > 300) {
                            throw new Error(res.statusText);
                        }
                        return res.json();
                    })
                    .then(listings =>
                        listings.map(listing => {
                            return {
                                year: year,
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
                    .then(listings => setRowData(listings))
                    .catch(error => {
                        console.log(`There was an error: `, error);
                        alert(`There was a network error: ${error}`);
                    });
            }
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
                })
                .catch(error => {
                    console.log(`There was an error: `, error);
                });
        }
        else {
            alert("You are not authorised to view this resource.")
        }
    }, [year, search, limit])

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
            <h1 className="test">Country Happiness Rankings</h1>
            {search === "" ? (
                <div>
                    Select year to query data: <select value={year} onChange={((e) => setYear(e.target.value))}>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                    </select>
                </div>) : (
                <div>
                    Showing all years for queried country.
                </div>
            )}
            <div>
                Set query limit: <input type="number" min="1" onChange={((e) => setLimit(e.target.value))}></input>
            </div>
            <div>
                <SearchBar
                    onSubmit={setSearch}
                    innerSearch={search}
                    countries={countriesArray}
                />
            </div>
            <p>{rowData.length > 0 ? (<Badge color="success">{rowData.length}</Badge>) : (<Badge color="danger">{rowData.length}</Badge>)} Rankings loaded.</p>
            <div
                className="ag-theme-balham-dark"
                style={{
                    height: "347px",
                    width: "886px"
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

                {displayedData.length > 1 ? <HorizontalBar
                    label="Economy"
                    metricData={displayedData.map(row => { return row.economy })}
                    countries={displayedData.map(row => { return row.country })}
                /> : null}

                {displayedData.length > 1 ? <HorizontalBar
                    label="Family"
                    metricData={displayedData.map(row => { return row.family })}
                    countries={displayedData.map(row => { return row.country })}
                /> : null}

                {displayedData.length > 1 ? <HorizontalBar
                    label="Health"
                    metricData={displayedData.map(row => { return row.health })}
                    countries={displayedData.map(row => { return row.country })}
                /> : null}

                {displayedData.length > 1 ? <HorizontalBar
                    label="Freedom"
                    metricData={displayedData.map(row => { return row.freedom })}
                    countries={displayedData.map(row => { return row.country })}
                /> : null}

                {displayedData.length > 1 ? <HorizontalBar
                    label="Generosity"
                    metricData={displayedData.map(row => { return row.generosity })}
                    countries={displayedData.map(row => { return row.country })}
                /> : null}

                {displayedData.length > 1 ? <HorizontalBar
                    label="Trust"
                    metricData={displayedData.map(row => { return row.trust })}
                    countries={displayedData.map(row => { return row.country })}
                /> : null}
            </div>) : (
                // If Search is not null, display line graphs
                <div>
                    {displayedData.length > 1 ? <LineGraph
                        label="Score"
                        metricData={displayedData.map(row => { return row.score })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}

                    {displayedData.length > 1 ? <LineGraph
                        label="Economy"
                        metricData={displayedData.map(row => { return row.economy })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}

                    {displayedData.length > 1 ? <LineGraph
                        label="Family"
                        metricData={displayedData.map(row => { return row.family })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}

                    {displayedData.length > 1 ? <LineGraph
                        label="Health"
                        metricData={displayedData.map(row => { return row.health })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}

                    {displayedData.length > 1 ? <LineGraph
                        label="Freedom"
                        metricData={displayedData.map(row => { return row.freedom })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}

                    {displayedData.length > 1 ? <LineGraph
                        label="Generosity"
                        metricData={displayedData.map(row => { return row.generosity })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}

                    {displayedData.length > 1 ? <LineGraph
                        label="Trust"
                        metricData={displayedData.map(row => { return row.trust })}
                        years={displayedData.map(row => { return row.year })}
                        countries={displayedData.map(row => { return row.country })}
                    /> : null}
                </div>
            )}

        </div>
    );
}