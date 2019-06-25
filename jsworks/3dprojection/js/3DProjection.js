let cubeW = 100;

let angle = 0.01;
let deltaAngle = 0.025;

let projection;
let points;

let rotationX;
let rotationY;
let rotationZ;

let multiplierX = 0.5;
let multiplierY = 2;
let multiplierZ = 1;

let projected = [];

function setup() {
    createCanvas(600, 600);

    projection = new Matrix([
        [1, 0, 0],
        [0, 1, 0]
    ]);
    
    points = new Matrix([
        new Matrix([
            [-0.5], [-0.5], [-0.5]
        ]),
        new Matrix([
            [0.5], [-0.5], [-0.5]
        ]),
        new Matrix([
            [0.5], [0.5], [-0.5]
        ]),
        new Matrix([
            [-0.5], [0.5], [-0.5]
        ]),
        new Matrix([
            [-0.5], [-0.5], [0.5]
        ]),
        new Matrix([
            [0.5], [-0.5], [0.5]
        ]),
        new Matrix([
            [0.5], [0.5], [0.5]
        ]),
        new Matrix([
            [-0.5], [0.5], [0.5]
        ])
    ]);
}

function draw() {
    background(245);
    translate(width / 2, height / 2);
    projected = [];

    rotationX = new Matrix([
        [1, 0, 0],
        [0, cos(angle * multiplierX), -sin(angle * multiplierX)],
        [0, sin(angle * multiplierX), cos(angle * multiplierX)]
    ]);

    rotationY = new Matrix([
        [cos(angle * multiplierY), 0, -sin(angle * multiplierY)],
        [0, 1, 0],
        [sin(angle * multiplierY), 0, cos(angle * multiplierY)]
    ]);

    rotationZ = new Matrix([
        [cos(angle * multiplierZ), -sin(angle * multiplierZ), 0],
        [sin(angle * multiplierZ), cos(angle * multiplierZ), 0],
        [0, 0, 1]
    ]);

    for (let i in points.matrix) {
        let rotated = rotationY.multiply(points.matrix[i]);
        rotated = rotationX.multiply(rotated);
        rotated = rotationZ.multiply(rotated);
        
        let projected2D = convertXY(projection.multiply(rotated), cubeW);
        projected.push(projected2D);
        
    }

    for (let i = 0; i < 4; i++) {
        connect(projected[i], projected[(i + 1) % 4]);
        connect(projected[i + 4], projected[(i + 1) % 4 + 4]);
        connect(projected[i], projected[i + 4]);
    }
    
    for (let i in projected) {
        stroke(179, 2, 53);
        strokeWeight(9);
        noFill();
        point(projected[i].x, projected[i].y);
    }

    angle += deltaAngle;
}

function connect(a, b) {
    stroke(237, 34, 93);
    strokeWeight(2);
    line(a.x, a.y, b.x, b.y);
}
