export const orgIdFilterAdapter = (eventContext) =>
  eventContext.orgIdFilter < 1 ? null : eventContext.orgIdFilter;
