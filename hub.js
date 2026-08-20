/* =========================================================
   ULTIMATE WORLD
   HUB.JS — CENTRAL COMMAND CENTER
   ========================================================= */

"use strict";


/* =========================================================
   HUB STATE
   ========================================================= */

const UltimateHub = {

    initialized: false,

    activeTab: "home",

    visits: 0,

    launches: 0,

    favorites: [],

    recentlyOpened: [],

    achievements: [],

    quickActions: [

        {
            id: "games",
            icon: "🎮",
            title: "GameVerse",
            description: "Jump into the games.",
            action: "games"
        },

        {
            id: "sports",
            icon: "🏆",
            title: "Sports Center",
            description: "Explore the world of sport.",
            action: "sports"
        },

        {
            id: "creator",
            icon: "🛠️",
            title: "Creator Studio",
            description: "Build something of your own.",
            action: "creator"
        },

        {
            id: "learn",
            icon: "🧠",
            title: "Learn",
            description: "Discover something new.",
            action: "learn"
        },

        {
            id: "discover",
            icon: "🌎",
            title: "Discover",
            description: "Explore the world.",
            action: "discover"
        },

        {
            id: "tools",
            icon: "🧰",
            title: "Tools",
            description: "Useful tools in one place.",
            action: "tools"
        }

    ]

};


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeUltimateHub
);


function initializeUltimateHub() {

    if (
        UltimateHub.initialized
    ) {
        return;
    }


    loadHubState();

    registerHubEvents();

    renderHub();

    UltimateHub.visits++;

    saveHubState();

    UltimateHub.initialized =
        true;


    console.log(
        "🌎 ULTIMATE WORLD HUB READY"
    );

}


/* =========================================================
   EVENT REGISTRATION
   ========================================================= */

function registerHubEvents() {

    document
        .querySelectorAll(
            "[data-hub-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    handleHubAction(
                        button.dataset.hubAction
                    );

                }
            );

        });


    document
        .querySelectorAll(
            "[data-hub-tab]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    setHubTab(
                        button.dataset.hubTab
                    );

                }
            );

        });


    document
        .querySelectorAll(
            "[data-hub-search]"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    handleHubSearch(
                        event.target.value
                    );

                }
            );

        });

}


/* =========================================================
   HUB ACTIONS
   ========================================================= */

function handleHubAction(
    action
) {

    if (!action) {
        return;
    }


    UltimateHub.launches++;


    addRecentItem(
        action
    );


    saveHubState();


    /*
       Connect to the systems already created.
    */

    if (
        action === "games"
    ) {

        if (
            window.UltimateWorldGames
        ) {

            UltimateWorldGames.render();

        }


        navigateUltimateSection(
            "games"
        );

        return;

    }


    if (
        action === "sports"
    ) {

        if (
            window.UltimateWorldSports
        ) {

            UltimateWorldSports.render();

        }


        navigateUltimateSection(
            "sports"
        );

        return;

    }


    if (
        action === "creator"
    ) {

        if (
            window.UltimateWorldCreator
        ) {

            UltimateWorldCreator.render();

        }


        navigateUltimateSection(
            "creator"
        );

        return;

    }


    if (
        action === "learn" ||
        action === "discover" ||
        action === "tools"
    ) {

        navigateUltimateSection(
            action
        );

        return;

    }


    navigateUltimateSection(
        action
    );

}


/* =========================================================
   UNIVERSAL NAVIGATION
   ========================================================= */

function navigateUltimateSection(
    section
) {

    if (
        window.UltimateWorldUniverse
    ) {

        UltimateWorldUniverse.navigate(
            section
        );

        return;

    }


    if (
        typeof navigateTo ===
        "function"
    ) {

        navigateTo(
            section
        );

        return;

    }


    console.log(
        "Ultimate World navigation:",
        section
    );

}


/* =========================================================
   TABS
   ========================================================= */

function setHubTab(
    tab
) {

    UltimateHub.activeTab =
        tab || "home";


    document
        .querySelectorAll(
            "[data-hub-tab]"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.hubTab ===
                UltimateHub.activeTab
            );

        });


    renderHub();

}


/* =========================================================
   SEARCH
   ========================================================= */

function handleHubSearch(
    value
) {

    const query =
        String(value)
            .trim()
            .toLowerCase();


    if (
        window.UltimateWorldUniverse
    ) {

        UltimateWorldUniverse.search(
            query
        );

    }


    renderHubSearch(
        query
    );

}


function renderHubSearch(
    query
) {

    const containers =
        document.querySelectorAll(
            "[data-hub-search-results]"
        );


    if (!containers.length) {
        return;
    }


    containers.forEach(
        container => {

            container.innerHTML =
                "";


            if (!query) {
                return;
            }


            const results =
                getHubSearchResults(
                    query
                );


            if (!results.length) {

                container.innerHTML = `

                    <div class="world-search-empty">

                        <span>
                            🔎
                        </span>

                        <h3>
                            Nothing found
                        </h3>

                        <p>
                            Try searching for
                            another Ultimate World section.
                        </p>

                    </div>

                `;

                return;

            }


            results.forEach(
                item => {

                    container.appendChild(
                        createHubResult(
                            item
                        )
                    );

                }
            );

        }
    );

}


