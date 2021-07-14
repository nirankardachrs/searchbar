import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Searchbar/SearchBar.scss';

function SearchBar() {
    const [countries, setCountries] = useState([]);
    const [countryMatch, setCountryMatch] = useState([]);

    useEffect(() => {
        const loadCountries = async () => {
            const responce = await axios.get('https://restcountries.eu/rest/v2/all');
            setCountries(responce.data)
        }
        loadCountries();
    }, []);

    const searchCountries = (getdata) => {
        if (!getdata) {
            setCountryMatch([]);
        } else {
            let matches = countries.filter((country) => {
                const regex = new RegExp(`${getdata}`, "gi");
                return country.name.match(regex) || country.capital.match(regex);
            });
            setCountryMatch(matches);
        }
    };


    return (
        <>
            <div>
                <input
                className="searchText"
                    type="text"
                    onChange={e => searchCountries(e.target.value)}
                    placeholder="Search Here"
                    />
                {countryMatch && countryMatch.map((item, index) => (
                    <div key={index} style={{ marginTop: "5px" }} className="suggestion">
                        
                        <li>{item.name} : {item.capital}</li>
                
                    </div>
                ))}
            </div>
        </>
    );
}

export default SearchBar;