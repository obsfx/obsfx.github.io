let SM;

function preload() {
    GAME.INIT_SOURCES();
}

function setup() {
    document.getElementById("status").style.display = "none";

    createCanvas(GAME.RES.WIDTH, GAME.RES.HEIGHT);
    frameRate(60);
    noStroke();

    initObjects();

    SM = new SceneManager();

    SM.addScene(COVER_SCENE);
    SM.addScene(ARCADE_SCENE);
    SM.addScene(GAME_OVER);
    SM.showScene(COVER_SCENE);
}

function keyPressed() {
    SM.handleEvent("keyPressed");
}

function keyReleased() {
    SM.handleEvent("keyReleased");
}

function draw() {
    background(GAME.BG_COLOR);
    SM.draw();
}


function COVER_SCENE() {
    this.draw = function() {
        image(GAME.COVER, 0, 0, width, height);

        textFont(GAME.COVER_FONT);
        textSize(16);
        fill(255,236,39);
        textAlign(LEFT);
        text("PRESS [ P ] TO START THE GAME", 90, 210);
    }

    this.keyPressed = function() {
        if (keyCode == 80) {
            SM.showScene(ARCADE_SCENE);
        }
    }
}

function ARCADE_SCENE() {
    
    let WAVE_PHASE;
    let PHASE_DIF;
    let PHASE_CHANGE_TIME;

    this.enter = function() {
        GAME.MUSIC_LOOP();
        GAME.STATUS = "A";
        GAME.WAVE = 1;
        GAME.SCORE = 0;

        GAME.STARS.stars = [];

        ARCADE.Meteors = [];
        ARCADE.Aliens = [];

        locations = [];
        
        PLAYER = new ARCADE.Player();
        HUD.ARCADE.init();
        HUD.ARCADE.updateHP(PLAYER.hp, PLAYER.currentHp);
        HUD.ARCADE.updateWeapon(PLAYER.upgrades.weapon);
        WAVE_PHASE = true;
        PHASE_DIF = [3, 6];
        PHASE_CHANGE_TIME = 500;
        WAVE_CD = ((PHASE_CHANGE_TIME * 2) + (PHASE_DIF[0] * 150));
    }
    
    this.keyPressed = function() {
        if (GAME.PLAYER_CONTROLS.indexOf(keyCode.toString()) > -1) {
            PLAYER.controls(keyCode.toString());
        }
    }

    this.keyReleased = function() {
        if (GAME.PLAYER_CONTROLS.indexOf(keyCode.toString()) > -1) {
            PLAYER.controls(keyCode.toString());
        }
    }

    this.draw = function() {
        background(GAME.BG_COLOR);
        GAME.STARS.draw();
        /*console.log(ARCADE.Aliens.length, ARCADE.Aliens_S.length, "ALIEN");
        console.log(ARCADE.Meteors.length, ARCADE.Meteors_S.length, "Meteors");*/

        if (frameCount % PHASE_CHANGE_TIME == 0) {
            WAVE_PHASE = !WAVE_PHASE
            //console.log(WAVE_PHASE);
        }

        //console.log(WAVE_CD);
        if (WAVE_CD > 0) {
            WAVE_CD += -1;
        } else {
            if (PHASE_DIF[0] < 9) {
                PHASE_DIF[0] += 1;
            }

            if (PHASE_DIF[1] < 20) {
                PHASE_DIF[1] += 1;
            }

            GAME.WAVE += 1;
            WAVE_CD = ((PHASE_CHANGE_TIME * 2) + (PHASE_DIF[0] * 30));
            HUD.ARCADE.updateWave(GAME.WAVE);
        }

        if (WAVE_PHASE) {
            generateMeteors();
        } else {
            generateAliens();
        }

        for (let i in ARCADE.Meteors) {
            //ARCADE.Meteors[i].sprite.debug = mouseIsPressed;
            ARCADE.Meteors[i].draw();
        }

        for (let i in ARCADE.Aliens) {
            //ARCADE.Aliens[i].sprite.debug = mouseIsPressed;
            ARCADE.Aliens[i].draw();
        }

        PLAYER.draw();

        if (GAME.WRNN) {
            if (GAME.WRNN_CD > 0) {
                GAME.WRNN_CD += -1;
                textFont(GAME.COVER_FONT);
                textAlign(LEFT);
                textSize(14);
                fill(216,0,65);
                text(GAME.WRNN_TEXT, 30, 30);
            } else {
                GAME.WRNN = false;
            }
        }

        if (frameCount % 60 == 0) {
            GAME.SCORE += 1;
            HUD.ARCADE.updateScore(GAME.SCORE);
        }
    }

    let deltaFrame = false;
    let passedFrames = 0;
    function generateMeteors() {
        if (!deltaFrame) {
            deltaFrame = floor(random(150, 350));
        } else {
            //console.log(frameCount - passedFrames, deltaFrame);
            if (frameCount - passedFrames > deltaFrame) {
                for (let i = 0; i < floor(random(PHASE_DIF[0], PHASE_DIF[1])); i++) {
                    let Meteor_ = new ARCADE.Meteor();
                    ARCADE.Meteors.push(Meteor_);
                }
                passedFrames = frameCount;
                deltaFrame = false;
            }
            //console.log(Meteors);
        }
    }

    function generateAliens() {
        if (!deltaFrame) {
            deltaFrame = floor(random(150, 300));
        } else {
            //console.log(frameCount - passedFrames, deltaFrame);

            locations = [];
            for (let i = 0; i < GAME.COL; i++) {
                locations.push(i);
            }

            if (frameCount - passedFrames > deltaFrame) {
                for (let i = 0; i < floor(random(PHASE_DIF[0], PHASE_DIF[1])); i++) {
                    let x = (GAME.ROW + floor(random(2, 5))) * GAME.TILE_SIZE;

                    let y_index = floor(random(0, locations.length));
                    let y = locations[y_index] * GAME.TILE_SIZE * 2;

                    locations.splice(y_index, 1);
                    //console.log(locations);
                    let alien_ = new ARCADE.Alien(x, y);
                    ARCADE.Aliens.push(alien_);
                }
                passedFrames = frameCount;
                deltaFrame = false;
            }
            //console.log(Meteors);
        }
    }
}

