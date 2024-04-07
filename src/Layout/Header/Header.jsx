import React, { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from '../../useDarkSide';

const Header = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = checked => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };
    return (
        <header className='bg-foreground text-text shadow shadow-text fixed w-full top-0 z-50'>
            <div className='container py-5 flex justify-between text-base md:text-3xl'>
                <div>
                    <h1>Where is the world?</h1>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={20} />
                    <h1 className=' text-sm md:text-2xl'>Dark mode</h1>
                </div>
            </div>
        </header>
    )
}

export default Header