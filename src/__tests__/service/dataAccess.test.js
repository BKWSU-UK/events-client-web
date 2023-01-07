import {
  joinIfArray,
  orgIdStrFactory,
  targetUrlFactory,
} from '../../service/dataAccess'
import {
  buildTargetUrlData,
  buildTargetUrlDataWithDates,
} from './dataProcessProvider'

test('when is array join if array', () => {
  expect(joinIfArray([1, 2])).toBe('1,2')
  expect(joinIfArray([1, 2, 4])).toBe('1,2,4')
})

test('when is primitive join if array', () => {
  expect(joinIfArray(1)).toBe(1)
})

test('when has orgIdFilter build org id', () => {
  const orgIdFilter = [2, 335]
  const orgId = 2
  const useAllOrgIds = false
  expect(orgIdStrFactory({ orgIdFilter, orgId, useAllOrgIds })).toBe('2,335')
})

test('when has org id build org id', () => {
  const orgId = 2
  const useAllOrgIds = false
  expect(orgIdStrFactory({ orgId, useAllOrgIds })).toBe(2)
})

test('when has params build target url', () => {
  const {
    orgIdStr,
    eventTypeIds,
    eventsLimit,
    eventsLang,
    featured,
    eventContext,
  } = buildTargetUrlData()
  expect(targetUrlFactory({
    orgIdStr,
    eventTypeIds,
    eventsLimit,
    eventsLang,
    featured,
    eventContext,
  })).
    toBe(
      `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?orgEventTemplate=jsonEventExport.ftl&orgId=${orgIdStr}&eventTypeIds=${eventTypeIds}&fromIndex=0&toIndex=${eventsLimit}&mimeType=application/json`)
})

test('when has start and end date should append date', () => {
  const {
    orgIdStr,
    eventTypeIds,
    eventsLimit,
    eventsLang,
    featured,
    dateStart,
    dateEnd,
    eventContext,
  } = buildTargetUrlDataWithDates()
  expect(targetUrlFactory({
    orgIdStr,
    eventTypeIds,
    eventsLimit,
    eventsLang,
    featured,
    dateStart,
    dateEnd,
    eventContext,
  })).
    toBe(
      `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?orgEventTemplate=jsonEventExport.ftl&orgId=${orgIdStr}&eventTypeIds=${eventTypeIds}&fromIndex=0&toIndex=${eventsLimit}&mimeType=application/json&startDate=2022-06-10&endDate=2022-06-20`)
})

test('when has start and end date should append date and use minimal', () => {
  const {
    orgIdStr,
    eventTypeIds,
    eventsLimit,
    eventsLang,
    featured,
    dateStart,
    dateEnd,
    eventContext,
  } = buildTargetUrlDataWithDates()
  const useMinimal = true
  expect(targetUrlFactory({
    orgIdStr,
    eventTypeIds,
    eventsLimit,
    eventsLang,
    featured,
    dateStart,
    dateEnd,
    eventContext,
    useMinimal,
  })).
    toBe(
      `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?orgEventTemplate=jsonEventExportMinimal.ftl&orgId=${orgIdStr}&eventTypeIds=${eventTypeIds}&fromIndex=0&toIndex=${eventsLimit}&mimeType=application/json&startDate=2022-06-10&endDate=2022-06-20`)
})