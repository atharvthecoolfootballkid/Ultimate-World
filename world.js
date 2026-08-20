/* =========================================================
   ULTIMATE WORLD
   WORLD.JS — THE UNIVERSE HUB
   ========================================================= */

"use strict";


/* =========================================================
   WORLD STATE
   ========================================================= */

const UltimateWorld = {

    initialized: false,

    currentSection: "home",

    searchQuery: "",

    history: [],

    notifications: [],

    sections: [],

    featured: [],

    settings: {

        reducedMotion: false,

        sound: true,

        notifications: true

    }

};


/* =========================================================
   ULTIMATE WORLD UNIVERSE
   ========================================================= */

const WORLD_UNIVERSE = [

    {
        id: "games",
        title: "GameVerse",
        icon: "🎮",
        description:
            "A huge collection of carefully built games.",
        type: "entertainment",
        status: "active"
    },

    {
        id: "sports",
        title: "Sports Center",
        icon: "🏆",
        description:
            "Explore sports, competitions, teams and statistics.",
        type: "sports",
        status: "active"
    },

    {
        id: "creator",
        title: "Creator Studio",
        icon: "🛠️",
        description:
            "Create your own apps, games and digital projects.",
        type: "creation",
        status: "active"
    },

    {
        id: "learn",
        title: "Learn",
        icon: "🧠",
        description:
            "Learn subjects through interactive experiences.",
        type: "education",
        status: "planned"
    },

    {
        id: "discover",
        title: "Discover",
        icon: "🌎",
        description:
            "Explore fascinating places, people, science and ideas.",
        type: "discovery",
        status: "planned"
    },

    {
        id: "tools",
        title: "Tools",
        icon: "🧰",
        description:
            "Useful tools and utilities for everyday tasks.",
        type: "utilities",
        status: "planned"
    },

    {
        id: "music",
        title: "Music",
        icon: "🎵",
        description:
            "Explore music experiences and audio tools.",
        type: "entertainment",
        status: "planned"
    },

    {
        id: "movies",
        title: "Movies & Shows",
        icon: "🎬",
        description:
            "Explore the world of movies and television.",
        type: "entertainment",
        status: "planned"
    },

    {
        id: "science",
        title: "Science",
        icon: "🔬",
        description:
            "Explore science, experiments and discoveries.",
        type: "education",
        status: "planned"
    },

    {
        id: "technology",
        title: "Technology",
        icon: "💻",
        description:
            "Technology, coding, AI and digital innovation.",
        type: "technology",
        status: "planned"
    },

    {
        id: "space",
        title: "Space",
        icon: "🚀",
        description:
            "Explore planets, stars, missions and the universe.",
        type: "science",
        status: "planned"
    },

    {
        id: "world",
        title: "World",
        icon: "🌐",
        description:
            "Explore countries, cultures, geography and history.",
        type: "discovery",
        status: "planned"
    },

    {
        id: "art",
        title: "Art",
        icon: "🎨",
        description:
            "Create, discover and learn about art.",
        type: "creative",
        status: "planned"
    },

    {
        id: "books",
        title: "Books",
        icon: "📚",
        description:
            "Discover books, reading tools and literary worlds.",
        type: "education",
        status: "planned"
    },

    {
        id: "fitness",
        title: "Activity",
        icon: "🏃",
        description:
            "Explore movement, sports activities and challenges.",
        type: "lifestyle",
        status: "planned"
    },

    {
        id: "events",
        title: "Events",
        icon: "📅",
        description:
            "A central place for events and experiences.",
        type: "social",
        status: "planned"
    },

    {
        id: "community",
        title: "Community",
        icon: "👥",
        description:
            "A place for people to share projects and ideas safely.",
        type: "social",
        status: "planned"
    },

    {
        id: "achievements",
        title: "Achievements",
        icon: "🏅",
        description:
            "Track milestones across Ultimate World.",
        type: "progress",
        status: "active"
    }

];


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeWorld
);


function initializeWorld() {

    if (
        UltimateWorld.initialized
    ) {
        return;
    }

    console.log(
        "🌎 ULTIMATE WORLD UNIVERSE INITIALIZING..."
    );


    UltimateWorld.sections =
        [...WORLD_UNIVERSE];


    loadWorldState();

    setupWorldNavigation();

    setupWorldSearch();

    setupWorldButtons();

    renderWorld();

    UltimateWorld.initialized =
        true;


    console.log(
        "🌎 ULTIMATE WORLD UNIVERSE READY"
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupWorldNavigation() {

    document
        .querySelectorAll(
            "[data-world-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    navigateWorld(
                        button.dataset.worldSection
                    );

                }
            );

        });

}


