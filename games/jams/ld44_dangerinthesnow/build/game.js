const ContainerName = "content";
const AssetsDir = "assets";

const CellSize = 64;
const TotalCOL = 10;
const TotalROW = 10;

const roadTileCount = 12;
const outherTreeSpriteCount = 5;
const floorSpriteCount = 5;
const floorE_SpriteCount = 4;
const blockSpriteCount = 3;
const weaponSpriteCount = 6;

const Screen = {
    Width: TotalCOL * CellSize,
    Height: TotalROW * CellSize
}

const AssetsPath = {
    Preloads: [
        {type: "spritesheet", key: "player1", path: `${AssetsDir}/units/p1.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy0", path: `${AssetsDir}/units/e0.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy1", path: `${AssetsDir}/units/e1.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy2", path: `${AssetsDir}/units/e2.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy3", path: `${AssetsDir}/units/e3.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy4", path: `${AssetsDir}/units/e4.png`, w: 64, h: 64, f: 2},
        {type: "spritesheet", key: "enemy5", path: `${AssetsDir}/units/e5.png`, w: 64, h: 64, f: 2},
        {type: "audio", key: "bgsong", path: `${AssetsDir}/sound/bgsong.mp3`},
        {type: "audio", key: "hurt", path: `${AssetsDir}/sound/hurt.wav`},
        {type: "audio", key: "hit", path: `${AssetsDir}/sound/damage.wav`}
    ]
}

for (let i = 1; i < outherTreeSpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `t${i}`,
        path: `${AssetsDir}/outherTrees/t${i}.png`
    });
}

for (let i = 1; i < floorSpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `f${i}`,
        path: `${AssetsDir}/floors/f${i}.png`
    });
}

for (let i = 1; i < floorE_SpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `e${i}`,
        path: `${AssetsDir}/floorsDec/e${i}.png`
    });
}

for (let i = 1; i < blockSpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `b${i}`,
        path: `${AssetsDir}/blocks/b${i}.png`
    });
}

for (let i = 1; i < roadTileCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `s${i}`,
        path: `${AssetsDir}/levels/s${i}.png`
    });
}

