/* =========================================================
   ULTIMATE WORLD
   DATA.JS — CONTENT & PLATFORM DATABASE
   ========================================================= */

"use strict";

/*
   IMPORTANT:
   This file contains CONTENT only.
   app.js handles the logic.
   style.css handles the design.
   index.html handles the structure.

   Keeping these separate makes Ultimate World
   much easier to expand to hundreds of features.
*/


/* =========================================================
   APP INFORMATION
   ========================================================= */

const UW_APP_INFO = {

    name: "Ultimate World",

    tagline: "Everything. In One Place.",

    version: "1.0.0",

    description:
        "A massive entertainment, sports, gaming, creation and discovery platform.",

    categories: [
        "Games",
        "Sports",
        "Creator",
        "Entertainment",
        "Learning",
        "Technology",
        "World",
        "Community"
    ]

};


/* =========================================================
   GAME CATEGORIES
   ========================================================= */

const UW_GAME_CATEGORIES = [

    {
        id: "action",
        name: "Action",
        icon: "⚔️",
        description:
            "Fast games that test your reactions."
    },

    {
        id: "arcade",
        name: "Arcade",
        icon: "👾",
        description:
            "Classic-style games with modern gameplay."
    },

    {
        id: "sports",
        name: "Sports",
        icon: "🏆",
        description:
            "Compete across your favorite sports."
    },

    {
        id: "racing",
        name: "Racing",
        icon: "🏎️",
        description:
            "Race cars, bikes and more."
    },

    {
        id: "strategy",
        name: "Strategy",
        icon: "♟️",
        description:
            "Think ahead and outsmart the challenge."
    },

    {
        id: "puzzle",
        name: "Puzzle",
        icon: "🧩",
        description:
            "Logic, patterns and brain challenges."
    },

    {
        id: "adventure",
        name: "Adventure",
        icon: "🗺️",
        description:
            "Explore worlds and complete missions."
    },

    {
        id: "simulation",
        name: "Simulation",
        icon: "🏙️",
        description:
            "Build, manage and experiment."
    },

    {
        id: "casual",
        name: "Casual",
        icon: "✨",
        description:
            "Easy to start, difficult to put down."
    },

    {
        id: "brain",
        name: "Brain",
        icon: "🧠",
        description:
            "Games designed around thinking and memory."
    }

];


/* =========================================================
   GAME CATALOGUE
   ========================================================= */

const UW_GAMES = [

    {
        id: "penalty-legends",
        title: "Penalty Legends",
        icon: "⚽",
        category: "sports",
        difficulty: "Medium",
        players: "1",
        rating: 4.9,
        featured: true,
        available: true,
        description:
            "Take on increasingly difficult penalty shootouts."
    },

    {
        id: "street-basket",
        title: "Street Basket",
        icon: "🏀",
        category: "sports",
        difficulty: "Medium",
        players: "1",
        rating: 4.8,
        featured: true,
        available: false,
        description:
            "Master the court in fast-paced basketball challenges."
    },

    {
        id: "cricket-master",
        title: "Cricket Master",
        icon: "🏏",
        category: "sports",
        difficulty: "Medium",
        players: "1",
        rating: 4.8,
        featured: true,
        available: false,
        description:
            "Build your innings and chase massive targets."
    },

    {
        id: "speed-rush",
        title: "Speed Rush",
        icon: "🏎️",
        category: "racing",
        difficulty: "Hard",
        players: "1",
        rating: 4.7,
        featured: true,
        available: false,
        description:
            "Race through increasingly challenging tracks."
    },

    {
        id: "brain-grid",
        title: "Brain Grid",
        icon: "🧠",
        category: "brain",
        difficulty: "Hard",
        players: "1",
        rating: 4.9,
        featured: false,
        available: false,
        description:
            "Solve complex logic challenges."
    },

    {
        id: "space-defender",
        title: "Space Defender",
        icon: "🚀",
        category: "action",
        difficulty: "Hard",
        players: "1",
        rating: 4.8,
        featured: true,
        available: false,
        description:
            "Defend your station against incoming threats."
    },

    {
        id: "tower-builder",
        title: "Tower Builder",
        icon: "🏗️",
        category: "strategy",
        difficulty: "Medium",
        players: "1",
        rating: 4.6,
        featured: false,
        available: false,
        description:
            "Build a tower that can survive anything."
    },

    {
        id: "word-blitz",
        title: "Word Blitz",
        icon: "🔤",
        category: "puzzle",
        difficulty: "Easy",
        players: "1",
        rating: 4.7,
        featured: false,
        available: false,
        description:
            "Find words before time runs out."
    },

    {
        id: "goal-machine",
        title: "Goal Machine",
        icon: "🥅",
        category: "sports",
        difficulty: "Medium",
        players: "1",
        rating: 4.8,
        featured: false,
        available: false,
        description:
            "Become the ultimate goalscoring machine."
    },

    {
        id: "memory-arena",
        title: "Memory Arena",
        icon: "🧩",
        category: "brain",
        difficulty: "Medium",
        players: "1",
        rating: 4.6,
        featured: false,
        available: false,
        description:
            "Challenge your memory with increasingly difficult rounds."
    }

];


