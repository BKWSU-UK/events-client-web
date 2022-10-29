import {
    joinIfArray,
    orgIdStrFactory,
    targetUrlFactory,
} from '../../service/dataAccess'
import {
    tableEventToSingleEventAdapter
} from '../../components/readMore/SocialIcons'

const singleEvent = require("../data/singleEvent.json")
const tableEvent = require("../data/tableEvent.json")

test('when tableEventToSingleEventAdapter should add dateList', () => {
    const adaptedSingleEvent = tableEventToSingleEventAdapter(tableEvent)
    expect(adaptedSingleEvent.dateList.length).toBe(1)
    expect(adaptedSingleEvent.dateList[0].eventDateId).toBe(tableEvent.eventDateId)
    expect(adaptedSingleEvent.dateList[0].startIso).toBe(tableEvent.startIso)
    expect(adaptedSingleEvent.dateList[0].endIso).toBe(tableEvent.endIso)
})
