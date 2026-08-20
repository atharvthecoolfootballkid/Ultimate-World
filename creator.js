/* =========================================================
   ULTIMATE WORLD
   CREATOR.JS — ULTIMATE CREATOR STUDIO
   ========================================================= */

"use strict";

const UltimateCreator = {

    initialized: false,

    currentProject: null,

    projects: [],

    mode: "apps",

    templates: [

        {
            id: "blank-app",
            name: "Blank App",
            icon: "📱",
            type: "app",
            description: "Start completely from scratch."
        },

        {
            id: "game",
            name: "Game",
            icon: "🎮",
            type: "game",
            description: "Start building your own game."
        },

        {
            id: "website",
            name: "Website",
            icon: "🌐",
            type: "website",
            description: "Create a custom website."
        },

        {
            id: "dashboard",
            name: "Dashboard",
            icon: "📊",
            type: "app",
            description: "Create a powerful dashboard."
        },

        {
            id: "portfolio",
            name: "Portfolio",
            icon: "💼",
            type: "website",
            description: "Create a personal portfolio."
        }

    ]

};


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeCreator
);


function initializeCreator() {

    if (UltimateCreator.initialized) return;

    loadCreatorProjects();

    setupCreatorButtons();

    renderCreator();

    UltimateCreator.initialized = true;

    console.log(
        "🛠️ ULTIMATE CREATOR STUDIO READY"
    );

}


/* =========================================================
   CREATOR BUTTONS
   ========================================================= */

function setupCreatorButtons() {

    document
        .querySelectorAll(
            "[data-open-creator]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                openCreator
            );

        });


    document
        .querySelectorAll(
            "[data-new-project]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openProjectCreator();

                }
            );

        });


    document
        .querySelectorAll(
            "[data-creator-mode]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    setCreatorMode(
                        button.dataset.creatorMode
                    );

                }
            );

        });

}


/* =========================================================
   OPEN CREATOR
   ========================================================= */

function openCreator() {

    if (
        typeof navigateTo ===
        "function"
    ) {

        navigateTo(
            "creator"
        );

    }

    renderCreator();

}


/* =========================================================
   MODE
   ========================================================= */

function setCreatorMode(mode) {

    UltimateCreator.mode =
        mode || "apps";

    renderCreator();

}


/* =========================================================
   RENDER CREATOR
   ========================================================= */

function renderCreator() {

    renderTemplates();

    renderProjects();

}


/* =========================================================
   TEMPLATES
   ========================================================= */

function renderTemplates() {

    const container =
        document.querySelector(
            "[data-creator-templates]"
        );

    if (!container) return;

    container.innerHTML = "";

    UltimateCreator.templates
        .forEach(template => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "creator-template-card";

            card.innerHTML = `

                <div class="creator-template-icon">
                    ${template.icon}
                </div>

                <span class="creator-template-type">
                    ${escapeCreatorText(
                        template.type
                    )}
                </span>

                <h3>
                    ${escapeCreatorText(
                        template.name
                    )}
                </h3>

                <p>
                    ${escapeCreatorText(
                        template.description
                    )}
                </p>

                <button
                    data-template="${template.id}"
                >
                    USE TEMPLATE
                </button>

            `;

            const button =
                card.querySelector(
                    "[data-template]"
                );

            button.addEventListener(
                "click",
                () => {

                    createFromTemplate(
                        template.id
                    );

                }
            );

            container.appendChild(
                card
            );

        });

}


/* =========================================================
   CREATE FROM TEMPLATE
   ========================================================= */

function createFromTemplate(
    templateID
) {

    const template =
        UltimateCreator.templates.find(
            item =>
                item.id === templateID
        );

    if (!template) return;

    const project = {

        id:
            "project-" +
            Date.now(),

        name:
            template.name,

        type:
            template.type,

        icon:
            template.icon,

        description:
            template.description,

        created:
            new Date().toISOString(),

        modified:
            new Date().toISOString(),

        published:
            false,

        screens: [],

        assets: [],

        settings: {

            theme: "default",

            sound: true,

            animations: true

        }

    };

    UltimateCreator.projects.push(
        project
    );

    UltimateCreator.currentProject =
        project.id;

    saveCreatorProjects();

    unlockCreatorAchievement();

    openProjectEditor(
        project
    );

}


