export function venueEventAdapter(currentEvent) {
  if (!currentEvent) return { venue: {} };
  const { simpleVenue } = currentEvent;
  return {
    name: currentEvent.name,
    subTitle: currentEvent.subTitle,
    eventTypeId: currentEvent.eventType,
    description: currentEvent.description,
    shortDescription: currentEvent.shortDescription,
    image1: currentEvent.image1,
    image2: currentEvent.image2,
    image3: currentEvent.image3,
    venue: {
      name: simpleVenue.name,
      address: simpleVenue.address,
      postalCode: simpleVenue.postalCode,
      locality: simpleVenue.locality,
      country: simpleVenue.countryName,
    },
  };
}

export function dateListAdapter(data) {
  if (!data) return [];
  return [
    {
      startIso: `${data.startDate}T${data.startTime}`,
      endIso: `${data.endDate}T${data.endTime}`,
      eventDateId: data.eventDateId,
    },
  ];
}