for (let i = 1; i < weaponSpriteCount + 1; i++) {
    AssetsPath.Preloads.push({
        type: "image", 
        key: `w${i}`,
        path: `${AssetsDir}/upgrades/u${i}.png`
    });
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
    main_music: null,
    hit: null,
    hurt: null
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
function UI() {
    this.colors = [
        {l: 0xC0E5C8, c: 0x694873, bg: 0x112320},
        {l: 0xAFA060, c: 0x764134, bg: 0x140C0F},
        {l: 0xBED558, c: 0x756D54, bg: 0x1E171A},
        {l: 0xE9E6FF, c: 0x73683B, bg: 0x13262F},
        {l: 0xD0E37F, c: 0xD1603D, bg: 0x221D23},
    ];
}

UI.prototype.createFadeBG = function() {
    let stageFadeBG = game.add.graphics(0, 0);
    stageFadeBG.fixedToCamera = true;
    stageFadeBG.beginFill(0xf8f8f8, 1);
    stageFadeBG.lineStyle(0, 0xf8f8f8, 1);
    stageFadeBG.drawRect(0, 0, Screen.Width, Screen.Height);

    return stageFadeBG;
}

UI.prototype.bgFadeIn = function(fn) {
    let bg = this.createFadeBG();
    bg.alpha = 1;
    let tween = game.add.tween(bg).to( { alpha: 0 }, 100, "Linear", true);
    tween.onComplete.add(function() {
        fn();
    }, this);
}

UI.prototype.bgFadeOut = function(fn) {
    let bg = this.createFadeBG();
    bg.alpha = 0;
    let tween = game.add.tween(bg).to( { alpha: 1 }, 100, "Linear", true);
    tween.onComplete.add(function() {
        fn();
    }, this);
}

UI.prototype.createStageText = function(text, x, y, size) {
    let label = game.add.text(x, y, text, { font: `${size}px I pixel u`, fill: `#252525`});
    label.x = x - label.width / 2;
    return label;
}
let LevelTile = function (x, y, spriteName, level) {
    Phaser.Sprite.call(this, game, x, y, spriteName, 1);

    this.alpha = 0.75;
    this.level = level;

    game.add.existing(this);

    this.inputEnabled = true;

    this.events.onInputDown.add(function() {
        if (this._e) {
            def.level = this.level;
            ui.bgFadeOut(function(){game.state.start("MainState");})
        }
    }, this);
}

LevelTile.prototype = Object.create(Phaser.Sprite.prototype);
LevelTile.prototype.constructor = LevelTile;

LevelTile.prototype.update = function() {
    if (this._e) {
        if (this.input.pointerOver()) {
            this.alpha = 1;
        }
        else {
            this.alpha = 0.75;
        }
    }
}

LevelTile.prototype.setEnable = function() {
    this.alpha = 0.75;
    this._e = true;
    this.input.useHandCursor = true;
}

LevelTile.prototype.setDisable = function() {
    this.alpha = 0.3;
    this._e = false;
    this.input.useHandCursor = false;
}
let MovingUnit = function (row, col, sprite, __type) {
    this.row = row;
    this.col = col;
    this.__type = __type;
    console.log(this.__type);

    this.isAvailable = false;
    
    Phaser.Sprite.call(this, game, this.col * CellSize + roomCreator.offsetX, this.row * CellSize, sprite);
    
    this.frame = 0;
    game.add.existing(this);
    roomCreator.tileMap[this.row][this.col].containsUnit = this.__type;
}

MovingUnit.prototype = Object.create(Phaser.Sprite.prototype);
MovingUnit.prototype.constructor = MovingUnit;

MovingUnit.prototype.setPos = function(row, col, fn) {

    if ((col < this.col && this.frame == 0) || (col > this.col && this.frame == 1)) {
        this.frame = (this.frame == 0) ? 1 : 0;
    }


    roomCreator.tileMap[this.row][this.col].containsUnit = false;

    this.row = row;
    this.col = col;

    roomCreator.tileMap[this.row][this.col].containsUnit = this.__type;

    let x = this.col * CellSize + roomCreator.offsetX;
    let y = this.row * CellSize;

    this.isAvailable = false;

    game.add.tween(this)
        .to({x: x, y: y}, 120, Phaser.Easing.Sinusoidal.InOut, true)
        .onComplete.add(fn, this)
}

MovingUnit.prototype.attack = function(dir, fn) {
    this.isAvailable = false;
    console.log("attacked", this.__type);

    if ((dir.col < this.col && this.frame == 0) || (dir.col > this.col && this.frame == 1)) {
        this.frame = (this.frame == 0) ? 1 : 0;
    }

    let animT = {
        x: this.col * CellSize + roomCreator.offsetX,
        y: this.row * CellSize
    };

    let gap = CellSize / 3;

    if (this.col - dir.col < 0) animT.x += gap;
    else if (this.col - dir.col > 0) animT.x -= gap; 

    if (this.row - dir.row < 0) animT.y += gap;
    else if ((this.row - dir.row > 0)) animT.y -= gap;

    game.add.tween(this)
        .to({x: animT.x, y: animT.y}, 50, Phaser.Easing.Sinusoidal.InOut, true)
        .onComplete.add(function() {
            game.add.tween(this)
                .to({x: this.col * CellSize + roomCreator.offsetX, y: this.row * CellSize}, 50, Phaser.Easing.Sinusoidal.InOut, true)
                .onComplete.add(fn, this)
        }, this);
}
let TileItem = function (x, y, spriteName) {
    Phaser.Sprite.call(this, game, x, y, spriteName, 1);

    game.add.existing(this);
}

TileItem.prototype = Object.create(Phaser.Sprite.prototype);
TileItem.prototype.constructor = TileItem;
let Enemy = function (row, col, level) {
    this.__damage = def.enemySpec[level].damage;
    this.maxhp = def.enemySpec[level].hp;
    this.hp = def.enemySpec[level].hp;
    this.soul = def.enemySpec[level].soul;

    MovingUnit.call(this, row, col, `enemy${level}`, def.unit.enemy);
    this.frame = 0;
    this.hpbar = new Phaser.Rectangle(this.x + 5, this.y, CellSize - 10, 10);
}

Enemy.prototype = Object.create(MovingUnit.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    if (this.hp > 0) {
        this.hpbar.x = this.x;
        this.hpbar.y = this.y;
    } else {
        this.hpbar.width = 0;
    }

    game.debug.geom(this.hpbar,'#b4202a');
}

Enemy.prototype._update = function(fn) {

    if (this.isAvailable) {

        let availableDirections = [];
        let attackableDirections = [];

        let dirs = [
            {row: this.row - 1, col: this.col},
            {row: this.row + 1, col: this.col},
            {row: this.row, col: this.col - 1},
            {row: this.row, col: this.col + 1}
        ];

        for (let i = 0; i < dirs.length; i++) {
            let r = dirs[i].row;
            let c = dirs[i].col;
            
            let checkTile = this.checkTile(r, c);

            if (checkTile.isAvailable) {
                if (checkTile.type == "free") {
                    availableDirections.push(dirs[i]);
                } else if (checkTile.type == "enemy") {
                    attackableDirections.push(dirs[i]);
                }
            }
        }

        if (attackableDirections.length > 0 && availableDirections.length > 0) {
            //console.log(attackableDirections.length, attackableDirections);
            let shortestWay = this.findShortestWay(availableDirections);
            let attackDir = attackableDirections[Math.floor(Math.random() * attackableDirections.length)];

            let choice = (Math.random() > 0.2) ? "attack" : "move";
            
            if (choice == "move") this.setPos(shortestWay.row, shortestWay.col, fn);
            else {
                Game.hit.restart("", 0, 0.5, false);
                _gameManager.player.damageTaken(this.__damage);
                this.attack(attackDir, fn);
            }

        } else if (availableDirections.length > 0) {
            let shortestWay = this.findShortestWay(availableDirections);
            this.setPos(shortestWay.row, shortestWay.col, fn);
        } else {
            this.isAvailable = false;
            fn();
        }

    }
}

Enemy.prototype.findShortestWay = function(availableDirections) {
    let min = {
        index: null,
        val: null
    }

    for (let i = 0; i < availableDirections.length; i++) {
        let aDir = availableDirections[i];
        let pPos = {row: _gameManager.player.row, col: _gameManager.player.col};
        let dis = Math.abs((aDir.row + aDir.col) - (pPos.row + pPos.col));

        if (min.index == null) {
            min.index = i;
            min.val = dis;
        } else if (dis < min.val) {
            min.index = i;
            min.val = dis;
        }
    }

    return availableDirections[min.index];
}

Enemy.prototype.checkTile = function(row, col) {
    let tile = roomCreator.tileMap[row][col];
    if (tile.type === roomCreator.tileTypes.floorTile) {
        if (tile.containsUnit === false) {
            return {isAvailable: true, type: "free"}
        } else if (tile.containsUnit === def.unit.player) {
            console.log(tile.containsUnit, def.unit.player);
            return {isAvailable: true, type: "enemy"}
        } else {
            return {isAvailable: false}
        }
    } else {
        return {isAvailable: false}
    }
}

Enemy.prototype.damageTaken = function(takenDamage, index) {
    game.camera.shake(0.02, 80);
    game.camera.flash(0xffffff, 80);
    this.hp -= takenDamage;
    this.hpbar.width = ((CellSize - 10) / this.maxhp) * this.hp;
    Game.hurt.restart("", 0, 0.5, false);
    if (this.hp < 1) {
        roomCreator.tileMap[this.row][this.col].containsUnit = false;
        _gameManager.player.soulTaken(this.soul);
        this.kill();
        _gameManager.enemies.splice(index, 1);
    }
}
let Player = function (row, col) {
    this.controls = {
        up: Phaser.Keyboard.W,
        down: Phaser.Keyboard.S,
        left: Phaser.Keyboard.A,
        right: Phaser.Keyboard.D,
        R: Phaser.Keyboard.R
    }
    
    MovingUnit.call(this, row, col, "player1", def.unit.player);
    this.frame = 0;
    this.__damage = 25 * def.playerUpgrades[def.playerUpgradeLevel];
}

Player.prototype = Object.create(MovingUnit.prototype);
Player.prototype.constructor = Player;

Player.prototype._update = function(fn) {
    if (this.isAvailable) {

        let dirs = [
            {row: this.row - 1, col: this.col, control: this.controls.up},
            {row: this.row + 1, col: this.col, control: this.controls.down},
            {row: this.row, col: this.col - 1, control: this.controls.left},
            {row: this.row, col: this.col + 1, control: this.controls.right}
        ];

        for (let i = 0; i < dirs.length; i++) {
            let checkTile = this.checkTile(dirs[i].control, dirs[i].row, dirs[i].col);
            if (checkTile.isAvailable) {
                if (checkTile.type == "free") {
                    this.setPos(dirs[i].row, dirs[i].col, fn);
                    break;
                } else if (checkTile.type == "enemy") {
                    for (let j = 0; j < _gameManager.enemies.length; j++) {
                        let enemy = _gameManager.enemies[j];
                        if (enemy.row === dirs[i].row && enemy.col === dirs[i].col) {
                            Game.hit.restart("", 0, 0.5, false);
                            enemy.damageTaken(this.__damage, j);
                        }
                    }
                    this.attack(dirs[i], fn);
                }
            }
        }
    }
}

Player.prototype.checkTile = function(key, row, col) {
    let tile = roomCreator.tileMap[row][col];
    if (game.input.keyboard.isDown(key) && tile.type === roomCreator.tileTypes.floorTile) {
        if (tile.containsUnit === false) {
            return {isAvailable: true, type: "free"}
        } else if (tile.containsUnit !== def.unit.player) {
            return {isAvailable: true, type: "enemy"}
        } else {
            return {isAvailable: false}
        }
    } else {
        return {isAvailable: false}
    }
}

Player.prototype.damageTaken = function(takenDamage) {
    game.camera.shake(0.02, 80);
    game.camera.flash(0xf77474, 80);
    def.playerSoul -= takenDamage;
    soulLabel.text = `SOULS: ${def.playerSoul}`;
    Game.hurt.restart("", 0, 0.5, false);
    if (def.playerSoul < 1) {
        this.kill();
        ui.bgFadeOut(function(){game.state.start("GameOver");})
    }
}

Player.prototype.soulTaken = function(soul) {
    console.log(soul);
    game.camera.flash(0x0000ff, 80);
    def.playerSoul += soul;
    soulLabel.text = `SOULS: ${def.playerSoul}`;
}
let soulsLabel;
let currentItemLabel;
let upgradeLabel;
let damageLabel;
let nextUpgradeLabel;
let itemTile;

let press = false;

let ArenaSelection = {
    create: function() {
        
        ui.bgFadeIn(function(){});
        let tiles = [];

        for (let i = 0; i < TotalROW; i++) {
            tiles.push([]);
            for (let j = 0; j < TotalCOL; j++) {
                tiles[i].push(new TileItem(j * CellSize, i * CellSize, `f${Math.floor(Math.random() * floorSpriteCount) + 1}`));
            }
        }

        let levels = [];

        for (let i = 1; i < 7; i++) {
            levels.push(new LevelTile(i * CellSize + CellSize, 3 * CellSize, `s${i}`, i - 1));
        }

        for (let i = 7; i < 13; i++) {
            levels.push(new LevelTile((13 - i) * CellSize + CellSize, 4 * CellSize, `s${i}`, i - 1));
        }

        itemTile = new TileItem((TotalCOL / 2 - 1) * CellSize + CellSize / 2, 7 * CellSize, `w${def.playerUpgradeLevel + 1}`);

        soulsLabel = ui.createStageText(`SOULS: ${def.playerSoul}`, TotalCOL / 2 * CellSize, 1 * CellSize, 36);

        ui.createStageText(`YOU CAN PRESS [R]`, TotalCOL / 2 * CellSize, 2 * CellSize, 18);
        ui.createStageText(`TO PURCHASE NEXT UPGRADE`, TotalCOL / 2 * CellSize, 2 * CellSize + 18, 18);

        currentItemLabel = ui.createStageText("CURRENT ITEM", TotalCOL / 2 * CellSize, 5 * CellSize + 55, 24)
        upgradeLabel = ui.createStageText(`WEAPON UPGRADE LEVEL: ${def.playerUpgradeLevel + 1}`, TotalCOL / 2 * CellSize, 6 * CellSize + 10, 24);
        damageLabel = ui.createStageText(`DAMAGE: ${25 * def.playerUpgrades[def.playerUpgradeLevel]}`, TotalCOL / 2 * CellSize, 6 * CellSize + 30, 24);
        
        if (!def.upgradesDone) {
            nextUpgradeLabel = ui.createStageText(`NEXT UPGRADE: ${def.playerPriceList[def.playerUpgradeLevel]} SOULS`, TotalCOL / 2 * CellSize, 7 * CellSize + 70, 24);
        } else {
            nextUpgradeLabel = ui.createStageText(`ALL UPGRADES ARE PURCHASED`, TotalCOL / 2 * CellSize, 7 * CellSize + 70, 24);
        }

        for (let i = 0; i < levels.length; i++) {
            if (i == def.level) levels[i].setEnable();
            else levels[i].setDisable();
        }
    },

    update: function() {
        if (!press) {
            press = true;
            if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                console.log("aa");
                if (def.playerSoul - def.playerPriceList[def.playerUpgradeLevel] > 0 && !def.upgradesDone) {
                    def.playerSoul = def.playerSoul - def.playerPriceList[def.playerUpgradeLevel];
                    def.playerUpgradeLevel++;
                    itemTile.loadTexture(`w${def.playerUpgradeLevel + 1}`);
                    soulsLabel.text = `SOULS: ${def.playerSoul}`;
                    upgradeLabel.text = `WEAPON UPGRADE LEVEL: ${def.playerUpgradeLevel + 1}`;
                    damageLabel.text = `DAMAGE: ${25 * def.playerUpgrades[def.playerUpgradeLevel]}`;

                    Game.hit.restart("", 0, 0.5, false);

                    if (def.playerUpgradeLevel < def.playerPriceList.length) {
                        nextUpgradeLabel.text = `NEXT UPGRADE: ${def.playerPriceList[def.playerUpgradeLevel]} SOULS`;
                    } else {
                        def.upgradesDone = true;
                        nextUpgradeLabel.text = `ALL UPGRADES ARE PURCHASED`;
                    }
                }
            }
        }

        if (!game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            press = false;
        }
    }
}
let GameOver = {
    create: function() {
        ui.bgFadeIn(function(){});
        Game.main_music.stop();
        let tiles = [];

        for (let i = 0; i < TotalROW; i++) {
            tiles.push([]);
            for (let j = 0; j < TotalCOL; j++) {
                tiles[i].push(new TileItem(j * CellSize, i * CellSize, `f${Math.floor(Math.random() * floorSpriteCount) + 1}`));
            }
        }

        ui.createStageText(`DANGER IN THE SNOW`, TotalCOL / 2 * CellSize, 1 * CellSize - 24, 24);

        ui.createStageText(`LUDUM DARE 44 | OBSFX | APRIL 2019`, TotalCOL / 2 * CellSize, 1 * CellSize, 24);
        ui.createStageText(`THANKS FOR PLAYING !`, TotalCOL / 2 * CellSize, 1 * CellSize + 24, 24);

        ui.createStageText(`YOU CONSUMED ALL OF YOUR SOULS!`, TotalCOL / 2 * CellSize, 3 * CellSize, 24);
        ui.createStageText(`GAME OVER!`, TotalCOL / 2 * CellSize, 3 * CellSize + 24, 48);

        ui.createStageText(`YOU CAN PRESS [R]`, TotalCOL / 2 * CellSize, 6 * CellSize, 36);
        ui.createStageText(`TO PLAY AGAIN !`, TotalCOL / 2 * CellSize, 6 * CellSize + 36, 36);
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            ui.bgFadeOut(function(){game.state.start("Preload");})
        }
    }

}
let MainMenu = {
    create: function() {
        ui.bgFadeIn(function(){});
        let tiles = [];

        for (let i = 0; i < TotalROW; i++) {
            tiles.push([]);
            for (let j = 0; j < TotalCOL; j++) {
                tiles[i].push(new TileItem(j * CellSize, i * CellSize, `f${Math.floor(Math.random() * floorSpriteCount) + 1}`));
            }
        }

        ui.createStageText(`DANGER IN THE SNOW`, TotalCOL / 2 * CellSize, 1 * CellSize - 24, 24);

        ui.createStageText(`LUDUM DARE 44 | @OBSFX | APRIL 2019`, TotalCOL / 2 * CellSize, 1 * CellSize, 24);
        ui.createStageText(`CREATED IN 48 HOURS`, TotalCOL / 2 * CellSize, 1 * CellSize + 24, 24);

        ui.createStageText(`YOU CAN PRESS [R]`, TotalCOL / 2 * CellSize, 6 * CellSize, 36);
        ui.createStageText(`TO START THE GAME !`, TotalCOL / 2 * CellSize, 6 * CellSize + 36, 36);
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            ui.bgFadeOut(function(){game.state.start("ArenaSelection");})
        }
    }
}
let roomCreator;
let _gameManager;

