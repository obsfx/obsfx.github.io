function createScreen() {
    var bg = document.createElement('div');
    var screen = document.createElement('canvas');
    var info = document.createElement('div');

    bg.setAttribute('id', 'bg');
    screen.setAttribute('id', 'screen');
    screen.width = 410;
    screen.height = 325;
    info.setAttribute('id', 'info');
    info.innerHTML = '<br><div id="controls">Controls : [<][>][SPACE]</div><br><div id="mute">[MUTE]</div>' + 
    '<div id="links"><a href="https://github.com/obsfx/spaceinvaders.js">Source Code</a></div>';
    
    document.body.appendChild(bg);
    document.body.appendChild(screen);
    document.body.appendChild(info);
}

function controlHandlers() {

    addEventListener('keydown', function (e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        }else if (e.keyCode == 37) {
            leftPressed = true;
        }else if (e.keyCode == 32) {
            spacePressed = true;
        }
    });

    addEventListener('keyup', function (e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        }else if (e.keyCode == 37) {
            leftPressed = false;
        }else if (e.keyCode == 32) {
            spacePressed = false;
        }
    });
}

function Sprite(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Sprite.prototype.draw = function (x, y, w, h) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h, x, y, w, h);
}

function initSpritesAndSounds() {
    spriteSheet = new Image();
    spriteSheet.src = 'assets/sprites.jpg'

    player = new Sprite(spriteSheet, 0, 570, 104, 64);

    console.log(player);

    playerExplosion = [
        new Sprite(spriteSheet, 276, 815, 84, 44),
        new Sprite(spriteSheet, 276, 860, 84, 44)
    ];

    explosion = new Sprite(spriteSheet, 128, 570, 104, 64);

    ufo = new Sprite(spriteSheet, 85, 640, 192, 84);

    obstaclesBlock = [
        new Sprite(spriteSheet, 270, 544, 90, 90),
        new Sprite(spriteSheet, 270, 454, 90, 90),
        new Sprite(spriteSheet, 180, 454, 90, 90),
        new Sprite(spriteSheet, 270, 364, 90, 90),
        new Sprite(spriteSheet, 180, 364, 90, 90)
    ];

    obstaclesBlockTopLeft = [
        new Sprite(spriteSheet, 0, 5, 90, 90),
        new Sprite(spriteSheet, 180, 5, 90, 90),
        new Sprite(spriteSheet, 180, 184, 90, 90),
        new Sprite(spriteSheet, 0, 184, 90, 90),
        new Sprite(spriteSheet, 0, 364, 90, 90)
    ];

    obstaclesBlockTopRight = [
         new Sprite(spriteSheet, 90, 5, 90, 90),
         new Sprite(spriteSheet, 270, 5, 90, 90),
         new Sprite(spriteSheet, 270, 184, 90, 90),
         new Sprite(spriteSheet, 90, 184, 90, 90),
         new Sprite(spriteSheet, 90, 364, 90, 90)
     ];

    obstaclesBlockInLeft = [
        new Sprite(spriteSheet, 90, 95, 90, 90),
        new Sprite(spriteSheet, 270, 95, 90, 90),
        new Sprite(spriteSheet, 270, 274, 90, 90),
        new Sprite(spriteSheet, 90, 274, 90, 90),
        new Sprite(spriteSheet, 90, 454, 90, 90)
    ];

    obstaclesBlockInRight = [
        new Sprite(spriteSheet, 0, 95, 90, 90),
        new Sprite(spriteSheet, 180, 95, 90, 90),
        new Sprite(spriteSheet, 180, 274, 90, 90),
        new Sprite(spriteSheet, 0, 274, 90, 90),
        new Sprite(spriteSheet, 0, 454, 90, 90)
    ];

    enemy1 = [
        new Sprite(spriteSheet, 72, 754, 96, 64),
        new Sprite(spriteSheet, 192, 754, 96, 64)
    ];

    enemy2 = [
        new Sprite(spriteSheet, 82, 830, 88, 64),
        new Sprite(spriteSheet, 186, 830, 88, 64)
    ];

    enemy3 = [
        new Sprite(spriteSheet, 97, 912, 64, 64),
        new Sprite(spriteSheet, 199, 912, 64, 64)
    ];

    enemykilled = new Audio('assets/invaderkilled.wav');
    shoot = new Audio('assets/shoot.wav');
    ufoS = new Audio('assets/ufo_highpitch.wav');
    explosionS = new Audio('assets/explosion.wav');
    enemymovement = new Audio('assets/fastinvader1.wav');
    enemyfireS = new Audio('assets/enemyfire.wav');
}

