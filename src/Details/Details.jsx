import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Details = () => {
    var { name } = useParams()
    var [exactCountry, setExactCountry] = useState({})

    useEffect(() => {
        var findCountry = async () => {
            try {
                var response = await axios.get("https://restcountries.com/v3.1/all");
                var exactCountry1 = response.data.find((country) => country.name.common === name);
                setExactCountry(exactCountry1);
                console.log(exactCountry1);
            } catch (error) {
                console.error("Error fetching country:", error);
            }
        }
        findCountry()
    }, [name])
    var currency = exactCountry?.currencies ? Object.values(exactCountry.currencies)[0] : '';
    var languages = exactCountry?.languages ? Object.values(exactCountry.languages) : '';

    return (
        <main className='bg-background py-32'>
            <div className='container text-text'>
                <div className='w-full flex'>
                    <Link to={"/"}>
                        <button className='py-2 px-4 border border-text rounded flex items-center justify-center gap-1 bg-foreground text-text text-xl'>
                            <svg height="15" width="15" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 476.213 476.213" xmlSpace="preserve" className='fill-text'>
                                <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 57.427,253.107 476.213,253.107 " />
                            </svg>
                            Back
                        </button>
                    </Link>
                </div>
                {exactCountry ? (
                    <div className='flex flex-col lg:flex-row justify-between w-full h-full mt-10'>
                        {exactCountry.flags && <img src={exactCountry.flags.png} alt="" className='lg:w-1/2 w-full' />}
                        <div className='w-full lg:w-1/2 pl-10 mt-10 lg:mt-0 h-full'>
                            <h1 className='text-3xl mb-10'>{exactCountry.name?.common}</h1>
                            <div className='text-xl flex w-full justify-between h-full'>
                                <ul className='flex flex-col gap-3'>
                                    <li>Native Name: {exactCountry.name?.common}</li>
                                    <li>Population: {exactCountry.population}</li>
                                    <li>Region: {exactCountry.region}</li>
                                    <li>Sub Region: {exactCountry.subregion}</li>
                                    <li>Capital: {exactCountry.capital}</li>
                                </ul>
                                <ul className='flex flex-col gap-3'>
                                    <li>Top Level Domain: {exactCountry.cca2}</li>
                                    <li>Currencies: {currency.name}</li>
                                    <li>Languages: {languages && languages.length > 0 ? (
                                        languages.map((language, index) => (
                                            <span key={index}>{language}, </span>
                                        ))
                                    ) : "N/A"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : "Loading..."}
            </div>

        </main>
    )
}

export default Details