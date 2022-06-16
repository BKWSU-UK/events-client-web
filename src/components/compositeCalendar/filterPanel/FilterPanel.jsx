import React from 'react'
import CategoryFilter from './CategoryFilter'

/**
 * Contains the filters used in the calendar.
 * @constructor
 */
const FilterPanel = () => {
    return (
        <div className="row">
            <div className="col-12">
                <CategoryFilter />
            </div>
        </div>
    )
}

export default FilterPanel