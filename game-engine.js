/* ============================================================
   ULTIMATE WORLD
   GAME ENGINE v1.1
   ------------------------------------------------------------
   Premium shared engine for Ultimate World.

   SYSTEMS:
   • Game registry
   • Game sessions
   • XP & levels
   • Coins
   • Achievements
   • Statistics
   • Local leaderboard
   • Favorites
   • Daily rewards
   • Input
   • Particles
   • Sound
   • Collision
   • Random utilities
   • Screen shake
   • Performance clock
   • Game factory
   • Future multiplayer-ready architecture
   ============================================================ */

"use strict";


/* ============================================================
   GLOBAL NAMESPACE
   ============================================================ */

window.UltimateWorld =
    window.UltimateWorld || {};


/* ============================================================
   ENGINE INFORMATION
   ============================================================ */

UltimateWorld.version = "1.1.0";

UltimateWorld.engine = {

    name:
        "Ultimate World Game Engine",

    version:
        UltimateWorld.version,

    status:
        "initializing"

};


/* ============================================================
   STORAGE
   ============================================================ */

const UW_STORAGE = {

    PROFILE:
        "uw_profile",

    SETTINGS:
        "uw_settings",

    GAMES:
        "uw_games",

    ACHIEVEMENTS:
        "uw_achievements",

    INVENTORY:
        "uw_inventory",

    LEADERBOARD:
        "uw_local_leaderboard",

    DAILY:
        "uw_daily_reward"

};


function uwLoad(
    key,
    fallback = null
){

    try{

        const value =
            localStorage.getItem(
                key
            );

        if(
            value === null
        ){

            return fallback;

        }

        return JSON.parse(
            value
        );

    }catch(error){

        console.warn(
            "[Ultimate World] Storage read error:",
            error
        );

        return fallback;

    }

}


function uwSave(
    key,
    value
){

    try{

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    }catch(error){

        console.warn(
            "[Ultimate World] Storage write error:",
            error
        );

        return false;

    }

}


/* ============================================================
   PLAYER PROFILE
   ============================================================ */

const defaultProfile = {

    name:
        "Player",

    level:
        1,

    xp:
        0,

    coins:
        0,

    totalScore:
        0,

    gamesPlayed:
        0,

    wins:
        0,

    losses:
        0,

    streak:
        0,

    longestStreak:
        0,

    favoriteGame:
        null,

    joined:
        Date.now()

};


UltimateWorld.profile =
    uwLoad(
        UW_STORAGE.PROFILE,
        defaultProfile
    );


function saveProfile(){

    uwSave(
        UW_STORAGE.PROFILE,
        UltimateWorld.profile
    );

}


/* ============================================================
   PROFILE SAFETY
   ============================================================ */

function normalizeProfile(){

    const p =
        UltimateWorld.profile;

    p.name =
        typeof p.name === "string"
            ? p.name
            : "Player";

    p.level =
        Math.max(
            1,
            Number(p.level) || 1
        );

    p.xp =
        Math.max(
            0,
            Number(p.xp) || 0
        );

    p.coins =
        Math.max(
            0,
            Number(p.coins) || 0
        );

    p.totalScore =
        Math.max(
            0,
            Number(p.totalScore) || 0
        );

    p.gamesPlayed =
        Math.max(
            0,
            Number(p.gamesPlayed) || 0
        );

    p.wins =
        Math.max(
            0,
            Number(p.wins) || 0
        );

    p.losses =
        Math.max(
            0,
            Number(p.losses) || 0
        );

    p.streak =
        Math.max(
            0,
            Number(p.streak) || 0
        );

    p.longestStreak =
        Math.max(
            0,
            Number(p.longestStreak) || 0
        );

    if(
        !p.joined
    ){

        p.joined =
            Date.now();

    }

    saveProfile();

}


normalizeProfile();


/* ============================================================
   XP SYSTEM
   ============================================================ */

const XP_TABLE = {

    GAME_PLAYED:
        25,

    GAME_WIN:
        100,

    NEW_RECORD:
        150,

    ACHIEVEMENT:
        200,

    DAILY_BONUS:
        250

};


function xpRequiredForLevel(
    level
){

    level =
        Math.max(
            1,
            Number(level) || 1
        );

    return Math.floor(
        100 +
        Math.pow(
            level,
            1.55
        ) *
        75
    );

}


