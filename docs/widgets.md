# Available Widgets

## Simple Event List

The snippet below displays a list of events filtered by one or more organisations.


```html
<script>
  window.eventsConfig = [
    {
      useBodyHiddenOverflow: true,
      useSimpleLayout: true,
      orgId: [2], // This is the organisation ID from EMS
      eventTypeIds: "1,2,3,4,5,6,7,8,9,10,11,12,13,15",
      language: "en-GB", // "es" for Spanish also supported now,
      showLocalTime: true,
      showCalendar: false, // whether to show the calendar widget, instead of the list
      showSingleEvent: false,
      featured: false, // Show only featured examples
      displayWebcastButton: false, // displays the webcast button
      eventsLimit: 200, // show only one single event
      singleEventUrlTemplate:
        "https://globalcooperationhouse.org/whatson-full/singleevent/@@eventDateId@@",
      suppressBookOnly: true, // Remove the book only button
      suppressVenue: true, // Hides the venue and add the buttons just right after the text. Works well in simple mode.
      fetchEvents: true,
      rootElement: "my-root", // Corresponds to the element where the widget is going to be injected.
    },
  ];
</script>
<div id="my-root" class="container-fluid"></div><!-- Corresponds to 'rootElement' -->
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/starter.js"></script>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/loader.js"></script>
```

## Single Event Session

This snippet displays the content of a single event and requires the URL to contain a query parameter ("eventSessionId") which points to the current event session.

Here is an event of how the URL can look like with this parameter:

https://www.globalretreatcentre.org/ems-events-session/?eventSessionId=6791175

```html
<script>
    window.eventsConfig = [{
        language: "en-GB", // Language of the text, en-US also available
        showLocalTime: true,
        displayWebcastButton: true,
        showCalendar: false,
        showSingleEvent: true, // Displays just a single event which needs to be specified in the URL
        showSimilarEvents: false, // Whether to show similar events or not
        widgetType: "EXTENDED_SINGLE_EVENT_SESSION", // Possible values: TABLE, CALENDAR, SINGLE_EVENT, SINGLE_EVENT_SESSION, EXTENDED_SINGLE_EVENT_SESSION, FORM, COMPOSITE_CALENDAR, SLIDER, TILES, EVENT_COUNT_DOWN, EVENTS_MONTH_CALENDAR, IMAGE_BANNER, INFINITE_TILES
        rootElement: 'emsRoot',
        singleEventShowImage2: true, // Used to pick up image number two. singleEventShowImage3 and singleEventShowImage4 also available.
        generateSocialMedialUrl: (e) => { return `https://www.globalretreatcentre.org/ems-events-page-single/?eventId=${e.id}` },
        // This function is optional and allows to control the no more seats message which is displayed when a session is overbooked.
        customNoMoreSeatsMessage: (currentEvent) => {
            const eventId = currentEvent.id
            const eventName = currentEvent.name
            const specialEvents = [4229275, 4229272, 4229269, 4229172, 4223791, 4229160, 4229169]
            const waitingListEvent = 4227993
            if (specialEvents.includes(eventId)) {
                return `
                        <div class="row">
                            <div class="col-12 ml-4">
                                We are ever so sorry this show is fully booked. Please try to book another date.
<br />
<br />
Alternatively, if you would like to be placed on a waiting list or to know about any additional shows we may be putting on please <a href="https://www.globalretreatcentre.org/ems-events-page-single/?eventId=${waitingListEvent}">click here</a>.
                            </div>
                        </div>
                        `
            }
            return `
                    <div class="row">
                        <div class="col-12 ml-3">
                            "${eventName}" is overbooked. But you can consider other events on our webpage.
                        </div>
                    </div>
                `
        }
    }]
</script>

<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/starter.js"></script>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/loader.js"></script>
<div id="emsRoot"></div>
```

## Image Banner

The image banner is a simple widget which displays banner style images stacked on top of each other. The images which are picked up are the images of the next upcoming events.

```html
<script type="application/javascript">
    // Function used to create custom link that injects extra information into the page for social network integration
    const eventsCalendarFunction = (event) => {
        return `https://www.globalretreatcentre.org/ems-events-session?eventSessionId=${event.eventDateId}&title=${encodeURIComponent(event.name)}&image=${encodeURIComponent(event.image2 ?? event.image1)}&startDateTime=${event.startIso}&endDateTime=${event.endIso}`
    }
    window.eventsConfig = [{
        orgId: [5, 335], // GRC and outreach
        eventTypeIds: '1,2,3,4,5,6,7,8,9,10',
        language: 'en-GB', // "es" for Spanish also supported now, en-US also supported
        widgetType: "IMAGE_BANNER", // This is the type for the banner
        eventsLimit: 10, // select only 10 events from the database.
        fetchEvents: true,
        rootElement: 'root_banner_desktop',
        imageBanner_selectedPositions: [0, 1, 2, 3, 4], // Determines which out of the 10 events are picked up and displayed
        imageBanner_imagePosition: 3, // Determines that image 3 is being picked up.
        eventsCalendarFunction
    }]

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    window.eventsConfig.hasWebcastFunc = (original) => {
        const now = new Date()
        const { startIso } = original
        const startDate = new Date(startIso);
        const diff = dateDiffInDays(now, startDate);
        console.log('diff', diff);
        const isSameDay = diff < 4
            && now.getMonth() === startDate.getMonth()
        return original.hasWebcast && isSameDay
    }