function drawPlayer() {
    if (playerStatus == 1) {
        rightPressed == true && playerX + playerW + 10 < canvas.width ? playerX += playerV : '';
        leftPressed == true && playerX - 10 > 0 ? playerX -= playerV : '';

        player.draw(playerX, playerY, playerW, playerH);
    }else {

        if (playerExplosionAnimDuration > 0){
            playerExplosionAnimDuration -= 1;
            playerExplosion[playerExplosionAnimFrameCounter].draw(playerExplosionX, playerExplosionY, 27, 14);
        }
        else {
            playerStatus = 1;
            playerExplosionAnimDuration = 60; 
            playerExplosionX = null;
            playerExplosionY = null; 
        }
    }
}

function drawBullet() {
    if (spacePressed == true && playerStatus == 1) {
        if (bulletX == null){
            bulletX = playerX + playerW / 2;
            if (SoundStatus == 1) {
                shoot.pause();
                shoot.currentTime = 0;
                shoot.play();
            }
        } 
        bulletFired = true;
    }

    if (bulletFired == true) {
        bulletY -= bulletV;

        ctx.beginPath();
        ctx.rect(bulletX, bulletY, 2, 6);
        ctx.fillStyle = "#01fc01";
        ctx.fill();
        ctx.closePath();
    }

    if (bulletY < 0) {
        bulletX = null;
        bulletY = canvas.height - 32;
        bulletFired = false;
    }

    for (var a = 0; a < obstacles.length; a++) {
        for (var b = 0; b < obstacles[a].blockCoordinates.length; b++) {
            if (obstacles[a].blockCoordinates[b].type > 0){
                if ( bulletX + 2 > obstacles[a].blockCoordinates[b].x && bulletX < obstacles[a].blockCoordinates[b].x + 9 && 
                    bulletY > obstacles[a].blockCoordinates[b].y && bulletY < obstacles[a].blockCoordinates[b].y + 9 ) {

                     bulletX = null;
                     bulletY = canvas.height - 32;
                     bulletFired = false;
                     obstacles[a].blockCoordinates[b].type -= 1;
                }
            }
        }
    }

    for (var a = 0; a < enemies.properties.length; a++) {
        for (var b = 0; b < enemies.properties[a].row.length; b++) {
            for (var c = 0; c < enemies.rows[enemies.properties[a].row[b]].enemyPos.length; c++) {
                if (enemies.rows[enemies.properties[a].row[b]].map[c] == 1) {
                    if ( bulletX + 2 > enemies.rows[enemies.properties[a].row[b]].enemyPos[c].x && 
                        bulletX < enemies.rows[enemies.properties[a].row[b]].enemyPos[c].x + enemies.properties[a].width && 
                        bulletY + 6 > enemies.rows[enemies.properties[a].row[b]].enemyPos[c].y && 
                        bulletY < enemies.rows[enemies.properties[a].row[b]].enemyPos[c].y + enemyH) {

                        bulletX = null;
                        bulletY = canvas.height - 32;
                        bulletFired = false;
                        enemies.rows[enemies.properties[a].row[b]].map[c] = 0;
                        Score += enemies.properties[a].pts;
                        explosions.push({
                            x : enemies.rows[enemies.properties[a].row[b]].enemyPos[c].x,
                            y : enemies.rows[enemies.properties[a].row[b]].enemyPos[c].y,
                            width : 16,
                            height : 10,
                            duration : 15
                        });

                        enemies.enemyFireRowIndex[c] > 0 ? enemies.enemyFireRowIndex[c] -= 1 : '';
                        if (SoundStatus == 1) {
                            enemykilled.pause();
                            enemykilled.currentTime = 0;
                            enemykilled.play();
                        }
                        updateHUD();
                    }
                }
            }
        }
    }

    if (UFOSTATUS == 1) {
        if (bulletX + 2 > UFOX && bulletX < UFOX + UFOW && bulletY + 6 > UFOY && bulletY < UFOY + UFOH) {
            explosions.push({
                x : UFOX,
                y : UFOY,
                width : 20,
                height : 14,
                duration : 15
            });

            bulletX = null;
            bulletY = canvas.height - 32;
            bulletFired = false;
            UFOSTATUS = 0;

            Score += UFOPOINTS[Math.floor( Math.random() * 2)];
            if (SoundStatus == 1) {
                explosionS.play();
            }
            updateHUD();
        }
    }
}

