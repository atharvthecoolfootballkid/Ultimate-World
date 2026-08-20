/* =========================================================
   ULTIMATE WORLD
   SPORTS.JS — SPORTS CENTER ENGINE
   ========================================================= */

"use strict";


/* =========================================================
   SPORTS CENTER STATE
   ========================================================= */

const UltimateSports = {

    currentSport: "all",

    currentView: "overview",

    searchQuery: "",

    initialized: false,

    selectedMatch: null,

    filters: {
        status: "all",
        competition: "all"
    }

};


/* =========================================================
   SPORTS CENTER DATA
   ========================================================= */

const SPORTS_CENTER_DATA = {

    football: {
        id: "football",
        name: "Football",
        icon: "⚽",
        color: "green",
        sections: [
            "Matches",
            "Results",
            "Tables",
            "Teams",
            "Players",
            "News",
            "Stats"
        ]
    },

    cricket: {
        id: "cricket",
        name: "Cricket",
        icon: "🏏",
        color: "blue",
        sections: [
            "Matches",
            "Results",
            "Tables",
            "Teams",
            "Players",
            "News",
            "Stats"
        ]
    },

    basketball: {
        id: "basketball",
        name: "Basketball",
        icon: "🏀",
        color: "orange",
        sections: [
            "Matches",
            "Results",
            "Standings",
            "Teams",
            "Players",
            "News",
            "Stats"
        ]
    },

    tennis: {
        id: "tennis",
        name: "Tennis",
        icon: "🎾",
        color: "lime",
        sections: [
            "Matches",
            "Results",
            "Rankings",
            "Players",
            "Tournaments",
            "News",
            "Stats"
        ]
    },

    formula: {
        id: "formula",
        name: "Formula Racing",
        icon: "🏎️",
        color: "red",
        sections: [
            "Races",
            "Results",
            "Standings",
            "Drivers",
            "Teams",
            "Calendar",
            "Stats"
        ]
    },

    hockey: {
        id: "hockey",
        name: "Hockey",
        icon: "🏒",
        color: "ice",
        sections: [
            "Matches",
            "Results",
            "Standings",
            "Teams",
            "Players",
            "News",
            "Stats"
        ]
    },

    baseball: {
        id: "baseball",
        name: "Baseball",
        icon: "⚾",
        color: "white",
        sections: [
            "Matches",
            "Results",
            "Standings",
            "Teams",
            "Players",
            "News",
            "Stats"
        ]
    },

    volleyball: {
        id: "volleyball",
        name: "Volleyball",
        icon: "🏐",
        color: "blue",
        sections: [
            "Matches",
            "Results",
            "Standings",
            "Teams",
            "Players",
            "News",
            "Stats"
        ]
    },

    badminton: {
        id: "badminton",
        name: "Badminton",
        icon: "🏸",
        color: "yellow",
        sections: [
            "Matches",
            "Results",
            "Rankings",
            "Players",
            "Tournaments",
            "Stats"
        ]
    },

    golf: {
        id: "golf",
        name: "Golf",
        icon: "⛳",
        color: "green",
        sections: [
            "Tournaments",
            "Leaderboard",
            "Players",
            "Rankings",
            "Results",
            "Stats"
        ]
    },

    boxing: {
        id: "boxing",
        name: "Boxing",
        icon: "🥊",
        color: "gold",
        sections: [
            "Events",
            "Results",
            "Fighters",
            "Rankings",
            "Records",
            "Stats"
        ]
    },

    athletics: {
        id: "athletics",
        name: "Athletics",
        icon: "🏃",
        color: "purple",
        sections: [
            "Events",
            "Results",
            "Athletes",
            "Records",
            "Calendar",
            "Stats"
        ]
    },

    swimming: {
        id: "swimming",
        name: "Swimming",
        icon: "🏊",
        color: "blue",
        sections: [
            "Events",
            "Results",
            "Athletes",
            "Records",
            "Calendar",
            "Stats"
        ]
    },

    cycling: {
        id: "cycling",
        name: "Cycling",
        icon: "🚴",
        color: "yellow",
        sections: [
            "Races",
            "Results",
            "Rankings",
            "Riders",
            "Teams",
            "Stats"
        ]
    }

};


/* =========================================================
   MATCH DATA FOUNDATION
   ========================================================= */

/*
   These are demonstration records.

   IMPORTANT:
   They are NOT claimed to be live.
   Later we can connect Ultimate World to
   legitimate live sports-data sources.
*/

