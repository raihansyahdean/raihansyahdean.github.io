// ════════════════════════════════════════════════════════════════════════
// js/data/project-pages.js
// Content for every project / experience DETAIL page.
// The pages themselves (pages-projects/*.html) are ~20-line shells.
//
// EVERY SECTION IS OPTIONAL. Leave a key out and that section isn't
// rendered — no empty heading, no gap. A small project can be 15 lines.
//
// Lists and paragraphs may contain HTML, so these all work:
//     <span class="highlight">blue</span>
//     <span class="highlight-orange">orange</span>
//     <span class="highlight-purple">purple</span>
//     <a href="…" class="highlight-link" target="_blank">a link</a>
//
// Media objects, usable anywhere media is allowed:
//     { type: 'image',   src: 'images/…', alt: '…' }
//     { type: 'video',   src: 'videos/…' }                   loops silently
//     { type: 'video',   src: 'videos/…', controls: true }   loops + controls
//     { type: 'video',   src: 'videos/…', controls: true, autoplay: false }
//     { type: 'youtube', id: 'dQw4w9WgXcQ' }
//
// Paths are written from the SITE ROOT ("images/…" not "../images/…").
// The renderer adds the ../ automatically.
// ════════════════════════════════════════════════════════════════════════

const PROJECT_PAGES = {

    // ═════════════════════════════════════════════════════════════════
    // A REAL PAGE — your existing Underwater Shader write-up.
    // Compare it with the commented template below to see the shape.
    // ═════════════════════════════════════════════════════════════════
    'underwater-shader': {
        title:    'Underwater Shader Graphics Project',
        subtitle: 'University of Southern California | October 2025 - December 2025',

        slides: [
            { type: 'video', src: 'videos/Underwater Shader/Final Scene 3.mp4' },
            { type: 'image', src: 'images/projects/Underwater Shader/Side View.png',      alt: 'Complete Sideshot' },
            { type: 'image', src: 'images/projects/Underwater Shader/Caustics Decal.png', alt: 'Caustics Sideshot' },
            { type: 'image', src: 'images/projects/Underwater Shader/Godrays 2.png',      alt: 'Godrays Sideshot' }
        ],

        description: `
            This project sought to represent two different phenomena regarding how light interacts with water.
            To be specific, it aims to render an <span class="highlight">underwater scene</span> featuring both
            <span class="highlight-purple">water caustics and "god rays"</span> (beams of light coming from the water's surface).
            Initially, the methods for rendering the caustics and the god rays were intended to be directly linked.
            This is because it was believed that rendering one (in this case, the god rays) would necessarily beget the other (the caustics).
            However, further research indicated that these phenomena are seldom rendered in this way and are usually created with separate methods.
            Therefore, this project implements god rays with <span class="highlight-orange">ray marching</span> as a shader effect
            and caustics with 3-dimensional <span class="highlight-orange">Worley noise</span>.
        `,

        info: [
            {
                heading: 'Project Details',
                items: [
                    'Team size: 4 developers',
                    'Duration: 2 months',
                    'Engine: Unity 6.2',
                    'Platform: PC',
                    'My Role: Technical Artist'
                ]
            },
            {
                heading: 'Goals',
                items: [
                    "Create a shader that's capable of showing an underwater scene",
                    'Implement our own 3D Worley noise to generate caustics',
                    'Use ray marching in order to render god rays in the water volume',
                    'Rendering both parts simultaneously in engine',
                    'Animate both parts simulating a real underwater scene'
                ]
            },
            {
                heading: 'Constraints',
                items: [
                    'Tight 2-month deadline',
                    'Real-time rendering and animation required for both parts',
                    'Custom 3D Worley noise generation',
                    'Custom volumetric rendering for the volume of water'
                ]
            }
        ],

        process: [
            {
                title: 'Research & Planning',
                points: [
                    'Conducted research to existing approaches',
                    'Comparing methods of rendering god rays via ray tracing vs ray marching',
                    'Figuring out which formula to use in order to represent light attenuation through water',
                    'Looking into how to best generate the Worley noise for caustics that is then capable of being animated in real time',
                    'Planning of how the final scene would look like'
                ]
            },
            {
                title: 'Methods & Development',
                points: [
                    'Setting up the git project',
                    'Implemented algorithm for generating 3D Worley noise',
                    'Animating the 3D Worley noise',
                    'Implemented algorithm for volumetric rendering of the water',
                    'Animating the volume of water with god rays'
                ]
            },
            {
                title: 'Polishing & The Scene',
                points: [
                    'Building the scene in Unity with 3D objects',
                    'Created the caustics to be a "Decal" material',
                    'Finding good colors for both parts',
                    'Testing out various settings in order to produce the best results'
                ]
            }
        ],

        breakdown: [
            {
                title: 'Existing Methods',
                points: [
                    'Rendering realistic god rays with a custom volume renderer by <a href="https://open.clemson.edu/cgi/viewcontent.cgi?referer=&httpsredir=1&article=3047&context=all_theses" class="highlight-link" target="_blank" rel="noopener">Gowthaman Ilango</a>',
                    'Rendering real-time underwater caustics and godrays by <a href="https://graphics.cs.aueb.gr/graphics/docs/papers/GraphiCon09_PapadopoulosPapaioannou.pdf" class="highlight-link" target="_blank" rel="noopener">C. Papadopoulos and G. Papaioannou</a>'
                ],
                media: { type: 'image', src: 'images/projects/Underwater Shader/Godrays Theory.png', alt: 'God Rays Algo' }
            },
            {
                title: 'Developing the Solution',
                points: [
                    'An algorithm that is capable of <span class="highlight-purple">generating caustics</span> which can be animated over time',
                    'An algorithm that is capable of rendering a <span class="highlight-purple">volume of water</span> with god rays visible on several regions of the volume',
                    'Applying both algorithm on an underwater scene in <span class="highlight-orange">real-time</span>'
                ],
                media: { type: 'image', src: 'images/projects/Underwater Shader/Caustics Decal.png', alt: 'Caustics Decal' }
            },
            {
                title: 'Evaluation',
                points: [
                    'Applying the caustics texture not only on a plane but also on <span class="highlight-orange">objects</span>',
                    '<span class="highlight-orange">Fine-tuning</span> the god rays algorithm in order to still be able to render in real-time',
                    'Taking a <span class="highlight-purple">specific angle shot</span> to render the final underwater scene'
                ],
                media: { type: 'image', src: 'images/projects/Underwater Shader - Cover.png', alt: 'Polished Shot' }
            }
        ],

        stages: [
            {
                navLabel: 'Algorithm 1: Caustics',
                number:   'Algorithm 01',
                title:    'Caustics Algorithm',

                problem: `
                    Need some noise generation algorithm that can simulate water caustics that changes seamlessly through time.
                    The noise would also need to be rendered to a plane to visualize the bottom floor of the sea level.
                `,
                solution: `
                    Implement an algorithm that would generate 3D Worley noise data. Each slice represents one timestep of the animation.
                    Animating it would then only be traversing the slices on the z-axis.
                `,

                features: [
                    {
                        title: '3D Worley Noise',
                        points: [
                            'Using Unity\'s <a href="https://docs.unity3d.com/Manual/urp/urp-introduction.html" class="highlight-link" target="_blank" rel="noopener">Universal Render Pipeline</a> as the base system of the project',
                            'Created an algorithm that would generate <span class="highlight-purple">3D Worley</span> noise',
                            'Using <span class="highlight-orange">C#</span> script to compute the values',
                            'Generate random points three-dimensional space to serve as the centers of the Worley cells',
                            'Apply nearest-neighbor algorithm to compute noise value at each point in the volume'
                        ],
                        media: { type: 'image', src: 'images/projects/Underwater Shader/3D Worley.png', alt: '3D Worley' }
                    },
                    {
                        title: 'Generating on a Plane',
                        points: [
                            'Sampling a <span class="highlight-purple">single slice</span> of the Worley field along the <span class="highlight-orange">x-z plane</span>',
                            'Moving along the <span class="highlight-orange">y-axis</span> for every slice over time',
                            'First iteration of the caustics shown on the video. Caustics are seen but still black and white in color.'
                        ],
                        media: { type: 'video', src: 'videos/Underwater Shader/Worley 3D Early.mp4' }
                    },
                    {
                        title: 'Animating',
                        points: [
                            'By slicing the 3D Worley noise on the y-axis over time, it was able to generate seamless animation that resembles caustics',
                            'Added <a href="https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-2-rendering-water-caustics" class="highlight-link" target="_blank" rel="noopener">distortion</a> so that portions of the caustics varied according to the simulated high and low tides of the ocean surface',
                            'The color of each pixel was subsequently determined by <span class="highlight-purple">interpolating among three colors:</span> white, light blue, and deep blue, to achieve the desired caustic effect.'
                        ],
                        media: { type: 'image', src: 'images/projects/Underwater Shader/Caustics Theory.png', alt: 'Caustics Algo' }
                    }
                ],

                results: {
                    text: `
                        This algorithm was capable to simulate <span class="highlight-purple">realistic</span> caustic effects that is done in
                        <span class="highlight-purple">real-time</span> on a single plane.
                        The algorithm was also able to show an animation of the caustic that is <span class="highlight">seamless</span>
                        and can be made to <span class="highlight">loop infinitely</span>.
                        In its current state, this Worley texture cannot be directly applied to the scene.
                        The output image would need to be blended with every object's base color texture and then meticulously scaled
                        to look even and continuous across every object.
                    `,
                    media: { type: 'video', src: 'videos/Underwater Shader/Water Caustics Mid.mp4' }
                }
            },

            {
                navLabel: 'Algorithm 2: God Rays',
                number:   'Algorithm 02',
                title:    'God Rays',

                problem: `
                    Need for a way to be able to render a volume of water with varying light intensity.
                    Some parts of the water would need to be seen as transparent while others are brighter.
                `,
                solution: `
                    Implement a custom shader that utilizes raymarch to simulate god rays in a volume of water.
                `,

                features: [
                    {
                        title: 'HLSL & Shader Graph',
                        points: [
                            'Implemented using custom <span class="highlight-purple">HLSL</span> shader code',
                            'Combine with Unity\'s built-in <a href="https://docs.unity3d.com/Packages/com.unity.shadergraph@17.5/manual/index.html" class="highlight-link" target="_blank" rel="noopener">Shader Graph</a>'
                        ]
                    },
                    {
                        title: 'Volumetric Rendering',
                        points: [
                            'Treating the water as a single <a href="https://www.youtube.com/watch?v=hXYOlXVRRL8" class="highlight-link" target="_blank" rel="noopener">homogenous volume</a>',
                            'Perform <span class="highlight-purple">raymarch</span> in the volume of water, sampling a <span class="highlight-purple">water density</span>. In our case, uniform water density was assumed.',
                            'At each step of the primary raymarch, perform a <span class="highlight-orange">secondary raymarch</span> towards the light.',
                            'On each step of the secondary raymarch, sample a <span class="highlight-orange">3D Simplex noise</span> representing light density within the volume'
                        ],
                        media: { type: 'image', src: 'images/projects/Underwater Shader/Godrays Theory.png', alt: 'Godrays Algo' }
                    },
                    {
                        title: "Beer's Law",
                        points: [
                            'Using the accumulated light density from the secondary raymarch to compute the <span class="highlight-purple">shadow</span> value',
                            '<a href="https://www.sciencefacts.net/beer-lambert-law.html" class="highlight-link" target="_blank" rel="noopener">Beer\'s Law</a> is the formula used to calculate <span class="highlight-purple">final light contribution</span> at each point in the volume',
                            'The accumulated final light values, taken from each step of the primary raymarch, is then used to generate the <span class="highlight-purple">color</span> of each pixel by <span class="highlight">interpolating</span> between shadow color and god ray light color',
                            'The accumulated water density was then also applied through Beer\'s Law to determine the <span class="highlight-purple">alpha</span> value of each pixel',
                            'Pass the interpolated color and alpha to the fragment shader'
                        ],
                        media: { type: 'image', src: "images/projects/Underwater Shader/Beer's Law.jpg", alt: "Beer's Law" }
                    }
                ],

                results: {
                    text: `
                        This algorithm is capable to simulate <span class="highlight-purple">realistic</span> god rays that is done in
                        <span class="highlight-purple">real-time</span>.
                        Albeit some fine tuning of the parameters are required as the <span class="highlight">shorter</span> the step
                        <span class="highlight">more computations</span> are needed.
                        The algorithm also takes into consideration the <span class="highlight-orange">direction</span> of the light source.
                        The god rays are also seen <span class="highlight-orange">refracted</span> inside the volume water giving a more realistic look.
                    `,
                    media: { type: 'video', src: 'videos/Underwater Shader/God Rays.mp4' }
                }
            },

            {
                navLabel: 'Polishing & Optimization',
                number:   'Bringing it Together',
                title:    'Polishing & Optimization',

                problem: `
                    A good underwater scene with several objects on floor level with varying materials and textures.
                    Caustics should be rendered on top of each object not only on the seafloor plane.
                    God rays should also run on top of it and caustics as well as the objects can still be seen clearly.
                `,
                solution: `
                    Implement a single scene and fine-tune the variables so that both algorithms can run in real time.
                    Converted the generated Worley textures to decal material.
                    Adjusted the volume of water and god rays algorithm parameters.
                `,

                features: [
                    {
                        title: 'Building the Scene',
                        points: [
                            'Requires some models and textures of an underwater scene.',
                            'An underwater shot with <span class="highlight-purple">caustics</span> on the ground and on some objects.',
                            'A <span class="highlight-purple">volume of water with god rays</span> visible in it'
                        ]
                    },
                    {
                        title: 'Decal Material',
                        points: [
                            '<span class="highlight-orange">Blend</span> the Worley texture with every object\'s base color texture',
                            'Scale the blended texture to keep it look <span class="highlight-orange">even and continuous</span> across every object',
                            'Using Unity\'s <a href="https://docs.unity3d.com/6000.3/Documentation/Manual/visual-effects-decals.html" class="highlight-link" target="_blank" rel="noopener">decal</a> system'
                        ],
                        media: { type: 'video', src: 'videos/Underwater Shader/Caustics Decal.mp4', controls: true, autoplay: false }
                    },
                    {
                        title: 'Animating God Rays',
                        points: [
                            'Similar to the caustics, move over the Simplex 3D noise over time',
                            'Also changing the direction of the light to simulate light coming from different directions',
                            'Showing that some parts of the volume of water remain <span class="highlight-orange">transparent</span> while others exhibit <span class="highlight-orange">lighter blue shading</span> representing areas affected by god rays',
                            'God rays appear to originate from a <span class="highlight-purple">single directional light source</span>. But within the water, the god rays are <span class="highlight-purple">refracted</span> effectively and does not remain parallel'
                        ],
                        media: { type: 'image', src: 'images/projects/Underwater Shader/Godrays 2.png', alt: 'God Rays Shot' }
                    }
                ],

                results: {
                    text: `
                        By building a scene and applying a decal material to our caustics, we were able to render the caustics
                        <span class="highlight">on top of several objects</span>.
                        The caustics also didn't break and still look <span class="highlight">seamless when animated over time</span>.
                        <span class="highlight-purple">Fine-tuning</span> the god rays parameters also allows the scene to still be rendered
                        particularly well with all components present.
                        It can be seen quite well on the final render shot that the caustics are moving underneath the volume of water
                        and on the objects in the scene while on top of them god rays are seemingly visible that are refracted in
                        different directions but still seemingly originated from one direction.
                    `
                }
            }
        ],

        finalResults: {
            text: `
                As a result, we managed to render an underwater scene with two phenomenas regarding how light interacts with water.
                Both water caustics and god rays are present and are animated in real time.
            `,
            media: { type: 'video', src: 'videos/Underwater Shader/Final Scene 3.mp4', controls: true }
        },

        takeaways: [
            { lead: 'Procedural Generation:', text: 'Great practice of using several procedural generation algorithms in order to create various noise generation used for both caustics and god rays generation' },
            { lead: 'Volumetric Rendering:',  text: 'Gained valuable experience in implementing the raymarching method to render a volumetric object with varying colors and transparency' },
            { lead: 'Shader programming:',    text: 'Gained experience in developing my own shaders in HLSL and applying it inside a game engine to render a combination of results' },
            { lead: 'Utilizing Engine:',      text: "Capability to develop custom made algorithms and integrating it inside an existing engine then utilizing it's capabilities to deliver an excellent combinations of elements" },
            { lead: 'Optimization:',          text: 'Developed a deeper understanding of fine tuning parameters such that algorithms would still run in real-time and able to be rendered in the scene seamlessly' }
        ]

        // No externalLink — the button simply doesn't render.
    },


    // ═════════════════════════════════════════════════════════════════
    // THE TEMPLATE — copy this, rename the key to match your file name
    // (pages-projects/my-game.html → 'my-game') and delete what you
    // don't need. Every key below is optional.
    // ═════════════════════════════════════════════════════════════════
    'template': {
        title:    '[Project Name]',
        subtitle: '[Role] | [Date Range]',

        // Rename any heading for this project. Defaults:
        //   details 'Project Details', process 'Process',
        //   breakdown 'Detailed Breakdown', solutions 'Key Solutions',
        //   stageResults 'Stage Results', finalResults 'Final Results',
        //   takeaways 'Takeaways', takeawaysSub 'Project Insights & Learnings'
        // labels: { details: 'Game Details' },

        // ── SECTION 1 ────────────────────────────────────────────────
        // Any number of slides, images and videos mixed freely. The first
        // shows first, dots are generated one per slide, and a single
        // slide hides the arrows and dots by itself.
        slides: [
            { type: 'video', src: 'videos/project-demo.mp4', controls: true },
            { type: 'image', src: 'images/projects/screenshot1.jpg', alt: 'Screenshot 1' },
            { type: 'image', src: 'images/projects/screenshot2.jpg', alt: 'Screenshot 2' }
        ],

        // Add this if a slide gets cropped badly (default is 'cover'):
        // slideFit: 'contain',

        description: `
            [The concept, the story, the mechanics, and what makes this project
            unique. HTML works here, so <span class="highlight">highlight</span> the
            terms that matter.]
        `,

        // Any number of boxes, any number of items in each.
        info: [
            { heading: 'Project Details', items: ['Team size: 5 developers', 'Duration: 18 months', 'Engine: Unity 2022', 'Platform: PC', 'My Role: Lead Programmer'] },
            { heading: 'Goals',           items: ['[Goal 1]', '[Goal 2]', '[Goal 3]'] },
            { heading: 'Constraints',     items: ['[Constraint 1]', '[Constraint 2]'] }
        ],

        // ── SECTION 2 ────────────────────────────────────────────────
        // 1 to 5 steps. 01, 02, … are added automatically and the columns
        // resize to fit however many you write. Add `number: 'Phase A'`
        // to a step to replace its number with your own text.
        process: [
            { title: 'Planning & Design',  points: ['Conducted research', 'Created design documents'] },
            { title: 'Development',        points: ['Implemented core mechanics', 'Optimized performance'] },
            { title: 'Testing & Launch',   points: ['Alpha testing phase', 'Bug fixing iteration'] }
        ],

        // Independent of `process` — as many or few as you like, and it
        // doesn't need to match the process steps. Items alternate sides
        // automatically: 1st image right, 2nd left, 3rd right…
        // `media` is optional; without it the item spans the full width.
        breakdown: [
            {
                title: 'Initial Prototyping',
                points: [
                    'Built a <a href="https://unity.com" class="highlight-link" target="_blank" rel="noopener">Unity prototype</a> in the first 2 weeks',
                    'Tested the core gameplay loop with a focus group'
                ],
                media: { type: 'image', src: 'images/process/prototyping.jpg', alt: 'Prototyping Phase' }
            },
            {
                title: '[Phase Name]',
                points: ['[Point 1]', '[Point 2]'],
                media: { type: 'image', src: 'images/process/multiplayer.jpg', alt: '[Phase Name]' }
            }
        ],

        // ── SECTION 3 ────────────────────────────────────────────────
        // Any number of stages. Nav buttons, numbering and the #stage1
        // anchors are all generated.
        //
        // Each stage: title → problem → solution → features (the
        // step-by-step pointers) → results.
        stages: [
            {
                navLabel: 'Stage 1: Prototyping',   // text on the jump button
                // number: 'Algorithm 01',          // defaults to 'Stage 01'
                title:    'Prototyping & Foundation',

                problem:  "[What wasn't working, and why it mattered.]",
                solution: '[What you did about it.]',

                // Each feature is a titled group of pointers. `media` optional.
                features: [
                    {
                        title: 'Movement System Design',
                        points: ['Implemented a physics-based character controller', 'Created smooth acceleration curves'],
                        media: { type: 'image', src: 'images/projects/some-shot.png', alt: 'Movement System' }
                    },
                    {
                        title: 'Input System Architecture',
                        points: ['Used Unity\'s Input System', 'Created modular input action maps']
                    }
                ],

                // Omit `results` for no box; omit its `media` for text only.
                results: {
                    text:  '[What this stage achieved, with numbers where you have them.]',
                    media: { type: 'image', src: 'images/projects/stage1-results.jpg', alt: 'Stage 1 Results' }
                }
            }
        ],

        // ── SECTION 4 — one paragraph, one media ─────────────────────
        finalResults: {
            text:  '[What was shipped, demonstrated, or achieved.]',
            media: { type: 'youtube', id: 'VIDEO_ID' }
        },

        // ── SECTION 5 — any number of points ─────────────────────────
        // Leads alternate blue / orange automatically. Add tone: 'purple'
        // (or 'orange' / 'blue') to pin one. A plain string also works.
        takeaways: [
            { lead: 'Early prototyping paid dividends:', text: '[What you learned and the evidence for it.]' },
            { lead: 'Scope management was challenging:',  text: "[What you'd do differently.]" }
        ],

        // ── Bottom button — omit for no button ───────────────────────
        externalLink: { label: '🎮 Play the Game', href: 'https://example.com/play-game' }
    }
};
