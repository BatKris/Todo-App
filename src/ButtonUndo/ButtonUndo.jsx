import { useId } from 'react'
import PropTypes from 'prop-types';

export const ButtonUndo = (prop) => {
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
            <button id={buttonId} className='undo-button' onClick={handleToggleTaskState}>Undo</button>
        </>
    )
}

ButtonUndo.propTypes = {
    clickHandler: PropTypes.func.isRequired
}