/* =========================================================
   SPORTS
   ========================================================= */

const UW_SPORTS = [

    {
        id: "football",
        title: "Football",
        icon: "⚽",
        featured: true
    },

    {
        id: "cricket",
        title: "Cricket",
        icon: "🏏",
        featured: true
    },

    {
        id: "basketball",
        title: "Basketball",
        icon: "🏀",
        featured: true
    },

    {
        id: "tennis",
        title: "Tennis",
        icon: "🎾",
        featured: true
    },

    {
        id: "formula-racing",
        title: "Formula Racing",
        icon: "🏎️",
        featured: true
    },

    {
        id: "boxing",
        title: "Boxing",
        icon: "🥊",
        featured: false
    },

    {
        id: "golf",
        title: "Golf",
        icon: "⛳",
        featured: false
    },

    {
        id: "baseball",
        title: "Baseball",
        icon: "⚾",
        featured: false
    },

    {
        id: "volleyball",
        title: "Volleyball",
        icon: "🏐",
        featured: false
    },

    {
        id: "hockey",
        title: "Hockey",
        icon: "🏒",
        featured: false
    },

    {
        id: "badminton",
        title: "Badminton",
        icon: "🏸",
        featured: false
    },

    {
        id: "athletics",
        title: "Athletics",
        icon: "🏃",
        featured: false
    },

    {
        id: "swimming",
        title: "Swimming",
        icon: "🏊",
        featured: false
    },

    {
        id: "cycling",
        title: "Cycling",
        icon: "🚴",
        featured: false
    }

];


/* =========================================================
   ULTIMATE WORLD MAIN SECTIONS
   ========================================================= */

const UW_SECTIONS = [

    {
        id: "home",
        title: "Home",
        icon: "🏠",
        description:
            "Your personalized Ultimate World dashboard."
    },

    {
        id: "games",
        title: "Games",
        icon: "🎮",
        description:
            "Discover a huge library of games."
    },

    {
        id: "sports",
        title: "Sports",
        icon: "🏆",
        description:
            "Explore sports, competitions and statistics."
    },

    {
        id: "creator",
        title: "Creator",
        icon: "🛠️",
        description:
            "Build your own apps and experiences."
    },

    {
        id: "world",
        title: "World",
        icon: "🌎",
        description:
            "Explore information from around the world."
    },

    {
        id: "learning",
        title: "Learning",
        icon: "📚",
        description:
            "Learn, practice and discover."
    },

    {
        id: "technology",
        title: "Technology",
        icon: "💻",
        description:
            "Explore technology and innovation."
    },

    {
        id: "community",
        title: "Community",
        icon: "👥",
        description:
            "A future home for Ultimate World users."
    }

];


/* =========================================================
   CREATOR TOOLS
   ========================================================= */

const UW_CREATOR_TOOLS = [

    {
        id: "app-builder",
        title: "App Builder",
        icon: "📱",
        description:
            "Create your own application."
    },

    {
        id: "game-builder",
        title: "Game Builder",
        icon: "🎮",
        description:
            "Build your own games."
    },

    {
        id: "page-builder",
        title: "Page Builder",
        icon: "🖥️",
        description:
            "Design custom pages."
    },

    {
        id: "theme-builder",
        title: "Theme Studio",
        icon: "🎨",
        description:
            "Create custom visual themes."
    },

    {
        id: "logo-maker",
        title: "Logo Studio",
        icon: "✨",
        description:
            "Design logos for your creations."
    },

    {
        id: "project-manager",
        title: "Project Manager",
        icon: "📂",
        description:
            "Organize your Ultimate World projects."
    }

];


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