let soulLabel;
let playerDamageLabel;
let turnLabel;

let MainState = {
    
    create: function() {
        game.stage.backgroundColor = "#F8F8F8";
        turnLabel = ui.createStageText(`YOUR TURN`, TotalCOL / 2 * CellSize, (TotalROW - 2) * CellSize, 36);

        roomCreator = new roomGenerator(TotalROW - 2, TotalCOL - Math.floor(Math.random() * 4));
        roomCreator.generate();
        _gameManager = new gameManager();
        _gameManager.generateEnemies();

        soulLabel = ui.createStageText(`SOULS: ${def.playerSoul}`, TotalCOL / 2 * CellSize, (TotalROW - 2) * CellSize + CellSize / 2 + 20, 24);
        playerDamageLabel = ui.createStageText(`YOUR DAMAGE: ${_gameManager.player.__damage}`, TotalCOL / 2 * CellSize, (TotalROW - 2) * CellSize + CellSize + 15, 24);

        ui.bgFadeIn(function(){});
    },

    update: function() {
        _gameManager.update();
        //console.log(roomCreator);

        /*game.physics.arcade.overlap(this._player.bullets, this.enemies, this.playerBullet_EnemyOverlapHandler, null, this);
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

        this._player.checkForCircle({x: this.stageWH / 2, y: this.stageWH / 2}, this.stageCircle, this.UI);*/

    },

    render: function() {
        
        //game.debug.body(this._player.sprite);

    }
}
let ui = new UI();
let def;

