const ContainerName = "content";
const AssetsDir = "assets";

const CellSize = 30;
const TotalCOL = 20;
const TotalROW = 20;

const Screen = {
    Width: TotalCOL * CellSize,
    Height: TotalROW * CellSize
}

const AssetsPath = {
    Preloads: [
        {type: "spritesheet", key: "PlayerSprite", path: `${AssetsDir}/playerSprite.png`, w: 64, h: 64, f: 9},
        {type: "spritesheet", key: "EnemySprite0", path: `${AssetsDir}/enemySprite0.png`, w: 64, h: 64, f: 10},
        {type: "spritesheet", key: "EnemySprite1", path: `${AssetsDir}/enemySprite1.png`, w: 64, h: 64, f: 10},
        {type: "spritesheet", key: "EnemySprite2", path: `${AssetsDir}/enemySprite2.png`, w: 64, h: 64, f: 10},
        {type: "image", key: "Soul", path: `${AssetsDir}/soul.png`},
        {type: "image", key: "PlayerTail", path: `${AssetsDir}/tail.png`},
        {type: "image", key: "PlayerBullet", path: `${AssetsDir}/bullet.png`},
        {type: "image", key: "EnemyBullet0", path: `${AssetsDir}/enemyBullet0.png`},
        {type: "image", key: "EnemyBullet1", path: `${AssetsDir}/enemyBullet1.png`},
        {type: "image", key: "EnemyBullet2", path: `${AssetsDir}/enemyBullet2.png`},
        {type: "audio", key: "arena", path: [`${AssetsDir}/arena_bg.mp3`, `${AssetsDir}/arena_bg.ogg`]},
        {type: "audio", key: "main", path: [`${AssetsDir}/main_bg.mp3`, `${AssetsDir}/main_bg.ogg`]},
        {type: "audio", key: "collect", path: `${AssetsDir}/collect.wav`},
        {type: "audio", key: "takedmg", path: `${AssetsDir}/takedmg.wav`},
        {type: "audio", key: "enemydestroy", path: `${AssetsDir}/enemydestroy.wav`},
        {type: "audio", key: "enemytake", path: `${AssetsDir}/enemytake.wav`},
        {type: "audio", key: "fire", path: `${AssetsDir}/fire.wav`}
    ]
}

const config = {
    width: Screen.Width,
    height: Screen.Height,
    type: Phaser.AUTO,
    parent: ContainerName,
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },
    pixelArt: true,
    antialias: true
};

const EnemySpecs = [
    {
        acc: {a: 500, b: 800},
        bulletVel: 280,
        lookForPlayerRadius: 300,
        bulletTimeRnd: {min: 4, max: 8},
        damage: 18,
        hp: 140,
        soulValue: 35,
    },

    {
        acc: {a: 530, b: 800},
        bulletVel: 300,
        lookForPlayerRadius: 350,
        bulletTimeRnd: {min: 3, max: 7},
        damage: 40,
        hp: 450,
        soulValue: 85,
    },

    {
        acc: {a: 560, b: 800},
        bulletVel: 320,
        lookForPlayerRadius: 400,
        bulletTimeRnd: {min: 2, max: 7},
        damage: 90,
        hp: 1066,
        soulValue: 290,
    }
]

let Game = {
    souls: 400,
    baseSouls: 200,
    baseSacrifice: 100,
    sacrificedSouls: 0,
    uCount: 0,
    currentArena: 0,
    activeArena: 0,
    arenaStatus: [true, false, false, false],
    arenaReq: [0, 666, 4366, 6666],
    D: 1,
    main_music: null,
    arena_music: null,
}
/// <reference path="../defs/phaser.d.ts" />

var game = new Phaser.Game(config);
function run() {
    game.state.add("Preload", Preload);
    game.state.add("MainMenu", MainMenu);
    game.state.add("MainState", MainState);
    game.state.add("ArenaSelection", ArenaSelection);
    game.state.add("GameOver", GameOver);
    game.state.add("Win", Win);

    game.state.start("Preload");
}
function UI(stageWH, circleMargin) {
    this.colors = [
        {l: 0xC0E5C8, c: 0x694873, bg: 0x112320},
        {l: 0xAFA060, c: 0x764134, bg: 0x140C0F},
        {l: 0xBED558, c: 0x756D54, bg: 0x1E171A},
        {l: 0xE9E6FF, c: 0x73683B, bg: 0x13262F},
        {l: 0xD0E37F, c: 0xD1603D, bg: 0x221D23},
    ];

    this.stageWH = stageWH;
    this.circleMargin = circleMargin;
    this.dotAmount = Math.floor(this.stageWH / this.circleMargin);
    this.rndRange = 100;
    this.rndColors = this.colors[game.rnd.between(0, this.colors.length - 1)];

    game.stage.backgroundColor = this.rndColors.bg;

    this.bgGraphics = game.add.graphics(0, 0);
    this.arenaGraphics = game.add.graphics(0, 0);
}

