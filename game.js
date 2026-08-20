/* =========================================================
   ULTIMATE WORLD
   GAMES.JS — GAMEVERSE ENGINE
   ========================================================= */

"use strict";


/* =========================================================
   GAMEVERSE STATE
   ========================================================= */

const GameVerse = {

    currentCategory: "all",

    currentGame: null,

    currentView: "all",

    searchQuery: "",

    initialized: false,

    filters: {
        difficulty: "all",
        players: "all",
        availability: "all"
    }

};


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeGameVerse
);


function initializeGameVerse() {

    if (GameVerse.initialized) return;

    console.log(
        "🎮 GAMEVERSE INITIALIZING..."
    );

    if (
        typeof UltimateWorldData ===
        "undefined"
    ) {

        console.error(
            "UltimateWorldData was not found. Make sure data.js loads before games.js."
        );

        return;

    }

    setupGameNavigation();

    setupGameSearch();

    setupGameFilters();

    setupGameCards();

    renderGameVerse();

    GameVerse.initialized = true;

    console.log(
        "🎮 GAMEVERSE READY"
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupGameNavigation() {

    document
        .querySelectorAll(
            "[data-game-category]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const category =
                        button.dataset.gameCategory;

                    setGameCategory(
                        category
                    );

                }
            );

        });

}


function setGameCategory(category) {

    GameVerse.currentCategory =
        category || "all";

    document
        .querySelectorAll(
            "[data-game-category]"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.gameCategory ===
                GameVerse.currentCategory
            );

        });

    renderGameVerse();

}


/* =========================================================
   SEARCH
   ========================================================= */

function setupGameSearch() {

    document
        .querySelectorAll(
            "[data-game-search]"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    GameVerse.searchQuery =
                        event.target.value
                            .trim()
                            .toLowerCase();

                    renderGameVerse();

                }
            );

        });

}


/* =========================================================
   FILTERS
   ========================================================= */

function setupGameFilters() {

    document
        .querySelectorAll(
            "[data-game-difficulty]"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                event => {

                    GameVerse.filters.difficulty =
                        event.target.value;

                    renderGameVerse();

                }
            );

        });


    document
        .querySelectorAll(
            "[data-game-players]"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                event => {

                    GameVerse.filters.players =
                        event.target.value;

                    renderGameVerse();

                }
            );

        });


    document
        .querySelectorAll(
            "[data-game-availability]"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                event => {

                    GameVerse.filters.availability =
                        event.target.value;

                    renderGameVerse();

                }
            );

        });

}


/* =========================================================
   GET FILTERED GAMES
   ========================================================= */

function getFilteredGames() {

    let games = [
        ...UltimateWorldData.games
    ];


    /* CATEGORY */

    if (
        GameVerse.currentCategory !==
        "all"
    ) {

        games =
            games.filter(
                game =>
                    game.category ===
                    GameVerse.currentCategory
            );

    }


    /* SEARCH */

    if (
        GameVerse.searchQuery
    ) {

        games =
            games.filter(game => {

                const searchable = [

                    game.title,

                    game.description,

                    game.category,

                    game.difficulty

                ]
                    .join(" ")
                    .toLowerCase();

                return searchable.includes(
                    GameVerse.searchQuery
                );

            });

    }


    /* DIFFICULTY */

    if (
        GameVerse.filters.difficulty !==
        "all"
    ) {

        games =
            games.filter(
                game =>
                    game.difficulty ===
                    GameVerse.filters.difficulty
            );

    }


    /* PLAYERS */

    if (
        GameVerse.filters.players !==
        "all"
    ) {

        games =
            games.filter(
                game =>
                    String(game.players) ===
                    String(
                        GameVerse.filters.players
                    )
            );

    }


    /* AVAILABILITY */

    if (
        GameVerse.filters.availability ===
        "available"
    ) {

        games =
            games.filter(
                game => game.available
            );

    }


    if (
        GameVerse.filters.availability ===
        "coming-soon"
    ) {

        games =
            games.filter(
                game => !game.available
            );

    }


    return games;

}