/* =========================================================
   NEW PROJECT
   ========================================================= */

function openProjectCreator() {

    const modal =
        document.querySelector(
            "[data-creator-modal]"
        );

    if (!modal) {

        const name =
            prompt(
                "What should your project be called?"
            );

        if (!name) return;

        createCustomProject(
            name,
            "app",
            "📱"
        );

        return;

    }

    modal.innerHTML = `

        <div class="creator-modal-content">

            <button
                data-close-creator-modal
            >
                ×
            </button>

            <span class="creator-modal-icon">
                🚀
            </span>

            <h2>
                Create Something Amazing
            </h2>

            <p>
                Choose a starting point for
                your new Ultimate World project.
            </p>

            <div class="creator-modal-options">

                <button
                    data-create-type="app"
                >
                    📱
                    <strong>App</strong>
                </button>

                <button
                    data-create-type="game"
                >
                    🎮
                    <strong>Game</strong>
                </button>

                <button
                    data-create-type="website"
                >
                    🌐
                    <strong>Website</strong>
                </button>

            </div>

        </div>

    `;

    modal.classList.add(
        "active"
    );


    modal
        .querySelector(
            "[data-close-creator-modal]"
        )
        ?.addEventListener(
            "click",
            closeCreatorModal
        );


    modal
        .querySelectorAll(
            "[data-create-type]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.dataset.createType;

                    closeCreatorModal();

                    const name =
                        prompt(
                            "Name your project:"
                        );

                    if (!name) return;

                    const icon =
                        type === "game"
                            ? "🎮"
                            : type === "website"
                                ? "🌐"
                                : "📱";

                    createCustomProject(
                        name,
                        type,
                        icon
                    );

                }
            );

        });

}


/* =========================================================
   CUSTOM PROJECT
   ========================================================= */

function createCustomProject(
    name,
    type,
    icon
) {

    const project = {

        id:
            "project-" +
            Date.now(),

        name:
            name.trim(),

        type,

        icon,

        description:
            "A project created in Ultimate World.",

        created:
            new Date().toISOString(),

        modified:
            new Date().toISOString(),

        published:
            false,

        screens: [],

        assets: [],

        settings: {

            theme: "default",

            sound: true,

            animations: true

        }

    };

    UltimateCreator.projects.push(
        project
    );

    UltimateCreator.currentProject =
        project.id;

    saveCreatorProjects();

    unlockCreatorAchievement();

    openProjectEditor(
        project
    );

}


/* =========================================================
   PROJECT EDITOR
   ========================================================= */