UI.prototype.createFadeBG = function() {
    let stageFadeBG = game.add.graphics(0, 0);
    stageFadeBG.fixedToCamera = true;
    stageFadeBG.beginFill(0x000000, 1);
    stageFadeBG.lineStyle(0, 0x0000FF, 1);
    stageFadeBG.drawRect(0, 0, Screen.Width, Screen.Height);

    return stageFadeBG;
}

UI.prototype.bgFadeIn = function(fn) {
    let bg = this.createFadeBG();
    bg.alpha = 1;
    let tween = game.add.tween(bg).to( { alpha: 0 }, 400, "Linear", true);
    tween.onComplete.add(function() {
        fn();
    }, this);
}

UI.prototype.bgFadeOut = function(fn) {
    let bg = this.createFadeBG();
    bg.alpha = 0;
    let tween = game.add.tween(bg).to( { alpha: 1 }, 400, "Linear", true);
    tween.onComplete.add(function() {
        fn();
    }, this);
}

UI.prototype.createStateBackground = function() {
    let k = [];

    for (let i = 0; i < this.dotAmount; i++) {
        for (let j = 0; j < this.dotAmount; j++) {
            let r = {x: j * this.circleMargin - (Math.floor(Math.random() * this.rndRange)) - this.rndRange / 2, y: i * this.circleMargin + (Math.floor(Math.random() * this.rndRange * 2) - this.rndRange)}
            let a = {x: (j - 1) * this.circleMargin, y: i * this.circleMargin};
            let b = {x: (j + 1) * this.circleMargin, y: (i + 1) * this.circleMargin};
            let c = {x: (j - 1) * this.circleMargin, y: (i + 1) * this.circleMargin};

            this.bgGraphics.lineStyle(3, this.rndColors.l, Math.random() * 0.2 + 0.05);
            
            this.bgGraphics.moveTo(a.x, a.y);
            this.bgGraphics.lineTo(b.x, b.y);
            this.bgGraphics.lineStyle(0, this.rndColors.l, 1);
            this.bgGraphics.endFill();

            k.push(r);
            k.push(a);
            k.push(b);
            k.push(c);
        }
    }

    for (let i in k) {
        this.bgGraphics.beginFill(this.rndColors.c, Math.random() * 0.6 + 0.05);
        this.bgGraphics.drawCircle(k[i].x, k[i].y, (Math.floor(Math.random() * 12)));
        this.bgGraphics.endFill();
    }
}

UI.prototype.createStageText = function(text, x, y) {
    let label = game.add.text(x, y, text, { font: `18px Slabo`, fill: `#${Number(this.rndColors.l).toString(16)}`});
    label.x = x - label.width / 2;
    label.fixedToCamera = true;
    return label;
}

