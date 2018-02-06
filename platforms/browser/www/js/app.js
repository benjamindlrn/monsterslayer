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
        this.playerHealth(this.playerHealth()-this.calculateDmg(12,6));        
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

    
};

ko.applyBindings(new ModelView());