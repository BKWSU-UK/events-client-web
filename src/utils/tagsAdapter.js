
export function convertToSet(currentEvent) {
  return !currentEvent
    ? new Set()
    : new Set(currentEvent.tags?.split(",") ?? [])
}