function GAME_OVER() {

    this.draw = function() {
        background(GAME.BG_COLOR);
        textFont(GAME.COVER_FONT);
        textAlign(CENTER);
        textSize(28);
        fill(216,0,65);
        text("GAME OVER !", width / 2, 200);
        textSize(20);
        fill(255);
        text("WAVES: " + GAME.WAVE, width / 2, 235);
        text("YOUR SCORE: " + GAME.SCORE, width / 2, 265);

        textSize(16);
        fill(255,236,39);
        text("THANK YOU FOR PLAYING THIS GAME !", width / 2, 295);
        text("YOU CAN PRESS [ R ] TO PLAY AGAIN", width / 2, 325);
    }

    this.keyPressed = function() {
        if (keyCode == 82) {
            GAME.STATUS = "A";
            SM.showScene(ARCADE_SCENE);
        }
    }
}

let pPressed = false; // 80
let hPressed = false; // 72
window.addEventListener("keydown", function(e) {
    if (e.keyCode == 32) {
        e.preventDefault();
    }

    if (GAME.STATUS == "A") {
        if (e.keyCode == 80 && !pPressed) {
            pPressed = true;
            PLAYER.upgrade();
        }

        if (e.keyCode == 72 && !hPressed) {
            hPressed = true;
            PLAYER.heal();
        }
    }
});

window.addEventListener("keyup", function(e) {
    if (GAME.STATUS == "A") {
        if (e.keyCode == 80) {
            pPressed = false;
        }

        if (e.keyCode == 72) {
            hPressed = false;
        }
    }
});