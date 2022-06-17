import React from 'react'
import CategoryFilter from './CategoryFilter'
import CenterFilter from '../../filter/CenterFilter'

/**
 * Contains the filters used in the calendar.
 * @constructor
 */
const FilterPanel = () => {
    return (
        <div className="row">
            <div className="col-12">
                <CategoryFilter />
                <CenterFilter renderSelectOnly={true} selectionClass="btn btn-primary calendar-center-selector"
                    firstOptionText="All locations"/>
            </div>
        </div>
    )
}

export default FilterPanel