function drawExplosion() {
    if (explosions.length > 0) {
        for (var i = 0; i < explosions.length; i++) {
            if (explosions[i].duration > 0) {
                explosion.draw(explosions[i].x, explosions[i].y, explosions[i].width, explosions[i].height);
                explosions[i].duration -= 1;
            }
        }
    }
}

function createObstaclesProperties() {
    for (var i = 0; i < obstaclesX.length; i++) {
        obstacles.push({
            x : obstaclesX[i], 
            y : obstaclesY, 
            blockCoordinates : []
        });
    }

    for (var i = 1; i <= 64; i++) {
        obstacles[obstacleCounter].blockCoordinates.push({
            x : obstaclesX[obstacleCounter] + (blockCounterX * 9),
            y : obstaclesY + (blockCounterY * 9),
            type : (blockCounterX == 1 && blockCounterY == 3) || (blockCounterX == 2 && blockCounterY == 3) ? 0 : 5
        });

        if (blockCounterX == 3) {
            blockCounterX = 0;
            if (blockCounterY == 3) blockCounterY = 0;
            else blockCounterY += 1;
        }else blockCounterX += 1;

        i % 16 == 0 && obstacleCounter < 3 ? obstacleCounter += 1 : '';
    }
}

function drawObstacles() {
    for (var a = 0; a < obstacles.length; a++){
        for (var b = 0; b < obstacles[a].blockCoordinates.length; b++){
            if (b == 0) {
                obstacles[a].blockCoordinates[b].type > 0 ? obstaclesBlockTopLeft[obstacles[a].blockCoordinates[b].type - 1].draw(obstacles[a].blockCoordinates[b].x, obstacles[a].blockCoordinates[b].y, 9, 9) : '';
            }else if (b == 3) {
                obstacles[a].blockCoordinates[b].type > 0 ? obstaclesBlockTopRight[obstacles[a].blockCoordinates[b].type - 1].draw(obstacles[a].blockCoordinates[b].x, obstacles[a].blockCoordinates[b].y, 9, 9) : '';
            }else if (b == 9) {
                obstacles[a].blockCoordinates[b].type > 0 ? obstaclesBlockInLeft[obstacles[a].blockCoordinates[b].type - 1].draw(obstacles[a].blockCoordinates[b].x, obstacles[a].blockCoordinates[b].y, 9, 9) : '';
            }else if (b == 10) {
                obstacles[a].blockCoordinates[b].type > 0 ? obstaclesBlockInRight[obstacles[a].blockCoordinates[b].type - 1].draw(obstacles[a].blockCoordinates[b].x, obstacles[a].blockCoordinates[b].y, 9, 9) : '';
            }else {
                obstacles[a].blockCoordinates[b].type > 0 ? obstaclesBlock[obstacles[a].blockCoordinates[b].type - 1].draw(obstacles[a].blockCoordinates[b].x, obstacles[a].blockCoordinates[b].y, 9, 9) : '';
            }
        }
    }
}

function createEnemiesProperties() {
    enemies.rows = [];
    enemies.enemyFireRowIndex = [];
    enemyBlockX = 6;
    enemyBlockY = 45;
    enemyCounterX = 0;
    enemyCounterY = 0;
    enemyBlockV = 6;
    for (var a = 0; a < enemies.properties.length; a++) {
        for (var b = 0; b < enemies.properties[a].row.length; b++) {
            enemies.rows.push({
                enemyPos : [],
                map : []
            });
        }
    }

    for (var a = 0; a < enemies.rows.length; a++) {
        for (var b = 0; b < enemyQuantityForARow; b++) {
            enemies.rows[a].map.push(1);
        }
    }

    for (var a= 0; a < enemyQuantityForARow; a++) {
        enemies.enemyFireRowIndex.push(enemies.rows.length);
    }

    updateEnemiesProperties();
}


