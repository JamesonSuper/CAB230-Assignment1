import React, { useState, useEffect } from "react";

export default function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const onChange = e => {
        let inputSearch = e.target.value;
        setInnerSearch(inputSearch);
        inputSearch = inputSearch.trim().toLowerCase();
        setSuggestions([]);
        let suggs = [];
        if (props.countries !== undefined && inputSearch.length !== 0) {
            for (let i = 0; i < props.countries.length; i++) {
                if (props.countries[i].slice(0, inputSearch.length).toLowerCase() === inputSearch) {
                    suggs.push(props.countries[i]);
                }
            }
            setSuggestions(suggs);

        }
    };

    return (
        <div>
            <input
                name="search"
                id="search"
                type="search"
                list="results"
                placeholder="Search with country name..."
                value={innerSearch}
                onChange={(e) => onChange(e)}
            />
            <datalist id="results">
                {suggestions.map(country =>
                    <option key={country} value={country}>{country}</option>)}
            </datalist>

            <button
                id="search-button"
                type="button"
                onClick={() => props.onSubmit(innerSearch)}
            >Search</button>
        </div>

    );
}
