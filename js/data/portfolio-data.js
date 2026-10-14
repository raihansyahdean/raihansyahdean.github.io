// ════════════════════════════════════════════════════════════════════════
// js/data/portfolio-data.js
// ALL the content for every portfolio page lives here. The pages
// themselves (portfolios/*.html) are ~20-line shells that name which
// entry to render — so editing this file updates every page at once.
//
// Four parts:
//   1. SHARED   — identical on every portfolio page
//   2. SKILLS   — every skill, defined once. Pages pick from it.
//   3. PROJECTS — every project, defined once. Pages pick from it.
//   4. PORTFOLIOS — what's different per page: story, which skills,
//                   which projects, headings.
//
// Paths are written from the SITE ROOT ("images/..." not "../images/...").
// The renderer adds the ../ automatically.
// ════════════════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────────────────────────────────
// 1. SHARED — change once, every portfolio page updates
// ─────────────────────────────────────────────────────────────────────────
const PORTFOLIO_SHARED = {
    name: 'Raihansyah A. Andrian',

    profileImage: 'images/Profile-1.jpg',
    profileAlt:   'Raihansyah Andrian',

    stats: [
        { number: '7+',  label: 'Years Experience' },
        { number: '10+', label: 'Projects Completed' },
        { number: '3',   label: 'Shipped Games' }
        // A 4th card wraps onto its own row — the grid is 3 wide.
    ],

    quote: {
        text:   "It's not about ideas. It's about making ideas happen.",
        author: '— Dean'
    },

    thankYou: {
        title: 'Thank You for Visiting!',
        text:  "Feel free to explore my projects and get in touch if you'd like to collaborate."
    },

    // Button under the featured projects. Set to null to hide it everywhere,
    // or override per portfolio with `allProjectsButton: null`.
    allProjectsButton: { label: 'View All Projects', href: 'projects.html' }
};


// ─────────────────────────────────────────────────────────────────────────
// 2. SKILLS — define each one ONCE here
//    tone: 'light' for dark logos, 'dark' for light logos. Omit icon for
//    skills with no logo (they render as plain text).
// ─────────────────────────────────────────────────────────────────────────
const SKILL_LIBRARY = {
    // Engines & languages
    unity:        { name: 'Unity',              level: 10, icon: 'images/tools/Unity.svg',         tone: 'light' },
    unreal:       { name: 'Unreal Engine',      level:  8, icon: 'images/tools/Unreal Engine.svg', tone: 'light' },
    godot:        { name: 'Godot Engine',       level:  9, icon: 'images/tools/Godot Engine.svg',  tone: 'light' },
    csharp:       { name: 'C#',                 level:  10, icon: 'images/tools/CSharp.svg',        tone: 'dark'  },
    cpp:          { name: 'C++',                level:  9, icon: 'images/tools/CPP.svg',           tone: 'dark'  },
    opengl:       { name: 'Computer Graphics',  level:  8, icon: 'images/tools/OpenGL.svg',        tone: 'light' },

    // Tools
    maya:         { name: '3D Art & Animation', level:  7, icon: 'images/tools/Maya.png',          tone: 'dark'  },
    perforce:     { name: 'Perforce',           level:  8, icon: 'images/tools/Perforce.png',      tone: 'light' },
    git:          { name: 'Git',                level:  10, icon: 'images/tools/Git.svg',           tone: 'dark'  },
    wwise:        { name: 'Wwise',              level:  8, icon: 'images/tools/wwise.png',         tone: 'dark'  },
    reaper:       { name: 'Reaper',             level:  7, icon: 'images/tools/Reaper.png',        tone: 'light' },

    // Disciplines (no logo)
    producing:    { name: 'Game Producing',              level: 10 },
    design:       { name: 'Game Design',                 level:  9 },
    engineering:  { name: 'Game Engineering',            level:  8 },
    audio:        { name: 'Game Audio',                  level:  7 },
    gameArt:      { name: 'Game Art',                    level:  6 },
    narrative:    { name: 'Game Narrative',              level:  5 },
    levelDesign:  { name: 'Level Design',                level:  8 },
    systemsDesign:{ name: 'Systems & Mechanics Design',  level:  9 },
    balancing:    { name: 'Game Balancing',              level:  8 },
    techArtAnim:  { name: 'Technical Art - Animation',   level:  8 },
    techArtVFX:   { name: 'Technical Art - VFX',         level:  7 },
    jira:         { name: 'Jira & Task Tracking Tools',  level:  9 },
    scrum:        { name: 'Scrum & Agile Development',   level:  9 }
};