function checkLevelUp(){

    let leveledUp =
        false;

    while(
        UltimateWorld.profile.xp >=
        xpRequiredForLevel(
            UltimateWorld.profile.level
        )
    ){

        UltimateWorld.profile.xp -=
            xpRequiredForLevel(
                UltimateWorld.profile.level
            );

        UltimateWorld.profile.level++;

        leveledUp =
            true;

        if(
            typeof UltimateWorld.toast ===
            "function"
        ){

            UltimateWorld.toast(
                "⚡ LEVEL UP! Level " +
                UltimateWorld.profile.level
            );

        }

    }

    return leveledUp;

}


function addXP(
    amount
){

    amount =
        Math.max(
            0,
            Number(amount) || 0
        );

    UltimateWorld.profile.xp +=
        amount;

    checkLevelUp();

    saveProfile();

    return UltimateWorld.profile.xp;

}


function getLevelProgress(){

    const level =
        UltimateWorld.profile.level;

    const required =
        xpRequiredForLevel(
            level
        );

    return {

        level,

        current:
            UltimateWorld.profile.xp,

        required,

        percentage:
            Math.min(
                100,
                (
                    UltimateWorld.profile.xp /
                    required
                ) *
                100
            )

    };

}


/* ============================================================
   COINS
   ============================================================ */

function addCoins(
    amount
){

    amount =
        Math.max(
            0,
            Math.floor(
                Number(amount) || 0
            )
        );

    UltimateWorld.profile.coins +=
        amount;

    saveProfile();

    return UltimateWorld.profile.coins;

}


function spendCoins(
    amount
){

    amount =
        Math.max(
            0,
            Math.floor(
                Number(amount) || 0
            )
        );

    if(
        UltimateWorld.profile.coins <
        amount
    ){

        return false;

    }

    UltimateWorld.profile.coins -=
        amount;

    saveProfile();

    return true;

}


/* ============================================================
   GAME DATABASE
   ============================================================ */

UltimateWorld.games =
    uwLoad(
        UW_STORAGE.GAMES,
        {}
    );


function createGameRecord(
    gameId
){

    if(
        !UltimateWorld.games[
            gameId
        ]
    ){

        UltimateWorld.games[
            gameId
        ] = {

            plays:
                0,

            wins:
                0,

            losses:
                0,

            bestScore:
                0,

            totalScore:
                0,

            highestLevel:
                1,

            bestTime:
                null,

            lastPlayed:
                null,

            favorite:
                false

        };

    }

    return UltimateWorld.games[
        gameId
    ];

}


function saveGames(){

    uwSave(
        UW_STORAGE.GAMES,
        UltimateWorld.games
    );

}


/* ============================================================
   GAME SESSION
   ============================================================ */

class GameSession{

    constructor(
        config = {}
    ){

        this.id =
            config.id ||
            "unknown-game";

        this.name =
            config.name ||
            "Ultimate World Game";

        this.category =
            config.category ||
            "Arcade";

        this.mode =
            config.mode ||
            "singleplayer";

        this.score =
            0;

        this.level =
            1;

        this.lives =
            Number.isFinite(
                config.lives
            )
                ? config.lives
                : 3;

        this.maxLives =
            this.lives;

        this.time =
            0;

        this.combo =
            0;

        this.maxCombo =
            0;

        this.running =
            false;

        this.paused =
            false;

        this.finished =
            false;

        this.won =
            false;

        this.startedAt =
            null;

        this.endedAt =
            null;

        this.data =
            {};

        this.events =
            {};

        createGameRecord(
            this.id
        );

    }


    /* ========================================================
       EVENTS
       ======================================================== */

    on(
        event,
        callback
    ){

        if(
            typeof callback !==
            "function"
        ){

            return this;

        }

        if(
            !this.events[event]
        ){

            this.events[event] =
                [];

        }

        this.events[event].push(
            callback
        );

        return this;

    }


    off(
        event,
        callback
    ){

        if(
            !this.events[event]
        ){

            return this;

        }

        this.events[event] =
            this.events[event].filter(
                fn =>
                    fn !== callback
            );

        return this;

    }


    emit(
        event,
        data = {}
    ){

        const listeners =
            this.events[event] ||
            [];

        listeners.forEach(
            callback => {

                try{

                    callback(
                        data,
                        this
                    );

                }catch(error){

                    console.error(
                        "[Ultimate World] Game event error:",
                        error
                    );

                }

            }
        );

        return this;

    }


    /* ========================================================
       START
       ======================================================== */

    start(){

        if(
            this.running &&
            !this.finished
        ){

            return this;

        }

        this.running =
            true;

        this.paused =
            false;

        this.finished =
            false;

        this.won =
            false;

        this.startedAt =
            Date.now();

        const record =
            createGameRecord(
                this.id
            );

        record.plays++;

        record.lastPlayed =
            Date.now();

        UltimateWorld.profile.gamesPlayed++;

        addXP(
            XP_TABLE.GAME_PLAYED
        );

        saveProfile();

        saveGames();

        this.emit(
            "start"
        );

        return this;

    }


