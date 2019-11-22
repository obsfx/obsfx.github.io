const projects = [
    {
        tags: ["javascript", "game development"], 
        name: "spaceinvaders.js", 
        desc: "my first game development experiment which i created without any game development framework. i only used canvas 2d api.",
        source: "https://github.com/obsfx/spaceinvaders.js", 
        live: "https://obsfx.github.io/games/others/spaceinvadersjs",
        img: "imgs/games/others/spaceinvaders.gif"
    },

    {
        tags: ["javascript", "p5.js", "ludum dare 42", "game development"], 
        desc: "i created this game and all game content during ludum dare 42 game jam in 48 hours with p5.js library.",
        name: "backSpace-x", 
        source: "https://github.com/obsfx/ld42-backspace-x", 
        live: "https://obsfx.github.io/games/jams/ld42_backspacex",
        img: "imgs/games/jams/ld42.jpg"
    },

    {
        tags: ["javascript", "game development"], 
        name: "tetris.js", 
        desc: "a tetris clone which i created with only vanilla javascript.",
        source: "https://github.com/obsfx/tetris-js", 
        live: "https://obsfx.github.io/games/others/tetrisjs",
        img: "imgs/games/others/tetris.gif"
    },

    {
        tags: ["javascript", "p5.js", "matrix multiplication"], 
        name: "3D Projection", 
        desc : "javascript/p5js version of daniel shiffman's 3D projection coding challenge.",
        source: "https://github.com/obsfx/3DRotation-p5js", 
        live: "https://obsfx.github.io/jsworks/3dprojection",
        img: "imgs/jsworks/3d.gif"
    },

    {
        tags: ["javascript", "p5js", "creative coding"], 
        name: "creative coding expirements with p5.js", 
        desc: "i am trying to learn fundamentals of creative coding and trying to make simple animations with p5.js library. you can find that animations in this github repo.",
        source: "https://github.com/obsfx/creativecoding-practices-with-p5js/",
        img: "imgs/creative_coding_cover.gif"
    },

    {
        tags: ["javascript", "phaser", "game development", "ludum dare 43"], 
        name: "purgatory", 
        desc: "i made this game and all game content during ludum dare 43 game jam for compo mode with phaser library.",
        source: "https://github.com/obsfx/ld43-purgatory", 
        live: "https://obsfx.github.io/games/jams/ld43_purgatory",
        img: "imgs/games/jams/ld43.jpg"
    },

    {
        tags: ["javascript", "vuejs", "front-end development"], 
        name: "vuejs practices", 
        desc: "some small web apps which i created to learn basics of vuejs.",
        source: "https://github.com/obsfx/vuejs-practices", 
        img: "imgs/jsworks/vue.gif"
    },

    {
        tags: ["javascript", "phaser.io", "game development", "ludum dare 44"], 
        name: "danger in the snow", 
        desc: "a basic turn-based game created in 48 hours for LD44.",
        source: "https://github.com/obsfx/ld44-danger-in-the-snow", 
        live: "https://obsfx.github.io/games/jams/ld44_dangerinthesnow",
        img: "imgs/games/jams/ld44.gif"
    },
]

const pens = [
    `
    <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="xMQLmd" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Visualization of recursive backtracker maze generation algorithm.">
    <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/xMQLmd/">
    Visualization of recursive backtracker maze generation algorithm.</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    `,

    `
    <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="ZwxERX" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Separating Axis Theorem: Visualization of collision detection of convex polygons">
    <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/ZwxERX/">
    Separating Axis Theorem: Visualization of collision detection of convex polygons</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    `,
    
    `
    <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="MLwMWd" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="sin(x) &amp;amp; cos(x) waves visualization with canvas2d">
    <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/MLwMWd/">
    sin(x) &amp; cos(x) waves visualization with canvas2d</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    `,

    `
    <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="omercanbalandi" data-slug-hash="EGqogq" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="waving circles - pure css animation">
    <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/EGqogq">
    waving circles - pure css animation</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
    `,

    `
    <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="zYYGowP" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Waves Inside The Circle">
    <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/zYYGowP">
    Waves Inside The Circle</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
    `,

    `
    <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="omercanbalandi" data-slug-hash="QXXxdX" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Zdog - Minimal Lighthouse  Animation">
    <span>See the Pen <a href="https://codepen.io/omercanbalandi/pen/QXXxdX">
    Zdog - Minimal Lighthouse  Animation</a> by Ömercan Balandı (<a href="https://codepen.io/omercanbalandi">@omercanbalandi</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
    `
]