</script>

<div id="root_banner_desktop" class="container-fluid"></div>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/starter.js"></script>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/loader.js"></script>
```

## Event Tiles

Event tiles provide a view of events as tiles like on https://www.globalretreatcentre.org/ at the bottom of the page.

```html
<script type="application/javascript">
    const eventsCalendarFunction = (event) => {
        return `https://www.globalretreatcentre.org/ems-events-session?eventSessionId=${event.eventDateId}&title=${encodeURIComponent(event.name)}&image=${encodeURIComponent(event.image2 ?? event.image1)}&startDateTime=${event.startIso}&endDateTime=${event.endIso}`
    }
    window.eventsConfig = [ {
        orgId: [5, 335], // GRC, outreach only
        eventTypeIds: "1,2,3,4,5,6,7,8,9,10,11,12,13,15", // See appendix
        language: "en-GB", // "es" for Spanish also supported now, en-US also supported
        widgetType: "COMPOSITE_CALENDAR",
        initialPageSize: 1000, // Determine how many events are initially loaded.
        showLocalTime: true,
        featured: false, // Show only featured examples
        displayWebcastButton: false, // displays the webcast button
        suppressBookOnly: true, // Remove the book only button
        suppressVenue: false, // Hides the venue and add the buttons just right after the text. Works well in simple mode.
        // singleEventUrlTemplate: "https://www.globalretreatcentre.org/ems-events-page-single/?eventId=@@eventDateId@@",
        rootElement: "emsTiles",
        displayOrgFilter: true, // Whether the organisation drop down is displayed or not
        fetchEvents: true, // Prevents initial event fetching
        useAllOrgIds: true,
        showCompositeCalendar: true,
        eventsCalendarFunction, // Used to generate custom links for the event session page
        singleEventUrlTemplate:
            "https://www.globalretreatcentre.org/ems-events-session/?eventSessionId=@@eventDateId@@", // This is overriden by eventsCalendarFunction. 
        randomImages: [
            "https://res.cloudinary.com/gilf/image/upload/v1654363027/i_Stock_1128894742_920c18c741.jpg",
            "https://res.cloudinary.com/gilf/image/upload/v1653062227/daria_nepriakhina_t_H7e_Yi6p23s_unsplash_1_20e3643aa9.jpg",
            "https://res.cloudinary.com/gilf/image/upload/v1650267257/2_Header_Supreme_Soul_d61f1cf34d.jpg",
            "https://res.cloudinary.com/gilf/image/upload/v1652704232/marcos_paulo_prado_6_N_Dg_L_Cd_Rjd_U_unsplash_46692efb30.jpg",
            "https://res.cloudinary.com/gilf/image/upload/v1651234118/Gift_Peace_Header_5bdd7ff68d.jpg",
            "https://res.cloudinary.com/gilf/image/upload/v1651129852/Outside_In_Inside_Out_Header_05a9836680.jpg",
            "https://res.cloudinary.com/gilf/image/upload/v1648836367/dingzeyu_li_ie8_WW_5_K_Ux3o_unsplash_a7c1e0a55d.jpg",
        ], // These images might be chosen by you to be randomly used when no image for the event is available. This is a fallback image.
    }]

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    window.eventsConfig.hasWebcastFunc = (original) => {
        const now = new Date()
        const { startIso } = original
        const startDate = new Date(startIso);
        const diff = dateDiffInDays(now, startDate);
        console.log('diff', diff);
        const isSameDay = diff < 4
            && now.getMonth() === startDate.getMonth()
        return original.hasWebcast && isSameDay
    }
</script>

<div id="emsTiles" class="container-fluid"></div>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/starter.js"></script>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/loader.js"></script>
```

## Appendix

#### <a name="event_types">Event Types</a>

Then you must be also know which event types you want to display, like e.g: _course_, _lecture_, etc. The available
event types on the system are:

|  id |                 name | description                                                                     |
| --: | -------------------: | ------------------------------------------------------------------------------- |
|   4 |           conference | Conference with multiple participants                                           |
|   3 |               course | Course with more than one lesson                                                |
|  13 |        group session | Regular get together                                                            |
|  16 |       internal_event | Internal or BK Events                                                           |
|   1 |              lecture | Lecture with a lecturer.                                                        |
|   9 |           meditation | Meditation programmes                                                           |
|  10 |                 misc | miscellaneous events                                                            |
|  15 |      online activity | Online Activities                                                               |
|   7 |     panel discussion | Public discussion with a limited number of participants                         |
|  12 | power and protection | power and protection                                                            |
|  14 |              private | Private events not to be displayed on public websites                           |
|   5 |              retreat | Meeting of participants for an extended period of time with multiple activities |
|   2 |              seminar | Seminar witch interactive participation                                         |
|   8 |       special events | Special events                                                                  |
|  11 |             training | Training for BKs or other type of training                                      |
|   6 |             workshop | Programme with active member participation                                      |

#### Organisation Ids

You can find all of them by opening using this REST API:

https://events.brahmakumaris.org/registration/organisations