/* =========================================================
   RENDER EVERYTHING
   ========================================================= */

function renderGameVerse() {

    renderFeaturedGames();

    renderGameCategories();

    renderGameCards();

    renderGameStats();

}


/* =========================================================
   FEATURED
   ========================================================= */

function renderFeaturedGames() {

    const container =
        document.querySelector(
            "[data-featured-games]"
        );

    if (!container) return;

    const featured =
        UltimateWorldData.games
            .filter(game => game.featured);

    container.innerHTML = "";

    featured.forEach(game => {

        container.appendChild(
            createGameCard(
                game,
                true
            )
        );

    });

}


/* =========================================================
   GAME CATEGORIES
   ========================================================= */

function renderGameCategories() {

    const container =
        document.querySelector(
            "[data-game-categories]"
        );

    if (!container) return;

    container.innerHTML = "";

    const allButton =
        createCategoryButton({

            id: "all",

            name: "All Games",

            icon: "🎮"

        });

    container.appendChild(
        allButton
    );


    UltimateWorldData.gameCategories
        .forEach(category => {

            container.appendChild(

                createCategoryButton(
                    category
                )

            );

        });

}


function createCategoryButton(category) {

    const button =
        document.createElement(
            "button"
        );

    button.className =
        "game-category-button";

    if (
        GameVerse.currentCategory ===
        category.id
    ) {

        button.classList.add(
            "active"
        );

    }

    button.dataset.gameCategory =
        category.id;

    button.innerHTML = `

        <span class="category-icon">
            ${category.icon}
        </span>

        <span class="category-name">
            ${escapeGameText(
                category.name
            )}
        </span>

    `;

    button.addEventListener(
        "click",
        () => {

            setGameCategory(
                category.id
            );

        }
    );

    return button;

}


/* =========================================================
   GAME CARDS
   ========================================================= */

function renderGameCards() {

    const containers =
        document.querySelectorAll(
            "[data-games-grid]"
        );

    if (!containers.length) return;

    const games =
        getFilteredGames();

    containers.forEach(container => {

        container.innerHTML = "";

        if (!games.length) {

            container.appendChild(
                createEmptyGamesState()
            );

            return;

        }

        games.forEach(game => {

            container.appendChild(
                createGameCard(game)
            );

        });

    });

}


function createGameCard(
    game,
    featured = false
) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        featured
            ? "game-card game-card-featured"
            : "game-card";

    card.dataset.gameID =
        game.id;


    const availability =
        game.available
            ? "AVAILABLE"
            : "COMING SOON";


    const buttonText =
        game.available
            ? "PLAY NOW"
            : "VIEW";


    card.innerHTML = `

        <div class="game-card-art">

            <div class="game-card-glow"></div>

            <span class="game-card-icon">
                ${game.icon}
            </span>

            <span class="game-status">
                ${availability}
            </span>

            <button
                class="game-favorite"
                data-favorite-game="${game.id}"
                aria-label="Favorite ${escapeGameText(game.title)}"
            >
                ★
            </button>

        </div>


        <div class="game-card-content">

            <div class="game-card-category">

                ${escapeGameText(
                    game.category
                )}

            </div>


            <h3>

                ${escapeGameText(
                    game.title
                )}

            </h3>


            <p>

                ${escapeGameText(
                    game.description
                )}

            </p>


            <div class="game-card-meta">

                <span>
                    ⭐ ${game.rating}
                </span>

                <span>
                    🎯 ${escapeGameText(
                        game.difficulty
                    )}
                </span>

                <span>
                    👤 ${game.players}
                </span>

            </div>


            <button
                class="game-play-button"
                data-launch-game="${game.id}"
            >

                ${buttonText}

            </button>

        </div>

    `;


    /* GAME LAUNCH */

    const launchButton =
        card.querySelector(
            "[data-launch-game]"
        );

    if (launchButton) {

        launchButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                launchUltimateGame(
                    game.id
                );

            }
        );

    }


    /* FAVORITE */

    const favoriteButton =
        card.querySelector(
            "[data-favorite-game]"
        );

    if (favoriteButton) {

        favoriteButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                favoriteGame(
                    game.id,
                    favoriteButton
                );

            }
        );

        updateFavoriteVisual(
            game.id,
            favoriteButton
        );

    }


    /* CARD CLICK */

    card.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    "button"
                )
            ) return;

            openGameDetails(
                game.id
            );

        }
    );


    return card;

}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function createEmptyGamesState() {

    const element =
        document.createElement(
            "div"
        );

    element.className =
        "games-empty-state";

    element.innerHTML = `

        <div class="empty-game-icon">
            🔎
        </div>

        <h3>
            No games found
        </h3>

        <p>
            Try another search or category.
        </p>

        <button
            class="game-play-button"
            data-reset-games
        >
            RESET
        </button>

    `;

    element
        .querySelector(
            "[data-reset-games]"
        )
        .addEventListener(
            "click",
            resetGameFilters
        );

    return element;

}