// ─────────────────────────────────────────────────────────────────────────
// 3. PROJECTS — define each one ONCE here
//
//    media types:
//      { type: 'image',   src: 'images/...', alt: '...' }
//      { type: 'video',   src: 'videos/...' }          (loops silently)
//      { type: 'video',   src: 'videos/...', controls: true }
//      { type: 'youtube', id: '11-char-id' }
//
//    detail: path to a detail page. Omit it and the card isn't clickable.
// ─────────────────────────────────────────────────────────────────────────
const PROJECT_LIBRARY = {
    elementary: {
        title: 'Elementary',
        badges: ['Unity 3D', 'Adventure', 'Roguelike', 'Windows PC'],
        media: { type: 'video', src: 'videos/Elementary/Polish - Casting.mp4', controls: true },
        desc: "As a mage who can manipulate the environment in various ways by harnessing the four elemental powers, explore an abandoned temple in order to discover it's deepest and darkest secrets."
    },

    ikSkinning: {
        title: 'IK & Skinning',
        badges: ['Kinematics', 'IK', 'FK', 'Skinning', 'Dual Quaternions'],
        media: { type: 'video', src: 'videos/IK Skinning/HandPose.mp4', controls: true, alt: 'Underwater Shader Cover' },
        desc: 'A C++ simulation of inverse kinematics with skinning based on object meshes and rigging. Uses various methods of skinning and IK.',
    },

    covidColony: {
        title: 'Covid Colony',
        badges: ['Unity 2D', 'Platformer', 'Shooter', 'Educational'],
        media: { type: 'image', src: 'images/projects/Covid Colony/World Exploration.png', alt: 'Covid Colony Cover' },
        desc: 'An action based platforming game combined with side-scroller mechanics and puzzles with the intention to tell people regarding the dangers of the COVID 19 virus.'
    },

    reminiscence: {
        title: 'Reminiscence',
        badges: ['Godot 2D', 'Puzzle', 'Story Driven', 'Multiple Endings'],
        media: { type: 'image', src: 'images/projects/Reminiscence/World Look 2.png', alt: 'Reminiscence Cover' },
        desc: 'A short, story-based puzzle game where a space explorer got lost in a distant alien planet. Players decisions in solving the puzzles will impact the outcome of the story.'
    },

    underwaterShader: {
        title: 'Underwater Shader',
        badges: ['Unity 3D', 'C#', 'Procedural Generation', 'HLSL Shader'],
        media: { type: 'image', src: 'images/projects/Underwater Shader - Cover.png', alt: 'Underwater Shader Cover' },
        desc: 'An underwater scene shader that simulates light filtration through an aqueous medium by rendering caustics in the scene, both projected onto objects and as shafts of light filtering through the medium.',
        detail: 'pages-projects/underwater-shader.html'
    },

    lightGrows: {
        title: 'Light Grows',
        badges: ['Unity 2D', 'Platformer', 'Parkour', 'Hand-drawn'],
        media: { type: 'image', src: 'images/projects/Light Grows - Cover.png', alt: 'Light Grows Cover' },
        desc: 'A parkour-platformer game with various movement mechanics built in a hand-drawn visual world. Players follow Lumi, a small bunny, on the search for the cause of sudden destruction in her forest.'
    },

    pitchIt: {
        title: 'Pitch It!',
        badges: ['Board Game', 'Card Game', 'Social', '4 Players'],
        media: { type: 'image', src: 'images/projects/Pitch It - Cover.jpg', alt: 'Pitch It! Cover' },
        desc: 'A 4-player game where players scramble to sell the most ridiculous products they can dream up before time runs out. Each round, one player becomes the "Shark", deciding which idea actually lands.'
    },

    formulaFaceoff: {
        title: 'Formula Faceoff',
        badges: ['Board Game', '1v1', 'Strategy', 'Memory'],
        media: { type: 'image', src: 'images/projects/Formula FaceOff - Cover.jpg', alt: 'Formula Faceoff Cover' },
        desc: 'A 1v1 strategy and memory game where players play as rival scientists looking to steal the other half of a new monster formula, each setting up their own maze to defend their half.'
    },

    unrealLogic: {
        title: 'Unreal Logic',
        badges: ['Godot 2D', 'Puzzle', 'Solo Developer'],
        media: { type: 'image', src: 'images/projects/Unreal Logic - Cover.png', alt: 'Unreal Logic Cover' },
        desc: 'A grid based puzzle game where you can change the foundational rules of the world. Change how the game works, repurpose things you find, and find surprising interactions.'
    },

    pulsePole: {
        title: 'Pulse & Pole',
        badges: ['Unreal Engine', 'Rhythm', '3D'],
        media: { type: 'image', src: 'images/projects/Pulse and Pole - Cover.png', alt: 'Pulse & Pole Cover' },
        desc: 'A rhythm-based combat game where you control two magnetic forces, one positive and one negative, defeating an enemy between them by matching your inputs to the beat of the music.'
    },

    rubeGoldberg: {
        title: 'Rube Goldberg Animation',
        badges: ['Maya', 'Animation', '3D Modelling', 'Cinematics'],
        media: { type: 'image', src: 'images/projects/Rube Goldberg - Cover.png', alt: 'Rube Goldberg Cover' },
        desc: 'A personalized Rube-Goldberg machine made in Maya using basic animation principles, with custom 3D models and a final cinematic clip using fundamentals of cinematography and lighting.'
    }
};