    /* ========================================================
       PAUSE
       ======================================================== */

    pause(){

        if(
            !this.running ||
            this.finished
        ){

            return this;

        }

        this.paused =
            true;

        this.emit(
            "pause"
        );

        return this;

    }


    /* ========================================================
       RESUME
       ======================================================== */

    resume(){

        if(
            !this.running ||
            this.finished
        ){

            return this;

        }

        this.paused =
            false;

        this.emit(
            "resume"
        );

        return this;

    }


    /* ========================================================
       SCORE
       ======================================================== */

    addScore(
        amount,
        reason = "score"
    ){

        if(
            this.finished
        ){

            return this.score;

        }

        amount =
            Number(amount) || 0;

        this.score +=
            amount;

        this.score =
            Math.max(
                0,
                this.score
            );

        this.emit(
            "score",
            {

                amount,

                reason,

                total:
                    this.score

            }
        );

        return this.score;

    }


    /* ========================================================
       COMBO
       ======================================================== */

    addCombo(){

        if(
            this.finished
        ){

            return this.combo;

        }

        this.combo++;

        if(
            this.combo >
            this.maxCombo
        ){

            this.maxCombo =
                this.combo;

        }

        this.emit(
            "combo",
            {

                combo:
                    this.combo

            }
        );

        return this.combo;

    }


    resetCombo(){

        this.combo =
            0;

        this.emit(
            "combo-reset"
        );

        return this.combo;

    }


    getComboMultiplier(){

        if(
            this.combo < 2
        ){

            return 1;

        }

        if(
            this.combo < 5
        ){

            return 1.25;

        }

        if(
            this.combo < 10
        ){

            return 1.5;

        }

        if(
            this.combo < 20
        ){

            return 2;

        }

        return 3;

    }


    /* ========================================================
       LIVES
       ======================================================== */

    loseLife(){

        if(
            this.finished
        ){

            return this.lives;

        }

        this.lives =
            Math.max(
                0,
                this.lives - 1
            );

        this.resetCombo();

        this.emit(
            "life-lost",
            {

                lives:
                    this.lives

            }
        );

        if(
            this.lives <= 0
        ){

            this.end(
                false
            );

        }

        return this.lives;

    }


    gainLife(){

        if(
            this.finished
        ){

            return this.lives;

        }

        this.lives =
            Math.min(
                this.maxLives,
                this.lives + 1
            );

        this.emit(
            "life-gained",
            {

                lives:
                    this.lives

            }
        );

        return this.lives;

    }


    /* ========================================================
       LEVEL
       ======================================================== */

    setLevel(
        level
    ){

        this.level =
            Math.max(
                1,
                Math.floor(
                    Number(level) || 1
                )
            );

        this.emit(
            "level",
            {

                level:
                    this.level

            }
        );

        return this.level;

    }


    nextLevel(){

        this.level++;

        this.emit(
            "level",
            {

                level:
                    this.level

            }
        );

        return this.level;

    }


    /* ========================================================
       TIMER
       ======================================================== */

    update(
        delta
    ){

        if(
            !this.running ||
            this.paused ||
            this.finished
        ){

            return;

        }

        delta =
            Math.max(
                0,
                Number(delta) || 0
            );

        this.time +=
            delta;

        this.emit(
            "update",
            {

                delta,

                time:
                    this.time

            }
        );

    }


    /* ========================================================
       WIN
       ======================================================== */

    win(){

        if(
            this.finished
        ){

            return this;

        }

        this.end(
            true
        );

        return this;

    }


    /* ========================================================
       END
       ======================================================== */

    end(
        won = false
    ){

        if(
            this.finished
        ){

            return this;

        }

        this.finished =
            true;

        this.running =
            false;

        this.won =
            !!won;

        this.endedAt =
            Date.now();

        const record =
            createGameRecord(
                this.id
            );

        record.totalScore +=
            this.score;

        if(
            this.score >
            record.bestScore
        ){

            record.bestScore =
                this.score;

            addXP(
                XP_TABLE.NEW_RECORD
            );

            this.emit(
                "record",
                {

                    score:
                        this.score

                }
            );

        }

        if(
            this.time > 0 &&
            (
                record.bestTime === null ||
                this.time < record.bestTime
            )
        ){

            record.bestTime =
                this.time;

        }

        if(
            this.level >
            record.highestLevel
        ){

            record.highestLevel =
                this.level;

        }

        if(
            this.won
        ){

            record.wins++;

            UltimateWorld.profile.wins++;

            UltimateWorld.profile.streak++;

            if(
                UltimateWorld.profile.streak >
                UltimateWorld.profile.longestStreak
            ){

                UltimateWorld.profile.longestStreak =
                    UltimateWorld.profile.streak;

            }

            addXP(
                XP_TABLE.GAME_WIN
            );

        }else{

            record.losses++;

            UltimateWorld.profile.losses++;

            UltimateWorld.profile.streak =
                0;

        }

        UltimateWorld.profile.totalScore +=
            this.score;

        UltimateWorld.profile.favoriteGame =
            this.id;

        saveProfile();

        saveGames();

        submitLocalScore(
            this.id,
            this.score
        );

        this.emit(
            "end",
            {

                won:
                    this.won,

                score:
                    this.score,

                level:
                    this.level,

                time:
                    this.time

            }
        );

        checkAchievements(
            this
        );

        return this;

    }

}