function updateEnemiesProperties() {
    paddingYCounter = 0;
    for (var a = 0; a < enemies.rows.length; a++) {
        enemies.rows[a].enemyPos = [];
    }

    for (var a = 0; a < enemies.properties.length; a++) {
        for (var b = 0; b < enemies.properties[a].row.length; b++) {
            for (var c = 0; c < enemyQuantityForARow; c++) {
                enemies.rows[enemies.properties[a].row[b]].enemyPos.push({
                    x : enemies.properties[a].type < 3 && enemyCounterX == 0 ? enemyBlockX + enemies.properties[a].offset : enemyBlockX + enemies.properties[a].offset + ( (enemies.properties[a].paddingX + enemies.properties[a].width) * enemyCounterX),
                    y : enemyBlockY + paddingYCounter,
                    w : enemies.properties[a].width
                });
                if (enemyCounterX == 10) {
                    enemyCounterX = 0;
                    enemyCounterY < 3 ? enemyCounterY += 1 : enemyCounterY = 0;
                    paddingYCounter += enemyH + enemyPaddingY; 
                }else{
                    enemyCounterX += 1;
                }
            }
        }
    }
}

function drawEnemies() {
    for (var a = 0; a < enemies.properties.length; a++) {
        for (var b = 0; b < enemies.properties[a].row.length; b++) {
            for (var c = 0; c < enemies.rows[enemies.properties[a].row[b]].enemyPos.length; c++) {
                if (enemies.rows[enemies.properties[a].row[b]].map[c] == 1) {
                    if (enemies.properties[a].type == 1) {
                        enemy1[enemyAnimFrameCounter].draw(enemies.rows[enemies.properties[a].row[b]].enemyPos[c].x, enemies.rows[enemies.properties[a].row[b]].enemyPos[c].y, 
                        enemies.properties[a].width, enemyH);
                    }
                    if (enemies.properties[a].type == 2) {
                        enemy2[enemyAnimFrameCounter].draw(enemies.rows[enemies.properties[a].row[b]].enemyPos[c].x, enemies.rows[enemies.properties[a].row[b]].enemyPos[c].y, 
                        enemies.properties[a].width, enemyH);
                    }
                    if (enemies.properties[a].type == 3) {
                        enemy3[enemyAnimFrameCounter].draw(enemies.rows[enemies.properties[a].row[b]].enemyPos[c].x, enemies.rows[enemies.properties[a].row[b]].enemyPos[c].y, 
                        enemies.properties[a].width, enemyH);
                    }
                }
            }
        }
    }
}

function enemiesAnim() {
    ScanA = true;
    ScanB = true;
    ScanC = true;
    a = 0; 
    b = 0;
    c = 0;
    d = enemyQuantityForARow - 1;
    e = enemies.rows.length - 1;
    f = 0;

    while (ScanA) {
        if (enemies.rows[a].map[b] == 1) {
            enemyBlockXLC = enemies.rows[a].enemyPos[b].x;
            ScanA = false;
        }

        if (a < 4) a += 1;
        else {
            a = 0;
            b += 1;
        }
    }

    while (ScanB) {
        if (enemies.rows[c].map[d] == 1) {
            enemyBlockXRC = enemies.rows[c].enemyPos[d].x + enemies.rows[c].enemyPos[d].w;
            ScanB = false;
        }

        if (c < 4) c += 1;
        else {
            c = 0;
            d -= 1;
        }
    }

    while (ScanC) {
        if (enemies.rows[e].map[f] == 1) {
            enemyBlockYC = enemies.rows[e].enemyPos[f].y + enemyH;
            ScanC = false;
        }

        if (f < enemyQuantityForARow) f += 1;
        else {
            f = 0;
            e -= 1;
        }
    }

    enemyAnimFrameCounter == 0 ? enemyAnimFrameCounter = 1 : enemyAnimFrameCounter = 0;
    if (enemyBlockXRC + 6 > canvas.width) {
        if (enemyAnimTrigger == true) enemyAnimTrigger = false;
        else {enemyAnimTrigger = true; enemyBlockV = -enemyBlockV}
    }else if (enemyBlockXLC - 6 < 0) {
        enemyBlockV = -enemyBlockV;
        if (enemyAnimTrigger == true) enemyAnimTrigger = false;
        else {enemyAnimTrigger = true; enemyBlockV = -enemyBlockV}
    }else if(enemyBlockYC > 252) {
        gameStatus = 0;
        initGameOverScreen();
    }

    if (enemyAnimTrigger == true) enemyBlockX += enemyBlockV;
    else enemyBlockY += 8;

    if (SoundStatus == 1) {
        enemymovement.play(); 
    }   

    updateEnemiesProperties();
}

