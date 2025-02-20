export function convertTagsToSet(currentEvent) {
  return !currentEvent
    ? new Set()
    : new Set(currentEvent.tags?.split(",") ?? []);
}