/* =========================================================
   GAME DETAILS
   ========================================================= */

function openGameDetails(gameID) {

    const game =
        UltimateWorldData.getGame(
            gameID
        );

    if (!game) return;

    GameVerse.currentGame =
        gameID;


    const modal =
        document.querySelector(
            "[data-game-modal]"
        );


    if (!modal) {

        if (
            game.available &&
            typeof Superworld !==
            "undefined"
        ) {

            Superworld.launchGame(
                gameID
            );

        } else {

            showGameMessage(
                `${game.title} is coming soon 🔥`
            );

        }

        return;

    }


    modal.innerHTML = `

        <div class="game-modal-content">

            <button
                class="game-modal-close"
                data-close-game-modal
            >
                ×
            </button>


            <div class="game-modal-icon">
                ${game.icon}
            </div>


            <div class="game-modal-category">

                ${escapeGameText(
                    game.category
                )}

            </div>


            <h2>

                ${escapeGameText(
                    game.title
                )}

            </h2>


            <p>

                ${escapeGameText(
                    game.description
                )}

            </p>


            <div class="game-modal-stats">

                <div>
                    <strong>
                        ⭐ ${game.rating}
                    </strong>
                    <span>
                        Rating
                    </span>
                </div>

                <div>
                    <strong>
                        🎯 ${escapeGameText(
                            game.difficulty
                        )}
                    </strong>
                    <span>
                        Difficulty
                    </span>
                </div>

                <div>
                    <strong>
                        👤 ${game.players}
                    </strong>
                    <span>
                        Players
                    </span>
                </div>

            </div>


            <button
                class="game-play-button game-modal-play"
                data-modal-launch="${game.id}"
            >

                ${
                    game.available
                        ? "PLAY NOW"
                        : "COMING SOON"
                }

            </button>

        </div>

    `;


    modal.classList.add(
        "active"
    );


    const close =
        modal.querySelector(
            "[data-close-game-modal]"
        );

    if (close) {

        close.addEventListener(
            "click",
            closeGameDetails
        );

    }


    const launch =
        modal.querySelector(
            "[data-modal-launch]"
        );

    if (launch) {

        launch.addEventListener(
            "click",
            () => {

                if (!game.available) {

                    showGameMessage(
                        `${game.title} is still being developed.`
                    );

                    return;

                }

                closeGameDetails();

                launchUltimateGame(
                    game.id
                );

            }
        );

    }

}


/* =========================================================
   CLOSE DETAILS
   ========================================================= */

