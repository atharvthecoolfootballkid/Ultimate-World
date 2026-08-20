/* =========================================================
   SUPERWORLD
   APP.JS — MAIN APPLICATION ENGINE
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL APP STATE
   ========================================================= */

const SUPERWORLD = {

    version: "1.0.0",

    user: {
        name: "Player",
        level: 1,
        xp: 0,
        coins: 100,
        streak: 0
    },

    navigation: {
        current: "home",
        history: []
    },

    settings: {
        sound: true,
        music: true,
        notifications: true,
        theme: "default"
    },

    favorites: [],

    achievements: [],

    recentlyPlayed: [],

    games: [],

    sports: [],

    apps: [],

    notifications: [],

    initialized: false
};


/* =========================================================
   GAME DATABASE
   =========================================================
   These are the foundations for the 100+ game library.
   New games can be added without rewriting the whole app.
   ========================================================= */

const GAME_LIBRARY = [

    {
        id: "penalty-legends",
        name: "Penalty Legends",
        category: "Sports",
        icon: "⚽",
        description: "Take penalties against increasingly difficult goalkeepers.",
        difficulty: "Medium",
        players: "1 Player",
        status: "available"
    },

    {
        id: "street-basket",
        name: "Street Basket",
        category: "Sports",
        icon: "🏀",
        description: "Fast arcade basketball challenges.",
        difficulty: "Medium",
        players: "1 Player",
        status: "coming-soon"
    },

    {
        id: "cricket-master",
        name: "Cricket Master",
        category: "Sports",
        icon: "🏏",
        description: "Build your innings and chase huge scores.",
        difficulty: "Medium",
        players: "1 Player",
        status: "coming-soon"
    },

    {
        id: "speed-rush",
        name: "Speed Rush",
        category: "Racing",
        icon: "🏎️",
        description: "Race through increasingly difficult tracks.",
        difficulty: "Hard",
        players: "1 Player",
        status: "coming-soon"
    },

    {
        id: "space-defender",
        name: "Space Defender",
        category: "Arcade",
        icon: "🚀",
        description: "Defend your station from waves of enemies.",
        difficulty: "Hard",
        players: "1 Player",
        status: "coming-soon"
    },

    {
        id: "brain-grid",
        name: "Brain Grid",
        category: "Puzzle",
        icon: "🧠",
        description: "Solve increasingly challenging logic puzzles.",
        difficulty: "Hard",
        players: "1 Player",
        status: "coming-soon"
    },

    {
        id: "tower-builder",
        name: "Tower Builder",
        category: "Strategy",
        icon: "🏗️",
        description: "Build the tallest and strongest city.",
        difficulty: "Medium",
        players: "1 Player",
        status: "coming-soon"
    },

    {
        id: "word-blitz",
        name: "Word Blitz",
        category: "Puzzle",
        icon: "🔤",
        description: "Find words before the clock runs out.",
        difficulty: "Easy",
        players: "1 Player",
        status: "coming-soon"
    },

    {
        id: "goal-machine",
        name: "Goal Machine",
        category: "Sports",
        icon: "🥅",
        description: "Become the ultimate goalscorer.",
        difficulty: "Medium",
        players: "1 Player",
        status: "coming-soon"
    },

    {
        id: "memory-arena",
        name: "Memory Arena",
        category: "Brain",
        icon: "🧩",
        description: "Test and improve your memory.",
        difficulty: "Medium",
        players: "1 Player",
        status: "coming-soon"
    }

];


/* =========================================================
   SPORTS DATABASE
   ========================================================= */

const SPORTS_LIBRARY = [

    {
        id: "football",
        name: "Football",
        icon: "⚽",
        color: "green"
    },

    {
        id: "basketball",
        name: "Basketball",
        icon: "🏀",
        color: "orange"
    },

    {
        id: "cricket",
        name: "Cricket",
        icon: "🏏",
        color: "blue"
    },

    {
        id: "tennis",
        name: "Tennis",
        icon: "🎾",
        color: "lime"
    },

    {
        id: "formula1",
        name: "Formula Racing",
        icon: "🏎️",
        color: "red"
    },

    {
        id: "boxing",
        name: "Boxing",
        icon: "🥊",
        color: "gold"
    },

    {
        id: "golf",
        name: "Golf",
        icon: "⛳",
        color: "green"
    },

    {
        id: "baseball",
        name: "Baseball",
        icon: "⚾",
        color: "white"
    },

    {
        id: "volleyball",
        name: "Volleyball",
        icon: "🏐",
        color: "blue"
    },

    {
        id: "hockey",
        name: "Hockey",
        icon: "🏒",
        color: "ice"
    },

    {
        id: "badminton",
        name: "Badminton",
        icon: "🏸",
        color: "yellow"
    },

    {
        id: "athletics",
        name: "Athletics",
        icon: "🏃",
        color: "purple"
    }

];


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeSuperworld();

});