/* ============================================================
   CURRENT / ACTIVE SESSION
   ============================================================ */

UltimateWorld.currentGame =
    null;

UltimateWorld.activeGame =
    null;


function createGame(
    config
){

    UltimateWorld.currentGame =
        new GameSession(
            config
        );

    return UltimateWorld.currentGame;

}


/* ============================================================
   ACHIEVEMENTS
   ============================================================ */

const ACHIEVEMENTS = [

    {

        id:
            "first-game",

        title:
            "First Steps",

        description:
            "Play your first game.",

        xp:
            100

    },

    {

        id:
            "ten-games",

        title:
            "Getting Serious",

        description:
            "Play 10 games.",

        xp:
            200

    },

    {

        id:
            "hundred-games",

        title:
            "Game Machine",

        description:
            "Play 100 games.",

        xp:
            1000

    },

    {

        id:
            "score-1000",

        title:
            "Four Digits",

        description:
            "Reach a score of 1,000.",

        xp:
            250

    },

    {

        id:
            "score-10000",

        title:
            "High Roller",

        description:
            "Reach a score of 10,000.",

        xp:
            1000

    },

    {

        id:
            "level-10",

        title:
            "Veteran",

        description:
            "Reach Level 10.",

        xp:
            500

    },

    {

        id:
            "win-streak-5",

        title:
            "On Fire",

        description:
            "Win 5 games in a row.",

        xp:
            500

    },

    {

        id:
            "win-streak-10",

        title:
            "Unstoppable",

        description:
            "Win 10 games in a row.",

        xp:
            1500

    }

];


UltimateWorld.achievements =
    uwLoad(
        UW_STORAGE.ACHIEVEMENTS,
        {}
    );


function unlockAchievement(
    achievementId
){

    if(
        UltimateWorld.achievements[
            achievementId
        ]
    ){

        return false;

    }

    const achievement =
        ACHIEVEMENTS.find(
            item =>
                item.id ===
                achievementId
        );

    if(
        !achievement
    ){

        return false;

    }

    UltimateWorld.achievements[
        achievementId
    ] = {

        unlocked:
            true,

        date:
            Date.now()

    };

    uwSave(
        UW_STORAGE.ACHIEVEMENTS,
        UltimateWorld.achievements
    );

    addXP(
        achievement.xp
    );

    addCoins(
        Math.floor(
            achievement.xp / 10
        )
    );

    if(
        typeof UltimateWorld.toast ===
        "function"
    ){

        UltimateWorld.toast(
            "🏆 " +
            achievement.title
        );

    }

    return true;

}


function checkAchievements(
    session
){

    const profile =
        UltimateWorld.profile;

    if(
        profile.gamesPlayed >= 1
    ){

        unlockAchievement(
            "first-game"
        );

    }

    if(
        profile.gamesPlayed >= 10
    ){

        unlockAchievement(
            "ten-games"
        );

    }

    if(
        profile.gamesPlayed >= 100
    ){

        unlockAchievement(
            "hundred-games"
        );

    }

    if(
        session &&
        session.score >= 1000
    ){

        unlockAchievement(
            "score-1000"
        );

    }

    if(
        session &&
        session.score >= 10000
    ){

        unlockAchievement(
            "score-10000"
        );

    }

    if(
        profile.level >= 10
    ){

        unlockAchievement(
            "level-10"
        );

    }

    if(
        profile.streak >= 5
    ){

        unlockAchievement(
            "win-streak-5"
        );

    }

    if(
        profile.streak >= 10
    ){

        unlockAchievement(
            "win-streak-10"
        );

    }

}


/* ============================================================
   INPUT MANAGER
   ============================================================ */

class InputManager{