/* =========================================================
   SEARCH DATABASE
   ========================================================= */

function getHubSearchResults(
    query
) {

    const source =
        window.WORLD_UNIVERSE ||
        (
            window.UltimateWorldUniverse
                ?.sections
        ) ||
        [];


    return source.filter(
        item => {

            const text = [

                item.title,

                item.description,

                item.type

            ]
                .join(" ")
                .toLowerCase();


            return text.includes(
                query
            );

        }
    );

}


/* =========================================================
   SEARCH RESULT
   ========================================================= */

function createHubResult(
    item
) {

    const result =
        document.createElement(
            "button"
        );


    result.className =
        "hub-search-result";


    result.innerHTML = `

        <span>
            ${item.icon || "✨"}
        </span>

        <div>

            <strong>
                ${escapeHubText(
                    item.title
                )}
            </strong>

            <small>
                ${escapeHubText(
                    item.description
                )}
            </small>

        </div>

        <b>
            →
        </b>

    `;


    result.addEventListener(
        "click",
        () => {

            navigateUltimateSection(
                item.id
            );

        }
    );


    return result;

}


/* =========================================================
   QUICK ACTIONS
   ========================================================= */

function renderQuickActions() {

    const containers =
        document.querySelectorAll(
            "[data-hub-quick-actions]"
        );


    if (!containers.length) {
        return;
    }


    containers.forEach(
        container => {

            container.innerHTML =
                "";


            UltimateHub.quickActions
                .forEach(
                    action => {

                        const card =
                            document.createElement(
                                "button"
                            );


                        card.className =
                            "hub-quick-action";


                        card.innerHTML = `

                            <span class="hub-action-icon">

                                ${action.icon}

                            </span>

                            <strong>

                                ${escapeHubText(
                                    action.title
                                )}

                            </strong>

                            <small>

                                ${escapeHubText(
                                    action.description
                                )}

                            </small>

                            <b>
                                →
                            </b>

                        `;


                        card.addEventListener(
                            "click",
                            () => {

                                handleHubAction(
                                    action.action
                                );

                            }
                        );


                        container.appendChild(
                            card
                        );

                    }
                );

        }
    );

}


/* =========================================================
   FEATURED
   ========================================================= */

function renderFeatured() {

    const containers =
        document.querySelectorAll(
            "[data-hub-featured]"
        );


    if (!containers.length) {
        return;
    }


    const featured = [

        {
            icon: "🎮",
            title: "GameVerse",
            description:
                "Explore the growing Ultimate World game universe.",
            action: "games"
        },

        {
            icon: "🏆",
            title: "Sports Center",
            description:
                "Your central destination for sports.",
            action: "sports"
        },

        {
            icon: "🛠️",
            title: "Creator Studio",
            description:
                "Turn ideas into digital creations.",
            action: "creator"
        }

    ];


    containers.forEach(
        container => {

            container.innerHTML =
                "";


            featured.forEach(
                item => {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "hub-featured-card";


                    card.innerHTML = `

                        <div class="hub-featured-icon">

                            ${item.icon}

                        </div>

                        <div>

                            <span>
                                FEATURED
                            </span>

                            <h3>
                                ${escapeHubText(
                                    item.title
                                )}
                            </h3>

                            <p>
                                ${escapeHubText(
                                    item.description
                                )}
                            </p>

                        </div>

                        <button>
                            EXPLORE →
                        </button>

                    `;


                    card
                        .querySelector(
                            "button"
                        )
                        .addEventListener(
                            "click",
                            () => {

                                handleHubAction(
                                    item.action
                                );

                            }
                        );


                    container.appendChild(
                        card
                    );

                }
            );

        }
    );

}


/* =========================================================
   RECENTLY OPENED
   ========================================================= */

function addRecentItem(
    section
) {

    UltimateHub.recentlyOpened =
        UltimateHub.recentlyOpened
            .filter(
                item =>
                    item !== section
            );


    UltimateHub.recentlyOpened.unshift(
        section
    );


    UltimateHub.recentlyOpened =
        UltimateHub.recentlyOpened
            .slice(
                0,
                8
            );

}


function renderRecentItems() {

    const containers =
        document.querySelectorAll(
            "[data-hub-recent]"
        );


    if (!containers.length) {
        return;
    }


    const sections =
        UltimateHub.recentlyOpened
            .map(
                id =>
                    getWorldSection(
                        id
                    )
            )
            .filter(Boolean);


    containers.forEach(
        container => {

            container.innerHTML =
                "";


            if (!sections.length) {

                container.innerHTML = `

                    <div class="hub-no-recent">

                        <span>
                            ✨
                        </span>

                        <p>
                            Your recently opened
                            sections will appear here.
                        </p>

                    </div>

                `;

                return;

            }


            sections.forEach(
                section => {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.className =
                        "hub-recent-card";


                    button.innerHTML = `

                        <span>
                            ${section.icon}
                        </span>

                        <strong>
                            ${escapeHubText(
                                section.title
                            )}
                        </strong>

                    `;


                    button.addEventListener(
                        "click",
                        () => {

                            handleHubAction(
                                section.id
                            );

                        }
                    );


                    container.appendChild(
                        button
                    );

                }
            );

        }
    );

}