const SPORTS_MATCHES = [

    {
        id: "demo-football-1",
        sport: "football",
        competition: "Football",
        home: "Team A",
        away: "Team B",
        homeScore: null,
        awayScore: null,
        status: "upcoming",
        time: "TBD",
        live: false
    },

    {
        id: "demo-cricket-1",
        sport: "cricket",
        competition: "Cricket",
        home: "Team A",
        away: "Team B",
        homeScore: null,
        awayScore: null,
        status: "upcoming",
        time: "TBD",
        live: false
    }

];


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeSportsCenter
);


function initializeSportsCenter() {

    if (UltimateSports.initialized) {
        return;
    }

    console.log(
        "🏆 ULTIMATE WORLD SPORTS CENTER INITIALIZING..."
    );

    setupSportNavigation();

    setupSportSearch();

    setupSportFilters();

    setupSportsButtons();

    renderSportsCenter();

    UltimateSports.initialized = true;

    console.log(
        "🏆 SPORTS CENTER READY"
    );

}


/* =========================================================
   SPORT NAVIGATION
   ========================================================= */

function setupSportNavigation() {

    document
        .querySelectorAll(
            "[data-sport]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const sport =
                        button.dataset.sport;

                    selectSport(sport);

                }
            );

        });

}


function selectSport(sport) {

    if (
        sport !== "all" &&
        !SPORTS_CENTER_DATA[sport]
    ) {
        return;
    }

    UltimateSports.currentSport =
        sport;

    document
        .querySelectorAll(
            "[data-sport]"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.sport ===
                sport
            );

        });

    renderSportsCenter();

}


/* =========================================================
   SEARCH
   ========================================================= */

function setupSportSearch() {

    document
        .querySelectorAll(
            "[data-sport-search]"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    UltimateSports.searchQuery =
                        event.target.value
                            .trim()
                            .toLowerCase();

                    renderSportsCenter();

                }
            );

        });

}


/* =========================================================
   FILTERS
   ========================================================= */

function setupSportFilters() {

    document
        .querySelectorAll(
            "[data-sport-status]"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                event => {

                    UltimateSports.filters.status =
                        event.target.value;

                    renderSportsCenter();

                }
            );

        });


    document
        .querySelectorAll(
            "[data-sport-competition]"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                event => {

                    UltimateSports.filters.competition =
                        event.target.value;

                    renderSportsCenter();

                }
            );

        });

}


/* =========================================================
   MAIN RENDER
   ========================================================= */

function renderSportsCenter() {

    renderSportCards();

    renderSportsMatches();

    renderSportInformation();

    renderSportsStats();

}


/* =========================================================
   SPORT CARDS
   ========================================================= */

function renderSportCards() {

    const containers =
        document.querySelectorAll(
            "[data-sports-grid]"
        );

    if (!containers.length) {
        return;
    }

    containers.forEach(container => {

        container.innerHTML = "";

        Object.values(
            SPORTS_CENTER_DATA
        )
        .forEach(sport => {

            container.appendChild(
                createSportCard(sport)
            );

        });

    });

}


function createSportCard(sport) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "sport-card";

    card.dataset.sportID =
        sport.id;

    card.innerHTML = `

        <div class="sport-card-icon">
            ${sport.icon}
        </div>

        <div class="sport-card-content">

            <span class="sport-card-label">
                SPORT
            </span>

            <h3>
                ${escapeSportsText(
                    sport.name
                )}
            </h3>

            <p>
                ${sport.sections.length}
                sections
            </p>

        </div>

        <button
            class="sport-card-button"
            data-select-sport="${sport.id}"
        >
            EXPLORE
        </button>

    `;


    const button =
        card.querySelector(
            "[data-select-sport]"
        );

    if (button) {

        button.addEventListener(
            "click",
            () => {

                selectSport(
                    sport.id
                );

            }
        );

    }


    return card;

}


/* =========================================================
   MATCH FILTERING
   ========================================================= */