UI.prototype.createArenaGraphics = function() {

    this.circleA = game.add.graphics(0, 0);
    this.circleA.inputEnabled = true;
    this.circleA.input.useHandCursor = true;

    this.circleB = game.add.graphics(0, 0);
    this.circleB.inputEnabled = true;
    this.circleB.input.useHandCursor = true;
    
    this.circleC = game.add.graphics(0, 0);
    this.circleC.inputEnabled = true;
    this.circleC.input.useHandCursor = true;

    game.stage.backgroundColor = this.rndColors.bg;

    let points = [
        
        // purgatory:
        {
            x: 150,
            y: 300,
            r: 20,
            g: this.arenaGraphics,
            o: 0.2,
            text: "P U R G A T O R Y",
            ts: 10,
            k: null
        },

        // arenaA:
        {
            x: 220,
            y: 300,
            r: 50,
            g: this.circleA,
            o: 0.4,
            text: "I",
            ts: 12,
            k: 0
        },

        // arenaB:
        {
            x: 300,
            y: 300,
            r: 50,
            g: this.circleB,
            o: 0.6,
            text: "II",
            ts: 12,
            k: 1
        },

        // arenaC: 
        {
            x: 380,
            y: 300,
            r: 50, 
            g: this.circleC,
            o: 0.8,
            text: "III",
            ts: 12,
            k: 2
        },

        // heaven:
        {
            x: 450,
            y: 300,
            r: 20,
            g: this.arenaGraphics,
            o: 1,
            text: "H E A V E N",
            ts: 10,
            k: 3
        }
    ];

    for (let i = 0; i < points.length - 1; i++) {
        this.arenaGraphics.lineStyle(3, this.rndColors.l, 0.5 + ((i + 1) / 10));
        this.arenaGraphics.moveTo(points[i].x + points[i].r / 2, 300);
        this.arenaGraphics.lineTo(points[i + 1].x - points[i + 1].r / 2, 300);
        this.arenaGraphics.lineStyle(0, this.rndColors.l, 1);
        this.arenaGraphics.endFill();
    }

    function hover(p, o, c) {
        p.g.clear();
        p.g.beginFill(c, o);
        p.g.drawCircle(p.x, p.y, p.r);
        p.g.endFill();
    }

    for (let i in points) {
        let color = this.rndColors.c;

        if (points[i].k != null) {
            if (Game.arenaStatus[points[i].k]) {
                color = this.rndColors.c;
                points[i].g.events.onInputDown.add(function() {
                    Game.activeArena = points[i].k;
                    this.bgFadeOut(function() {
                        game.state.start("MainState");
                    })
                }, this);

            } else {
                color = this.rndColors.l;
                let a = "TO UNLOCK\nTHIS ARENA";;
                if (points[i].k == 3) a = "TO REACH\nTHE HEAVEN";

                let text = "SACRIFICE\n" + Game.arenaReq[points[i].k] +" SOULS\n" + a;
                if (points[i].k > 1 && !Game.arenaStatus[points[i].k - 1]) text = "\n\nLOCKED";

                let label = game.add.text(points[i].x, points[i].y - (points[i].r + 60), text, { font: `12px Slabo`, fill: `#${Number(this.rndColors.l).toString(16)}`});
                label.x = points[i].x - label.width / 2;
                label.lineSpacing = -5;
            }
        }
        
        points[i].g.beginFill(color, points[i].o);
        points[i].g.drawCircle(points[i].x, points[i].y, points[i].r);
        points[i].g.endFill();

        points[i].g.events.onInputOver.add(function() {
            hover(points[i], 1, color);
        }, this);
        
        points[i].g.events.onInputOut.add(function() {
            hover(points[i], points[i].o, color);
        }, this);

        let label = game.add.text(points[i].x, points[i].y + points[i].r / 1.5 + 5, points[i].text, { font: `${points[i].ts}px Slabo`, fill: `#${Number(this.rndColors.l).toString(16)}`});
        label.x = points[i].x - label.width / 2;
    }

    
    //this.drawSacrificeMenuButton(300, 100, this.rndColors.c, this.rndColors.l);
    /****** */
}

UI.prototype.drawUpgradeMenuButton = function(x, y) {
    let r = 40;

    let points = [
        {x: x, y: y - r / 3.5, o: 0.2},
        {x: x - r / 3.5, y: y, o: 0.4},
        {x: x + r / 3.5, y: y, o: 0.6}
    ]

    this.MBgraphics = game.add.graphics(0, 0);
    this.MBgraphics.inputEnabled = true;
    this.MBgraphics.input.useHandCursor = true;

    this.draw(0, points, r);

    this.MBgraphics.events.onInputOver.add(function() {
        this.draw(0.4, points, r);
    }, this);

    this.MBgraphics.events.onInputOut.add(function() {
        this.draw(0, points, r);
    }, this);

    this.MBgraphics.events.onInputDown.add(function() {
        this.sacrifice();
        this.soulsText.text = `S O U L S : ${Game.souls}`;
        this.sacSoulsText.text = `S A C R I F I C E D  S O U L S : ${Game.sacrificedSouls}`;
    }, this);

    let label = game.add.text(x, y + 10, "S A C R I F I C E  Y O U R  S O U L S  F O R  T H E  G O D", { font: `12px Slabo`, fill: `#${Number(this.rndColors.l).toString(16)}`});
    label.x = x - label.width / 2;
    label.inputEnabled = true;
    label.input.useHandCursor = true;

    label.events.onInputOver.add(function() {
        this.draw(0.4, points, r);
    }, this);

    label.events.onInputOut.add(function() {
        this.draw(0, points, r);
    }, this);

    label.events.onInputDown.add(function() {
        this.sacrifice();
        this.soulsText.text = `S O U L S : ${Game.souls}`;
        this.sacSoulsText.text = `S A C R I F I C E D  S O U L S : ${Game.sacrificedSouls}`;
    }, this);  
}