function possibleEnemyFireLocations() {
    _possibleEnemyFireLocations = [];

    for (var a = 0; a < enemies.enemyFireRowIndex.length; a++) {
        if (enemies.enemyFireRowIndex[a] > 0) {
            _possibleEnemyFireLocations.push({
                x : enemies.rows[enemies.enemyFireRowIndex[a] - 1].enemyPos[a].x + 1 + (enemies.rows[enemies.enemyFireRowIndex[a] - 1].enemyPos[a].w / 2),
                y : enemies.rows[enemies.enemyFireRowIndex[a] - 1].enemyPos[a].y + enemyH + 5
            });
        }
    }
}

function generateEnemyFire() {
    for (var a = 0; a < Math.floor(Math.random() * 5 + 2); a++) {
        if (_possibleEnemyFireLocations.length > 0) {
            randPos = Math.floor(Math.random() * (_possibleEnemyFireLocations.length - 1));
            enemyFire.push({
                status : 1,
                x : _possibleEnemyFireLocations[randPos].x,
                y : _possibleEnemyFireLocations[randPos].y
            });
        }
    }
}

function drawEnemyFire() {
    for (var a = 0; a < enemyFire.length; a++) {
        if (enemyFire[a].status == 1) {
            ctx.beginPath();
            ctx.rect(enemyFire[a].x, enemyFire[a].y, 2, 6);
            ctx.fillStyle = "#FFF";
            ctx.fill();
            ctx.closePath();

            enemyFire[a].y += 2;

            if (enemyFire[a].y + 6 > canvas.height) {
                enemyFire[a].status = 0;
            }
            
            if (enemyFire[a].x + 2 > playerX && enemyFire[a].x < playerX + playerW && enemyFire[a].y + 6 > playerY && enemyFire[a].y < playerY + playerW && playerStatus == 1) {
                enemyFire[a].status = 0;
                playerStatus = 0;
                if (playerLives > 0) playerLives -= 1;
                else {
                    gameStatus = 0;
                    initGameOverScreen();
                }
                playerExplosionX = playerX;
                playerExplosionY = playerY;
                if (SoundStatus == 1) {
                    explosionS.play();
                }
                updateHUD();
            }

            for (var c = 0; c < obstacles.length; c++) {
                for (var d = 0; d < obstacles[c].blockCoordinates.length; d++) {
                    if (obstacles[c].blockCoordinates[d].type > 0){
                        if ( enemyFire[a].x + 2 > obstacles[c].blockCoordinates[d].x && enemyFire[a].x < obstacles[c].blockCoordinates[d].x + 9 && 
                            enemyFire[a].y + 6 > obstacles[c].blockCoordinates[d].y && enemyFire[a].y < obstacles[c].blockCoordinates[d].y + 9 ) {

                            obstacles[c].blockCoordinates[d].type -= 1;
                            enemyFire[a].status = 0;
                        }
                    }
                }
            }

        }
    }
}

function createUfo() {
    if (UFOSTATUS == 0) {
        UFOX = Math.floor(Math.random() * 2 + 1) == 2 ? 0 - UFOW : canvas.width + UFOW;
        UFOX == canvas.width + UFOW ? UFOV = -2 : UFOV = 2;
        UFOSTATUS = 1;
    }
}

function drawUfo() {
    if (UFOSTATUS == 1) {
        ufo.draw(UFOX, UFOY, UFOW, UFOH);
        if (UFOX >= 0 - UFOW && UFOX <= canvas.width + UFOW) {
            UFOX += UFOV;
            if (SoundStatus == 1) {
                ufoS.play();
            }
        }else {
            UFOSTATUS = 0;
        }
    }
}

function Timer() {
    frameCounter += 1;

    if (frameCounter % 20 == 0) {
        if (playerStatus == 0) playerExplosionAnimFrameCounter == 0 ? playerExplosionAnimFrameCounter += 1 : playerExplosionAnimFrameCounter -= 1;
    }

    if (frameCounter % 25 == 0) {
        enemiesAnim();
    }
    
    if (_possibleEnemyFireLocations.length > 0 && frameCounter % Math.floor(Math.random() * 100 + 50) == 0) {
        generateEnemyFire();
        if (SoundStatus == 1) {
            enemyfireS.play();
        }
    }

    if (frameCounter % Math.floor(Math.random() * 800 + 350) == 0) {
        createUfo();
    }
}

function initHUD() {
    var bottomHud = document.createElement('div');
    var gameOver = document.createElement('div');
    var ScoreBoard = document.createElement('div');

    bottomHud.innerHTML = '<div id="liveCounter">' + playerLives + '</div>';
    gameOver.setAttribute('id', 'gameOver');
    ScoreBoard.setAttribute('id', 'ScoreBoard');
    ScoreBoard.innerHTML = 'Score : ' + Score;

    bottomHud.setAttribute('id', 'hud_bottom');
    document.body.appendChild(bottomHud);
    document.body.appendChild(gameOver);
    document.body.appendChild(ScoreBoard);

    for (var a = 0; a < playerLives; a++) {
        bottomHud.innerHTML += '<div class="lives"></div>' 
    }
}