function getFilteredMatches() {

    let matches =
        [...SPORTS_MATCHES];


    if (
        UltimateSports.currentSport !==
        "all"
    ) {

        matches =
            matches.filter(
                match =>
                    match.sport ===
                    UltimateSports.currentSport
            );

    }


    if (
        UltimateSports.filters.status !==
        "all"
    ) {

        matches =
            matches.filter(
                match =>
                    match.status ===
                    UltimateSports.filters.status
            );

    }


    if (
        UltimateSports.filters.competition !==
        "all"
    ) {

        matches =
            matches.filter(
                match =>
                    match.competition ===
                    UltimateSports.filters.competition
            );

    }


    if (
        UltimateSports.searchQuery
    ) {

        matches =
            matches.filter(match => {

                const searchable = [

                    match.home,

                    match.away,

                    match.competition,

                    match.sport

                ]
                    .join(" ")
                    .toLowerCase();

                return searchable.includes(
                    UltimateSports.searchQuery
                );

            });

    }


    return matches;

}


/* =========================================================
   MATCHES
   ========================================================= */

function renderSportsMatches() {

    const containers =
        document.querySelectorAll(
            "[data-sports-matches]"
        );

    if (!containers.length) {
        return;
    }

    const matches =
        getFilteredMatches();


    containers.forEach(container => {

        container.innerHTML = "";


        if (!matches.length) {

            container.innerHTML = `

                <div class="sports-empty">

                    <div>
                        🏆
                    </div>

                    <h3>
                        No matches to show
                    </h3>

                    <p>
                        More sports data will appear
                        here as the platform expands.
                    </p>

                </div>

            `;

            return;

        }


        matches.forEach(match => {

            container.appendChild(
                createMatchCard(match)
            );

        });

    });

}


/* =========================================================
   MATCH CARD
   ========================================================= */

function createMatchCard(match) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "sports-match-card";


    const sport =
        SPORTS_CENTER_DATA[
            match.sport
        ];


    card.innerHTML = `

        <div class="match-top">

            <span>
                ${sport ? sport.icon : "🏆"}
                ${escapeSportsText(
                    match.competition
                )}
            </span>

            ${
                match.live
                    ? `
                        <strong class="match-live">
                            ● LIVE
                        </strong>
                    `
                    : `
                        <span class="match-status">
                            ${escapeSportsText(
                                match.status
                            )}
                        </span>
                    `
            }

        </div>


        <div class="match-teams">

            <div class="match-team">

                <span class="team-icon">
                    🛡️
                </span>

                <strong>
                    ${escapeSportsText(
                        match.home
                    )}
                </strong>

                <b>
                    ${
                        match.homeScore ??
                        "-"
                    }
                </b>

            </div>


            <div class="match-divider">
                VS
            </div>


            <div class="match-team">

                <span class="team-icon">
                    🛡️
                </span>

                <strong>
                    ${escapeSportsText(
                        match.away
                    )}
                </strong>

                <b>
                    ${
                        match.awayScore ??
                        "-"
                    }
                </b>

            </div>

        </div>


        <div class="match-bottom">

            <span>
                🕐
                ${escapeSportsText(
                    match.time
                )}
            </span>

            <button
                data-match-details="${match.id}"
            >
                DETAILS →
            </button>

        </div>

    `;


    const detailsButton =
        card.querySelector(
            "[data-match-details]"
        );


    if (detailsButton) {

        detailsButton.addEventListener(
            "click",
            () => {

                openMatchDetails(
                    match.id
                );

            }
        );

    }


    return card;

}


/* =========================================================
   MATCH DETAILS
   ========================================================= */

function openMatchDetails(matchID) {

    const match =
        SPORTS_MATCHES.find(
            item => item.id === matchID
        );

    if (!match) {
        return;
    }

    UltimateSports.selectedMatch =
        matchID;


    const modal =
        document.querySelector(
            "[data-match-modal]"
        );


    if (!modal) {

        showSportsMessage(
            `${match.home} vs ${match.away}`
        );

        return;

    }


    const sport =
        SPORTS_CENTER_DATA[
            match.sport
        ];


    modal.innerHTML = `

        <div class="match-modal-content">

            <button
                class="match-modal-close"
                data-close-match
            >
                ×
            </button>


            <div class="match-modal-icon">
                ${sport ? sport.icon : "🏆"}
            </div>


            <span>
                ${escapeSportsText(
                    match.competition
                )}
            </span>


            <h2>
                ${escapeSportsText(
                    match.home
                )}
                vs
                ${escapeSportsText(
                    match.away
                )}
            </h2>


            <div class="match-modal-score">

                <strong>
                    ${match.homeScore ?? "-"}
                </strong>

                <span>
                    :
                </span>

                <strong>
                    ${match.awayScore ?? "-"}
                </strong>

            </div>


            <p>
                Status:
                ${escapeSportsText(
                    match.status
                )}
            </p>


            <p>
                Time:
                ${escapeSportsText(
                    match.time
                )}
            </p>

        </div>

    `;


    modal.classList.add(
        "active"
    );


    const close =
        modal.querySelector(
            "[data-close-match]"
        );


    if (close) {

        close.addEventListener(
            "click",
            closeMatchDetails
        );

    }

}


