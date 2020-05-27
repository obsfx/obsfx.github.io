const projects = [
    {
        type: "games",
        tags: ["javascript", "game development"], 
        name: "spaceinvaders.js", 
        desc: "My first game development experiment that i created without any game development framework. I only developed with canvas2d api.",
        img: "imgs/games/others/spaceinvaders.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/spaceinvaders.js" },
            { text: "play", link: "https://obsfx.github.io/games/others/spaceinvadersjs" }
        ]
    },

    {
        type: "games",
        tags: ["javascript", "p5.js", "ludum dare 42", "game development"], 
        desc: "a simple space shooter game that i developed for ludum dare 42 in 48 hours with p5.js library.",
        name: "backSpace-x", 
        img: "imgs/games/jams/ld42.jpg",
        buttons: [
            { text: "LD42 Submission Page", link: "https://ldjam.com/events/ludum-dare/42/backspace-x" },
            { text: "github", link: "https://github.com/obsfx/ld42-backspace-x" },
            { text: "play", link: "https://obsfx.github.io/games/jams/ld42_backspacex" }
        ]
    },

    {
        type: "games",
        tags: ["javascript", "game development"], 
        name: "tetris.js", 
        desc: "yet another tetis clone that i developed just using vanilla javascript.",
        img: "imgs/games/others/tetris.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/tetris-js" },
            { text: "play", link: "https://obsfx.github.io/games/others/tetrisjs" }
        ]
    },

    {
        type: "other",
        tags: ["javascript", "p5.js", "matrix multiplication"], 
        name: "3D Projection", 
        desc : "JavaScript/p5js version of Daniel Shiffman's 3D projection coding challenge.",
        img: "imgs/jsworks/3d.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/3DRotation-p5js" },
            { text: "demo", link: "https://obsfx.github.io/jsworks/3dprojection" }
        ]
    },

    {
        type: "other",
        tags: ["javascript", "p5js", "creative coding"], 
        name: "Creative coding expirements with p5.js", 
        desc: "some little animation loops that i created with p5.js library while i was trying to learn the fundamentals of creative coding.",
        img: "imgs/creative_coding_cover.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/creativecoding-practices-with-p5js/" }
        ]
    },

    {
        type: "games",
        tags: ["javascript", "phaser", "game development", "ludum dare 43"], 
        name: "Purgatory", 
        desc: "a top down shooter game that i developed with phaser.js library for ludum dare 43 game jam in 48 hours.",
        img: "imgs/games/jams/ld43.jpg",
        buttons: [
            { text: "LD43 Submission Page", link: "https://ldjam.com/events/ludum-dare/43/purgatory" },
            { text: "github", link: "https://github.com/obsfx/ld43-purgatory" },
            { text: "play", link: "https://obsfx.github.io/games/jams/ld43_purgatory" }
        ]
    },

    {
        type: "games",
        tags: ["javascript", "phaser.io", "game development", "ludum dare 44"], 
        name: "Danger In The Snow", 
        desc: "A basic turn-based game created in 48 hours for LD44.",
        img: "imgs/games/jams/ld44.gif",
        buttons: [
            { text: "LD44 Submission Page", link: "https://ldjam.com/events/ludum-dare/44/danger-in-the-snow" },
            { text: "github", link: "https://github.com/obsfx/ld44-danger-in-the-snow" },
            { text: "play", link: "https://obsfx.github.io/games/jams/ld44_dangerinthesnow" }
        ]
    },

    {
        type: "other",
        name: "Dungrain", 
        desc: "a javascript library using binary space partitioning to create procedurally generated dungeons.",
        img: "imgs/jsworks/dungrain.png",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/dungrain" },
            { text: "npm", link: "https://www.npmjs.com/package/dungrain" }
        ]
    },

    {
        type: "games",
        name: "Medieval Express", 
        desc: "A turn-based rogue-like \"package shifting\" game fits in only 2 kilobytes.",
        img: "imgs/games/medex.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/2kplus-jam-medieval-express" },
            { text: "itch.io page", link: "https://obsfx.itch.io/medieval-express" }
        ]
    },

    {
        type: "tools",
        name: "console8", 
        desc: "console8 is yet another chip8 emulator but works on your command line. console8 simply uses your command line to render the graphics and does not require any GUI.",
        img: "imgs/jsworks/console8.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/console8" },
            { text: "npm", link: "https://www.npmjs.com/package/console8" }
        ]
    },

    {
        type: "games",
        name: "Zero", 
        desc: "zero is a small, short shooting game that was created in 48 hours with pico8/lua for ludum dare 46 game jam.",
        img: "imgs/games/zero.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/zero-ld46" },
            { text: "ludum dare 46 submission page", link: "https://ldjam.com/events/ludum-dare/46/zero" },
            { text: "play (48 hours version)", link: "https://obsfx.github.io/zero/" },
            { text: "play (improved post-compo version)", link: "https://obsfx.github.io/zero/postcompo/" }
        ]
    },

    {
        type: "tools",
        name: "Libgen Downloader", 
        desc: "A simple tool to search and download ebooks from libgen via command line interface.",
        img: "imgs/jsworks/libgen_downloader.jpg",
        buttons: [
            { text: "web page", link: "https://obsfx.github.io/libgen-downloader/" },
            { text: "github", link: "https://github.com/obsfx/libgen-downloader" },
            { text: "npm", link: "https://www.npmjs.com/package/libgen-downloader" }
        ]
    },
]

// const pens = [
//     `
//     <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="xMQLmd" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Visualization of recursive backtracker maze generation algorithm.">
//     <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/xMQLmd/">
//     Visualization of recursive backtracker maze generation algorithm.</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
//     on <a href="https://codepen.io">CodePen</a>.</span>
//     </p>
//     `,

//     `
//     <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="ZwxERX" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Separating Axis Theorem: Visualization of collision detection of convex polygons">
//     <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/ZwxERX/">
//     Separating Axis Theorem: Visualization of collision detection of convex polygons</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
//     on <a href="https://codepen.io">CodePen</a>.</span>
//     </p>
//     `,
    
//     `
//     <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="MLwMWd" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="sin(x) &amp;amp; cos(x) waves visualization with canvas2d">
//     <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/MLwMWd/">
//     sin(x) &amp; cos(x) waves visualization with canvas2d</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
//     on <a href="https://codepen.io">CodePen</a>.</span>
//     </p>
//     `,

//     `
//     <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="omercanbalandi" data-slug-hash="EGqogq" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="waving circles - pure css animation">
//     <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/EGqogq">
//     waving circles - pure css animation</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
//     on <a href="https://codepen.io">CodePen</a>.</span>
//     </p>
//     <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
//     `,

//     `
//     <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="zYYGowP" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Waves Inside The Circle">
//     <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/zYYGowP">
//     Waves Inside The Circle</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
//     on <a href="https://codepen.io">CodePen</a>.</span>
//     </p>
//     <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
//     `,

//     `
//     <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="QXXxdX" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Zdog - Minimal Lighthouse  Animation">
//     <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/QXXxdX">
//     Zdog - Minimal Lighthouse  Animation</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
//     on <a href="https://codepen.io">CodePen</a>.</span>
//     </p>
//     <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
//     `
// ]