import { useCallback, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import './App.css'
import { ButtonTheme } from './ButtonTheme/ButtonTheme'

export const Header = () =>{

    const systemPrefersDark = useMediaQuery({
            query: "(prefers-color-scheme: dark)" 
    })

    const [isDark, setIsDark] = useState(systemPrefersDark);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        document.body.classList.toggle("dark", isDark);
    })

    const handleThemeChange = useCallback((value) => {
        setIsDark(value)
    }, [isDark]);

    return(
        <>
            <header>
                <h1>Cool Todo App</h1>
                <ButtonTheme isDark={isDark} themeHandler={handleThemeChange}/>
             </header>
        </>
    )
}