    constructor(){

        this.keys =
            {};

        this.mouse = {

            x:
                0,

            y:
                0,

            down:
                false

        };

        this.touch = {

            active:
                false,

            x:
                0,

            y:
                0

        };

        this.bind();

    }


    bind(){

        window.addEventListener(
            "keydown",
            event => {

                this.keys[
                    event.key
                ] = true;

            }
        );


        window.addEventListener(
            "keyup",
            event => {

                this.keys[
                    event.key
                ] = false;

            }
        );


        window.addEventListener(
            "pointermove",
            event => {

                this.mouse.x =
                    event.clientX;

                this.mouse.y =
                    event.clientY;

            }
        );


        window.addEventListener(
            "pointerdown",
            () => {

                this.mouse.down =
                    true;

            }
        );


        window.addEventListener(
            "pointerup",
            () => {

                this.mouse.down =
                    false;

            }
        );


        window.addEventListener(
            "touchstart",
            event => {

                const touch =
                    event.touches[0];

                if(
                    !touch
                ){

                    return;

                }

                this.touch.active =
                    true;

                this.touch.x =
                    touch.clientX;

                this.touch.y =
                    touch.clientY;

            },
            {
                passive:
                    true
            }
        );


        window.addEventListener(
            "touchmove",
            event => {

                const touch =
                    event.touches[0];

                if(
                    !touch
                ){

                    return;

                }

                this.touch.x =
                    touch.clientX;

                this.touch.y =
                    touch.clientY;

            },
            {
                passive:
                    true
            }
        );


        window.addEventListener(
            "touchend",
            () => {

                this.touch.active =
                    false;

            }
        );

    }


    isDown(
        key
    ){

        return !!this.keys[
            key
        ];

    }

}


UltimateWorld.input =
    new InputManager();


/* ============================================================
   PARTICLE SYSTEM
   ============================================================ */

class ParticleSystem{

    constructor(){

        this.particles =
            [];

    }


    burst(
        x,
        y,
        amount = 20,
        options = {}
    ){

        const color =
            options.color ||
            "rgba(255,255,255,1)";

        for(
            let i = 0;
            i < amount;
            i++
        ){

            const angle =
                Math.random() *
                Math.PI *
                2;

            const speed =
                (
                    options.speed ||
                    120
                ) *
                (
                    0.4 +
                    Math.random()
                );

            const life =
                options.life ||
                0.7;

            this.particles.push({

                x,

                y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                life,

                maxLife:
                    life,

                size:
                    options.size ||
                    3,

                color

            });

        }

    }


    update(
        delta
    ){

        for(
            let i =
                this.particles.length - 1;
            i >= 0;
            i--
        ){

            const particle =
                this.particles[i];

            particle.x +=
                particle.vx *
                delta;

            particle.y +=
                particle.vy *
                delta;

            particle.vy +=
                100 *
                delta;

            particle.life -=
                delta;

            if(
                particle.life <= 0
            ){

                this.particles.splice(
                    i,
                    1
                );

            }

        }

    }


    draw(
        context
    ){

        this.particles.forEach(
            particle => {

                const alpha =
                    Math.max(
                        0,
                        particle.life /
                        particle.maxLife
                    );

                context.globalAlpha =
                    alpha;

                context.fillStyle =
                    particle.color;

                context.beginPath();

                context.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                context.fill();

            }
        );

        context.globalAlpha =
            1;

    }

}


UltimateWorld.particles =
    new ParticleSystem();


/* ============================================================
   SOUND MANAGER
   ============================================================ */

class SoundManager{

    constructor(){

        this.enabled =
            true;

        this.context =
            null;

    }


    init(){

        if(
            this.context
        ){

            return;

        }

        try{

            this.context =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }catch(error){

            console.warn(
                "[Ultimate World] Web Audio unavailable."
            );

        }

    }


    beep(
        frequency = 440,
        duration = 0.08,
        type = "sine",
        volume = 0.04
    ){

        if(
            !this.enabled
        ){

            return;

        }

        this.init();

        if(
            !this.context
        ){

            return;

        }

        if(
            this.context.state ===
            "suspended"
        ){

            this.context.resume()
                .catch(
                    () => {}
                );

        }

        const oscillator =
            this.context.createOscillator();

        const gain =
            this.context.createGain();

        oscillator.type =
            type;

        oscillator.frequency.value =
            frequency;

        gain.gain.value =
            volume;

        oscillator.connect(
            gain
        );

        gain.connect(
            this.context.destination
        );

        const now =
            this.context.currentTime;

        gain.gain.setValueAtTime(
            volume,
            now
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            now + duration
        );

        oscillator.start(
            now
        );

        oscillator.stop(
            now + duration
        );

    }


