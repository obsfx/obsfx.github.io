/* tetris.js ---------------------------- */
const canvas = document.querySelector("#screen");
const context = canvas.getContext("2d");

const hud = document.querySelector("#hud");

let frameCount;
let DELAY;
let exit = true;

const SCORE = 80;

const ROW = 20;
const COL = 10;
const SCL = 25;

const SPAWN_ROW = 0;
const SPAWN_COL = 3;

let sounds = [];
sounds.push(new Audio('src/t.wav'));
sounds[0].volume = 0.3;

sounds.push(new Audio('src/d.wav'));
sounds[1].volume = 0.3;

sounds.push(new Audio('src/p.wav'));
sounds[2].volume = 0.3;

canvas.width = COL * SCL;
canvas.height = ROW * SCL;

hud.style.width = COL * SCL + 2 +"px";
hud.style.height = ROW * SCL + 2 +"px";
hud.style.marginLeft = COL * SCL + "px"

/* ------------------------------------- */
const shapes = {
    0: [
        ["#", "#", "#", "#"]
    ],
    
    1: [
        ["#", "#", "#"],
        [".", ".", "#"]
    ],

    2: [
        ["#", "#", "#"],
        ["#", ".", "."]
    ],

    3: [
        ["#", "#"],
        ["#", "#"]
    ],

    4: [
        [".", "#", "#"],
        ["#", "#", "."]
    ],

    5: [
        ["#", "#", "#"],
        [".", "#", "."]
    ],

    6: [
        ["#", "#", "."],
        [".", "#", "#"]
    ]
}

const HUDpos = {
    0: [4, 5, 6, 7], 
    1: [4, 5, 6, 10],
    2: [4, 5, 6, 8],
    3: [5, 6, 9, 10],
    4: [5, 6, 8, 9],
    5: [4, 5, 6, 9],
    6: [4, 5, 9, 10]
}

const colors = {
    "A": "#182952",
    "B": "#7045af",
    "C": "#3e432e",
    "D": "#ff1f5a",
    "E": "#851e52",
    "F": "#12e6c8",
    "G": "#20716a"
}

let next = {
    shape: null,
    index: null
}

let current = {
    row: null,
    col: null,
    shape: null,
    index: null
}

let old = {
    row: null,
    col: null,
    shape: null
}

let grid;

/* ------------------------------------- */
const drawGrid = {
    0: (r, c) => {
        context.beginPath();
        context.rect(c * SCL, r * SCL, SCL, SCL);
        context.strokeStyle = "#e0e0e0";
        context.stroke();
        context.closePath();
    },

    1: (r, c, e) => {
        context.beginPath();
        context.fillStyle = colors[e[0]];
        context.fillRect(c * SCL, r * SCL, SCL, SCL);
        context.closePath();    
    }
}

/* ------------------------------------- */
const initNewShape = () => {
    current.row = SPAWN_ROW;
    current.col = SPAWN_COL;

    if (next.shape == null) {
        current.index = Math.floor(Math.random() * Object.keys(shapes).length);
        current.shape = shapes[current.index];        
    } else {
        current.index = next.index;
        current.shape = next.shape;
    }

    next.index = Math.floor(Math.random() * Object.keys(shapes).length);
    next.shape = shapes[next.index];

    old.row = SPAWN_ROW;
    old.col = SPAWN_COL;
    old.shape = current.shape;

    showNext();
    updateGrid();
}

/* ------------------------------------- */
const showNext = () => {
    const box = document.querySelector(".box");
    const childs = box.childNodes;

    childs.forEach(e => {
        e.setAttribute("style", "");
    });

    HUDpos[next.index].forEach(e => {
        childs[e].setAttribute("style", `background-color: ${colors[Object.keys(colors)[next.index]]}; border: none;`);
    });
}

/* ------------------------------------- */
const initGrid = () => {
    grid = [];
    for (let i = 0; i < ROW; i++) {
        grid.push([]);
        for (let j = 0; j < COL; j++) {
            grid[i].push(0);
        }
    }
} 

/* ------------------------------------- */
const clearOldPos = () => {
    old.shape.forEach((arr, y) => {
        arr.forEach((e, x) => {
            if (e == "#" && grid[old.row + y][old.col + x] == Object.keys(colors)[current.index]) 
                grid[old.row + y][old.col + x] = 0;
        });
    });

    if (old.shape != current.shape) old.shape = current.shape;
}

/* ------------------------------------- */
const updateGrid = () => {
    clearOldPos();
    current.shape.forEach((arr, y) => {
        arr.forEach((e, x) => {
            if (e == "#" && grid[current.row + y][current.col + x] == 0) 
                grid[current.row + y][current.col + x] = Object.keys(colors)[current.index];
        });
    });
}

/* ------------------------------------- */
const setSolidShape = () => {
    current.shape.forEach((arr, y) => {
        arr.forEach((e, x) => {
            if (e == "#") {
                grid[current.row + y][current.col + x] = Object.keys(colors)[current.index] + "S";
                sounds[2].play();
            }
        });
    });

    checkLines();
}