function navigateWorld(
    sectionID
) {

    const section =
        WORLD_UNIVERSE.find(
            item =>
                item.id === sectionID
        );


    if (!section) {

        console.warn(
            "Unknown Ultimate World section:",
            sectionID
        );

        return;

    }


    UltimateWorld.currentSection =
        sectionID;


    UltimateWorld.history.push(
        sectionID
    );


    renderWorld();


    /*
       Connect existing engines.
    */

    if (
        sectionID === "games" &&
        window.UltimateWorldGames
    ) {

        UltimateWorldGames.render();

    }


    if (
        sectionID === "sports" &&
        window.UltimateWorldSports
    ) {

        UltimateWorldSports.render();

    }


    if (
        sectionID === "creator" &&
        window.UltimateWorldCreator
    ) {

        UltimateWorldCreator.render();

    }


    /*
       Use the main application router
       when it exists.
    */

    if (
        typeof navigateTo ===
        "function"
    ) {

        navigateTo(
            sectionID
        );

    }

}


/* =========================================================
   SEARCH
   ========================================================= */

function setupWorldSearch() {

    document
        .querySelectorAll(
            "[data-world-search]"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    UltimateWorld.searchQuery =
                        event.target.value
                            .trim()
                            .toLowerCase();

                    renderWorldSearch();

                }
            );

        });

}


function searchWorld(
    query
) {

    UltimateWorld.searchQuery =
        String(query)
            .trim()
            .toLowerCase();


    renderWorldSearch();

}


/* =========================================================
   WORLD SEARCH
   ========================================================= */

function getWorldSearchResults() {

    if (
        !UltimateWorld.searchQuery
    ) {

        return [];

    }


    return WORLD_UNIVERSE.filter(
        section => {

            const searchable = [

                section.title,

                section.description,

                section.type

            ]
                .join(" ")
                .toLowerCase();


            return searchable.includes(
                UltimateWorld.searchQuery
            );

        }
    );

}


function renderWorldSearch() {

    const containers =
        document.querySelectorAll(
            "[data-world-search-results]"
        );


    if (!containers.length) {
        return;
    }


    const results =
        getWorldSearchResults();


    containers.forEach(
        container => {

            container.innerHTML = "";


            if (!results.length) {

                container.innerHTML = `

                    <div class="world-search-empty">

                        <span>
                            🔎
                        </span>

                        <h3>
                            No results
                        </h3>

                        <p>
                            Try another search.
                        </p>

                    </div>

                `;

                return;

            }


            results.forEach(
                section => {

                    container.appendChild(
                        createWorldSectionCard(
                            section
                        )
                    );

                }
            );

        }
    );

}


/* =========================================================
   BUTTONS
   ========================================================= */

function setupWorldButtons() {

    document
        .querySelectorAll(
            "[data-world-home]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    navigateWorld(
                        "home"
                    );

                }
            );

        });


    document
        .querySelectorAll(
            "[data-world-back]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                goWorldBack
            );

        });


    document
        .querySelectorAll(
            "[data-world-reset]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                resetWorld
            );

        });

}


/* =========================================================
   MAIN RENDER
   ========================================================= */

function renderWorld() {

    renderWorldNavigation();

    renderWorldSections();

    renderWorldFeatured();

    renderWorldSearch();

    renderWorldStats();

}


/* =========================================================
   NAVIGATION UI
   ========================================================= */

function renderWorldNavigation() {

    document
        .querySelectorAll(
            "[data-world-section]"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.worldSection ===
                UltimateWorld.currentSection
            );

        });

}


/* =========================================================
   SECTION GRID
   ========================================================= */

function renderWorldSections() {

    const containers =
        document.querySelectorAll(
            "[data-world-sections]"
        );


    if (!containers.length) {
        return;
    }


    containers.forEach(
        container => {

            container.innerHTML = "";


            WORLD_UNIVERSE.forEach(
                section => {

                    container.appendChild(
                        createWorldSectionCard(
                            section
                        )
                    );

                }
            );

        }
    );

}


/* =========================================================
   SECTION CARD
   ========================================================= */

function createWorldSectionCard(
    section
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "world-section-card";


    if (
        section.status ===
        "planned"
    ) {

        card.classList.add(
            "world-section-planned"
        );

    }


    card.innerHTML = `

        <div class="world-section-icon">

            ${section.icon}

        </div>


        <div class="world-section-content">

            <span class="world-section-type">

                ${escapeWorldText(
                    section.type
                )}

            </span>


            <h3>

                ${escapeWorldText(
                    section.title
                )}

            </h3>


            <p>

                ${escapeWorldText(
                    section.description
                )}

            </p>


            <div class="world-section-status">

                ${
                    section.status ===
                    "active"

                        ? "● AVAILABLE"

                        : "◐ EXPANDING"
                }

            </div>

        </div>


        <button
            data-enter-world="${section.id}"
        >

            EXPLORE →

        </button>

    `;


    const button =
        card.querySelector(
            "[data-enter-world]"
        );


    button.addEventListener(
        "click",
        () => {

            enterWorldSection(
                section
            );

        }
    );


    return card;

}