let Preload = {
    preload : function() {
        game.stage.backgroundColor = "#F8F8F8";
        ui.createStageText(`LOADING`, TotalCOL / 2 * CellSize, TotalROW / 2 * CellSize, 36);

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

        def = {
            unit: {
                player: 0,
                enemy: 1
            },
            level: 0,
            playerSoul: 100,
            playerUpgradeLevel: 0,
            playerUpgrades: [1, 1.5, 2.1, 2.8, 3.8, 5],
            playerPriceList: [180, 360, 520, 750, 1000],
            enemiesInLevels: [
                [0],
                [0, 1],
                [0, 1, 2],
                [1, 2],
                [1, 2],
                [2, 3],
                [2, 3],
                [3, 4],
                [3, 4],
                [4],
                [4],
                [5]
            ],
            enemyCounts: [6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9],
            enemySpec: [
                {hp: 50, damage: 40, soul: 85},
                {hp: 75, damage: 60, soul: 115},
                {hp: 125, damage: 90, soul: 195},
                {hp: 190, damage: 140, soul: 290},
                {hp: 260, damage: 210, soul: 430},
                {hp: 360, damage: 300, soul: 600}
            ],
            upgradesDone: false
        };

        Game.main_music = game.add.audio('bgsong');
        Game.main_music.volume = 0.5;
        Game.main_music.restart("", 0, 0.5, true);
        Game.hurt = game.add.audio('hurt');
        Game.hit = game.add.audio('hit');

        

        ui.bgFadeOut(function(){game.state.start("MainMenu");})
    }
}
let Win = {
    create: function() {
        ui.bgFadeIn(function(){});
        let tiles = [];
        Game.main_music.stop();
        
        for (let i = 0; i < TotalROW; i++) {
            tiles.push([]);
            for (let j = 0; j < TotalCOL; j++) {
                tiles[i].push(new TileItem(j * CellSize, i * CellSize, `f${Math.floor(Math.random() * floorSpriteCount) + 1}`));
            }
        }

        ui.createStageText(`DANGER IN THE SNOW`, TotalCOL / 2 * CellSize, 1 * CellSize - 24, 24);

        ui.createStageText(`LUDUM DARE 44 | OBSFX | APRIL 2019`, TotalCOL / 2 * CellSize, 1 * CellSize, 24);
        ui.createStageText(`THANKS FOR PLAYING !`, TotalCOL / 2 * CellSize, 1 * CellSize + 24, 24);

        ui.createStageText(`YOU REACHED END OF THE GAME!`, TotalCOL / 2 * CellSize, 3 * CellSize + 36, 24);

        ui.createStageText(`YOU CAN PRESS [R]`, TotalCOL / 2 * CellSize, 6 * CellSize, 36);
        ui.createStageText(`TO PLAY AGAIN !`, TotalCOL / 2 * CellSize, 6 * CellSize + 36, 36);
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            ui.bgFadeOut(function(){game.state.start("Preload");})
        }
    }

}
function gameManager() {
    this.states = {
        player: 0,
        enemy: 1
    }

    this.currentState = null

    roomCreator.reCalculateAvailablePositions();
    let rPos = roomCreator.availablePositions[Math.floor(Math.random() * roomCreator.availablePositions.length)];
    this.player = new Player(rPos.r, rPos.c);

    this.enemies = [];
    this.enemyIndex = 0;

    this.setStatePlayer();
}