/* =========================================================
   GET WORLD SECTION
   ========================================================= */

function getWorldSection(
    id
) {

    const sections =
        window.UltimateWorldUniverse
            ?.sections || [];


    return sections.find(
        section =>
            section.id === id
    );

}


/* =========================================================
   STATS
   ========================================================= */

function renderHubStats() {

    const projects =
        getCreatorProjectCount();


    const games =
        getGameCount();


    const sports =
        getSportCount();


    updateHubStat(
        "[data-hub-stat-visits]",
        UltimateHub.visits
    );


    updateHubStat(
        "[data-hub-stat-launches]",
        UltimateHub.launches
    );


    updateHubStat(
        "[data-hub-stat-projects]",
        projects
    );


    updateHubStat(
        "[data-hub-stat-games]",
        games
    );


    updateHubStat(
        "[data-hub-stat-sports]",
        sports
    );

}


function updateHubStat(
    selector,
    value
) {

    document
        .querySelectorAll(
            selector
        )
        .forEach(
            element => {

                element.textContent =
                    value;

            }
        );

}


/* =========================================================
   DATA COUNTS
   ========================================================= */

function getCreatorProjectCount() {

    return (
        window.UltimateWorldCreator
            ?.projects?.length || 0
    );

}


function getGameCount() {

    const games =
        window.UltimateWorldGames
            ?.games;


    return Array.isArray(games)
        ? games.length
        : 0;

}


function getSportCount() {

    const sports =
        window.UltimateWorldSports
            ?.sports;


    return Array.isArray(sports)
        ? sports.length
        : 0;

}


/* =========================================================
   HERO
   ========================================================= */

function renderHero() {

    document
        .querySelectorAll(
            "[data-hub-greeting]"
        )
        .forEach(
            element => {

                element.textContent =
                    getTimeGreeting();

            }
        );


    document
        .querySelectorAll(
            "[data-hub-launches]"
        )
        .forEach(
            element => {

                element.textContent =
                    UltimateHub.launches;

            }
        );

}


/* =========================================================
   TIME GREETING
   ========================================================= */

function getTimeGreeting() {

    const hour =
        new Date().getHours();


    if (hour < 12) {
        return "GOOD MORNING";
    }


    if (hour < 18) {
        return "GOOD AFTERNOON";
    }


    return "GOOD EVENING";

}


/* =========================================================
   MAIN RENDER
   ========================================================= */

function renderHub() {

    renderQuickActions();

    renderFeatured();

    renderRecentItems();

    renderHubStats();

    renderHero();

}


/* =========================================================
   PERSISTENCE
   ========================================================= */

function saveHubState() {

    try {

        localStorage.setItem(
            "ultimate-world-hub",
            JSON.stringify({

                visits:
                    UltimateHub.visits,

                launches:
                    UltimateHub.launches,

                favorites:
                    UltimateHub.favorites,

                recentlyOpened:
                    UltimateHub.recentlyOpened,

                achievements:
                    UltimateHub.achievements

            })
        );

    } catch (error) {

        console.warn(
            "Unable to save Ultimate World Hub state.",
            error
        );

    }

}


function loadHubState() {

    try {

        const saved =
            localStorage.getItem(
                "ultimate-world-hub"
            );


        if (!saved) {
            return;
        }


        const state =
            JSON.parse(saved);


        UltimateHub.visits =
            Number(
                state.visits || 0
            );


        UltimateHub.launches =
            Number(
                state.launches || 0
            );


        UltimateHub.favorites =
            Array.isArray(
                state.favorites
            )
                ? state.favorites
                : [];


        UltimateHub.recentlyOpened =
            Array.isArray(
                state.recentlyOpened
            )
                ? state.recentlyOpened
                : [];


        UltimateHub.achievements =
            Array.isArray(
                state.achievements
            )
                ? state.achievements
                : [];

    } catch (error) {

        console.warn(
            "Unable to load Ultimate World Hub state.",
            error
        );

    }

}


/* =========================================================
   SAFE TEXT
   ========================================================= */

function escapeHubText(
    value
) {

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

window.UltimateWorldHub = {

    state:
        UltimateHub,

    render:
        renderHub,

    launch:
        handleHubAction,

    navigate:
        navigateUltimateSection,

    search:
        handleHubSearch

};


/* =========================================================
   READY
   ========================================================= */

console.log(
    "%c🌎 ULTIMATE WORLD — CENTRAL HUB",
    "font-size:24px;font-weight:900;"
);

console.log(
    "The Ultimate World command center is online."
);
