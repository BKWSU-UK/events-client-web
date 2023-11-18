import React, {useContext, useEffect} from 'react'
import EventContext, {ACTIONS} from '../../context/EventContext'
import {extractParameter} from '../../utils/paramExtraction'
import {faPlay, faPowerOff,} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function dispatchTags(filterDispatch, tagsStr, isNoTags) {
  if (!!tagsStr) {
    const tags = tagsStr.split(/[,;]/)
    if (isNoTags) {
      filterDispatch({
        type: ACTIONS.SET_NO_TAGS,
        payload: {
          noTags: tags
        }
      })
    } else {
      filterDispatch({type: ACTIONS.SET_TAGS, payload: {tags}})
    }
  }
}

/**
 * Contains the tags filter.
 * @constructor
 */
const TagsFilter = () => {
  const eventContext = useContext(EventContext)
  const {filterState, filterDispatch} = eventContext

  useEffect(() => {
    const tagsStr = extractParameter(null, 'tags', [])
    const noTagsStr = extractParameter(null, 'noTags', [])
    if(filterState.tags.length === 0) {
      dispatchTags(filterDispatch, tagsStr, false)
    }
    if(filterState.noTags.length === 0) {
      dispatchTags(filterDispatch, noTagsStr, true)
    }
  }, [])

  const onChange = (e, selectedTag, isNoTag) => {
    e.preventDefault()
    if (!isNoTag && filterState.activateTags) {
      filterDispatch({type: ACTIONS.SELECT_TAG, payload: {selectedTag}})
    }
  }

  const onToggleTags = () => {
    filterDispatch({type: ACTIONS.TOGGLE_TAGS})
  }

  const buttonClass = (t, isNoTags) => {
    if (!filterState.activateTags) {
      return 'light'
    }
    if(isNoTags) {
      return 'danger'
    }
    return t === filterState.selectedTag
      ? 'primary'
      : 'info'
  }

  return (
    <div className="row mt-3 mb-3">
      <div className="col-12 tags">
        {filterState.tags.map((t, i) => (
          <a href="#"
             className={`badge badge-pill badge-${buttonClass(t)} ${!filterState.activateTags && 'deactivated'}`}
             key={`tag_${i}`}
             onClick={(e) => onChange(e, t)}>{t}&nbsp;</a>
        ))}
        {filterState.noTags.map((t, i) => (
          <a
             className={`badge badge-pill badge-${buttonClass(t, true)} ${!filterState.activateTags && 'deactivated'}`}
             key={`noTag_${i}`}
             onClick={(e) => onChange(e, t, true)}>{t}&nbsp;</a>
        ))}
        {!!filterState.tags && filterState.tags.length > 0 &&
          <FontAwesomeIcon icon={filterState.activateTags ? faPowerOff : faPlay}
                           className="fa-tag" onClick={onToggleTags}/>}
      </div>
    </div>
  )
}

export default TagsFilter