gameManager.prototype.generateEnemies = function() {
    this.enemies = [];
    for (let i = 0; i < def.enemyCounts[def.level]; i++) {
        roomCreator.reCalculateAvailablePositions();
        let randomPos = roomCreator.availablePositions[Math.floor(Math.random() * roomCreator.availablePositions.length)];
        let level = def.enemiesInLevels[def.level][Math.floor(Math.random() * def.enemiesInLevels[def.level].length)];
        this.enemies.push(new Enemy(randomPos.r, randomPos.c, level));
    }
}

gameManager.prototype.update = function() {
    if (this.currentState == this.states.player) {
        this.player._update(function() {
            _gameManager.setStateEnemy();
        });
    } else if (this.currentState == this.states.enemy) {
        console.log(this.enemyIndex);
        this.enemies[this.enemyIndex]._update(function() {
            console.log(_gameManager);
            _gameManager.enemyIndex++;

            if (_gameManager.enemyIndex == _gameManager.enemies.length) {
                _gameManager.setStatePlayer();
            } else {
                _gameManager.enemies[_gameManager.enemyIndex].isAvailable = true;
            }
        });
    }
}

gameManager.prototype.setStatePlayer = function() {
    this.player.isAvailable = true;
    this.currentState = this.states.player;
    turnLabel.text = "YOUR TURN";
}

