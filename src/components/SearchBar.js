import React, { useState } from "react";

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

    function checkInput() {
        if (innerSearch.length !== 0) {
            if (/^[a-z A-Z]+$/.test(innerSearch))
                props.onSubmit(innerSearch);
            else {
                setInnerSearch("");
                alert("Please only enter letters.")
            }
        }
        else {
            setInnerSearch("");
            props.onSubmit(innerSearch);
        }
    }

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
                onClick={() => checkInput()}
            >Search</button>
        </div>

    );
}
