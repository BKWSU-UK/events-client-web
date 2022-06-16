import {
    isBeforeToday,
    monthStartAndEnd,
    timeAfterNow, weekListInYears, weekStartAndEnd,
} from '../../utils/dateUtils'

test('when is before today should be true', () => {
    expect(isBeforeToday(new Date(2000, 1, 1))).
        toBe(true)
})

test('when is before today should be false', () => {
    expect(isBeforeToday(new Date(3000, 1, 1))).
        toBe(false)
})

test('when time after now should be true', () => {
    expect(timeAfterNow("2300-01-01T00:00:00")).
        toBe(true)
})

test('when time before now should be true', () => {
    expect(timeAfterNow("2300-01-01T00:00:00")).
        toBe(true)
})

test('when time before now should be false', () => {
    expect(timeAfterNow("1300-01-01T00:00:00")).
        toBe(false)
})

test('when month end and start should return values', () => {
    const {monthStart, monthEnd} = monthStartAndEnd()
    expect(monthStart).toBeTruthy()
    expect(monthStart.getDate()).toBe(1)
    expect(monthEnd).toBeTruthy()
})

test('when week start and end should return values', () => {
    const {weekStart, weenEnd} = weekStartAndEnd()
    expect(weekStart).toBeTruthy()
    expect(weekStart.getDay()).toBe(1)
    expect(weenEnd).toBeTruthy()
    expect(weenEnd.getDay()).toBe(1)
})

test('when week of year should return values', () => {
    const weeks = weekListInYears(3)
    expect(weeks).toBeTruthy()
    expect(weeks.length).toBeGreaterThan(1)
    for(const week of weeks) {
        expect(week).toContain("-W")
    }
})