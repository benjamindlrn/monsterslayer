var ModelView = function(){
    this.isFighting = ko.observable(false);
    this.playerHealth = ko.observable(0);
    this.monsterHealth = ko.observable(0);
    this.experience = ko.observable(0);
    this.level = ko.observable(1);
    this.nextLevel = ko.observable(30);

    this.monsters = ko.observableArray([
        { name: "Gorgon", atk: 14, photo: "http://res.cloudinary.com/dr8r92oou/image/upload/c_scale,h_180,w_220/v1518017589/Gorgon_monster.png" },
        { name: "Abiorugu", atk: 24, photo: "http://res.cloudinary.com/dr8r92oou/image/upload/c_scale,h_180,w_220/v1518016366/FrontierGen-Abiorugu_Render_002.png" },
        { name: "Zinogre", atk: 44, photo: "http://res.cloudinary.com/dr8r92oou/image/upload/c_scale,h_180,w_220/v1518017997/MHShibunosato-Zinogre_Render_001.png" },
        { name: "Rathalos", atk: 64, photo: "http://res.cloudinary.com/dr8r92oou/image/upload/c_scale,h_180,w_220/v1518017589/Rathalos-2.png" }
    ]);


    this.addExperience = function() {
        this.experience(this.experience() + 10);
        if (this.experience()>=this.nextLevel()) {
            alert("Congratulations!! You leveled up!!");
            this.level(this.level()+1);
            this.nextLevel((this.nextLevel()*1.5).toFixed(0));
        }
    };

    this.startFight = function() {
        this.isFighting(true);
        this.playerHealth(100);
        this.monsterHealth(100);
    };

    this.lose = function(){
        alert("You lose... Try again!!");
        this.experience(0);
        this.isFighting(false);
        this.level(1);
        this.nextLevel(30);
    };

    this.win = function() {
        alert("Victory! 10 Exp earned");
        this.addExperience();
        this.isFighting(false);
    };

    this.calculateDmg = function(max,min) {
        return Math.random() * (max - min) + min; 
    };

    this.monsterAttack = function() {
        this.playerHealth(this.playerHealth()-this.calculateDmg(14,10));        
    };

    this.attack = function(){
        this.monsterHealth(this.monsterHealth()-this.calculateDmg(12,6));
        if (this.monsterHealth()<=0) {
            this.win();
            return;
        }              
        this.monsterAttack(); 
        if (this.playerHealth()<=0) {
            this.lose();
        }  
    };

    this.specialAttack = function(){
        this.monsterHealth(this.monsterHealth()-this.calculateDmg(18,10));
        if (this.monsterHealth()<=0) {
            this.win();
            this.isFighting(false);
            return;
        }              
        this.monsterAttack(); 
        if (this.playerHealth()<=0) {
            this.lose();
        }
    };

    this.heal = function() {
        if (this.playerHealth()<=92) {
            this.playerHealth(this.playerHealth()+15);
            this.monsterAttack();    
        }
        else {
            this.playerHealth(100);
        }                
        
    };
};

ko.applyBindings(new ModelView());