    success(){

        this.beep(
            660,
            0.08,
            "sine",
            0.05
        );

        setTimeout(
            () => {

                this.beep(
                    880,
                    0.12,
                    "sine",
                    0.05
                );

            },
            80
        );

    }


    click(){

        this.beep(
            520,
            0.045,
            "square",
            0.025
        );

    }


    error(){

        this.beep(
            160,
            0.16,
            "sawtooth",
            0.035
        );

    }

}


UltimateWorld.sound =
    new SoundManager();


/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */

UltimateWorld.toastTimer =
    null;


UltimateWorld.toast =
    function(
        message
    ){

        const element =
            document.getElementById(
                "toast"
            );

        if(
            !element
        ){

            console.log(
                "[Ultimate World]",
                message
            );

            return;

        }

        element.textContent =
            message;

        element.classList.add(
            "show"
        );

        clearTimeout(
            UltimateWorld.toastTimer
        );

        UltimateWorld.toastTimer =
            setTimeout(
                () => {

                    element.classList.remove(
                        "show"
                    );

                },
                2400
            );

    };


/* ============================================================
   DAILY REWARD
   ============================================================ */

function claimDailyReward(){

    const previous =
        uwLoad(
            UW_STORAGE.DAILY,
            null
        );

    const today =
        new Date()
            .toISOString()
            .slice(
                0,
                10
            );

    if(
        previous === today
    ){

        return {

            claimed:
                false,

            reason:
                "already-claimed"

        };

    }

    uwSave(
        UW_STORAGE.DAILY,
        today
    );

    addXP(
        XP_TABLE.DAILY_BONUS
    );

    addCoins(
        100
    );

    return {

        claimed:
            true,

        xp:
            XP_TABLE.DAILY_BONUS,

        coins:
            100

    };

}


/* ============================================================
   FAVORITES
   ============================================================ */

function toggleFavorite(
    gameId
){

    const record =
        createGameRecord(
            gameId
        );

    record.favorite =
        !record.favorite;

    saveGames();

    return record.favorite;

}


function isFavorite(
    gameId
){

    const record =
        createGameRecord(
            gameId
        );

    return !!record.favorite;

}


/* ============================================================
   GAME STATISTICS
   ============================================================ */

function getGameStats(
    gameId
){

    return {

        ...createGameRecord(
            gameId
        )

    };

}


function getAllGameStats(){

    return {

        ...UltimateWorld.games

    };

}


/* ============================================================
   LEADERBOARD
   ============================================================ */

UltimateWorld.leaderboard =
    uwLoad(
        UW_STORAGE.LEADERBOARD,
        []
    );


function submitLocalScore(
    gameId,
    score
){

    score =
        Math.max(
            0,
            Number(score) || 0
        );

    UltimateWorld.leaderboard.push({

        gameId,

        score,

        player:
            UltimateWorld.profile.name,

        date:
            Date.now()

    });

    UltimateWorld.leaderboard.sort(
        (
            a,
            b
        ) =>
            b.score -
            a.score
    );

    UltimateWorld.leaderboard =
        UltimateWorld.leaderboard
            .slice(
                0,
                100
            );

    uwSave(
        UW_STORAGE.LEADERBOARD,
        UltimateWorld.leaderboard
    );

}


function getLeaderboard(
    gameId
){

    return UltimateWorld
        .leaderboard
        .filter(
            item =>
                item.gameId ===
                gameId
        );

}


/* ============================================================
   GAME REGISTRY
   ============================================================ */

UltimateWorld.registry =
    {};


function registerGame(
    config,
    gameClass
){

    if(
        !config ||
        !config.id
    ){

        throw new Error(
            "A game must have an id."
        );

    }

    UltimateWorld.registry[
        config.id
    ] = {

        config,

        gameClass

    };

    return UltimateWorld.registry[
        config.id
    ];

}


function getRegisteredGame(
    id
){

    return (
        UltimateWorld.registry[
            id
        ] ||
        null
    );

}


function getRegisteredGames(){

    return Object.values(
        UltimateWorld.registry
    );

}


/* ============================================================
   GAME FACTORY
   ============================================================ */

function launchRegisteredGame(
    id,
    options = {}
){

    const entry =
        getRegisteredGame(
            id
        );

    if(
        !entry
    ){

        console.warn(
            "[Ultimate World] Game not registered:",
            id
        );

        return null;

    }

    if(
        typeof entry.gameClass !==
        "function"
    ){

        console.error(
            "[Ultimate World] Invalid game class:",
            id
        );

        return null;

    }

    const instance =
        new entry.gameClass(
            {

                ...entry.config,

                ...options

            }
        );

    UltimateWorld.activeGame =
        instance;

    return instance;

}


