var ModelView = function(){
    this.isRunning = ko.observable(false);
    this.playerHealth = ko.observable(0);
    this.monsterHealth = ko.observable(0);
    this.startGame = function() {
        this.isRunning(true);
        this.playerHealth(100);
        this.monsterHealth(100);
    };
    this.giveUp = function(){
        this.isRunning(false);
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
            if (confirm("You won! New Game?")==true) {
                this.startGame();
                return;
            }
            this.isRunning(false);
            return;
        }        
        this.monsterAttack(); 
    };

    this.specialAttack = function(){
        this.monsterHealth(this.monsterHealth()-this.calculateDmg(18,10));
        if (this.monsterHealth()<=0) {
            if (confirm("You won! New Game?")==true) {
                this.startGame();
                return;
            }
            this.isRunning(false);
            return;
        }        
        this.monsterAttack();
    };

    this.heal = function() {
        if (this.playerHealth()<=90) {
            this.playerHealth(this.playerHealth()+15);
            this.monsterAttack();    
        }
        else {
            this.playerHealth(100);
        }                
        
    };
};

ko.applyBindings(new ModelView());