gameManager.prototype.setStateEnemy = function() {
    if (this.enemies.length > 0) {
        this.enemyIndex = 0;
        this.enemies[this.enemyIndex].isAvailable = true;
        this.currentState = this.states.enemy;
        turnLabel.text = "ENEMY TURN";
    } else {
        def.level++;
        if (def.level == 12) {
            ui.bgFadeOut(function(){game.state.start("Win");})
        } else {
            ui.bgFadeOut(function(){game.state.start("ArenaSelection");})
        }
    }
}
function roomGenerator(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.tileMap = [];

    this.tileTypes = {
        floorTile: 0,
        outherTile: 1
    }

    this.offsetX = 0;

    if (this.cols != TotalCOL) {
        this.offsetX = (TotalCOL - this.cols) * 0.5 * CellSize;
    }

    this.outherTiles = [];
    for (let i = 1; i < outherTreeSpriteCount + 1; i++) {
        this.outherTiles.push(`t${i}`);
    }

    this.floorTiles = [];
    for (let i = 1; i < floorSpriteCount + 1; i++) {
        this.floorTiles.push(`f${i}`);
    }
    
    this.floorDecTiles = [];
    for (let i = 1; i < floorE_SpriteCount + 1; i++) {
        this.floorDecTiles.push(`e${i}`);
    }

    this.blockTiles = [];
    for (let i = 1; i < blockSpriteCount + 1; i++) {
        this.blockTiles.push(`b${i}`);
    }

    this.availablePositions = [];
}

