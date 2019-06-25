const GAME = {
    BG_COLOR: 12,
    ROW: 30,
    COL: 30,
    TILE_SIZE: 16,
    SCORE: 0,
    WAVE: 1,
    PLAYER_SPRITES: [],
    COVER: null,
    COVER_FONT: null,
    METEOR_SPRITE: null,
    ALIEN_SPRITE: null,
    ALIEN_BULLET: null,
    WEAPON_SPRITES: [],
    MUSIC: null,
    WRNN: false,
    WRNN_CD: 80,
    WRNN_TEXT: "",
    HEAL: 50,
    HEAL_COST: 80,
    UPGRADE_SFX: null,
    ALIEN_D_SFX: null,
    ALIEN_S_SFX: null,
    PLAYER_S_SFX: null,
    PLAYER_D_SFX: null,
    METEOR_D_SFX: null,
    PLAYER_CONTROLS: ["87", "65", "83", "68", "32"],
    WEAPONS: [
        {dmg:1, s: 10, fr: 18},
        {dmg:1.3, s: 12, fr: 14, cost: 100},
        {dmg:1.8, s: 13, fr: 12, cost: 300},
        {dmg:2.2, s: 13.5, fr: 11, cost: 550},
        {dmg:2.5, s: 15, fr: 8, cost: 800},
    ],
    HEALTH: [100],
}

GAME.RES = {
    WIDTH: GAME.ROW * GAME.TILE_SIZE,
    HEIGHT: GAME.COL * GAME.TILE_SIZE
}

GAME.INIT_SOURCES = function() {
    for (var i = 1; i < 6; i++) {
        GAME.PLAYER_SPRITES.push(loadImage("assets/P-000" + i + ".png"));
    }

    GAME.METEOR_SPRITE = loadImage("assets/meteor.png");
    GAME.ALIEN_SPRITE = loadImage("assets/alien_ship.png");
    GAME.ALIEN_BULLET = loadImage("assets/alien_bullet.png");

    for (var i = 1; i < 6; i++) {
        GAME.WEAPON_SPRITES.push(loadImage("assets/w" + i +".png"));
    }

    GAME.COVER = loadImage("assets/cover.jpg");

    GAME.MUSIC = new Audio("assets/bg_music_c.mp3");
    GAME.MUSIC.volume = 0.6;

    GAME.MUSIC_LOOP = function() {
        GAME.MUSIC.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        GAME.MUSIC.play();
    }

    GAME.MUSIC_STOP = function() {
        GAME.MUSIC.pause();
        GAME.MUSIC.currentTime = 0;
    }

    GAME.UPGRADE_SFX = loadSound("assets/upgrade.wav");
    GAME.UPGRADE_SFX.setVolume(0.8);

    GAME.ALIEN_D_SFX = loadSound("assets/aliendead.wav");
    GAME.ALIEN_D_SFX.setVolume(0.5);

    GAME.ALIEN_S_SFX = loadSound("assets/alienfire.wav");
    GAME.ALIEN_S_SFX.setVolume(0.2);

    GAME.ALIEN_K_SFX = loadSound("assets/alientd.wav");
    GAME.ALIEN_K_SFX.setVolume(0.5)

    GAME.PLAYER_S_SFX = loadSound("assets/shoot.wav");
    GAME.PLAYER_S_SFX.setVolume(0.4);

    GAME.PLAYER_D_SFX = loadSound("assets/takedmg.wav");
    GAME.PLAYER_D_SFX.setVolume(0.5);

    GAME.METEOR_D_SFX = loadSound("assets/meteorex.wav");
    GAME.METEOR_D_SFX.setVolume(0.5);

    GAME.METEOR_K_SFX = loadSound("assets/meteortd.wav");
    GAME.METEOR_K_SFX.setVolume(0.5);

    GAME.COVER_FONT = loadFont("assets/font/teeny_tiny_pixls-webfont.ttf");
}

GAME.STARS = {
    locations: [],
    stars: [],
    starw: 4,
    starvel: 10,
    star_q: 12,
    setLocations: function() {
        this.locations = [];
        for (var i = 0; i < GAME.ROW; i++) {
            for (var j = 0; j < GAME.COL; j++) {
                this.locations.push({r: i, c: j});
            }
        }
    },

    init: function() {
        this.setLocations();
        for (var i = 0; i < this.star_q; i++) {
            let index = floor(random(0, this.locations.length));
            this.stars.push({x: this.locations[index].r * GAME.TILE_SIZE + floor(random(width, width + 150)), y: this.locations[index].c * GAME.TILE_SIZE});

            this.locations.splice(index, 1);
        }
    },

    draw: function() {
        if (this.stars.length < this.star_q) {
            this.init();
        }

        for (var i in this.stars) {
            this.stars[i].x += -this.starvel;

            fill(255);
            rect(this.stars[i].x, this.stars[i].y, this.starw, this.starw);
            if (this.stars[i].x + this.starw < 0) {
                this.stars.splice(i, 1);
            }
        }
    }
}