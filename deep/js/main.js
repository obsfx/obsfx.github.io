const colors = {
    BG_COLOR: [244, 244, 249],
    RECT_COLOR: [200, 40, 25],
    CIRCLE_COLOR: [8, 15, 15]
}

const RECT_COUNT = 65;
const RECT_MAXSIZE = 300;
const RECT_ROTATION = Math.PI / 100;
const DELAY = 1;

let K = 0;

let rectangles = [];
let ellipses = [];
//let arcs = [];

function setup() {
    createCanvas(600, 600);
    frameRate(60);

    for (let i = 0; i < RECT_COUNT; i++) {
        rectangles.push(
            new Rectangle( 
            (i+1) * (RECT_MAXSIZE / RECT_COUNT), 
            colors.RECT_COLOR, 
            (RECT_COUNT - i) * (0.3 / RECT_COUNT), 
            RECT_ROTATION)
        );
    }

    for (let i in rectangles) {
        ellipses.push(new Ellipse_(rectangles[i].side * 3.75, colors.CIRCLE_COLOR, i * (75 / RECT_COUNT)));
        //arcs.push(new Arc_(rectangles[i].side * 3, colors.CIRCLE_COLOR, i * (50 / RECT_COUNT), PI / 4 + random(PI * 1.2), random(PI * 2)));
    }
}

function draw() {
    colorMode(RGB);
    background(colors.BG_COLOR[0], colors.BG_COLOR[1], colors.BG_COLOR[2]);
    translate(width/2, height/2);

    for (let i in rectangles) {
        //ellipses[i].draw();
        //arcs[i].draw();
        rectangles[i].draw();
    }

    if (frameCount % DELAY == 0) {
        if (K < RECT_COUNT) {
            rectangles[K].rotating = true;
            K += 1;
        } else if (!rectangles[RECT_COUNT - 1].rotating) {
            K = 0;
        }
    }

}