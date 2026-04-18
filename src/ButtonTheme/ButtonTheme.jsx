import { useId } from "react";
import PropTypes from 'prop-types';

export const ButtonTheme = (prop) => {
    const buttonId = useId();

    function handleThemeChange()
    {
        !document.startViewTransition ? 
        prop.themeHandler(!prop.isDark) 
        :
        document.startViewTransition(() => {
            prop.themeHandler(!prop.isDark);
        })
    }

    return(
        <>
            <button id={buttonId} className="theme-button" onClick={handleThemeChange}>
                {prop.isDark ? "☀︎" : "☾"}
            </button>
        </>
    )
}

ButtonTheme.propTypes = {
    isDark: PropTypes.bool.isRequired,
    themeHandler: PropTypes.func.isRequired
}