/* ------------------------------------- */
const rotateArr = (arr) => {
    let result = [];
    for (let i = 0; i < arr[0].length; i++) {
        result.push([]);
        for (let j = arr.length - 1; j > -1; j--) {
            result[i].push(arr[j][i]);
        }
    }
    
    return result;
}

/* ------------------------------------- */
const checkCollision = {
    bottom: () => {
        let bottomLine = [];
        let result = false;

        for (let i = 0; i < current.shape[0].length; i++) {
            for (let j = current.shape.length - 1; j > -1; j--) {
                if (current.shape[j][i] == "#") {
                    bottomLine.push({r: j, c: i});
                    break;
                }   
            }
        }

        bottomLine.forEach(e => {
            if (grid[current.row + e.r + 1][current.col + e.c] != 0) 
                result = true
        });

        return result;
    },

    LR: (d) => {
        let edge = (d == "L") ? -1 : 1;
        let edges = [];
        let result = false;

        for (let i = 0; i < current.shape.length; i++) {
            for (let j = 0; j < current.shape[i].length; j++) {

                let pos = (d == "L") ? current.shape[i][j] : current.shape[i][(current.shape[i].length - 1) - j];
                if (pos == "#") {
                    let col = (d == "L") ? current.col + j + edge : current.col + ((current.shape[i].length - 1) - j) + edge
                    edges.push({r: current.row + i, c: col});
                    break;
                }
            }
        }

        edges.forEach(e => {
            if (grid[e.r][e.c] != 0) 
                result = true
        });

        return result;
    },

    rotate: () => {
        let rotated = rotateArr(current.shape);
        let posCP = [];
        let result = false;

        current.shape.forEach((arr, y) => {
            arr.forEach((e, x) => {
                if (e == "#") posCP.push(`${y}${x}`);
            });
        });

        rotated.forEach((arr, y) => {
            arr.forEach((e, x) => { 
                if (e == "#" && !posCP.some(k => (k == `${y}${x}`)) && grid[current.row + y][current.col + x] != 0) {
                    result = true;
                }
            });
        });
        //console.log(result);
        return result;
    }
}

/* ------------------------------------- */
const checkGameOver = () => {
    let controlLine = [];
    for (let i = 0; i < 4; i++) 
        controlLine.push(grid[0][SPAWN_COL + i]);
    return controlLine.some(e => (e[1] == "S"))
}

/* ------------------------------------- */
const checkLines = () => {
    grid.forEach((arr, y) => {
        if (!arr.some(e => (e == 0))) {
            result = true;
            grid.splice(y, 1);
            grid.unshift(new Array(COL).fill(0));
            sounds[1].play();
            document.querySelector("#scr").innerHTML = Number(document.querySelector("#scr").innerHTML) + SCORE;
        }
    });
}

/* ------------------------------------- */
const init = () => {
    let html = "";
    for (let i = 0; i < 16; i++)
        html += `<div class="b_child"></div>`;

    document.querySelector(".box").innerHTML = html;
    document.querySelector("#scr").innerHTML = 0;

    DELAY = 40;
    exit = false;
    frameCount = 1;

    initNewShape();
    loop();
}

/* ///////////////////////////////////// */
const main = () => {
    initGrid();
    draw();
}

const update = () => {

    if (frameCount % DELAY == 0) {
        old.row = current.row;
        old.col = current.col;
        if (current.row + current.shape.length < ROW) {
            if (checkCollision.bottom()) {
                setSolidShape();
                initNewShape();
                return 0;
            }
            current.row += 1;
            sounds[0].play();
        } else {
            setSolidShape();
            initNewShape();
        }
        updateGrid();
    }

    if (checkGameOver()) {
        exit = true;
        document.querySelector(".box").innerHTML = `<div id="btn_go"><span>game over!</span> <br> play again</div>`;
        document.querySelector("#btn_go").addEventListener("click", () => {
            initGrid();
            init();
        });
    }
}

const draw = () => {
    grid.forEach((arr, y) => {
        arr.forEach((e, x) => {
            if (Number.isInteger(e)) drawGrid[0](y, x);
            else drawGrid[1](y, x, e);
        });
    });
}

const loop = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    update();
    draw();

    frameCount = (frameCount < 3000) ? frameCount + 1 : 0;

    if (!exit) {
        requestAnimationFrame(loop);
    }
}

main();

window.addEventListener("keydown", e => {
    if (!exit) {
        if ([37, 38, 39, 40].some(k => (k = e.keyCode))) {
            old.row = current.row;
            old.col = current.col;
            
            sounds[0].play();

            if (e.keyCode == 37 && !checkCollision.LR("L")) 
                current.col -= 1;
            else if (e.keyCode == 39 && !checkCollision.LR("R")) 
                current.col += 1
            else if (e.keyCode == 40)
                DELAY = 5;
            else if (e.keyCode == 38 && !checkCollision.rotate()) {
                old.shape = current.shape;
                current.shape = rotateArr(current.shape);
            }
            updateGrid();
        }
    }
});

window.addEventListener("keyup", e => {
    if (!exit) {
        if ([37, 38, 39, 40].some(k => (k = e.keyCode))) {
            if (e.keyCode == 40)
                DELAY = 40;
        }
    }
});