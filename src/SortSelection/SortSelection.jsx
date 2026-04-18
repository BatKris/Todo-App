import { useId, useState } from 'react'
import PropTypes from 'prop-types';

export const SortSelection = (prop) => {
    const filterId = useId();

    function handleOrder(event) 
    {
       !document.startViewTransition ? 
        propsortkHandler(event.target.value) 
        :
        document.startViewTransition(() => {
            prop.sortHandler(event.target.value);
        })
    }
    return(
        <>
            <div className="dropdown">
                <label htmlFor={filterId}>
                    {prop.text}
                </label>

                <select id={filterId} name={prop.name} onChange={handleOrder}>
                    <option value="asc" defaultValue="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </>
    )
}

SortSelection.propTypes = {
    name: PropTypes.string.isRequired,
    sortHandler: PropTypes.func.isRequired
}