function closeMatchDetails() {

    const modal =
        document.querySelector(
            "[data-match-modal]"
        );

    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   SPORT INFORMATION
   ========================================================= */

function renderSportInformation() {

    const containers =
        document.querySelectorAll(
            "[data-sport-information]"
        );

    if (!containers.length) {
        return;
    }


    containers.forEach(container => {

        container.innerHTML = "";


        if (
            UltimateSports.currentSport ===
            "all"
        ) {

            container.innerHTML = `

                <div class="sport-info-placeholder">

                    <span>
                        🏆
                    </span>

                    <h2>
                        SPORTS CENTRAL
                    </h2>

                    <p>
                        Select a sport to explore
                        its dedicated center.
                    </p>

                </div>

            `;

            return;

        }


        const sport =
            SPORTS_CENTER_DATA[
                UltimateSports.currentSport
            ];


        if (!sport) {
            return;
        }


        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.className =
            "sport-information";


        wrapper.innerHTML = `

            <div class="sport-information-header">

                <span>
                    ${sport.icon}
                </span>

                <div>

                    <small>
                        ULTIMATE WORLD SPORTS
                    </small>

                    <h2>
                        ${escapeSportsText(
                            sport.name
                        )}
                    </h2>

                </div>

            </div>


            <div class="sport-information-tabs">

                ${sport.sections
                    .map(
                        section =>
                            `
                            <button
                                data-sport-tab="${escapeSportsText(
                                    section
                                )}"
                            >
                                ${escapeSportsText(
                                    section
                                )}
                            </button>
                            `
                    )
                    .join("")}

            </div>

        `;


        container.appendChild(
            wrapper
        );

    });

}


/* =========================================================
   SPORTS STATISTICS
   ========================================================= */

function renderSportsStats() {

    const totalSports =
        Object.keys(
            SPORTS_CENTER_DATA
        ).length;


    const totalMatches =
        SPORTS_MATCHES.length;


    document
        .querySelectorAll(
            "[data-total-sports]"
        )
        .forEach(element => {

            element.textContent =
                totalSports;

        });


    document
        .querySelectorAll(
            "[data-total-matches]"
        )
        .forEach(element => {

            element.textContent =
                totalMatches;

        });


    document
        .querySelectorAll(
            "[data-live-matches]"
        )
        .forEach(element => {

            element.textContent =
                SPORTS_MATCHES.filter(
                    match => match.live
                ).length;

        });

}


/* =========================================================
   BUTTONS
   ========================================================= */

function setupSportsButtons() {

    document
        .querySelectorAll(
            "[data-sports-reset]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                resetSports
            );

        });

}


/* =========================================================
   RESET
   ========================================================= */

function resetSports() {

    UltimateSports.currentSport =
        "all";

    UltimateSports.currentView =
        "overview";

    UltimateSports.searchQuery =
        "";

    UltimateSports.filters = {

        status: "all",

        competition: "all"

    };


    document
        .querySelectorAll(
            "[data-sport-search]"
        )
        .forEach(input => {

            input.value = "";

        });


    renderSportsCenter();

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showSportsMessage(message) {

    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            message
        );

        return;

    }

    console.log(
        "SPORTS:",
        message
    );

}


/* =========================================================
   SAFE TEXT
   ========================================================= */

function escapeSportsText(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   PUBLIC API
   ========================================================= */

window.UltimateWorldSports = {

    state:
        UltimateSports,

    data:
        SPORTS_CENTER_DATA,

    matches:
        SPORTS_MATCHES,

    select:
        selectSport,

    search:
        query => {

            UltimateSports.searchQuery =
                String(query)
                    .toLowerCase();

            renderSportsCenter();

        },

    render:
        renderSportsCenter,

    details:
        openMatchDetails,

    reset:
        resetSports

};


/* =========================================================
   READY
   ========================================================= */

console.log(
    "%c🏆 ULTIMATE WORLD SPORTS CENTER",
    "font-size:22px;font-weight:bold;"
);

console.log(
    `${Object.keys(SPORTS_CENTER_DATA).length} sports systems registered.`
);