UI.prototype.draw = function(o, points, r) {
    this.MBgraphics.clear();
    for (let i in points) {
        this.MBgraphics.beginFill(this.rndColors.c, points[i].o + o);
        this.MBgraphics.drawCircle(points[i].x, points[i].y, r);
        this.MBgraphics.endFill();
    }
}

UI.prototype.sacrifice = function() {
    if (Game.souls > Game.baseSouls) {
        let s = Game.souls - Game.baseSacrifice > Game.baseSouls ? Game.baseSacrifice : Game.souls - Game.baseSouls;

        Game.souls -= s;
        Game.sacrificedSouls += s; 
        Game.uCount += s;
        Game.collect.restart("", 0, 0.2, false);

        if (Game.uCount >= 300) {
            Game.D += 1;
            Game.uCount -= 300;
            this.soulLevelText.text = `S O U L  L E V E L : ${Game.D}`;
            //console.log(Game.uCount);
        }

        if (Game.currentArena + 1 == Game.arenaReq.length - 1 && Game.arenaReq[Game.currentArena + 1] <= Game.sacrificedSouls) {
            this.bgFadeOut(function(){
                game.state.start("Win");
            });
        } else if (Game.arenaReq[Game.currentArena + 1] <= Game.sacrificedSouls) {
            Game.currentArena += 1;
            Game.arenaStatus[Game.currentArena] = true;
            this.bgFadeOut(function(){
                game.state.start("ArenaSelection");
            });
        }
    }
}
let Enemy = function (x, y, type) {
    
    this.__type = type;
    Phaser.Sprite.call(this, game, x, y, `EnemySprite${this.__type}`, 1);

    this.acc = EnemySpecs[this.__type].acc;
    this.hp = EnemySpecs[this.__type].hp;
    this.damage = EnemySpecs[this.__type].damage;
    this.soulValue = EnemySpecs[this.__type].soulValue;

    this.bulletVel = EnemySpecs[this.__type].bulletVel;

    this.playerLastSeen = null;
    this.lookForPlayerRadius = EnemySpecs[this.__type].lookForPlayerRadius;
    this.lookForPlayerShoot = null;

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(10, `EnemyBullet${this.__type}`);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('damage', this.damage);

    this.bulletQueue = [];
    
    this.anim = this.animations.add('idle');
    this.anim.play(10, true);

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.fixedRotation = true;
    this.body.setCircle(20, 10, 10);

    this.body.bounce.setTo(0.1);

    this.timer = game.time.events.add(Phaser.Timer.SECOND * 1, this.shoot, this);
    this.bulletTimer = null;
    game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.bulletUpdate = function(coords) {
    for (let i in this.bulletQueue) {
        game.physics.arcade.moveToXY(this.bulletQueue[i], coords.x, coords.y, this.bulletVel);
    }
}

Enemy.prototype.lookForPlayer = function(coords) {
    let d = Phaser.Math.distance(coords.x, coords.y, this.x, this.y);
    if (d < this.lookForPlayerRadius) {
        this.playerLastSeen = {x: coords.x, y: coords.y};
        game.physics.arcade.moveToXY(this, coords.x, coords.y, this.acc.a, this.acc.b, this.acc.b);  
    } else {
        if (this.playerLastSeen != null) {
            game.physics.arcade.moveToXY(this, this.playerLastSeen.x, this.playerLastSeen.y, this.acc.a, this.acc.b, this.acc.b);
        }
    } 
}

Enemy.prototype.shoot = function() {
    let bullet = this.bullets.getFirstDead();
    bullet.reset(this.x + 25, this.y + 25);
    
    this.bulletTimer = game.time.events.add(Phaser.Timer.SECOND * game.rnd.between(3, 5), function() {
        let tween = game.add.tween(bullet).to( { alpha: 0 }, 300, "Linear", true);
        bullet.enableBody = false;
        tween.onComplete.add(function() {
            bullet.alpha = 1;
            bullet.enableBody = true;
            bullet.kill();
        }, this);
    }, this);

    this.bulletQueue.push(bullet);
    this.timer = game.time.events.add(Phaser.Timer.SECOND * game.rnd.between(EnemySpecs[this.__type].bulletTimeRnd.min, EnemySpecs[this.__type].bulletTimeRnd.max), this.shoot, this);
}

Enemy.prototype.__revive = function() {
    this.alpha = 0;
    this.enableBody = false;

    let tween = game.add.tween(this).to( { alpha: 1 }, 600, "Linear", true);
    tween.onComplete.add(function() {
        this.enableBody = true;
    }, this);
}

Enemy.prototype.__kill = function() {
    game.time.events.remove(this.timer);
    let tween = game.add.tween(this).to( { alpha: 0 }, 300, "Linear", true);
    this.enableBody = false;
    tween.onComplete.add(function() {
        this.kill();
    }, this);
}
let Player = function () {
    Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, "PlayerSprite", 1);

    this.vel = 250;
    this.tailVel = 160;
    this.fireRate = 110;
    this.nextFire = 0;
    this.damage = 10;

    this.controls = {
        up: Phaser.Keyboard.W,
        down: Phaser.Keyboard.S,
        left: Phaser.Keyboard.A,
        right: Phaser.Keyboard.D,
        R: Phaser.Keyboard.R
    }

    this.tail = game.add.sprite(game.world.centerX, game.world.centerY, 'PlayerTail');
    this.ghost = game.add.sprite(game.world.centerX, game.world.centerY, 'PlayerTail');

    this.ghost.alpha = 0;
    
    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(60, "PlayerBullet")
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    
    this.anim = this.animations.add('idle');
    this.anim.play(10, true);

    game.physics.arcade.enable(this);
    game.physics.arcade.enable(this.tail);
    game.physics.arcade.enable(this.ghost);

    this.body.collideWorldBounds = true;
    this.body.fixedRotation = true;
    this.body.setCircle(20, 10, 10);
    this.body.bounce.setTo(0.5);

    this.tail.body.checkCollision.up = false;
    this.tail.body.checkCollision.down = false;

    this.ghost.body.collideWorldBounds = true;
    this.ghost.body.checkCollision.up = false;
    this.ghost.body.checkCollision.down = false;

    game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

    this.ghost.body.velocity.x = 0;
    this.ghost.body.velocity.y = 0;

    if (game.input.keyboard.isDown(this.controls.up)) {
        this.ghost.body.velocity.y = -this.vel;
    }

    if (game.input.keyboard.isDown(this.controls.down)) {
        this.ghost.body.velocity.y = this.vel;
    }
    
    if (game.input.keyboard.isDown(this.controls.left)) {
        this.ghost.body.velocity.x = -this.vel;
    }
    if (game.input.keyboard.isDown(this.controls.right)) {
        this.ghost.body.velocity.x = this.vel;
    }

    if (game.input.activePointer.isDown){
        this.fire();
    }

    game.physics.arcade.moveToObject(this, this.ghost, this.vel, this.vel * 1.2, this.vel * 1.2);
    game.physics.arcade.moveToObject(this.tail, this, this.tailVel, this.tailVel * 1.2, this.tailVel * 1.2);
}