const UW_ACHIEVEMENTS = [

    {
        id: "first-launch",
        title: "Welcome to Ultimate World",
        icon: "🌎",
        requirement:
            "Launch Ultimate World."
    },

    {
        id: "first-game",
        title: "First Game",
        icon: "🎮",
        requirement:
            "Play your first game."
    },

    {
        id: "explorer",
        title: "Explorer",
        icon: "🧭",
        requirement:
            "Explore multiple sections."
    },

    {
        id: "creator",
        title: "Creator",
        icon: "🛠️",
        requirement:
            "Create your first project."
    },

    {
        id: "sports-fan",
        title: "Sports Fan",
        icon: "🏆",
        requirement:
            "Explore the sports hub."
    },

    {
        id: "level-10",
        title: "Rising Star",
        icon: "⭐",
        requirement:
            "Reach level 10."
    },

    {
        id: "level-25",
        title: "Ultimate Player",
        icon: "🔥",
        requirement:
            "Reach level 25."
    }

];


/* =========================================================
   DAILY CHALLENGES
   ========================================================= */

const UW_CHALLENGES = [

    {
        id: "daily-game",
        title: "Play a Game",
        icon: "🎮",
        reward: 25
    },

    {
        id: "daily-explore",
        title: "Explore Ultimate World",
        icon: "🌎",
        reward: 20
    },

    {
        id: "daily-sport",
        title: "Visit Sports",
        icon: "🏆",
        reward: 20
    },

    {
        id: "daily-creator",
        title: "Open Creator",
        icon: "🛠️",
        reward: 30
    }

];


/* =========================================================
   FEATURED CONTENT
   ========================================================= */

const UW_FEATURED = [

    {
        id: "featured-games",
        title: "THE GAMEVERSE",
        subtitle:
            "A growing universe of games.",
        icon: "🎮",
        section: "games"
    },

    {
        id: "featured-sports",
        title: "SPORTS CENTRAL",
        subtitle:
            "Your world of sport.",
        icon: "🏆",
        section: "sports"
    },

    {
        id: "featured-creator",
        title: "CREATE ANYTHING",
        subtitle:
            "Build your own digital world.",
        icon: "🛠️",
        section: "creator"
    },

    {
        id: "featured-world",
        title: "EXPLORE THE WORLD",
        subtitle:
            "Discover something new.",
        icon: "🌎",
        section: "world"
    }

];


/* =========================================================
   QUICK ACTIONS
   ========================================================= */

const UW_QUICK_ACTIONS = [

    {
        id: "play",
        title: "Play",
        icon: "▶️",
        action: "games"
    },

    {
        id: "sports",
        title: "Sports",
        icon: "🏆",
        action: "sports"
    },

    {
        id: "create",
        title: "Create",
        icon: "🛠️",
        action: "creator"
    },

    {
        id: "explore",
        title: "Explore",
        icon: "🧭",
        action: "world"
    }

];


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getUWGame(id) {

    return UW_GAMES.find(
        game => game.id === id
    );

}


function getUWSport(id) {

    return UW_SPORTS.find(
        sport => sport.id === id
    );

}


function getUWSection(id) {

    return UW_SECTIONS.find(
        section => section.id === id
    );

}


function getGamesByCategory(category) {

    return UW_GAMES.filter(
        game => game.category === category
    );

}


function getFeaturedGames() {

    return UW_GAMES.filter(
        game => game.featured
    );

}


function getAvailableGames() {

    return UW_GAMES.filter(
        game => game.available
    );

}


/* =========================================================
   CONNECT DATA TO APP ENGINE
   ========================================================= */

window.UltimateWorldData = {

    app:
        UW_APP_INFO,

    games:
        UW_GAMES,

    gameCategories:
        UW_GAME_CATEGORIES,

    sports:
        UW_SPORTS,

    sections:
        UW_SECTIONS,

    creatorTools:
        UW_CREATOR_TOOLS,

    achievements:
        UW_ACHIEVEMENTS,

    challenges:
        UW_CHALLENGES,

    featured:
        UW_FEATURED,

    quickActions:
        UW_QUICK_ACTIONS,

    getGame:
        getUWGame,

    getSport:
        getUWSport,

    getSection:
        getUWSection,

    getGamesByCategory:
        getGamesByCategory,

    getFeaturedGames:
        getFeaturedGames,

    getAvailableGames:
        getAvailableGames

};


/* =========================================================
   READY
   ========================================================= */

console.log(
    "%c🌎 ULTIMATE WORLD DATA LOADED",
    "font-size:20px;font-weight:bold;"
);

console.log(
    `🎮 ${UW_GAMES.length} game entries loaded`
);

console.log(
    `🏆 ${UW_SPORTS.length} sports loaded`
);

console.log(
    `🛠️ ${UW_CREATOR_TOOLS.length} creator tools loaded`
);
