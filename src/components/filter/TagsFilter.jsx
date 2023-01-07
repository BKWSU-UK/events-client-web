import React, { useEffect } from 'react'
import { useContext } from 'react'
import EventContext, { ACTIONS } from '../../context/EventContext'
import { extractParameter } from '../../utils/paramExtraction'
import {
  faPlay,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Contains the tags filter.
 * @constructor
 */
const TagsFilter = () => {
  const eventContext = useContext(EventContext)
  const { filterState, filterDispatch } = eventContext

  useEffect(() => {
    const tagsStr = extractParameter(null, 'tags', [])
    if (!!tagsStr) {
      const tags = tagsStr.split(/[,;]/)
      filterDispatch({ type: ACTIONS.SET_TAGS, payload: { tags } })
    }
  }, [])

  const onChange = (e, selectedTag) => {
    e.preventDefault()
    if(filterState.activateTags) {
      filterDispatch({ type: ACTIONS.SELECT_TAG, payload: { selectedTag } })
    }
  }

  const onToggleTags = () => {
    filterDispatch({ type: ACTIONS.TOGGLE_TAGS })
  }

  const buttonClass = (t) => {
    if (!filterState.activateTags) {
      return 'light'
    }
    return t === filterState.selectedTag
      ? 'primary'
      : 'info'
  }

  return (
    <div className="row mt-3">
      <div className="col-12 tags">
        {filterState.tags.map((t, i) => (
          <a href="#"
             className={`badge badge-pill badge-${buttonClass(t)} ${!filterState.activateTags && 'deactivated'}`}
             key={`tag_${i}`}
             onClick={(e) => onChange(e, t)}>{t}&nbsp;</a>
        ))}
        {!!filterState.tags && filterState.tags.length > 0 &&
          <FontAwesomeIcon icon={filterState.activateTags ? faPowerOff : faPlay}
                           className="fa-tag" onClick={onToggleTags} />}
      </div>
    </div>
  )
}

export default TagsFilter