/* ============================================================
   PERFORMANCE CLOCK
   ============================================================ */

class GameClock{

    constructor(){

        this.running =
            false;

        this.last =
            0;

        this.elapsed =
            0;

        this.delta =
            0;

    }


    start(){

        this.running =
            true;

        this.last =
            performance.now();

    }


    stop(){

        this.running =
            false;

    }


    update(){

        if(
            !this.running
        ){

            this.delta =
                0;

            return 0;

        }

        const now =
            performance.now();

        this.delta =
            Math.min(
                0.1,
                (
                    now -
                    this.last
                ) /
                1000
            );

        this.last =
            now;

        this.elapsed +=
            this.delta;

        return this.delta;

    }


    reset(){

        this.elapsed =
            0;

        this.delta =
            0;

        this.last =
            performance.now();

    }

}


UltimateWorld.clock =
    new GameClock();


/* ============================================================
   COLLISION HELPERS
   ============================================================ */

function rectCollision(
    a,
    b
){

    if(
        !a ||
        !b
    ){

        return false;

    }

    return (

        a.x <
        b.x + b.width &&

        a.x + a.width >
        b.x &&

        a.y <
        b.y + b.height &&

        a.y + a.height >
        b.y

    );

}


function circleCollision(
    a,
    b
){

    if(
        !a ||
        !b
    ){

        return false;

    }

    const dx =
        a.x -
        b.x;

    const dy =
        a.y -
        b.y;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    return (
        distance <
        a.radius +
        b.radius
    );

}


/* ============================================================
   RANDOM HELPERS
   ============================================================ */

function random(
    min = 0,
    max = 1
){

    return (
        Math.random() *
        (
            max -
            min
        )
    ) +
    min;

}


function randomInt(
    min,
    max
){

    return Math.floor(
        random(
            min,
            max + 1
        )
    );

}


