# BK Event Management Web Plugin

The Brahma Kumaris Event Management Web plugin allows you to retrieve event information for the centres of the
Brahma Kumaris and display these on a web page. It also capable of rendering and submitting registration forms associated
to these events so that end users can book specific events.

It can be used on any CMS's that support integration of HTML, CSS and Javascript and offers a fron-end based integration.
You will have to simply create a HTML page on the CMS you use and paste some HTML and CSS code
so that you can render an event list with this plugin.

## Pre-requisites

#### <a name="org_ids"></a>Organisation Id

In order to list events for a Brahma Kumaris organisation you will need to know its id. This information is available
here:

[Organisation Browser](https://events.brahmakumaris.org/bkregistration/templateChooser/eventBrowser.html)

or

[Organisation List](http://events.brahmakumaris.org/bkregistration_legacy/jsp/orgs.jsp)

Typically the number for an organisation is an integer like e.g:

    2 - London Willesden Green

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

Please note: that the event types _14_ and _16_ are typically not to be used by this plugin.

## Webpage Integration

Once you know your organisation id (it can also by multiple id's) and the event types you want to display
you have most of the needed information to start configuring your plugin.

### Example

Here is an example of the HTML that you need to create a page with a list of the combined events of multiple
centres of the Brahma Kumaris:

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
<div id="my-root" class="container-fluid"></div>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/starter.js"></script>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/loader.js"></script>
```

### Configuration parameters and static parts

The above script has some parts that cannot be changed and some other parts where you can change the parameters.
Let us start with the **static parts**:

```html
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/starter.js"></script>
<script src="https://eventswebclient-test-gil.bkwsu.eu/latest/loader.js"></script>
```

Typically you will not need to configure the above HTML. 

The configuration parameters of this plugin are contained in the initial script of the HTML pasted above:

```html
<script>
  window.eventsConfig = [
    {
      useBodyHiddenOverflow: true,
      useSimpleLayout: true,
      orgId: [2], // This is the organisation ID from EMS
      eventTypeIds: "1,2,3,4,5,6,7,8,9,10,11,12,13,15",
      language: "en-GB", // "es" for Spanish also supported now. "en-US" is also available.
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
```

Please note that the code depicted above is Javascript and so must be syntactically correct.

### eventsConfig Parameters Reference

This section documents all parameters that can be used in the `eventsConfig` object (or each object in the `window.eventsConfig` array when using multiple widgets on one page).

#### Core Parameters

| Parameter     | Type        | Default | Description                                                                                                                                                    |
| :------------ | :---------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rootElement` | string      | —       | **Required.** The DOM element ID where the widget will be injected. Must correspond to an existing element, e.g. `<div id="my-root">`.                          |
| `orgId`       | number[]    | —       | **Required.** Array of organisation IDs from EMS. See [Organisation Id](#org_ids).                                                                              |
| `eventTypeIds`| string      | —       | Comma-separated event type IDs to display. See [Event Types](#event_types).                                                                                     |
| `id`          | number      | auto    | Unique identifier for the config when using multiple widgets. Auto-assigned from array index if omitted.                                                        |

#### Widget Selection

| Parameter                | Type    | Default | Description                                                                                                                                                    |
| :----------------------- | :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `widgetType`             | string  | TABLE   | Widget to display. Values: `TABLE`, `CALENDAR`, `EVENTS_MONTH_CALENDAR`, `SINGLE_EVENT`, `SINGLE_EVENT_SESSION`, `EXTENDED_SINGLE_EVENT_SESSION`, `FORM`, `COMPOSITE_CALENDAR`, `SLIDER`, `TILES`, `EVENT_COUNT_DOWN`, `IMAGE_BANNER`, `INFINITE_TILES`, `GLOBAL_LANGUAGE_FILTER`. |
| `showCalendar`           | boolean | false   | (Legacy) If true, displays calendar view instead of list.                                                                                                      |
| `showSingleEvent`        | boolean | false   | (Legacy) Displays a single event (requires URL parameter).                                                                                                     |
| `showCompositeCalendar`  | boolean | false   | (Legacy) Displays the composite calendar widget.                                                                                                               |
| `showForm`               | boolean | false   | (Legacy) Displays the registration form widget.                                                                                                                |

#### Layout & Display

| Parameter              | Type    | Default | Description                                                                                                                                                    |
| :--------------------- | :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useBodyHiddenOverflow`| boolean | false   | Hides the vertical scrollbar when the event detail or registration form overlay is displayed.                                                                  |
| `useSimpleLayout`      | boolean | —       | If true, event descriptions use simple text. If false, HTML is used.                                                                                           |
| `showLocalTime`        | boolean | —       | If true, dates and times are displayed in the user's local timezone.                                                                                           |
| `suppressVenue`        | boolean | —       | If true, hides the venue. Buttons appear right after the text (works well in simple mode).                                                                     |
| `suppressBookOnly`     | boolean | —       | If true, hides the "book only" button.                                                                                                                         |
| `displayWebcastButton` | boolean | —       | If true, displays the webcast button for events that support it.                                                                                               |
| `hideSearch`           | boolean | —       | If true, hides the search box.                                                                                                                                 |
| `hidePager`            | boolean | —       | If true, hides the pager.                                                                                                                                      |
| `hideTime`             | boolean | false   | If true, hides the time in the date widget.                                                                                                                    |
| `hideSocial`           | boolean | —       | If true, hides social media share icons.                                                                                                                       |
| `showSimilarEvents`    | boolean | —       | If true, shows similar events section.                                                                                                                         |
| `showGoogleCalendarIcon` | boolean | —     | If true, shows the Google Calendar icon.                                                                                                                       |
| `showYear`             | boolean | —       | If true, shows the year in the events month calendar.                                                                                                          |
| `pageSize`             | number  | 10      | Number of events per page in the table view.                                                                                                                   |
| `initialPageSize`      | number  | 14      | Initial page size for event lists.                                                                                                                             |
| `dateFormat`           | string  | —       | Custom date format string.                                                                                                                                     |
| `tileMaxLinkLength`    | number  | —       | Maximum length for links in composite calendar tiles.                                                                                                          |

#### Data Fetching & Filtering

| Parameter              | Type            | Default | Description                                                                                                                                                    |
| :--------------------- | :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fetchEvents`          | boolean         | —       | If true, fetches events on load.                                                                                                                               |
| `eventsLimit`          | number          | 10000   | Maximum number of events to fetch and display.                                                                                                                 |
| `featured`             | boolean         | null    | If true, shows only featured events.                                                                                                                           |
| `eventsLang`           | string          | null    | Filters events by language (ISO 639-1), e.g. `en`, `hi`, `es`.                                                                                                 |
| `onlyWebcast`          | boolean         | false   | If true, shows only webcast events.                                                                                                                            |
| `onlineOnly`           | boolean         | false   | If true, shows only online events.                                                                                                                             |
| `hasRegistration`      | boolean         | false   | Filters events by registration availability.                                                                                                                   |
| `private`              | boolean/string  | false   | Include private events. Use `"all"` to show all private events.                                                                                                |
| `tags`                 | string[]        | —       | Filter events by tags.                                                                                                                                         |
| `noTags`               | string[]        | —       | Exclude events with these tags.                                                                                                                                |
| `tagsOperator`         | string          | —       | Use `"AND"` to require all tags to match.                                                                                                                      |
| `displayOnlineFilter`  | boolean         | —       | If true, shows the online/in-person filter. (Set automatically by composite calendar adapter.)                                                                 |
| `displayOrgFilter`     | boolean         | —       | If true, shows the organisation filter dropdown.                                                                                                               |
| `defaultEventsOrgFilter` | string        | —       | Default organisation ID for the calendar widget when multiple orgs are configured.                                                                             |
| `useAllOrgIds`         | boolean         | false   | If true, fetches and displays events from all organisations in `orgId` when no specific filter is selected.                                                    |

#### Single Event & Links

| Parameter                | Type     | Default | Description                                                                                                                                                    |
| :----------------------- | :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `singleEventUrlTemplate` | string   | —       | URL template for single event pages. Must include `@@eventDateId@@` placeholder.                                                                               |
| `specialIpadLink`        | string   | —       | Special link for iPad.                                                                                                                                         |
| `eventsCalendarFunction` | function | —       | Custom function `(event) => url` to generate event detail links. Pass `null` to disable links.                                                                 |
| `upcomingDateLimit`      | number   | —       | Limit for upcoming dates shown.                                                                                                                                |

#### Language

| Parameter           | Type    | Default | Description                                                                                                                                                    |
| :------------------ | :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `language`          | string  | "All"   | UI language. Supported: `en-GB`, `en-US`, `es`, `pt-BR`, `de`, etc.                                                                                            |
| `staticLanguageCode`| boolean | —       | If true, uses the configured language and ignores localStorage (no user language switching).                                                                   |
| `showLanguageFilter`| boolean | —       | If true, shows the language filter dropdown (for filtering events by language).                                                                                |

#### Images

| Parameter                | Type   | Default | Description                                                                                                                                                    |
| :----------------------- | :----- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `randomImages`           | string[] | —     | Array of image URLs used as fallback when an event has no image.                                                                                               |
| `calendarDayImage`       | string | —       | Custom image for the calendar day icon.                                                                                                                        |
| `calendarTimeImage`      | string | —       | Custom image for the calendar time icon.                                                                                                                       |
| `calendarEventTypeImage` | string | —       | Custom image for the event type icon.                                                                                                                          |
| `facebookShareImage`     | string | —       | Custom image for Facebook share button.                                                                                                                        |
| `twitterShareImage`      | string | —       | Custom image for Twitter share button.                                                                                                                         |
| `mailShareImage`         | string | —       | Custom image for email share button.                                                                                                                           |
| `shivaStarImage`         | string | —       | Custom Shiva star image.                                                                                                                                       |
| `singleEventShowImage1`  | boolean | —     | Show image 1 in single event view.                                                                                                                             |
| `singleEventShowImage2`  | boolean | —     | Show image 2 in single event view.                                                                                                                             |
| `singleEventShowImage3`  | boolean | —     | Show image 3 in single event view.                                                                                                                             |
| `singleEventShowImage4`  | boolean | —     | Show image 4 in single event view.                                                                                                                             |

#### Image Banner Widget

| Parameter                       | Type    | Default | Description                                                                                                                                                    |
| :------------------------------ | :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `imageBanner_selectedPositions` | number[]| —       | Indices of which events (0–4, etc.) to display in the banner.                                                                                                  |
| `imageBanner_imagePosition`     | number  | 1       | Which event image (1–4) to use for the banner on desktop.                                                                                                      |
| `imageBanner_imagePosition_mobile` | number | —    | Which event image to use for the banner on mobile.                                                                                                             |

#### Event Countdown Widget

| Parameter                  | Type   | Default | Description                                                                                                                                                    |
| :------------------------- | :----- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventCountDownTimezone`   | string | —       | Timezone for the countdown (e.g. `Europe/Berlin`).                                                                                                             |
| `eventCountDownCountries`  | string | —       | Comma-separated country names for finding next events.                                                                                                         |
| `eventCountDownStyle`      | string | —       | Use `"ANIMATED"` for animated countdown style.                                                                                                                 |

#### Composite Calendar

| Parameter                      | Type    | Default | Description                                                                                                                                                    |
| :----------------------------- | :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compositeCalendar_showWeek`   | boolean | —       | If true, shows the week view.                                                                                                                                  |
| `compositeCalendar_showDay`    | boolean | —       | If true, shows the day view.                                                                                                                                   |
| `compositeCalendar_showImageCards` | boolean | —  | If true, shows image cards.                                                                                                                                    |

#### Forms

| Parameter                 | Type     | Default | Description                                                                                                                                                    |
| :------------------------ | :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formSuccessMessage`      | string   | —       | Custom success message after form submission.                                                                                                                  |
| `showMissingFields`       | boolean  | —       | If true, shows missing required fields.                                                                                                                        |
| `hideEventDate`           | boolean  | false   | If true, hides the event date in the form.                                                                                                                     |
| `showShortDescription`    | boolean  | —       | If true, shows a short description in the form.                                                                                                                |
| `customNoMoreSeatsMessage`| function | —       | Custom function `(currentEvent) => htmlString` for overbooked/sold-out message.                                                                                |

#### Social & Custom Functions

| Parameter               | Type     | Default | Description                                                                                                                                                    |
| :---------------------- | :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateSocialMedialUrl` | function | —     | Function `(event) => url` to generate the URL used for social sharing.                                                                                         |
| `generateHashtag`       | function | —       | Function to generate hashtag for social sharing. Default: `"brahmakumaris"`.                                                                                    |
| `hasWebcastFunc`        | function | —       | Custom function `(event) => boolean` to determine if an event has webcast. Overrides default `hasWebcast` logic.                                                |
| `searchFilterFunction`  | function | —       | Custom function to filter events in search results.                                                                                                            |
| `eventSliceFunction`    | function | —       | Custom function to slice/limit the event list.                                                                                                                 |

### CSS Styling

The most involved integration work will be definitely related to adapting the CSS styles to your page. The first
question that arises is where can you insert the modified styles? You have two options:

- Either you enter the CSS styles directly on the page using the `style` tag. See example below to get an idea on how this can be done.
- You create a separate CSS file and insert the CSS styles there using the CSS ``link tag`. This option is generally
  the preferred one, but it is up to you to decide.

We used [Bootstrap 4](https://getbootstrap.com/docs/4.5/getting-started/introduction/) in the plugin development
and therefore we follow the conventions of this framework.

#### Inline CSS Example

```html
<style type="text/css">
  #root {
    padding-left: 0;
    padding-right: 0;
  }

  #root h3 {
    font-size: 1.4em;
    font-family: "Lato", Helvetica, sans-serif !important;
  }

  #eventDisplayName {
    font-size: 1.4em !important;
    margin-left: 15px;
    font-family: "Lato", Helvetica, sans-serif !important;
  }

  .col-4.text-success {
    font-size: 0.8em;
    color: #999999 !important;
  }

  .btn.btn-light {
    background-color: #999;
    padding: 0 10px;
    height: 30px;
    margin: -2px 0;
  }

  .table .btn.btn-info,
  .simple-overlay .btn.btn-info {
    margin: 0 0 0px 0px;
    line-height: 7px;
  }

  .simple-overlay .btn.btn-info {
    margin: -25px 0 0px 15px;
  }

  .table .col-md-6.mt-3.mb-1 {
    padding-left: 0px;
  }

  .table td {
    border: 0 !important;
  }

  #pagerNumberField {
    height: 27px;
    font-size: 1em;
    padding: 4px 10px;
  }

  .d-none.d-lg-inline {
    padding: 4px;
    font-size: 0.9em;
  }

  span.d-none.d-lg-inline {
    padding: 4px 0 4px 4px;
  }

  .col-md-6.col-sm-12.text-right {
    font-size: 1em;
  }

  .weekday {
    font-size: 1.5em !important;
  }

  .simpleTimePeriod {
    font-size: 1em !important;
  }

  .fromNow {
    margin-top: -2px !important;
    font-size: 0.9em !important;
  }

  .table.table-hover,
  .row.mt-1.mb-1.ml-1,
  .simple-overlay {
    margin-left: -5px;
  }

  .simple-overlay {
    margin-right: -17px;
  }

  /* Calendar */

  .calendarWidget {
    width: 220px;
    margin: 0 0 0 auto;
    margin: 10px 0 0 20px;
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .calendarWidget {
      width: 150px;
    }
  }

  .calendarWidget > .weekday {
    background: #c5bb9b;
    color: white;
    font-size: 1.5rem;
    padding: 5px 10px;
    text-align: center;
  }

  .calendarWidget > .month,
  .calendarWidget > .day {
    background: #a9e4f8;
    color: black;
    font-size: 3rem;
    padding: 0 10px;
    margin: 0 0 0 0;
    text-align: center;
  }

  .calendarWidget > .day {
    margin: -10px 0 0 0;
    padding-bottom: 10px;
    text-align: center;
    font-size: 2.5rem;
  }

  .calendarWidget > .simpleTimePeriod,
  .calendarWidget .extendedTimePeriod,
  .calendarWidget .fromNow {
    margin-top: 3px;
  }

  .calendarWidget > .simpleTimePeriod,
  .calendarWidget .extendedTimePeriod {
    font-weight: bold;
    font-family: monospace;
    font-size: 1rem;
  }

  .calendarWidget > .simpleTimePeriod,
  .calendarWidget > .fromNow {
    text-align: center;
  }

  .calendarWidget .extendedTimePeriod {
    text-align: center;
  }

  .calendarWidget .fromNow {
    font-size: 0.9rem;
    text-align: center;
    font-family: monospace;
  }
</style>
```

### Main CSS selectors

Here are the main CSS selectors highlighted on one of the current implementations. For more and extensive information
about the selectors please use the developers tools provided by Chrome.

![CSS Selectors](docs/css_selectors.png)

### Available implementations of the plugin

Here are the available implementations of the EMS as of 2020 June 06th:

https://globalcooperationhouse.org/

https://www.agendas.lam.brahmakumaris.org/agenda-regional-latina/

Here are a good number of examples of how you can use the plugins:

https://eventswebclient-test-gil.bkwsu.eu/latest/loader

### Live demos

Here are some links which allow to display events using different filters:

- All events in Global Co-operation House:

https://eventswebclient-test-gil.bkwsu.eu/latest/loader/gch.html

- All events in Global Co-operation House in house and online:

https://eventswebclient-test-gil.bkwsu.eu/latest/loader/gch_2_col_full.html

- All events in Global Co-operation House in English and Hindi:

https://eventswebclient-test-gil.bkwsu.eu/latest/loader/gch_events_english_hindi.html

- Composite calendar for Germany:

https://eventswebclient-test-gil.bkwsu.eu/latest/loader/gch_events_english_hindi.html

- German events as tiles:

https://eventswebclient-test-gil.bkwsu.eu/latest/loader/germany_tiles.html

- GRC / GCH Infinite Tiles:

https://eventswebclient-test-gil.bkwsu.eu/latest/loader/grc_gch_infinite_tiles.html

- Events Slider

https://eventswebclient-test-gil.bkwsu.eu/latest/loader/germany_slider.html

### Contacting for support

Please feel free to contact us in case you find bugs or need help integrating this plugin.

This is the contact of the main developer:

<a href="mailto:gil.fernandes@bkconnect.net">gil.fernandes@bkconnect.net</a>

### Compiling the bundle

To compile the bundle, please run the following command:

```
compile.bat
```

This will produce the bundle in the `dist` folder and the examples in the `examples` folder.

### Compiling the project

If you want to compile the project you can run the compile.bat file on the root folder of the project.

This will produce two files in the dist folder: build.zip and examples.dist which you can use for deployment.