function closeGameDetails() {

    const modal =
        document.querySelector(
            "[data-game-modal]"
        );

    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   LAUNCH GAME
   ========================================================= */

function launchUltimateGame(gameID) {

    const game =
        UltimateWorldData.getGame(
            gameID
        );

    if (!game) {

        showGameMessage(
            "Game could not be found."
        );

        return;

    }


    if (!game.available) {

        showGameMessage(
            `${game.title} is coming soon 🚀`
        );

        return;

    }


    GameVerse.currentGame =
        gameID;


    if (
        typeof Superworld !==
        "undefined" &&
        typeof Superworld.launchGame ===
        "function"
    ) {

        Superworld.launchGame(
            gameID
        );

        return;

    }


    showGameMessage(
        `Launching ${game.title}...`
    );

}


/* =========================================================
   FAVORITES
   ========================================================= */

function favoriteGame(
    gameID,
    button
) {

    if (
        typeof Superworld ===
        "undefined"
    ) return;


    if (
        typeof Superworld.favorite ===
        "function"
    ) {

        Superworld.favorite(
            gameID
        );

    }


    updateFavoriteVisual(
        gameID,
        button
    );

}


function updateFavoriteVisual(
    gameID,
    button
) {

    if (
        !button ||
        typeof Superworld ===
        "undefined"
    ) return;


    const state =
        Superworld.getState
            ? Superworld.getState()
            : null;


    if (!state) return;


    const isFavorite =
        Array.isArray(
            state.favorites
        ) &&
        state.favorites.includes(
            gameID
        );


    button.classList.toggle(
        "active",
        isFavorite
    );

}


/* =========================================================
   RESET
   ========================================================= */

function resetGameFilters() {

    GameVerse.currentCategory =
        "all";

    GameVerse.searchQuery =
        "";

    GameVerse.filters = {

        difficulty: "all",

        players: "all",

        availability: "all"

    };


    document
        .querySelectorAll(
            "[data-game-search]"
        )
        .forEach(input => {

            input.value = "";

        });


    document
        .querySelectorAll(
            "[data-game-category]"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.gameCategory ===
                "all"
            );

        });


    renderGameVerse();

}


/* =========================================================
   STATISTICS
   ========================================================= */

function renderGameStats() {

    const games =
        UltimateWorldData.games;


    const total =
        games.length;

    const available =
        games.filter(
            game => game.available
        ).length;

    const comingSoon =
        total - available;


    document
        .querySelectorAll(
            "[data-games-total]"
        )
        .forEach(element => {

            element.textContent =
                total;

        });


    document
        .querySelectorAll(
            "[data-games-available]"
        )
        .forEach(element => {

            element.textContent =
                available;

        });


    document
        .querySelectorAll(
            "[data-games-coming]"
        )
        .forEach(element => {

            element.textContent =
                comingSoon;

        });

}


/* =========================================================
   MESSAGE SYSTEM
   ========================================================= */

function showGameMessage(message) {

    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            message
        );

        return;

    }


    let messageBox =
        document.querySelector(
            ".game-message"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );

        messageBox.className =
            "game-message";

        document.body.appendChild(
            messageBox
        );

    }


    messageBox.textContent =
        messageBox;

}


/* =========================================================
   ESCAPE TEXT
   ========================================================= */

function escapeGameText(value) {

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
   PUBLIC GAMEVERSE API
   ========================================================= */

window.UltimateWorldGames = {

    state:
        GameVerse,

    getGames:
        getFilteredGames,

    render:
        renderGameVerse,

    category:
        setGameCategory,

    search:
        query => {

            GameVerse.searchQuery =
                String(query)
                    .toLowerCase();

            renderGameVerse();

        },

    launch:
        launchUltimateGame,

    details:
        openGameDetails,

    favorite:
        favoriteGame,

    reset:
        resetGameFilters

};


/* =========================================================
   READY
   ========================================================= */

console.log(
    "%c🎮 ULTIMATE WORLD GAMEVERSE",
    "font-size:22px;font-weight:bold;"
);

console.log(
    "Game system loaded successfully."
);