function openProjectEditor(
    project
) {

    const editor =
        document.querySelector(
            "[data-project-editor]"
        );

    if (!editor) {

        showCreatorMessage(
            `Created "${project.name}" successfully! 🚀`
        );

        return;

    }

    editor.classList.add(
        "active"
    );

    editor.innerHTML = `

        <div class="project-editor">

            <div class="project-editor-top">

                <button
                    data-close-editor
                >
                    ← Back
                </button>

                <div>

                    <span>
                        CREATOR STUDIO
                    </span>

                    <h1>
                        ${escapeCreatorText(
                            project.name
                        )}
                    </h1>

                </div>

                <button
                    data-save-project
                >
                    SAVE
                </button>

            </div>


            <div class="project-editor-grid">

                <aside class="project-tools">

                    <h3>
                        TOOLS
                    </h3>

                    <button
                        data-editor-tool="screen"
                    >
                        🖥️ Screen
                    </button>

                    <button
                        data-editor-tool="text"
                    >
                        🔤 Text
                    </button>

                    <button
                        data-editor-tool="button"
                    >
                        🔘 Button
                    </button>

                    <button
                        data-editor-tool="image"
                    >
                        🖼️ Image
                    </button>

                    <button
                        data-editor-tool="card"
                    >
                        🃏 Card
                    </button>

                    <button
                        data-editor-tool="video"
                    >
                        🎬 Video
                    </button>

                </aside>


                <main
                    class="project-canvas"
                    data-project-canvas
                >

                    <div class="canvas-placeholder">

                        <div>
                            ${project.icon}
                        </div>

                        <h2>
                            Your project starts here
                        </h2>

                        <p>
                            Choose a tool to begin building.
                        </p>

                    </div>

                </main>


                <aside class="project-properties">

                    <h3>
                        PROPERTIES
                    </h3>

                    <label>
                        Project Name
                        <input
                            type="text"
                            value="${escapeCreatorText(
                                project.name
                            )}"
                            data-project-name
                        >
                    </label>

                    <label>
                        Description
                        <textarea
                            data-project-description
                        >${escapeCreatorText(
                            project.description
                        )}</textarea>
                    </label>

                    <label>
                        Theme
                        <select data-project-theme>

                            <option value="default">
                                Default
                            </option>

                            <option value="midnight">
                                Midnight
                            </option>

                            <option value="neon">
                                Neon
                            </option>

                            <option value="minimal">
                                Minimal
                            </option>

                        </select>
                    </label>

                </aside>

            </div>

        </div>

    `;


    setupProjectEditor(
        project
    );

}


/* =========================================================
   EDITOR CONTROLS
   ========================================================= */

function setupProjectEditor(
    project
) {

    const editor =
        document.querySelector(
            "[data-project-editor]"
        );

    if (!editor) return;


    editor
        .querySelector(
            "[data-close-editor]"
        )
        ?.addEventListener(
            "click",
            closeProjectEditor
        );


    editor
        .querySelector(
            "[data-save-project]"
        )
        ?.addEventListener(
            "click",
            () => {

                saveProjectFromEditor(
                    project
                );

            }
        );


    editor
        .querySelector(
            "[data-project-name]"
        )
        ?.addEventListener(
            "input",
            event => {

                project.name =
                    event.target.value;

            }
        );


    editor
        .querySelector(
            "[data-project-description]"
        )
        ?.addEventListener(
            "input",
            event => {

                project.description =
                    event.target.value;

            }
        );


    editor
        .querySelector(
            "[data-project-theme]"
        )
        ?.addEventListener(
            "change",
            event => {

                project.settings.theme =
                    event.target.value;

            }
        );


    editor
        .querySelectorAll(
            "[data-editor-tool]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addEditorElement(
                        project,
                        button.dataset.editorTool
                    );

                }
            );

        });

}


/* =========================================================
   ADD ELEMENT
   ========================================================= */

function addEditorElement(
    project,
    type
) {

    const canvas =
        document.querySelector(
            "[data-project-canvas]"
        );

    if (!canvas) return;


    const element = {

        id:
            "element-" +
            Date.now(),

        type,

        content:
            getDefaultElementContent(
                type
            )

    };


    project.screens.push(
        element
    );

    project.modified =
        new Date().toISOString();


    const visual =
        document.createElement(
            "div"
        );

    visual.className =
        "creator-canvas-element";

    visual.dataset.elementID =
        element.id;

    visual.innerHTML = `

        <span>
            ${getElementIcon(type)}
        </span>

        <strong>
            ${escapeCreatorText(
                element.content
            )}
        </strong>

    `;


    const placeholder =
        canvas.querySelector(
            ".canvas-placeholder"
        );

    if (placeholder) {
        placeholder.remove();
    }


    canvas.appendChild(
        visual
    );


    saveCreatorProjects();

}


/* =========================================================
   DEFAULT ELEMENTS
   ========================================================= */

function getDefaultElementContent(
    type
) {

    const content = {

        screen:
            "New Screen",

        text:
            "Your text here",

        button:
            "Click Me",

        image:
            "Image",

        card:
            "New Card",

        video:
            "Video"

    };


    return content[type] ||
        "New Element";

}