// ─────────────────────────────────────────────────────────────────────────
// 4. PORTFOLIOS — what differs per page
//
//    skills:   [['skillKey', level], ...]  — order here is display order
//    projects: ['projectKey', ...]  or  { id, media, detail } to override
//              that project's cover or detail page for THIS page only
//
//    Optional per page:
//      order:            ['hero','stats','projects','skills','quote','thanks']
//      allProjectsButton: null            — hide the button on this page
//      extraSections:    { myKey: '<section>…</section>' }  — then put
//                        'myKey' in `order` where it should appear
// ─────────────────────────────────────────────────────────────────────────
const PORTFOLIOS = {

    producer: {
        title:    'Producer Portfolio',       // browser tab
        subtitle: 'Game Producer',

        story: `
            Hello there! My name is Raihansyah but you can call me <span class="highlight-purple">Dean</span>.
            I am a passionate <span class="highlight-orange">game producer</span> from Indonesia!
            Currently I am pursuing my Master's in Computer Science of game development at University of Southern California (USC).

            My expertise in game production lies in my <span class="highlight">understanding across multiple disciplines</span>
            and how they need to work together in order to create a single unit that is both
            <span class="highlight-orange">efficient</span> and able to produce <span class="highlight-orange">excellent results.</span>

            As a producer, I value being able to <span class="highlight">communicate well</span> with different parts of the team
            in their own <span class="highlight">preferred languages and terms</span>
            so it is easier for them to understand what's needed to be done.

            My goal as a developer is to create <span class="highlight-purple">engaging and innovative experiences.</span>
        `,

        projectsSubtitle: 'My Best Production Work',
        projects: [
            'elementary',
            'reminiscence'
        ],

        skillsHeading: 'Production Skills',
        skills: [
            'unity',
            'unreal',
            'jira',
            'scrum',
            'perforce',
            'git',
            'engineering',
            'design'
        ]
    },

    designer: {
        title:    'Designer Portfolio',
        subtitle: 'Game Designer',

        story: `
            Hello there! My name is Raihansyah but you can call me <span class="highlight-purple">Dean</span>.
            I am a passionate <span class="highlight-orange">game designer</span> from Indonesia!
            Currently I am pursuing my Master's in Computer Science of game development at University of Southern California (USC).

            I am particularly interested in game design because there is <span class="highlight">unlimited potential</span>
            in how we can create games, and what we create are the <span class="highlight-orange">"Aha!"</span> and
            <span class="highlight-orange">jaw-dropping</span> moments that players get excited about.

            I start design development by staking out the foundation of the narrative world-building
            and experience goal of the game.

            After a base is set in stone, I would <span class="highlight-purple">collaboratively iterate</span> on the particular
            systems that would support that foundation through <span class="highlight-orange">prototyping</span>
            and <span class="highlight-orange">balancing</span>.

            As a designer, I value being able to <span class="highlight">document</span> my design decisions well
            so that the game can be implemented and visualized as intended.

            My goal as a developer is to create <span class="highlight-purple">engaging and innovative experiences.</span>
        `,

        projectsSubtitle: "Games I've Designed",
        projects: [
            'elementary',
            'covidColony',
            'reminiscence'
        ],

        skillsHeading: 'Design Skills',
        skills: [
            'unity',
            'unreal',
            'levelDesign',
            'systemsDesign',
            'csharp',
            'cpp',
            'perforce',
            'git',
        ]
    },

    'technical-artist': {
        title:    'Technical Art Portfolio',
        subtitle: 'Technical Artist',

        story: `
            Hello there! My name is Raihansyah but you can call me <span class="highlight-purple">Dean</span>.
            I am a passionate <span class="highlight-orange">technical artist</span> from Indonesia!
            Currently I am pursuing my Master's in Computer Science of game development at University of Southern California (USC).

            Technical art is a field that I feel a lot of people don't fully understand, yet you can do 
            so many things in it such as <span class="highlight">modeling, rigging, animation, and VFX</span>.

            Having a strong background in <span class="highlight-purple">mathematics</span> 
            and <span class="highlight-purple">computer science</span>, 
            I have always loved how we can use 
            them to create extraordinary things. 

            This field is a direct application of it since 
            I can <span class="highlight-orange">clearly show</span> what I am creating and be proud of it.
            
            I have first-hand experience in applying several <span class="highlight">methods of rendering</span> 
            including applying it in game engines.

            I also have knowledge of how to create animation using 
            both a <span class="highlight-orange">3D software</span> such as <span class="highlight-orange">Maya</span> or 
            <span class="highlight-orange">computer generated</span> based as well. These include basic methods of
            <span class="highlight">motion capture interpolation, skinning, and inverse-kinematics</span> (IK).

            My goal as a developer is to create <span class="highlight-purple">engaging and innovative experiences.</span>
        `,

        projectsSubtitle: 'Shaders and Animation Work',
        projects: [
            'ikSkinning',
            'underwaterShader'
        ],

        skillsHeading: 'Technical Art Skills',
        skills: [
            'unity',
            'unreal',
            'opengl',
            'cpp',
            'csharp',
            'maya',
            'techArtAnim',
            'techArtVFX',
            'perforce',
            'git',
        ]
    }
};
