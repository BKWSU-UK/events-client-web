import React from "react";
import {extractParameterSimple} from "./utils/paramExtraction";

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
            "add-google-calendar": "Add to Google calendar",

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
            "BK Event": "BK Event",
            "Your time": "Your time",
            "Open webcast URL": "Watch Live",

            "today": "Today",
            "previous": "Previous",
            "next": "Next",
            "month": "Month",
            "week": "Week",
            "day": "Day",
            "agenda": "Agenda"
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
            "add-google-calendar": "Add to Google calendar",

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
            "BK Event": "BK Event",
            "Your time": "Your time",
            "Open webcast URL": "Open webcast",

            "today": "Today",
            "previous": "Previous",
            "next": "Next",
            "month": "Month",
            "week": "Week",
            "day": "Day",
            "agenda": "Agenda"
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
            "add-google-calendar": "Agregar al calendario de Google",

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
            "BK Event": "Evento BK",
            "Your time": "Hora en su País",
            "Open webcast URL": "Abrir URL de webcast",

            "today": "Hoy",
            "previous": "Anterior",
            "next": "Seguinte",
            "month": "Mes",
            "week": "Semana",
            "day": "Dia",
            "agenda": "Agenda"
        }
    },
    "pt-BR": {
        translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.":
                "Para começar, edite <1>src/App.js</1> e salve para recarregar.",
            "and-book": "e Inscrição",
            "book-only": "Somente Inscrição",
            description: "Descrição",
            "enter-search": "Pesquisar ...",
            "event": "evento",
            "event_plural": "eventos",
            "go-to-page": "Ir para a página",
            "of": "de",
            "page": "Página",
            "read-more": "Leia Mais",
            "search": "Pesquisa",
            "show": "Mostrar",
            "back-to-events": "Voltar para os Eventos",
            "upcoming-dates": "Próximas Datas",
            "add-google-calendar": "Adicionar ao Google Agenda",

            "Lecture": "Palestra",
            "Seminar": "Seminário",
            "Course": "Curso",
            "Conference": "Conferência",
            "Retreat": "Retiro",
            "Workshop": "Workshop",
            "Panel discussion": "Painel",
            "Special event": "Evento Especial",
            "Meditation": "Meditação",
            "Miscellaneous": "Outros",
            "Training": "Treinamento",
            "Power and protection": "Poder e proteção",
            "Private": "Privado",
            "Group session": "Sessão em grupo",
            "Online activity": "Atividade Online",
            "BK Event": "Event BK",
            "Your time": "Seu tempo",
            "Open webcast URL": "Acessar a transmissão",

            "today": "Hoje",
            "previous": "Anterior",
            "next": "Seguinte",
            "month": "Mês",
            "week": "Semana",
            "day": "Dia",
            "agenda": "Agenda"
        }
    }
};

export function useTranslation() {
    return {
        t: function (key, extraObj) {
            if(arguments.length === 1) {
                return langResources[extractParameterSimple('language', 'en-US')]
                    .translations[key] || key;
            }
            else {
                // TODO: handle the extra object
                return langResources[extractParameterSimple('language', 'en-US')]
                    .translations[`${key}_plural`] || key;
            }
        }
    }
}