function updateHUD() {
    var bottomHud = document.getElementById('hud_bottom');
    var gameOver = document.getElementById('gameOver');
    bottomHud.innerHTML = '<div id="liveCounter">' + playerLives + '</div>';
    if (playerLives > 0) {
        for (var a = 0; a < playerLives; a++) {
            bottomHud.innerHTML += '<div class="lives"></div>' 
        }
    }

    document.getElementById('ScoreBoard').innerHTML = 'Score : ' + Score;
}

function startScreen() {
    gameStatus = 2;
    document.body.innerHTML = '';
    controlHandlers();
    initSpritesAndSounds();
    createScreen();
    document.body.innerHTML += "<div id='startScreen'><h1>SPACE</h1><h1>INVADERS.JS</h1><div id='play'>PLAY</div>";
    document.getElementById('play').onclick = function() {
        document.getElementById('startScreen').innerHTML = '';
        main();
    }
}

function initGameOverScreen() {
    document.getElementById('gameOver').innerHTML = '<div id="gameOverContainer"> <h1>GAME OVER</h1> <div id="playAgain">PLAY AGAIN</div> </div>';
    document.getElementById('playAgain').onclick = function() {
        document.getElementById('gameOver').innerHTML = '';
        main();
    }
}

function Screen() {
    ctx.clearRect(0, 0, screen.width, screen.height);
    drawPlayer();
    drawBullet();
    drawObstacles();
    drawEnemies();
    drawExplosion();
    drawEnemyFire();
    drawUfo();
}

function update() {
    if (gameStatus == 1) {
        requestAnimationFrame(update);
        Screen();
        possibleEnemyFireLocations();
        Timer();
        
        if (_possibleEnemyFireLocations.length == 0) {
            createEnemiesProperties();
        }

    }else if (gameStatus == 2) {
        startScreen();
    }

    document.getElementById('mute').onclick = function() {
        SoundStatus == 0 ? SoundStatus = 1 : SoundStatus = 0;
    }
}

function init() {
    if (gameStatus == 1) {
        initHUD();
        createObstaclesProperties();
        createEnemiesProperties();
    }
}

function main() {
    document.body.innerHTML = '';
    createScreen();
    canvas = document.getElementById('screen');
    ctx = canvas.getContext('2d');

    gameStatus = 1;

    frameCounter = 0;

    Score = 0;

    SoundStatus = 1;

    rightPressed = false;
    leftPressed = false;
    spacePressed = false;
    bulletFired = false;

    playerW = 22;
    playerH = 14;
    playerX = canvas.width / 2;
    playerY = canvas.height - 50;
    playerV = 5;
    playerLives = 3;
    playerStatus = 1;
    playerExplosionAnimDuration = 60;
    playerExplosionAnimFrameCounter = 0;
    playerExplosionX = null;
    playerExplosionY = null;

    bulletX = null;
    bulletY = canvas.height - 32;
    bulletV = 8;

    explosions = [];

    enemyFire = []; 

    UFOSTATUS = 0;
    UFOW = 32;
    UFOH = 14;
    UFOY = 14;
    UFOPOINTS = [50,100,150];

    obstacles = [];
    obstacleCounter = 0;
    blockCounterX = 0;
    blockCounterY = 0;
    obstaclesWH = 36;
    obstaclesX = [86, 156, 226, 296];
    obstaclesY = 220;


    enemyPaddingY = 10;
    enemyAnimFrameCounter = 0;
    enemyAnimTrigger = true;
    enemyH = 11;
    enemyQuantityForARow = 11;
    enemies = {
        properties : [
            {
                type : 1,
                offset : 5,
                width : 11,
                paddingX : 10,
                pts : 40,
                row : [0],
            },
            {
                type : 2,
                offset : 2,
                width : 15,
                paddingX : 6,
                pts : 20,
                row : [1,2],
            },
            {
                type : 3,
                offset : 2,
                width : 17,
                paddingX : 4,
                pts : 10,
                row : [3,4],
            }
        ],
        rows : [],
        enemyFireRowIndex : []
    }

    init();
    update();
}

startScreen();