function getElementIcon(
    type
) {

    const icons = {

        screen: "🖥️",

        text: "🔤",

        button: "🔘",

        image: "🖼️",

        card: "🃏",

        video: "🎬"

    };


    return icons[type] ||
        "✨";

}


/* =========================================================
   SAVE PROJECT
   ========================================================= */

function saveProjectFromEditor(
    project
) {

    project.modified =
        new Date().toISOString();

    saveCreatorProjects();

    showCreatorMessage(
        "Project saved successfully 💾"
    );

}


/* =========================================================
   PROJECT LIST
   ========================================================= */

function renderProjects() {

    const container =
        document.querySelector(
            "[data-creator-projects]"
        );

    if (!container) return;

    container.innerHTML = "";


    if (
        !UltimateCreator.projects.length
    ) {

        container.innerHTML = `

            <div class="creator-empty">

                <div>
                    🚀
                </div>

                <h3>
                    No projects yet
                </h3>

                <p>
                    Create your first project
                    and bring your idea to life.
                </p>

            </div>

        `;

        return;

    }


    UltimateCreator.projects
        .forEach(project => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "creator-project-card";

            card.innerHTML = `

                <div class="creator-project-icon">
                    ${project.icon}
                </div>

                <div class="creator-project-info">

                    <span>
                        ${escapeCreatorText(
                            project.type
                        )}
                    </span>

                    <h3>
                        ${escapeCreatorText(
                            project.name
                        )}
                    </h3>

                    <p>
                        ${escapeCreatorText(
                            project.description
                        )}
                    </p>

                </div>

                <button
                    data-edit-project="${project.id}"
                >
                    OPEN
                </button>

            `;


            card
                .querySelector(
                    "[data-edit-project]"
                )
                .addEventListener(
                    "click",
                    () => {

                        UltimateCreator.currentProject =
                            project.id;

                        openProjectEditor(
                            project
                        );

                    }
                );


            container.appendChild(
                card
            );

        });

}


/* =========================================================
   CLOSE EDITOR
   ========================================================= */

function closeProjectEditor() {

    const editor =
        document.querySelector(
            "[data-project-editor]"
        );

    if (editor) {

        editor.classList.remove(
            "active"
        );

        editor.innerHTML = "";

    }

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeCreatorModal() {

    const modal =
        document.querySelector(
            "[data-creator-modal]"
        );

    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   ACHIEVEMENT
   ========================================================= */

function unlockCreatorAchievement() {

    if (
        typeof unlockAchievement ===
        "function"
    ) {

        unlockAchievement(
            "creator"
        );

    }

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showCreatorMessage(
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
        "CREATOR:",
        message
    );

}


/* =========================================================
   STORAGE
   ========================================================= */

function saveCreatorProjects() {

    try {

        localStorage.setItem(
            "ultimate-world-projects",
            JSON.stringify(
                UltimateCreator.projects
            )
        );

    } catch (error) {

        console.warn(
            "Could not save creator projects.",
            error
        );

    }

}


function loadCreatorProjects() {

    try {

        const saved =
            localStorage.getItem(
                "ultimate-world-projects"
            );

        if (!saved) return;

        const projects =
            JSON.parse(saved);

        if (
            Array.isArray(projects)
        ) {

            UltimateCreator.projects =
                projects;

        }

    } catch (error) {

        console.warn(
            "Could not load creator projects.",
            error
        );

    }

}


/* =========================================================
   ESCAPE TEXT
   ========================================================= */

function escapeCreatorText(
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

window.UltimateWorldCreator = {

    state:
        UltimateCreator,

    templates:
        UltimateCreator.templates,

    projects:
        UltimateCreator.projects,

    open:
        openCreator,

    create:
        createCustomProject,

    render:
        renderCreator,

    editor:
        openProjectEditor

};


/* =========================================================
   READY
   ========================================================= */

console.log(
    "%c🛠️ ULTIMATE WORLD CREATOR STUDIO",
    "font-size:22px;font-weight:bold;"
);

console.log(
    "Creator engine loaded."
);
