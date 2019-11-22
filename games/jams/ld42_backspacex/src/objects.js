let ARCADE = {};

function initObjects() {

    //Player
    ARCADE.Player = function() {
        this.w = 100;
        this.h = 40;
        this.vel = 3;
        this.pos = createVector(15, (height / 2) - (this.h / 2));
        this.upgrades = {
            weapon: 0,
            healt: 0
        };
        this.keys = {
            "87": false,
            "65": false,
            "83": false,
            "68": false,
            "32": false
        };

        this.bullets = [];
        this.bulletMovement = GAME.WEAPONS[this.upgrades.weapon].s;
        this.dmg = GAME.WEAPONS[this.upgrades.weapon].dmg;

        this.fired = false;
        this.fireRate = GAME.WEAPONS[this.upgrades.weapon].fr;
        this.firedFrame = null;

        this.hp = GAME.HEALTH[this.upgrades.healt];
        this.currentHp = this.hp;
        
        this.score = 0;

        this.canTakeDmg = true;
        this.defaultctdCD = 150;
        this.ctdCD = this.defaultctdCD;
        this.blink = false;
        this.toggle = false;

        this.currentAnim = 0;
        this.animDelay = 10;
        this.animToggle = false;
    }

    ARCADE.Player.prototype.controls = function(key) {
        this.keys[key] = !this.keys[key];
    }

    ARCADE.Player.prototype.takedDmg = function(dmg) {
        /*------------------------------------------------------------------- */
        this.currentHp += -dmg;
        GAME.PLAYER_D_SFX.play();
        HUD.ARCADE.updateHP(this.hp, this.currentHp);
        this.canTakeDmg = false;
        this.blink = true;
    }

    ARCADE.Player.prototype.update = function() {
        if (this.keys["87"] && this.pos.y > 0) {
            this.pos.y -= this.vel;
        } 
        
        if (this.keys["65"] && this.pos.x > 0) {
            this.pos.x -= this.vel;
        }
        
        if (this.keys["83"] && this.pos.y + this.h < height) {
            this.pos.y += this.vel;
        } 
        
        if (this.keys["68"] && this.pos.x + this.w < width) {
            this.pos.x += this.vel;
        }

        if (this.canTakeDmg) {
            for (var i in ARCADE.Meteors) {
                let col = collideRectCircle(this.pos.x, this.pos.y, this.w, this.h, ARCADE.Meteors[i].pos.x, ARCADE.Meteors[i].pos.y, ARCADE.Meteors[i].size);
                if (col) {
                    this.takedDmg(ARCADE.Meteors[i].dmg);
                    break;
                }
            }
        }

        if (this.canTakeDmg) {
            for (var i in ARCADE.Aliens) {
                for (var j in ARCADE.Aliens[i].bullets) {
                    let p = collideRectRect(this.pos.x, this.pos.y, this.w, this.h, ARCADE.Aliens[i].bullets[j].pos.x, ARCADE.Aliens[i].bullets[j].pos.y, ARCADE.Aliens[i].bullets[j].w, ARCADE.Aliens[i].bullets[j].h);
                    if (p) {
                        this.takedDmg(ARCADE.Aliens[i].bullets[j].dmg);
                        ARCADE.Aliens[i].bullets.splice(j, 1);
                        break;
                    }
                }
            }
        }

        if (this.canTakeDmg) {
            for (var i in ARCADE.Aliens) {
                let p = collideRectRect(this.pos.x, this.pos.y, this.w, this.h, ARCADE.Aliens[i].pos.x, ARCADE.Aliens[i].pos.y, ARCADE.Aliens[i].w, ARCADE.Aliens[i].h);
                if (p) {
                    this.takedDmg(floor(ARCADE.Aliens[i].dmg / 1.2));
                    break;
                }
            }
        }

        if (!this.canTakeDmg) {
            if (this.ctdCD > 0) {
                //console.log(this.ctdCD);
                this.ctdCD -= 1;
            } else {
                this.canTakeDmg = true;
                this.blink = false;
                this.ctdCD = this.defaultctdCD;
            }
        }

        if (this.keys["32"]) {
            this.shoot();
        }

        if (this.fired) {
            if (frameCount - this.firedFrame > this.fireRate) {
                this.fired = false;
            }
        }

        if (this.currentHp <= 0) {
            GAME.MUSIC_STOP();
            HUD.ARCADE.delete();
            GAME.STATUS = "G";
            SM.showScene(GAME_OVER);
        }
    }

    ARCADE.Player.prototype.draw = function() {
        this.update();
        this.bulletDraw();

        if (this.blink) {
            if (this.ctdCD % 5 == 0) {
                this.toggle = !this.toggle;
            }
        }

        if (this.toggle) {
            return true;
        } 

        
        if (frameCount % this.animDelay == 0) {
            if (this.currentAnim < 4) {
                this.currentAnim += 1;
            } else {
                this.currentAnim = 0;
            }
        }

        imageMode(CORNER);
        image(GAME.PLAYER_SPRITES[this.currentAnim], this.pos.x, this.pos.y, this.w, this.h);
    }

    ARCADE.Player.prototype.bulletDraw = function() {
        for (var i in this.bullets) {
            if (this.bullets[i].pos.x > width) {
                this.bullets.splice(i, 1);
            } else {

                let bulletCollide = false;

                for (var j in ARCADE.Meteors) {
                    let p = collideRectCircle(this.bullets[i].pos.x, this.bullets[i].pos.y, this.bullets[i].w, this.bullets[i].h, ARCADE.Meteors[j].pos.x, ARCADE.Meteors[j].pos.y, ARCADE.Meteors[j].size);
                    if (p) {

                        ARCADE.Meteors[j].hpbarshowcd = 80;

                        if (!ARCADE.Meteors[j].hit(this.bullets[i].dmg)) {
                            this.score += ARCADE.Meteors[j].point;


                            GAME.METEOR_D_SFX.play();

                            GAME.SCORE += ARCADE.Meteors[j].point * 2;
                            HUD.ARCADE.updateScore(GAME.SCORE);
                            HUD.ARCADE.updatePoint(this.score);
    
                            ARCADE.Meteors.splice(j, 1);
                        } else {
                            GAME.METEOR_K_SFX.play();
                        }

                        bulletCollide = true;
                        break;
                    }
                }

                if (!bulletCollide) {
                    for (var j in ARCADE.Aliens) {
                        let p = collideRectRect(this.bullets[i].pos.x, this.bullets[i].pos.y, this.bullets[i].w, this.bullets[i].h, ARCADE.Aliens[j].pos.x, ARCADE.Aliens[j].pos.y, ARCADE.Aliens[j].w, ARCADE.Aliens[j].h);
                        if (p) {
    
                            ARCADE.Aliens[j].hpbarshowcd = 80;
    
                            if (!ARCADE.Aliens[j].hit(this.bullets[i].dmg)) {
                                this.score += ARCADE.Aliens[j].point;

                                GAME.ALIEN_D_SFX.play();

                                GAME.SCORE += ARCADE.Aliens[j].point * 2;
                                HUD.ARCADE.updateScore(GAME.SCORE);
                                HUD.ARCADE.updatePoint(this.score);
        
                                ARCADE.Aliens.splice(j, 1);
                            } else {
                                GAME.ALIEN_K_SFX.play();
                            }
    
                            bulletCollide = true;
                            break;
                        }
                    }
                }

                if (bulletCollide) {
                    this.bullets.splice(i, 1);
                } else {
                    this.bullets[i].draw();
                }

            }
        }
    }

    ARCADE.Player.prototype.shoot = function() {
        if (!this.fired) {
            this.bullets.push(new ARCADE.Bullet(this.pos.x + this.w / 2, this.pos.y + this.h / 2 + 10, this.bulletMovement, this.dmg, this.upgrades.weapon));
            GAME.PLAYER_S_SFX.play();
            this.fired = true;
            this.firedFrame = frameCount;
        }
    }

    ARCADE.Player.prototype.upgrade = function() {
        if (this.upgrades.weapon < GAME.WEAPONS.length - 1) {
            if (GAME.WEAPONS[this.upgrades.weapon + 1].cost <= this.score) {
                this.upgrades.weapon += 1;
                this.score += -GAME.WEAPONS[this.upgrades.weapon].cost;
                this.bulletMovement = GAME.WEAPONS[this.upgrades.weapon].s;
                this.dmg = GAME.WEAPONS[this.upgrades.weapon].dmg;
                this.fireRate = GAME.WEAPONS[this.upgrades.weapon].fr;
                GAME.UPGRADE_SFX.play();
                HUD.ARCADE.updatePoint(this.score);
                HUD.ARCADE.updateWeapon(this.upgrades.weapon);

            } else {
                GAME.WRNN = true;
                GAME.WRNN_CD = 80;
                GAME.WRNN_TEXT = "NOT ENOUGH SCRAPS !";
            }
        }
    }

    ARCADE.Player.prototype.heal = function() {

        if (this.currentHp < this.hp) {

            if (GAME.HEAL_COST <= this.score) {
                this.score += -GAME.HEAL_COST;
                this.currentHp += GAME.HEAL;
                if (this.currentHp > this.hp) {
                    this.currentHp = this.hp;
                }
                GAME.UPGRADE_SFX.play();
                HUD.ARCADE.updatePoint(this.score);
                HUD.ARCADE.updateHP(this.hp, this.currentHp);
                
            } else {
                GAME.WRNN = true;
                GAME.WRNN_CD = 80;
                GAME.WRNN_TEXT = "NOT ENOUGH SCRAPS !";
            }

        } else {
            GAME.WRNN = true;
            GAME.WRNN_CD = 80;
            GAME.WRNN_TEXT = "YOUR HP IS ALREADY FULL !";
        }

    }

    //Bullets
    ARCADE.Bullet = function(x, y, d, dmg, type) {
        this.pos = createVector(x, y);
        this.w = 20;
        this.h = 5;
        this.dmg = dmg
        this.vel = d;

        if (type == "A") {
            this.img = GAME.ALIEN_BULLET;
        } else {
            this.img = GAME.WEAPON_SPRITES[type];
        }
    }

    ARCADE.Bullet.prototype.update = function() {
        this.pos.x += this.vel;
    }

    ARCADE.Bullet.prototype.draw = function() {
        this.update();
        /*fill(0,0, 255);
        rect(this.pos.x, this.pos.y, this.w, this.h);*/
        imageMode(CORNER);
        image(this.img, this.pos.x, this.pos.y, this.w, this.h);
    }


    //Meteors
    ARCADE.Meteor = function() {
        this.t = floor(random(1, 5));
        this.size = this.t * 25;
        this.pos = createVector(random(width, random(width + this.size + 20, width + this.size + 100)), random(50, height - 50));
        this.hp = this.t * 2;
        this.currentAngel = random(0, 360);
        this.rotate = floor(random(2, 5));
        this.rotation = 0;
        this.hpbarw = this.size,
        this.hpbarh = 5;
        this.hpbarshowcd = 0;
        this.dmg = this.t * 5;
        this.point = this.t * 4; 
        this.movement = createVector( -random(0.5, 2), random(-0.5, 0.5));
    }

    ARCADE.Meteor.prototype.update = function() {
        this.pos.add(this.movement);  

        if (this.pos.x + this.size / 2 < 0) {
            let index = ARCADE.Meteors.indexOf(this);

            ARCADE.Meteors.splice(index, 1);
            //console.log(ARCADE.Meteors.length);
            
            return false;
        }

        if (this.currentAngel + this.rotate < 360) {
            this.currentAngel += this.rotate;
        } else {
            this.currentAngel = (360 - this.currentAngel) + this.rotate;
        }

        
        this.rotation = this.currentAngel * Math.PI / 180;
    }

    ARCADE.Meteor.prototype.draw = function() {
        if (this.update() == false)
            return false;

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        //ellipse(0, 0, this.size, this.size);
        imageMode(CENTER);
        image(GAME.METEOR_SPRITE, 0, 0, this.size, this.size);
        pop();

        this.HPBar();
    }

    ARCADE.Meteor.prototype.HPBar = function() {
        if (this.hpbarshowcd > 0) {
            fill(216,0,65);
            rect(this.pos.x - this.size / 2, this.pos.y - this.hpbarh / 2, (this.hpbarw / (this.t * 2)) * this.hp, this.hpbarh);
            this.hpbarshowcd -= 1;
        }
    }

    ARCADE.Meteor.prototype.hit = function(dmg) {
        if (this.hp - dmg > 0) {
            this.hp -= dmg;
            return true;
        } else {
            return false;
        }
    }

    //Aliens
    ARCADE.Alien = function(x, y) {
        this.pos = createVector(x, y);
        this.w = 50;
        this.h = 32;
        this.t = floor(random(1, 4));
        this.dmg = this.t * 5;
        this.hp = this.t * 2;
        this.hpbarw = this.w;
        this.hpbarh = 5;
        this.hpbarshowcd = 0;
        this.point = this.t * 5; 
        this.movement = createVector( -random(0.5, 2), 0);
        this.bullets = [];
        this.bulletMovement = 5;
        this.fired = false;
        this.fireRate = floor(random(200, 300));
        this.firedFrame = null;
    }

    ARCADE.Alien.prototype.update = function() {
        this.pos.add(this.movement);

        if (this.pos.x + this.w < 0) {
            let index = ARCADE.Aliens.indexOf(this);

            ARCADE.Aliens.splice(index, 1);
            //console.log(ARCADE.Aliens.length, "Aliens");
            
            return false;
        }

        if (this.fired) {
            if (frameCount - this.firedFrame > this.fireRate) {
                this.fired = false;
            }
        }
    }

    ARCADE.Alien.prototype.draw = function() {
        if (this.update() == false)
            return false;
        this.shoot();
        this.bulletDraw();
        imageMode(CORNER);
        image(GAME.ALIEN_SPRITE, this.pos.x, this.pos.y, this.w, this.h);
        /*fill(0, 0, 255);
        rect(this.pos.x, this.pos.y, this.w, this.h);*/
        this.HPBar();
    }

    ARCADE.Alien.prototype.shoot = function() {
        if (!this.fired) {
            this.bullets.push(new ARCADE.Bullet(this.pos.x, this.pos.y + this.h / 2, -this.bulletMovement, this.dmg, "A"));
            GAME.ALIEN_S_SFX.play();
            this.fired = true;
            this.firedFrame = frameCount;
        }
    }

    ARCADE.Alien.prototype.bulletDraw = function() {
        for (var i in this.bullets) {
            this.bullets[i].draw();

            if (this.bullets[i].pos.x + this.bullets[i].w < 0) {
                this.bullets.splice(i, 1);
            } 
        }
    }

    ARCADE.Alien.prototype.HPBar = function() {
        if (this.hpbarshowcd > 0) {
            fill(216,0,65);
            rect(this.pos.x, this.pos.y + this.h / 2, (this.hpbarw / (this.t * 2)) * this.hp, this.hpbarh);
            this.hpbarshowcd -= 1;
        }
    }

    ARCADE.Alien.prototype.hit = function(dmg) {
        if (this.hp - dmg > 0) {
            this.hp -= dmg;
            return true;
        } else {
            return false;
        }
    }
}