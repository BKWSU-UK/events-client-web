import { isBeforeToday, timeAfterNow } from '../../utils/dateUtils'

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