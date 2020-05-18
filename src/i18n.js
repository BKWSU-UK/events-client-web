import React from "react";

export const langResources = {
    "en-GB": {
        translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.":
                "To get started, edit <1>src/App.js</1> and save to reload.",
            "and-book": "and book",
            "book-only": "Book only",
            description: "Description",
            "enter-search": "Enter search ...",
            "event": "event",
            "event_plural": "events",
            "go-to-page": "Go to page",
            "of": "of",
            "page": "Page",
            "read-more": "Read more",
            "search": "Search",
            "show": "Show",
            "back-to-events": "Back to events",
            "upcoming-dates": "Upcoming Dates",

            "Lecture": "Lecture",
            "Seminar": "Seminar",
            "Course": "Course",
            "Conference": "Conference",
            "Retreat": "Retreat",
            "Workshop": "Workshop",
            "Panel discussion": "Panel discussion",
            "Special event": "Special event",
            "Meditation": "Meditation",
            "Miscellaneous": "Miscellaneous",
            "Training": "Training",
            "Power and protection": "Power and protection",
            "Private": "Private",
            "Group session": "Group session",
            "Online activity": "Online activity",
            "BK Event": "BK Event"
        }
    },
    "en-US": {
        translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.":
                "To get started, edit <1>src/App.js</1> and save to reload.",
            "and-book": "and Register",
            "book-only": "Register Only",
            description: "Description",
            "enter-search": "Enter search ...",
            "event": "event",
            "event_plural": "events",
            "go-to-page": "Go to page",
            "of": "of",
            "page": "Page",
            "read-more": "Read More",
            "search": "Search",
            "show": "Show",
            "back-to-events": "Back to events",
            "upcoming-dates": "Upcoming Dates",

            "Lecture": "Lecture",
            "Seminar": "Seminar",
            "Course": "Course",
            "Conference": "Conference",
            "Retreat": "Retreat",
            "Workshop": "Workshop",
            "Panel discussion": "Panel discussion",
            "Special event": "Special event",
            "Meditation": "Meditation",
            "Miscellaneous": "Miscellaneous",
            "Training": "Training",
            "Power and protection": "Power and protection",
            "Private": "Private",
            "Group session": "Group session",
            "Online activity": "Online activity",
            "BK Event": "BK Event"
        }
    },
    es: {
        translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.":
                "Starte in dem du, <1>src/App.js</1> editierst und speicherst.",
            "and-book": "y reservar",
            "book-only": "Solo reserva",
            description: "Descripción",
            "enter-search": "Ingrese la búsqueda",
            "event": "evento",
            "event_plural": "eventos",
            "go-to-page": "Ir a la página",
            "of": "de",
            "page": "Página",
            "read-more": "Leer más",
            "search": "Buscar",
            "show": "Mostrar",
            "back-to-events": "Volver a los eventos",
            "upcoming-dates": "Fechas siguientes",

            "Lecture": "Conferencia",
            "Seminar": "Seminario",
            "Course": "Curso",
            "Conference": "Conferencia",
            "Retreat": "Retirada",
            "Workshop": "Workshop",
            "Panel discussion": "Panel de discusión",
            "Special event": "Evento especial",
            "Meditation": "Meditación",
            "Miscellaneous": "Diversos",
            "Training": "Formación",
            "Power and protection": "Power and protection",
            "Private": "Privado",
            "Group session": "Sesión grupal",
            "Online activity": "Actividad en línea",
            "BK Event": "Evento BK"
        }
    }
};

export function useTranslation() {
    return {
        t: function (key, extraObj) {
            if(arguments.length === 1) {
                return langResources[window.eventsConfig.language].translations[key] || key;
            }
            else {
                // TODO: handle the extra object
                return langResources[window.eventsConfig.language].translations[`${key}_plural`] || key;
            }
        }
    }
}