Player.prototype.fire = function() {
    if (game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        this.nextFire = game.time.now + this.fireRate;
        let bullet = this.bullets.getFirstDead();
        bullet.reset(this.tail.x + 3, this.tail.y + 3);
        game.physics.arcade.moveToPointer(bullet, this.vel * 2);
        Game.fire.restart("", 0, 0.1, false);
        //game.camera.shake(0.015, 40);
    }
}

Player.prototype.checkForCircle = function(circleCoords, g, ui) {
    let d = Phaser.Math.distance(circleCoords.x, circleCoords.y, this.x + 25, this.y + 25) - g.width / 2;
    if (d < 0) {
        g.alpha = 0.6;
        if (game.input.keyboard.isDown(this.controls.R)) {
            this.body.enable = false;

            ui.bgFadeOut(function() {
                game.state.start("ArenaSelection")
            });
        }
    } else {
        g.alpha = 0.2;
    }
}
let Soul = function (x, y, val) {
    Phaser.Sprite.call(this, game, x, y, "Soul");

    this.value = val;
    this.vel = 450;

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.fixedRotation = true;
    this.body.bounce.setTo(0.5);

    game.add.existing(this);
}

Soul.prototype = Object.create(Phaser.Sprite.prototype);
Soul.prototype.constructor = Soul;

Soul.prototype.__revive = function() {
    this.alpha = 0;
    this.enableBody = false;

    let tween = game.add.tween(this).to( { alpha: 1 }, 600, "Linear", true);
    tween.onComplete.add(function() {
        this.enableBody = true;
    }, this);
}

