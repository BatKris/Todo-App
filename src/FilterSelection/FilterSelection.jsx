import { useId, useState } from 'react'
import PropTypes from 'prop-types';


export const FilterSelection = (prop) => {
    const filterId = useId();

    function handleFilter(event) 
    {
        !document.startViewTransition ? 
        prop.filterHandler(event.target.value) 
        :
        document.startViewTransition(() => {
            prop.filterHandler(event.target.value);
        })
    }

    return(
        <>
            <div className="dropdown">
                <label htmlFor={filterId}>
                    {prop.text}
                </label>

                <select id={filterId} name={prop.name} onChange={handleFilter}>
                    <option value="all" defaultValue="all">All</option>
                    <option value="1">User 1</option>
                    <option value="2">User 2</option>
                    <option value="3">User 3</option>
                    <option value="4">User 4</option>
                    <option value="5">User 5</option>
                    <option value="6">User 6</option>
                    <option value="7">User 7</option>
                    <option value="8">User 8</option>
                    <option value="9">User 9</option>
                    <option value="10">User 10</option>
                </select>
            </div>
        </>
    )
}

FilterSelection.propTypes = {
    name: PropTypes.string.isRequired,
    filterHandler: PropTypes.func.isRequired
}