/* =========================================================
   ENTER SECTION
   ========================================================= */

function enterWorldSection(
    section
) {

    if (
        section.status ===
        "active"
    ) {

        navigateWorld(
            section.id
        );

        return;

    }


    showWorldMessage(
        `${section.title} is part of the Ultimate World expansion. 🚀`
    );

}


/* =========================================================
   FEATURED
   ========================================================= */

function renderWorldFeatured() {

    const containers =
        document.querySelectorAll(
            "[data-world-featured]"
        );


    if (!containers.length) {
        return;
    }


    const featured =
        WORLD_UNIVERSE.filter(
            section =>
                section.status ===
                "active"
        );


    containers.forEach(
        container => {

            container.innerHTML = "";


            featured.forEach(
                section => {

                    const card =
                        createWorldSectionCard(
                            section
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
   STATS
   ========================================================= */

function renderWorldStats() {

    const total =
        WORLD_UNIVERSE.length;


    const active =
        WORLD_UNIVERSE.filter(
            section =>
                section.status ===
                "active"
        ).length;


    const expanding =
        total - active;


    document
        .querySelectorAll(
            "[data-world-total]"
        )
        .forEach(
            element => {

                element.textContent =
                    total;

            }
        );


    document
        .querySelectorAll(
            "[data-world-active]"
        )
        .forEach(
            element => {

                element.textContent =
                    active;

            }
        );


    document
        .querySelectorAll(
            "[data-world-expanding]"
        )
        .forEach(
            element => {

                element.textContent =
                    expanding;

            }
        );

}


/* =========================================================
   BACK NAVIGATION
   ========================================================= */

function goWorldBack() {

    if (
        UltimateWorld.history.length <
        2
    ) {

        navigateWorld(
            "home"
        );

        return;

    }


    UltimateWorld.history.pop();


    const previous =
        UltimateWorld.history[
            UltimateWorld.history.length - 1
        ];


    UltimateWorld.currentSection =
        previous || "home";


    renderWorld();

}


/* =========================================================
   RESET
   ========================================================= */

function resetWorld() {

    UltimateWorld.currentSection =
        "home";

    UltimateWorld.searchQuery =
        "";

    UltimateWorld.history =
        [];

    document
        .querySelectorAll(
            "[data-world-search]"
        )
        .forEach(
            input => {

                input.value = "";

            }
        );


    renderWorld();

}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function addWorldNotification(
    notification
) {

    if (!notification) {
        return;
    }


    UltimateWorld.notifications
        .unshift({

            id:
                "notification-" +
                Date.now(),

            title:
                notification.title ||
                "Ultimate World",

            message:
                notification.message ||
                "",

            time:
                new Date().toISOString(),

            read: false

        });


    saveWorldState();

}


/* =========================================================
   MARK NOTIFICATIONS READ
   ========================================================= */

function markWorldNotificationsRead() {

    UltimateWorld.notifications
        .forEach(
            notification => {

                notification.read =
                    true;

            }
        );


    saveWorldState();

}


/* =========================================================
   STATE STORAGE
   ========================================================= */

function saveWorldState() {

    try {

        const state = {

            settings:
                UltimateWorld.settings,

            notifications:
                UltimateWorld.notifications

        };


        localStorage.setItem(
            "ultimate-world-state",
            JSON.stringify(state)
        );

    } catch (error) {

        console.warn(
            "Unable to save Ultimate World state.",
            error
        );

    }

}


function loadWorldState() {

    try {

        const saved =
            localStorage.getItem(
                "ultimate-world-state"
            );


        if (!saved) {
            return;
        }


        const state =
            JSON.parse(saved);


        if (
            state.settings
        ) {

            UltimateWorld.settings =
                {
                    ...UltimateWorld.settings,
                    ...state.settings
                };

        }


        if (
            Array.isArray(
                state.notifications
            )
        ) {

            UltimateWorld.notifications =
                state.notifications;

        }

    } catch (error) {

        console.warn(
            "Unable to load Ultimate World state.",
            error
        );

    }

}


/* =========================================================
   MESSAGE SYSTEM
   ========================================================= */

function showWorldMessage(
    message
) {

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
        "ULTIMATE WORLD:",
        message
    );

}


/* =========================================================
   SAFE TEXT
   ========================================================= */

function escapeWorldText(
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

window.UltimateWorldUniverse = {

    state:
        UltimateWorld,

    sections:
        WORLD_UNIVERSE,

    navigate:
        navigateWorld,

    search:
        searchWorld,

    render:
        renderWorld,

    reset:
        resetWorld,

    notify:
        addWorldNotification,

    markNotificationsRead:
        markWorldNotificationsRead

};


/* =========================================================
   READY
   ========================================================= */

console.log(
    "%c🌎 ULTIMATE WORLD UNIVERSE",
    "font-size:24px;font-weight:bold;"
);

console.log(
    `${WORLD_UNIVERSE.length} world sections registered.`
);
