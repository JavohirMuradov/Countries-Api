import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from "@material-tailwind/react";

const Main = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        const searchInput = e.target.value.toLowerCase();
        setInput(searchInput);
        filterCountries(searchInput, selectedRegion);
    };

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);
        filterCountries(input, region);
    };

    const filterCountries = (input, region) => {
        const filtered = data.filter((country) => {
            const nameMatch = country.name.common.toLowerCase().includes(input);
            const regionMatch = !region || country.region.toLowerCase().includes(region);
            return nameMatch && regionMatch;
        });
        setFilteredData(filtered);
    };

    return (
        <section className='pt-28 bg-background h-full'>
            <div className='container flex items-center justify-center flex-wrap gap-5 flex-row'>
                <div className='w-full flex justify-between'>
                    <div className="w-2/3">
                        <div className='relative w-full min-w-[200px] h-10'>
                            <div className='grid place-items-center absolute text-blue-gray-500 top-2/4 right-3 -translate-y-2/4 w-5 h-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" className='fill-text w-5 h-5'>
                                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                                </svg>
                            </div>
                            <input placeholder='Search' type="text" className='w-full h-full bg-transparent text-text font-sans font-normal outline outline-0 focus:outline-0 disabled:border-2 transition-all border focus:border-2 border-t-text focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-text focus:border-text !placeholder:text-text' value={input} onChange={handleSearch} />
                        </div>
                    </div>
                    <select
                        value={selectedRegion}
                        onChange={handleRegionChange}
                        className="px-3 py-2.5 rounded-[7px] bg-transparent border text-text focus:outline-none border-text"
                    >
                        <option value="" className='bg-transparent'>All Regions</option>
                        <option value="africa" className='bg-transparent'>Africa</option>
                        <option value="americas" className='bg-transparent'>Americas</option>
                        <option value="asia" className='bg-transparent'>Asia</option>
                        <option value="europe" className='bg-transparent'>Europe</option>
                        <option value="oceania" className='bg-transparent'>Oceania</option>
                    </select>
                </div>
                {filteredData.map((country) => (
                    <div key={country.name.common} className='shadow bg-foreground text-text shadow-foreground my-6 grid grid-col-[auto-fit_minmax(200px, 1fr)] rounded-xl aspect-[1 / 1.4]'>
                        <Link to={`/countries/${country.name.common}`}>
                            <img src={country.flags.png} alt="" className='h-48 w-80 aspect-[1.5 / 1] rounded-t-xl' />
                            <div className='flex flex-col p-5 rounded-b-xl'>
                                <h1 className='text-2xl font-semibold'>{country.name.common}</h1>
                                <span>Population: {country.population}</span>
                                <span>Region: {country.region}</span>
                                <span>Capital: {country.capital}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Main;
