function Rectangle(side, color, opacity, rotationSpeed) {
    this.side = side;
    this.color = color;
    this.opacity = opacity;
    this.rotationSpeed = rotationSpeed;
    this.totalAngle = PI;
    this.angle = -this.totalAngle;
    this.rotating = false;
}

Rectangle.prototype.draw = function() {
    this.rotate();

    push();
    rotate(this.angle);
    noStroke();
    colorMode(HSB);
    fill(this.color[0] - 2 * this.angle, this.color[1] + 1.2 * this.angle, this.color[2] + 1.2 * this.angle, this.opacity);
    rect(-this.side / 2, -this.side / 2, this.side, this.side);
    pop();
}

Rectangle.prototype.rotate = function() {
    if (this.rotating) {
        if (this.angle >= this.totalAngle - 0.001) {
            this.angle += -this.totalAngle * 2;
            this.rotating = false;
        } else {
            this.angle = lerp(this.angle, this.totalAngle, 0.8 * this.rotationSpeed);
        }
    }
}


function Ellipse_(r, color, opacity) {
    this.r = r;
    this.color = color;
    this.opacity = opacity;
    this.sW = 1;
}

Ellipse_.prototype.draw = function() {
    ellipse(0, 0, this.r, this.r);
    noFill();
    strokeWeight(this.sW);
    colorMode(RGB);
    stroke(this.color[0], this.color[1], this.color[2], this.opacity);
}

/** 
function Arc_(r, color, opacity, a, rA) {
    this.r = r;
    this.color = color;
    this.opacity = opacity;
    this.a = a;
    this.rA = rA;
    this.dA = random(-0.003, 0.003);
    this.sW = 1.75;

    if (this.dA == 0) {
        this.dA = 0.001;
    }
}

Arc_.prototype.draw = function() {
    this.rotate();
    
    push();
    rotate(this.rA);
    noFill();
    strokeWeight(this.sW);
    colorMode(RGB);
    stroke(this.color[0], this.color[1], this.color[2], this.opacity);
    arc(0, 0, this.r, this.r, 0, this.a);
    pop();
}

Arc_.prototype.rotate = function() {
    this.rA += this.dA;
}
*/