function clamp(
    value,
    min,
    max
){

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


/* ============================================================
   COLOR HELPERS
   ============================================================ */

function randomNeon(){

    const colors = [

        "#7657ff",

        "#00d9ff",

        "#ff4fcf",

        "#24e39a",

        "#ffd45a",

        "#ff6b6b"

    ];

    return colors[
        randomInt(
            0,
            colors.length - 1
        )
    ];

}


/* ============================================================
   SCREEN SHAKE
   ============================================================ */

let shakeAmount =
    0;


function screenShake(
    amount = 8
){

    shakeAmount =
        Math.max(
            shakeAmount,
            amount
        );

}


function updateScreenShake(
    delta
){

    shakeAmount =
        Math.max(
            0,
            shakeAmount -
            delta *
            35
        );

}


function applyScreenShake(
    element
){

    if(
        !element
    ){

        return;

    }

    if(
        shakeAmount <= 0
    ){

        element.style.transform =
            "";

        return;

    }

    const x =
        random(
            -shakeAmount,
            shakeAmount
        );

    const y =
        random(
            -shakeAmount,
            shakeAmount
        );

    element.style.transform =
        `translate(${x}px,${y}px)`;

}


/* ============================================================
   PUBLIC PROFILE API
   ============================================================ */

UltimateWorld.getProfile =
    function(){

        return {

            ...UltimateWorld.profile

        };

    };


UltimateWorld.getLevelProgress =
    getLevelProgress;

UltimateWorld.addXP =
    addXP;

UltimateWorld.addCoins =
    addCoins;

UltimateWorld.spendCoins =
    spendCoins;


/* ============================================================
   PUBLIC GAME API
   ============================================================ */

UltimateWorld.GameSession =
    GameSession;

UltimateWorld.createGame =
    createGame;

UltimateWorld.registerGame =
    registerGame;


/*
   IMPORTANT:
   These two functions are intentionally public.

   game.html uses getRegisteredGame()
   to discover the game currently being opened.

   Future Ultimate World pages can also use
   getRegisteredGames() to build the complete
   game library automatically.
*/

UltimateWorld.getRegisteredGame =
    getRegisteredGame;

UltimateWorld.getRegisteredGames =
    getRegisteredGames;


UltimateWorld.launchGame =
    launchRegisteredGame;

UltimateWorld.getGameStats =
    getGameStats;

UltimateWorld.getAllGameStats =
    getAllGameStats;

UltimateWorld.submitScore =
    submitLocalScore;

UltimateWorld.getLeaderboard =
    getLeaderboard;

UltimateWorld.unlockAchievement =
    unlockAchievement;

UltimateWorld.checkAchievements =
    checkAchievements;

UltimateWorld.claimDailyReward =
    claimDailyReward;

UltimateWorld.toggleFavorite =
    toggleFavorite;

UltimateWorld.isFavorite =
    isFavorite;

UltimateWorld.rectCollision =
    rectCollision;

UltimateWorld.circleCollision =
    circleCollision;

UltimateWorld.random =
    random;

UltimateWorld.randomInt =
    randomInt;

UltimateWorld.clamp =
    clamp;

UltimateWorld.randomNeon =
    randomNeon;

UltimateWorld.screenShake =
    screenShake;

UltimateWorld.updateScreenShake =
    updateScreenShake;

UltimateWorld.applyScreenShake =
    applyScreenShake;


/* ============================================================
   ACHIEVEMENT DATABASE API
   ============================================================ */

UltimateWorld.getAchievements =
    function(){

        return ACHIEVEMENTS.map(
            achievement => ({

                ...achievement,

                unlocked:
                    !!UltimateWorld
                        .achievements[
                            achievement.id
                        ]

            })
        );

    };


/* ============================================================
   BUILT-IN DEMO GAME
   ============================================================ */

class NeonRushEngineGame{

    constructor(
        options = {}
    ){

        this.session =
            createGame({

                id:
                    options.id ||
                    "neon-rush",

                name:
                    options.name ||
                    "Neon Rush",

                category:
                    options.category ||
                    "Racing",

                lives:
                    Number.isFinite(
                        options.lives
                    )
                        ? options.lives
                        : 3

            });

        this.player = {

            x:
                0.5,

            y:
                0.75,

            speed:
                0.8

        };

        this.obstacles =
            [];

        this.spawnTimer =
            0;

        this.running =
            false;

        this.session.on(
            "start",
            () => {

                this.running =
                    true;

            }
        );

        this.session.on(
            "end",
            () => {

                this.running =
                    false;

            }
        );

    }


    start(){

        this.session.start();

        UltimateWorld.sound.success();

        return this;

    }


    pause(){

        this.session.pause();

        return this;

    }


    resume(){

        this.session.resume();

        return this;

    }


    update(
        delta
    ){

        if(
            !this.running ||
            this.session.paused
        ){

            return;

        }

        this.session.update(
            delta
        );

        this.spawnTimer +=
            delta;

        if(
            this.spawnTimer >
            Math.max(
                0.35,
                1.1 -
                this.session.level *
                0.04
            )
        ){

            this.spawnTimer =
                0;

            this.obstacles.push({

                x:
                    random(
                        0.2,
                        0.8
                    ),

                y:
                    -0.1,

                width:
                    0.06,

                height:
                    0.08,

                speed:
                    0.28 +
                    this.session.level *
                    0.025

            });

        }

        this.obstacles.forEach(
            obstacle => {

                obstacle.y +=
                    obstacle.speed *
                    delta;

            }
        );

        this.obstacles =
            this.obstacles.filter(
                obstacle =>
                    obstacle.y <
                    1.2
            );

    }


    win(){

        this.session.win();

        return this;

    }


    lose(){

        this.session.end(
            false
        );

        return this;

    }

}


/* ============================================================
   REGISTER BUILT-IN GAME
   ============================================================ */

registerGame(

    {

        id:
            "neon-rush",

        name:
            "Neon Rush",

        category:
            "Racing",

        description:
            "High-speed neon arcade racing."

    },

    NeonRushEngineGame

);


/* ============================================================
   ENGINE STATUS
   ============================================================ */

UltimateWorld.engine.status =
    "ready";

UltimateWorld.ready =
    true;


/* ============================================================
   SAFE READY NOTIFICATION
   ============================================================ */

function announceEngineReady(){

    UltimateWorld.toast(
        "⚡ Ultimate World Game Engine ready."
    );

}


if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        announceEngineReady,
        {
            once:
                true
        }
    );

}else{

    announceEngineReady();

}


/* ============================================================
   DEBUG INFORMATION
   ============================================================ */

console.log(
    "%cULTIMATE WORLD",
    "font-size:24px;font-weight:900;"
);

console.log(
    "%cGAME ENGINE",
    "font-size:18px;font-weight:900;"
);

console.log(
    "Version:",
    UltimateWorld.version
);

console.log(
    "Engine status:",
    UltimateWorld.engine.status
);

console.log(
    "Registered games:",
    Object.keys(
        UltimateWorld.registry
    ).length
);

console.log(
    "Available games:",
    getRegisteredGames().map(
        game =>
            game.config.name
    )
);

console.log(
    "Profile:",
    UltimateWorld.profile
);

console.log(
    "Ultimate World Game Engine ready."
);


/* ============================================================
   END OF GAME ENGINE
============================================================ */
