import { useId } from "react";
import PropTypes, { func } from 'prop-types';

export const ButtonLoad = (prop) => {
    const buttonId = useId();

    function handleVisibleChange(event)
    {
        !document.startViewTransition ? 
        prop.loadHandler(event.target.value) 
        :
        document.startViewTransition(() => {
            prop.loadHandler(event.target.value);
        })
    }

    return(
        <>
            <button id={buttonId} className="load-button" onClick={handleVisibleChange}>Load more</button>
        </>
    )
}

ButtonLoad.propTypes = {
    loadHandler: PropTypes.func.isRequired
}
