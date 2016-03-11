enchant ();


window.onload = function () {
    var game = new Game(420,320);
    game.preload('asset/penguin.png','asset/cloud1.png');
    game.preload('asset/waltz.mp3');
    game.fps = 30;
    
    game.onload = function(){

    // create start menu & play start music
    // game.assets['asset/hitsuji_nation.mp3'].play();
    var startscene = new Scene();
    
    startscene.backgroundColor = "#4169e1";
        // Title Logo
        var titlelogo = new Label("Penguin Trip");
        titlelogo.x = 100;
        titlelogo.y = 50;
        titlelogo.font = "36px palatino";

        var startmsg = new Label("Click screen to start game");
        startmsg.x = 90;
        startmsg.y = 120;
        startmsg.font = "20px palatino";

        startscene.addChild(titlelogo);
        startscene.addChild(startmsg);

    game.pushScene(startscene);

    // create first stage with nodes
    
    var firststage = new Scene();
    var penguin = new Sprite(30,35);
    var cloud1 = new Sprite(92,62);
    var cloud2 = new Sprite(92,62);
    var score = new Label();  
    
    // describe auto horizontal scroll
        firststage.addEventListener('enterframe',function(){
            game.assets['asset/waltz.mp3'].play();
        })

        cloud2.addEventListener('enterframe', function(){
            this.x-=2 ;
            if(cloud2.x <= -90){
                this.x=420;
            }
        })
        cloud1.addEventListener('enterframe', function(){
            this.x-=2 ;
            if(cloud1.x <= -90){
                this.x=420;
            }

        })


    // how to control penguin
        //penguin is stepping
        penguin.addEventListener('enterframe',function(){
            this.frame++;
            if(this.frame > 3){
                this.frame = 0;
            }
        })

        game.addEventListener('upbuttondown',function(){
                    penguin.frame = 6;
                    penguin.tl.moveBy(0,-80,20).moveBy(0,80,20);
        })



    // define behavior of sloth crashing 
        

    //define behavior when sloth gets a banana
        

    // transferred from title to first stage
    startscene.addEventListener('touchstart',function(){       
        game.replaceScene(firststage);

        firststage.backgroundColor = "#99CCFF";
                
        // display penguin (player)
        
        penguin.image = game.assets['asset/penguin.png'];
        penguin.x = 20; penguin.y=230;
        firststage.addChild(penguin);

        // display cloud

        cloud1.image = game.assets['asset/cloud1.png'];
        cloud1.x = 80; cloud1.y=50;
        firststage.addChild(cloud1);

        cloud2.image = game.assets['asset/cloud1.png'];
        cloud2.x = 280; cloud2.y=50;
        firststage.addChild(cloud2);

        //display score upper-right on the first stage

        game.score = 0;

        score.x = 350;
        score.y = 15;
        score.text = "score: " + game.score;
        firststage.addChild(score);

        //stop prologue thema song
    });   


};

game.start();


}