function initializeSuperworld() {

    if (SUPERWORLD.initialized) return;

    console.log(
        "🌎 SUPERWORLD initializing..."
    );

    SUPERWORLD.games =
        [...GAME_LIBRARY];

    SUPERWORLD.sports =
        [...SPORTS_LIBRARY];

    loadSavedData();

    setupNavigation();

    setupSearch();

    setupGlobalButtons();

    setupGameSystem();

    setupProfileSystem();

    setupCreatorSystem();

    setupAchievementSystem();

    setupThemeSystem();

    updateInterface();

    SUPERWORLD.initialized = true;

    console.log(
        "🔥 SUPERWORLD READY"
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

    const navigationButtons =
        document.querySelectorAll(
            "[data-page]"
        );

    navigationButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const page =
                    button.dataset.page;

                navigateTo(page);

            }
        );

    });

}


function navigateTo(page) {

    if (!page) return;

    if (
        SUPERWORLD.navigation.current !== page
    ) {

        SUPERWORLD.navigation.history.push(
            SUPERWORLD.navigation.current
        );

    }

    SUPERWORLD.navigation.current =
        page;

    document
        .querySelectorAll("[data-page-section]")
        .forEach(section => {

            section.classList.remove(
                "active"
            );

        });

    const target =
        document.querySelector(
            `[data-page-section="${page}"]`
        );

    if (target) {

        target.classList.add(
            "active"
        );

    }

    document
        .querySelectorAll("[data-page]")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateInterface();

}


function goBack() {

    const previous =
        SUPERWORLD.navigation.history.pop();

    if (previous) {

        navigateTo(previous);

    }

}


/* =========================================================
   SEARCH SYSTEM
   ========================================================= */

function setupSearch() {

    const searchInputs =
        document.querySelectorAll(
            "[data-super-search]"
        );

    searchInputs.forEach(input => {

        input.addEventListener(
            "input",
            event => {

                performSearch(
                    event.target.value
                );

            }
        );

    });

}


function performSearch(query) {

    query =
        query
            .trim()
            .toLowerCase();

    if (!query) {

        showAllContent();

        return;

    }

    const results = [

        ...SUPERWORLD.games.map(item => ({
            ...item,
            type: "game"
        })),

        ...SUPERWORLD.sports.map(item => ({
            ...item,
            type: "sport"
        }))

    ].filter(item => {

        return (

            item.name
                .toLowerCase()
                .includes(query)

            ||

            (
                item.description &&
                item.description
                    .toLowerCase()
                    .includes(query)
            )

            ||

            (
                item.category &&
                item.category
                    .toLowerCase()
                    .includes(query)
            )

        );

    });

    renderSearchResults(results);

}


