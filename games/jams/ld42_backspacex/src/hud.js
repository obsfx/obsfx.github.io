let HUD = {
    ARCADE: {
        point: 0,
        hp: 0,
        con: null,
        index: 0,
        html_doc: null,
        score: 0,
        wave: 1,
        init: function() {
            if (this.con == null) {
                let con_ = document.createElement("div");
                con_.setAttribute("id", "hud_arcade");
                document.getElementsByTagName("body")[0].insertBefore(con_, document.getElementById("defaultCanvas0"));
                this.con = document.getElementById("hud_arcade");
            }
            this.inithtml();
            this.con.innerHTML = this.html_doc;
        
        },

        inithtml: function() {
            this.html_doc = `
                <div style="width: 685px; height: 65px; background-color: #0c0c0c; margin: auto; color: #fff; font-family: 'teeny_tiny_pixlsregular'; line-height: 45px; box-sizing: border-box; padding-left: 10px; padding-right: 10px; font-size: 12px;">
                    <div style="width: 160px; float: left; box-sizing: border-box; padding-left: 5px; padding-right: 5px; line-height: 20px; margin-top: -5px;">
                        <div>SCRAPS: ${this.point} </div>
                        <div>SCORE: ${this.score} </div>
                        <div>WAVE: ${this.wave}  </div>
                    </div>

                    <div style="width: 180px; float: left; box-sizing: border-box; padding-left: 5px; padding-right: 5px; margin-top: -15px;">
                        HP: 
                        <div style="width: 70px; height: 20px; background-image: url('assets/hpbar.png'); display: inline-block; margin-top: -3px; vertical-align: middle;">
                            <div style="background-color: #d80041; width: ${this.hp}px; height: 16px; margin: 2px 2px;"></div>
                        </div>
                        <div style="font-size: 10px; margin-top: -10px; line-height: 15px">CURRENT WEAPON: 
                            <img src="assets/wc${(this.index + 1)}.png" width="32px" height="32px" style="vertical-align: middle; margin-left: -5px;">
                        </div>
                        <div style="font-size: 8px; margin-top: -5px; line-height: 15px">
                            DAMAGE: ${(GAME.WEAPONS[this.index].dmg * 40)}
                        </div>
                    </div>
            `;

            if (this.index != GAME.WEAPONS.length - 1) {
                this.html_doc += `
                        <div style="width: 180px; float: left; box-sizing: border-box; padding-left: 5px; padding-right: 5px; font-size: 10px; line-height: 15px">
                            <div>PRESS P TO UPGRADE</div>
                            <div style="margin-top: 5px;">
                                <img src="assets/wc${(this.index + 2)}.png" width="32px" height="32px" style="float: left; margin-top: 2px;">
                                <div style="vertical-align: middle; display: inline-block; margin-left: 10px; line-height: 20px;">
                                    <div>${GAME.WEAPONS[this.index + 1].cost} SCRAPS</div>
                                    <div style="font-size: 8px;"> DAMAGE: ${(GAME.WEAPONS[this.index + 1].dmg) * 40} </div>
                                </div>
                            </div>
                        </div>
                
                `;
            } else {
                this.html_doc += `
                        <div style="width: 180px; float: left; box-sizing: border-box; padding-left: 5px; padding-right: 5px; font-size: 10px; line-height: 15px">
                            <div> ---------------- </div>
                            <div>
                                <div style="vertical-align: middle; display: inline-block; margin-left: 10px; line-height: 20px;">
                                    <div>ALL UPGRADES PURCHASED!</div>
                                </div>
                            </div>
                        </div>

                `;
            }

            this.html_doc += `
                <div style="width: 145px; float: left; box-sizing: border-box; padding-left: 5px; padding-right: 5px; font-size: 10px; line-height: 15px">
                    <div> PRESS H TO +HP </div>
                    <div style="margin-top: 5px;">
                        <img src="assets/heal.png" width="32px" height="32px" style="float: left; margin-top: 2px;">
                        <div style="vertical-align: middle; display: inline-block; margin-left: 10px; line-height: 20px;">
                            <div>${GAME.HEAL_COST} SCRAPS</div>
                            <div style="font-size: 8px;"> +${GAME.HEAL} </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        },

        updatePoint: function(p) {
            this.point = p;
            this.set();
        },

        updateHP: function(p, k) {
            this.hp = (66 / p) * k;
            this.set();
        },

        updateWeapon: function(i) {
            this.index = i;
            this.set();
        },

        updateScore: function(s) {
            this.score = s;
            this.set();
        },

        updateWave: function(p) {
            this.wave = p;
            this.set();
        },

        set: function() {
            this.inithtml();
            this.con.innerHTML = this.html_doc;
        },

        delete: function() {
            this.point = 0;
            this.hp = 0;
            this.index = 0;
            this.html_doc = null;
            this.score = 0;
            this.wave = 1;
            this.con.innerHTML = `
            <div style="width: 550px; height: 65px; background-color: #0c0c0c; margin: auto; color: #fff; font-family: 'teeny_tiny_pixlsregular'; line-height: 45px; box-sizing: border-box; padding-left: 10px; padding-right: 10px; font-size: 12px;">
                </div>
            `;
        }
    }
}