roomGenerator.prototype.generate = function() {
    for (let i = 0; i < this.rows; i++) {
        this.tileMap.push([]);
        for (let j = 0; j < this.cols; j++) {

            let tile = {
                item: null,
                type: null,
                containsUnit: false
            };

            let x = j * CellSize + this.offsetX;
            let y = i * CellSize;

            if (i == 0 || i == this.rows - 1 || j == 0 || j == this.cols - 1) {
                tile.item = new TileItem(x, y, this.outherTiles[game.rnd.integerInRange(0, this.outherTiles.length - 1)]);
                tile.type = this.tileTypes.outherTile;
            } else {
                tile.item = new TileItem(x, y, this.floorTiles[game.rnd.integerInRange(0, this.floorTiles.length - 1)]);
                tile.type = this.tileTypes.floorTile;
            }

            this.tileMap[i].push(tile);
        }
    }

    this.decorate();
    this.initBlocks();
}

roomGenerator.prototype.decorate = function() {
    this.reCalculateAvailablePositions();
    let randomFloorDecCount = Math.floor(Math.random() * 6) + 6;

    for (let i = 0; i < randomFloorDecCount; i++) {
        let random = this.availablePositions.splice(Math.floor(Math.random() * this.availablePositions.length), 1)[0];
        this.tileMap[random.r][random.c].item.loadTexture(this.floorDecTiles[Math.floor(Math.random() * this.floorDecTiles.length)]);
    }
    this.reCalculateAvailablePositions();
}