function renderSearchResults(results) {

    const container =
        document.querySelector(
            "[data-search-results]"
        );

    if (!container) return;

    container.innerHTML = "";

    if (!results.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔎</div>
                <h3>Nothing found</h3>
                <p>Try searching for another game, sport or feature.</p>
            </div>
        `;

        return;

    }

    results.forEach(item => {

        const card =
            document.createElement("button");

        card.className =
            "search-result-card";

        card.innerHTML = `
            <span class="search-result-icon">
                ${item.icon || "✨"}
            </span>

            <span class="search-result-info">
                <strong>${escapeHTML(item.name)}</strong>
                <small>
                    ${escapeHTML(
                        item.category ||
                        item.type ||
                        "SUPERWORLD"
                    )}
                </small>
            </span>
        `;

        card.addEventListener(
            "click",
            () => {

                if (item.type === "game") {

                    launchGame(item.id);

                } else {

                    navigateTo(item.id);

                }

            }
        );

        container.appendChild(card);

    });

}


function showAllContent() {

    const container =
        document.querySelector(
            "[data-search-results]"
        );

    if (container) {

        container.innerHTML = "";

    }

}


/* =========================================================
   GAME SYSTEM
   ========================================================= */

function setupGameSystem() {

    document
        .querySelectorAll("[data-game]")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    launchGame(
                        card.dataset.game
                    );

                }
            );

        });

}


function launchGame(gameID) {

    const game =
        SUPERWORLD.games.find(
            item => item.id === gameID
        );

    if (!game) {

        console.warn(
            "Game not found:",
            gameID
        );

        return;

    }

    if (
        game.status !== "available"
    ) {

        showToast(
            `${game.name} is being built 🔥`
        );

        return;

    }

    addRecentlyPlayed(gameID);

    addXP(10);

    if (gameID === "penalty-legends") {

        openGameScreen(
            game
        );

    }

}


function openGameScreen(game) {

    const gameScreen =
        document.querySelector(
            "[data-game-screen]"
        );

    if (!gameScreen) {

        showToast(
            `Launching ${game.name}...`
        );

        return;

    }

    gameScreen.classList.add(
        "active"
    );

    gameScreen.innerHTML = `

        <div class="game-screen-inner">

            <button
                class="game-back"
                data-close-game
            >
                ← Back
            </button>

            <div class="game-header">

                <div>
                    <span class="eyebrow">
                        SUPERWORLD GAME
                    </span>

                    <h1>
                        ${escapeHTML(game.name)}
                    </h1>

                    <p>
                        ${escapeHTML(game.description)}
                    </p>
                </div>

                <div class="game-badge">
                    ${game.icon}
                </div>

            </div>

            <div
                class="game-container"
                id="activeGameContainer"
            >

                <div class="game-loading">

                    <div class="loading-orb">
                        ${game.icon}
                    </div>

                    <h2>
                        Preparing game...
                    </h2>

                </div>

            </div>

        </div>
    `;

    const closeButton =
        gameScreen.querySelector(
            "[data-close-game]"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeGame
        );

    }

    /*
       The actual game module will be
       loaded here later.

       This keeps the main app engine
       separate from individual games.
    */

    setTimeout(() => {

        const container =
            document.getElementById(
                "activeGameContainer"
            );

        if (!container) return;

        container.innerHTML = `

            <div class="game-placeholder">

                <div class="big-game-icon">
                    ${game.icon}
                </div>

                <h2>
                    ${escapeHTML(game.name)}
                </h2>

                <p>
                    Game engine ready.
                </p>

                <button
                    class="primary-button"
                    id="startActualGame"
                >
                    START GAME
                </button>

            </div>

        `;

    }, 450);

}


function closeGame() {

    const gameScreen =
        document.querySelector(
            "[data-game-screen]"
        );

    if (gameScreen) {

        gameScreen.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   RECENTLY PLAYED
   ========================================================= */

function addRecentlyPlayed(gameID) {

    SUPERWORLD.recentlyPlayed =
        SUPERWORLD.recentlyPlayed
            .filter(id => id !== gameID);

    SUPERWORLD.recentlyPlayed.unshift(
        gameID
    );

    SUPERWORLD.recentlyPlayed =
        SUPERWORLD.recentlyPlayed.slice(
            0,
            8
        );

    saveData();

}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(id) {

    const index =
        SUPERWORLD.favorites.indexOf(id);

    if (index === -1) {

        SUPERWORLD.favorites.push(id);

        showToast(
            "Added to favorites ⭐"
        );

    } else {

        SUPERWORLD.favorites.splice(
            index,
            1
        );

        showToast(
            "Removed from favorites"
        );

    }

    saveData();

}


/* =========================================================
   PROFILE / XP SYSTEM
   ========================================================= */

function setupProfileSystem() {

    updateProfileUI();

}


function addXP(amount) {

    if (!Number.isFinite(amount)) return;

    SUPERWORLD.user.xp += amount;

    const xpNeeded =
        SUPERWORLD.user.level * 100;

    if (
        SUPERWORLD.user.xp >= xpNeeded
    ) {

        SUPERWORLD.user.xp -= xpNeeded;

        SUPERWORLD.user.level++;

        SUPERWORLD.user.coins += 50;

        showToast(
            `LEVEL UP! 🚀 Level ${SUPERWORLD.user.level}`
        );

        unlockAchievement(
            "level-up"
        );

    }

    updateProfileUI();

    saveData();

}


function updateProfileUI() {

    document
        .querySelectorAll("[data-user-level]")
        .forEach(element => {

            element.textContent =
                SUPERWORLD.user.level;

        });

    document
        .querySelectorAll("[data-user-xp]")
        .forEach(element => {

            element.textContent =
                SUPERWORLD.user.xp;

        });

    document
        .querySelectorAll("[data-user-coins]")
        .forEach(element => {

            element.textContent =
                SUPERWORLD.user.coins;

        });

    document
        .querySelectorAll("[data-user-name]")
        .forEach(element => {

            element.textContent =
                SUPERWORLD.user.name;

        });

}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

const ACHIEVEMENTS = {

    "level-up": {
        name: "Level Up!",
        icon: "🚀",
        description:
            "Reach a new level."
    },

    "first-game": {
        name: "First Launch",
        icon: "🎮",
        description:
            "Play your first game."
    },

    "explorer": {
        name: "Explorer",
        icon: "🌎",
        description:
            "Explore SUPERWORLD."
    },

    "creator": {
        name: "Creator",
        icon: "🛠️",
        description:
            "Create your first app."
    }

};


function setupAchievementSystem() {

    Object.keys(ACHIEVEMENTS)
        .forEach(id => {

            if (
                !SUPERWORLD.achievements
                    .includes(id)
            ) {

                // Locked by default.
            }

        });

}


function unlockAchievement(id) {

    if (
        SUPERWORLD.achievements
            .includes(id)
    ) return;

    if (!ACHIEVEMENTS[id]) return;

    SUPERWORLD.achievements.push(id);

    const achievement =
        ACHIEVEMENTS[id];

    showToast(
        `${achievement.icon} Achievement unlocked: ${achievement.name}`
    );

    saveData();

}


/* =========================================================
   APP CREATOR
   ========================================================= */

function setupCreatorSystem() {

    document
        .querySelectorAll(
            "[data-create-app]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                openCreator
            );

        });

}


function openCreator() {

    navigateTo("creator");

    unlockAchievement(
        "explorer"
    );

}


function createNewApp(config = {}) {

    const app = {

        id:
            "app-" +
            Date.now(),

        name:
            config.name ||
            "My New App",

        icon:
            config.icon ||
            "✨",

        description:
            config.description ||
            "Created with SUPERWORLD.",

        created:
            new Date().toISOString(),

        screens: [],

        published: false

    };

    SUPERWORLD.apps.push(
        app
    );

    unlockAchievement(
        "creator"
    );

    saveData();

    showToast(
        "Your app has been created! 🛠️"
    );

    return app;

}


/* =========================================================
   GLOBAL BUTTONS
   ========================================================= */

function setupGlobalButtons() {

    document
        .querySelectorAll(
            "[data-action='back']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                goBack
            );

        });

    document
        .querySelectorAll(
            "[data-action='notify']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showNotifications();

                }
            );

        });

}


/* =========================================================
   THEME SYSTEM
   ========================================================= */

function setupThemeSystem() {

    applyTheme(
        SUPERWORLD.settings.theme
    );

}


function applyTheme(theme) {

    document.documentElement
        .dataset.theme =
        theme;

}


function setTheme(theme) {

    SUPERWORLD.settings.theme =
        theme;

    applyTheme(theme);

    saveData();

}


/* =========================================================
   TOAST NOTIFICATIONS
   ========================================================= */

function showToast(message) {

    let container =
        document.querySelector(
            ".toast-container"
        );

    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.className =
            "toast-container";

        document.body.appendChild(
            container
        );

    }

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        "super-toast";

    toast.textContent =
        message;

    container.appendChild(
        toast
    );

    requestAnimationFrame(() => {

        toast.classList.add(
            "show"
        );

    });

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function addNotification(
    title,
    message
) {

    SUPERWORLD.notifications.unshift({

        id: Date.now(),

        title,

        message,

        time:
            new Date().toISOString(),

        read: false

    });

    saveData();

}


function showNotifications() {

    const unread =
        SUPERWORLD.notifications
            .filter(
                item => !item.read
            );

    if (!unread.length) {

        showToast(
            "You're all caught up! ✨"
        );

        return;

    }

    unread.forEach(
        item => item.read = true
    );

    saveData();

    showToast(
        `${unread.length} notification${unread.length > 1 ? "s" : ""}`
    );

}


/* =========================================================
   INTERFACE UPDATES
   ========================================================= */

function updateInterface() {

    updateProfileUI();

    updateRecentlyPlayed();

    updateFavorites();

}


function updateRecentlyPlayed() {

    const container =
        document.querySelector(
            "[data-recently-played]"
        );

    if (!container) return;

    container.innerHTML = "";

    SUPERWORLD.recentlyPlayed
        .forEach(id => {

            const game =
                SUPERWORLD.games.find(
                    item => item.id === id
                );

            if (!game) return;

            const card =
                document.createElement(
                    "button"
                );

            card.className =
                "recent-game";

            card.innerHTML = `

                <span>
                    ${game.icon}
                </span>

                <strong>
                    ${escapeHTML(game.name)}
                </strong>

            `;

            card.addEventListener(
                "click",
                () => launchGame(id)
            );

            container.appendChild(
                card
            );

        });

}


function updateFavorites() {

    const container =
        document.querySelector(
            "[data-favorites]"
        );

    if (!container) return;

    container.innerHTML = "";

    SUPERWORLD.favorites
        .forEach(id => {

            const game =
                SUPERWORLD.games.find(
                    item => item.id === id
                );

            if (!game) return;

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "favorite-card";

            card.innerHTML = `
                ${game.icon}
                ${escapeHTML(game.name)}
            `;

            container.appendChild(
                card
            );

        });

}


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function saveData() {

    try {

        localStorage.setItem(
            "superworld-data",
            JSON.stringify({

                user:
                    SUPERWORLD.user,

                settings:
                    SUPERWORLD.settings,

                favorites:
                    SUPERWORLD.favorites,

                achievements:
                    SUPERWORLD.achievements,

                recentlyPlayed:
                    SUPERWORLD.recentlyPlayed,

                apps:
                    SUPERWORLD.apps,

                notifications:
                    SUPERWORLD.notifications

            })
        );

    } catch (error) {

        console.warn(
            "Could not save SUPERWORLD data.",
            error
        );

    }

}


function loadSavedData() {

    try {

        const saved =
            localStorage.getItem(
                "superworld-data"
            );

        if (!saved) return;

        const data =
            JSON.parse(saved);

        if (data.user)
            SUPERWORLD.user =
                {
                    ...SUPERWORLD.user,
                    ...data.user
                };

        if (data.settings)
            SUPERWORLD.settings =
                {
                    ...SUPERWORLD.settings,
                    ...data.settings
                };

        if (Array.isArray(data.favorites))
            SUPERWORLD.favorites =
                data.favorites;

        if (Array.isArray(data.achievements))
            SUPERWORLD.achievements =
                data.achievements;

        if (Array.isArray(data.recentlyPlayed))
            SUPERWORLD.recentlyPlayed =
                data.recentlyPlayed;

        if (Array.isArray(data.apps))
            SUPERWORLD.apps =
                data.apps;

        if (Array.isArray(data.notifications))
            SUPERWORLD.notifications =
                data.notifications;

    } catch (error) {

        console.warn(
            "SUPERWORLD save data could not be loaded.",
            error
        );

    }

}


/* =========================================================
   SECURITY / TEXT SAFETY
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   PUBLIC API
   ========================================================= */

window.Superworld = {

    navigate:
        navigateTo,

    back:
        goBack,

    search:
        performSearch,

    launchGame:
        launchGame,

    createApp:
        createNewApp,

    addXP:
        addXP,

    unlockAchievement:
        unlockAchievement,

    favorite:
        toggleFavorite,

    setTheme:
        setTheme,

    notify:
        addNotification,

    getState:
        () => SUPERWORLD

};


/* =========================================================
   START
   ========================================================= */

console.log(
    "%c🌎 SUPERWORLD",
    "font-size:24px;font-weight:bold;"
);

console.log(
    "The world's biggest app starts here."
);
