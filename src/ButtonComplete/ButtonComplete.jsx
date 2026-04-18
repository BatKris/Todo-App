import { useId } from 'react'
import PropTypes from 'prop-types';

export const ButtonComplete = (prop) => {
    const buttonId = useId();

    function handleToggleTaskState(event)
    {
        !document.startViewTransition ? 
        prop.clickHandler(event.target.value) 
        :
        document.startViewTransition(() => {
            prop.clickHandler(event.target.value);
        })
    }

    return(
        <>
            <button id={buttonId} className='complete-button' onClick={handleToggleTaskState}>Complete</button>
        </>
    )
}

ButtonComplete.propTypes = {
    clickHandler: PropTypes.func.isRequired
}
