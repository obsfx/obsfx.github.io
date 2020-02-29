const projects = [
    {
        tags: ["javascript", "game development"], 
        name: "spaceinvaders.js", 
        desc: "My first game development experiment that i created without any game development framework. I only used canvas 2d api.",
        img: "imgs/games/others/spaceinvaders.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/spaceinvaders.js" },
            { text: "live", link: "https://obsfx.github.io/games/others/spaceinvadersjs" }
        ]
    },

    {
        tags: ["javascript", "p5.js", "ludum dare 42", "game development"], 
        desc: "I created this game and all game content during ludum dare 42 game jam in 48 hours with p5.js library.",
        name: "backSpace-x", 
        img: "imgs/games/jams/ld42.jpg",
        buttons: [
            { text: "LD42 Submission Page", link: "https://ldjam.com/events/ludum-dare/42/backspace-x" },
            { text: "github", link: "https://github.com/obsfx/ld42-backspace-x" },
            { text: "live", link: "https://obsfx.github.io/games/jams/ld42_backspacex" }
        ]
    },

    {
        tags: ["javascript", "game development"], 
        name: "tetris.js", 
        desc: "A tetris clone that i created with only vanilla javascript.",
        img: "imgs/games/others/tetris.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/tetris-js" },
            { text: "live", link: "https://obsfx.github.io/games/others/tetrisjs" }
        ]
    },

    {
        tags: ["javascript", "p5.js", "matrix multiplication"], 
        name: "3D Projection", 
        desc : "JavaScript/p5js version of Daniel Shiffman's 3D projection coding challenge.",
        img: "imgs/jsworks/3d.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/3DRotation-p5js" },
            { text: "live", link: "https://obsfx.github.io/jsworks/3dprojection" }
        ]
    },

    {
        tags: ["javascript", "p5js", "creative coding"], 
        name: "Creative coding expirements with p5.js", 
        desc: "I'm trying to learn fundamentals of creative coding and trying to make simple animations with p5.js library. You can find all of them in this github repo.",
        img: "imgs/creative_coding_cover.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/creativecoding-practices-with-p5js/" }
        ]
    },

    {
        tags: ["javascript", "phaser", "game development", "ludum dare 43"], 
        name: "Purgatory", 
        desc: "I made this game and all game content during ludum dare 43 game jam for compo mode with phaser library.",
        img: "imgs/games/jams/ld43.jpg",
        buttons: [
            { text: "LD43 Submission Page", link: "https://ldjam.com/events/ludum-dare/43/purgatory" },
            { text: "github", link: "https://github.com/obsfx/ld43-purgatory" },
            { text: "live", link: "https://obsfx.github.io/games/jams/ld43_purgatory" }
        ]
    },

    {
        tags: ["javascript", "phaser.io", "game development", "ludum dare 44"], 
        name: "Danger In The Snow", 
        desc: "A basic turn-based game created in 48 hours for LD44.",
        img: "imgs/games/jams/ld44.gif",
        buttons: [
            { text: "LD44 Submission Page", link: "https://ldjam.com/events/ludum-dare/44/danger-in-the-snow" },
            { text: "github", link: "https://github.com/obsfx/ld44-danger-in-the-snow" },
            { text: "live", link: "https://obsfx.github.io/games/jams/ld44_dangerinthesnow" }
        ]
    },

    {
        name: "Libgen CLI Downloader", 
        desc: "A simple tool to search and download ebooks from libgen via command line interface.",
        img: "imgs/jsworks/libgen_downloader.jpg",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/libgen-cli-downloader" },
            { text: "NPM", link: "https://www.npmjs.com/package/libgen-downloader" }
        ]
    },

    {
        name: "Dungrain", 
        desc: "BSP based procedural dungeon generation package.",
        img: "imgs/jsworks/dungrain.png",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/dungrain" },
            { text: "NPM", link: "https://www.npmjs.com/package/dungrain" }
        ]
    },

    {
        name: "Medieval Express", 
        desc: "A turn-based rogue-like \"package shifting\" game that was created in 2KB.",
        img: "imgs/games/medex.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/2kplus-jam-medieval-express" },
            { text: "itch.io Page", link: "https://obsfx.itch.io/medieval-express" }
        ]
    },

    {
        name: "console8", 
        desc: "console8 is yet another chip8 emulator but works on your command line. console8 simply uses your command line to render the graphics and does not require any GUI.",
        img: "imgs/jsworks/console8.gif",
        buttons: [
            { text: "github", link: "https://github.com/obsfx/console8" },
            { text: "NPM", link: "https://www.npmjs.com/package/console8" }
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