roomGenerator.prototype.initBlocks = function() {
    let randomBlockCount = Math.floor(Math.random() * 2) + 3;
    let pos = [];

    for (let i = 2; i < this.tileMap.length - 2; i++) {
        for (let j = 2; j < this.tileMap[i].length - 2; j++) {
            if (this.tileMap[i][j].type == this.tileTypes.floorTile && this.tileMap[i][j].containsUnit === false) {
                pos.push({r: i, c: j});
            }
        }
    }

    for (let i = 0; i < randomBlockCount; i++) {
        if (pos.length > 0) {
            let random = pos.splice(Math.floor(Math.random() * pos.length), 1)[0];
            console.log(this.tileMap[random.r][random.c]);
            this.tileMap[random.r][random.c].item.loadTexture(this.blockTiles[Math.floor(Math.random() * this.blockTiles.length)]);
            this.tileMap[random.r][random.c].type = this.tileTypes.outherTile;
        }
    }
}

roomGenerator.prototype.reCalculateAvailablePositions = function() {
    this.availablePositions = [];

    for (let i = 0; i < this.tileMap.length; i++) {
        for (let j = 0; j < this.tileMap[i].length; j++) {
            if (this.tileMap[i][j].type == this.tileTypes.floorTile && this.tileMap[i][j].containsUnit === false) {
                this.availablePositions.push({r: i, c: j});
            }
        }
    }
}