Soul.prototype.__collected = function() {
    this.kill();
}

Soul.prototype.moveToPlayer = function(coords) {
    game.physics.arcade.moveToXY(this, coords.x, coords.y, this.vel);
}
let ArenaSelection = {
    create: function() {
        
        this.UI = new UI(Screen.Width, 100);
        this.UI.bgFadeIn(function(){});
        
        this.UI.createArenaGraphics();
        this.UI.soulsText = this.UI.createStageText(`S O U L S : ${Game.souls}`, Screen.Width / 2, 380);
        this.UI.sacSoulsText = this.UI.createStageText(`S A C R I F I C E D  S O U L S : ${Game.sacrificedSouls}`, Screen.Width / 2, 405);

        let label = game.add.text(Screen.Width / 2, 440, "Y O U R  S O U L  W I L L  R E C I V E  U P G R A D E S", { font: `14px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        label.x = label.x - label.width / 2;
        let label2 = game.add.text(Screen.Width / 2, 460, "F O R  E V E R Y  3 0 0  S A C R I F I C E D  S O U L S", { font: `14px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        label2.x = label2.x - label2.width / 2;

        this.UI.soulLevelText = this.UI.createStageText(`S O U L  L E V E L : ${Game.D}`, Screen.Width / 2, 490);

        this.UI.stageHeadText = this.UI.createStageText(`S E L E C T  A R E N A`, Screen.Width / 2, 30);
        this.UI.drawUpgradeMenuButton(Screen.Width / 2, 100);

        Game.arena_music.stop();
        if (!Game.main_music.isPlaying) Game.main_music.restart("", 0, 0.5, true);
    }
}
let GameOver = {
    create: function() {

        this.UI = new UI(Screen.Width, 100);
        this.UI.bgFadeIn(function(){});
        
        this.UI.createStageText(`P U R G A T O R Y  |  L U D U M  D A R E  4 3`, Screen.Width / 2, Screen.Height / 2 - 150);
        this.UI.createStageText(`C R E A T E D  I N  4 8  H O U R S  B Y  @OBSFX`, Screen.Width / 2, Screen.Height / 2 - 125);
        
        this.UI.createStageText(`G A M E  O V E R`, Screen.Width / 2, Screen.Height / 2);
        this.UI.createStageText(`T H A N K  Y O U  F O R  P L A Y I N G  T H I S  G A M E  !`, Screen.Width / 2, Screen.Height / 2 + 25);
        this.UI.createStageText(`Y O U  C A N  P R E S S  [ R ]  T O  P L A Y  A G A I N`, Screen.Width / 2, Screen.Height / 2 + 50);

        Game.main_music.stop();
        Game.arena_music.stop();

        Game = {
            souls: 400,
            baseSouls: 200,
            baseSacrifice: 100,
            sacrificedSouls: 0,
            uCount: 0,
            currentArena: 0,
            arenaStatus: [true, false, false, false],
            arenaReq: [0, 666, 4366, 6666],
            D: 1
        };
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            this.UI.bgFadeOut(function(){game.state.start("Preload");})
        }
    }

}
let MainMenu = {
    create: function() {
        this.UI = new UI(Screen.Width - 100, 150);
        this.UI.bgFadeIn(function(){});

        this.UI.createStateBackground();

        game.add.text(20, 10, "P U R", { font: `100px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 100, "G A", { font: `100px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 190, "T O", { font: `100px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 280, "R Y", { font: `100px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        
        game.add.text(20, 460, "C R E A T E D  I N  4 8  H O U R S", { font: `24px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 485, "F O R  L U D U M  D A R E  4 3  B Y  @OBSFX", { font: `24px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});
        game.add.text(20, 510, "T W I T T E R . C O M / O B S F X", { font: `12px Slabo`, fill: `#${Number(this.UI.rndColors.l).toString(16)}`});

        this.UI.createStageText(`Y O U  C A N  P R E S S  [ R ]  T O  S T A R T  T H E  G A M E`, Screen.Width / 2, Screen.Height / 2 + 250);
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            this.UI.bgFadeOut(function(){game.state.start("ArenaSelection");})
        }
    }
}
let MainState = {
    
    create: function() {
        this.stageWH = 1500;
        this.wave = 1;
        this.wavemulp = 1;
        this.waveinc = 50;
        this.mainFR = 500;
        this.enemies = [];
        this.souls = [];

        game.world.setBounds(0, 0, this.stageWH, this.stageWH);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        Game.main_music.stop();
        Game.arena_music.restart("", 0.1, 0.1, true);

        this.UI = new UI(this.stageWH, 150);

        this.UI.createStateBackground();

        this.stageCircle = game.add.graphics(0, 0);
        this.stageCircle.beginFill(this.UI.rndColors.c, 0.8);
        this.stageCircle.lineStyle(3, this.UI.rndColors.l, 0.8);
        this.stageCircle.drawCircle(this.stageWH / 2, this.stageWH / 2, 400);
        this.stageCircle.endFill();
        this.stageCircle.alpha = 0.2;

        this._player = new Player(); 
        this._player.damage = Game.D * 11;

        this.UI.bgFadeIn(function() {
            this.createEnemies(this.mainFR - this.wavemulp * this.waveinc);

            this.stageSoulsText = this.UI.createStageText(`S O U L S : ${Game.souls}`, 80, 30);
            this.stageWaveText = this.UI.createStageText(`W A V E : ${this.wave}`, 250, 30);
            this.stageArenaEscapeText = this.UI.createStageText(`P R E S S  [ R ]  T O`, this.stageWH / 2, this.stageWH / 2 - 20);
            this.stageArenaEscapeText2 = this.UI.createStageText(`E S C A P E  F R O M  A R E N A`, this.stageWH / 2, this.stageWH / 2);
            this.stageArenaEscapeText.fixedToCamera = false;
            this.stageArenaEscapeText.alpha = 0.5;
            this.stageArenaEscapeText2.fixedToCamera = false;
            this.stageArenaEscapeText2.alpha = 0.5;
        }.bind(this));
    },

    update: function() {
        game.physics.arcade.overlap(this._player.bullets, this.enemies, this.playerBullet_EnemyOverlapHandler, null, this);
        game.physics.arcade.overlap(this._player, this.souls, this.soul_PlayerOverlapHandler, null, this);

        game.physics.arcade.collide(this._player, this.enemies, this.player_EnemyOverlapHandler, null, this);
        game.physics.arcade.collide(this.enemies, this.enemies, null, null, this);

        for (let i in this.enemies) {
            //game.debug.body(this.enemies[i]);
            this.enemies[i].lookForPlayer({x: this._player.x + 25, y: this._player.y + 25});
            this.enemies[i].lookForPlayerShoot = {x: this._player.x + 25, y: this._player.y + 25};
            this.enemies[i].bulletUpdate({x: this._player.x + 25, y: this._player.y + 25});
            game.physics.arcade.overlap(this._player, this.enemies[i].bullets, this.player_EnemyBulletOverlapHandler, null, this);
        }

        for (let i in this.souls) {
            //game.debug.body(this.souls[i]);
            this.souls[i].moveToPlayer({x: this._player.x + 25, y: this._player.y + 25});
        }

        this._player.checkForCircle({x: this.stageWH / 2, y: this.stageWH / 2}, this.stageCircle, this.UI);

    },

    render: function() {
        
        //game.debug.body(this._player.sprite);

    },

    createEnemies: function(fr) {

        this._fr = fr;
        this.enemyAmount = Math.floor(this.stageWH / fr);
        let rndRange = 100;

        for (let i = 0; i < this.enemyAmount; i++) {
            for (let j = 0; j < this.enemyAmount; j++) {
                let r = {x: j * fr + (Math.floor(Math.random() * rndRange)) + rndRange / 2, y: i * fr + (Math.floor(Math.random() * rndRange) + rndRange / 2) }
                if (r.x < 0) r.x *= -1;
                if (r.y < 0) r.y *= -1;

                this.enemies.push(new Enemy(r.x, r.y, Game.activeArena));
                this.enemies[this.enemies.length - 1].lookForPlayerShoot = {x: this._player.x, y: this._player.y};
                this.enemies[this.enemies.length - 1].__revive();
            }
        }
    },

    playerBullet_EnemyOverlapHandler: function(enemy, bullet) {
        bullet.kill();
        enemy.hp -= this._player.damage;
        Game.enemytake.restart("", 0, 0.2, false);
        if (enemy.hp <= 0) {
            let __soul = new Soul(enemy.x, enemy.y, enemy.soulValue);
            __soul.__revive();
            this.souls.push(__soul);
            Game.enemydestroy.restart("", 0, 0.2, false);
            enemy.__kill();

            this.enemies.splice(this.enemies.indexOf(enemy), 1);
            //console.log(this.enemies);

            if (this.enemies.length < Math.floor(this.enemyAmount * this.enemyAmount / 2)) {
                if (this.mainFR - this.wavemulp * (this.waveinc + 1) > 0) this.waveinc += 1;
                this.wave += 1;
                this.updateWaveLabel();
                this.createEnemies(this.mainFR - this.wavemulp * this.waveinc);
            }
        }
    },

    soul_PlayerOverlapHandler: function(player, soul) {
        Game.souls += soul.value;
        this.updateSoulLabel();
        //console.log(Game.souls);
        soul.__collected();
        Game.collect.restart("", 0, 0.2, false);
    },

    player_EnemyOverlapHandler: function(player, enemy) {
        Game.souls -= enemy.damage;
        Game.takedmg.restart("", 0, 0.2, false);
        game.camera.flash(0xf21818, 80, 10, 0.4);
        if (Game.souls <= 0) {this.UI.bgFadeOut(function() { game.state.start("GameOver") });}
        this.updateSoulLabel();
    },

    player_EnemyBulletOverlapHandler: function(player, bullet) {
        bullet.kill();
        Game.souls -= bullet.damage;
        Game.takedmg.restart("", 0, 0.2, false);
        game.camera.flash(0xf21818, 80, 10, 0.4);
        if (Game.souls <= 0) {this.UI.bgFadeOut(function() { game.state.start("GameOver") });}
        this.updateSoulLabel();
    },

    updateSoulLabel: function() {
        this.stageSoulsText.text = `S O U L S : ${Game.souls}`;
    },

    updateWaveLabel: function() {
        this.stageWaveText.text = `W A V E : ${this.wave}`;
    }
}
let Preload = {
    preload : function() {
        for (let i in AssetsPath.Preloads) {
            if (AssetsPath.Preloads[i].type == "spritesheet") {
                game.load.spritesheet(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path, 
                    AssetsPath.Preloads[i].w, 
                    AssetsPath.Preloads[i].h,
                    AssetsPath.Preloads[i].f
                );
            } else if (AssetsPath.Preloads[i].type == "image") {
                game.load.image(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path
                );
            } else {
                game.load.audio(
                    AssetsPath.Preloads[i].key, 
                    AssetsPath.Preloads[i].path
                );
            }
        }
    },

    create: function() {

        Game.main_music = game.add.audio('main');
        Game.arena_music = game.add.audio('arena');

        Game.main_music.volume = 0.5;
        Game.arena_music.volume = 0.1;

        Game.main_music.restart("", 0, 0.5, true);

        Game.collect = game.add.audio('collect');
        Game.takedmg = game.add.audio('takedmg');
        Game.enemydestroy = game.add.audio('enemydestroy');
        Game.enemytake = game.add.audio('enemytake');
        Game.fire = game.add.audio('fire');

        this.UI = new UI(Screen.Width, 100);
        this.UI.createStageText(`L O A D I N G`, Screen.Width / 2, Screen.Height / 2);

        this.UI.bgFadeOut(function(){game.state.start("MainMenu");})
    }
}
let Win = {
    create: function() {

        this.UI = new UI(Screen.Width, 100);
        this.UI.bgFadeIn(function(){});
        
        this.UI.createStageText(`P U R G A T O R Y  |  L U D U M  D A R E  4 3`, Screen.Width / 2, Screen.Height / 2 - 150);
        this.UI.createStageText(`C R E A T E D  I N  4 8  H O U R S  B Y  @OBSFX`, Screen.Width / 2, Screen.Height / 2 - 125);
        this.UI.createStageText(`Y O U  R E A C H E D  T H E  H E A V E N !`, Screen.Width / 2, Screen.Height / 2);
        this.UI.createStageText(`T H A N K  Y O U  F O R  P L A Y I N G  T H I S  G A M E  !`, Screen.Width / 2, Screen.Height / 2 + 25);
        this.UI.createStageText(`Y O U  C A N  P R E S S  [ R ]  T O  P L A Y  A G A I N`, Screen.Width / 2, Screen.Height / 2 + 50);

        Game.main_music.stop();
        Game.arena_music.stop();

        Game = {
            souls: 400,
            baseSouls: 200,
            baseSacrifice: 100,
            sacrificedSouls: 0,
            uCount: 0,
            currentArena: 0,
            arenaStatus: [true, false, false, false],
            arenaReq: [0, 666, 4366, 6666],
            D: 1
        };
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            this.UI.bgFadeOut(function(){game.state.start("Preload");})
        }
    }

}