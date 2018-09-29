enchant ();


window.onload = function () {
    var game = new Game(420,320);
    game.preload('asset/penguin.png','asset/cloud1.png','asset/ice_horizon.png','asset/seal.png','asset/snowboy.png');
    game.preload('asset/waltz.mp3','asset/finale.mp3','asset/death.mp3');
    game.fps = 30;
    
    game.onload = function(){

    // create start menu & play start music
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
        penguin.jump = false;
    
    var penguinhit = new Sprite(3,3);
    
    var cloud1 = new Sprite(92,62);
    var cloud2 = new Sprite(92,62);
    
    var ice = new Array();
    for( i=0; i < 3; i++){
        ice[i] = new Sprite(250,30);
    }
    
    var starttime = 0;
    var score = new Label();      

    var seal = new Sprite(50,35);
    seal.speed = 3;

    var snowboy = new Sprite(50,50);
    var snowboymsg = new Label("Welcome to South Pole")
    snowboymsg.x = 150; snowboymsg.y = 230
    snowboymsg.font = "12px meiryo";

    // describe auto horizontal scroll
        //firststage.addEventListener('enterframe',function(){
        //   game.assets['asset/waltz.mp3'].play();
        //})

        firststage.addEventListener('enterframe', function(){
           
            cloud1.x-=2 ; cloud2.x -=2;
            if(cloud1.x <= -90){
                cloud1.x=420;
            }
            if(cloud2.x <= -90){
                cloud2.x = 420;
            }
            
            for(i=0; i < 3;i++){
                    ice[i].x-=1 ;
            
            if(ice[i].x <= -330){
                ice[i].x = 420
                }
            }
        })

    // how to control penguin
        //penguin is stepping or jumping
        penguin.addEventListener('enterframe',function(){
            if(game.input.up)
                if(penguin.jump){
                     //nothing happens
            } else { 
                 penguin.jump = true;
                 penguin.frame = 5;
                 penguinhit.tl.moveBy(0,-80,20).moveBy(0,80,20);
                 penguin.tl.moveBy(0,-80,20).moveBy(0,80,20).then(function(){
                    penguin.frame = 2;
                    penguin.jump = false;
                 });
                 
            }
            else
                if(penguin.jump){
                  //nothing happens
                } else {
                 penguinStep(this);   
                }             
            })

        //penguin is stepping

        function penguinStep(obj){
            obj.frame++;
            if(obj.frame > 3){
                obj.frame = 0;
            }

        }

        // seal is attacking

        seal.addEventListener('enterframe',function(){
            seal.x -= seal.speed ;
            if(this.intersect(penguinhit)){   
                penguin.clearEventListener('enterframe');
                firststage.clearEventListener('enterframe');
                seal.clearEventListener('enterframe');
                score.clearEventListener('enterframe');
                game.assets['asset/waltz.mp3'].stop();
                game.assets['asset/death.mp3'].play();
                penguin.frame = 9;
                setTimeout(function(){
                    game.onload();
                }, 3000);
            }else{
               if(seal.x <= -50){
                seal.x = 370;
                seal.speed = Math.floor(Math.random() * 4 + 2);
                console.log(seal.speed);
               } 
            }
         })



       //score is increasing

       score.addEventListener('enterframe',function(){
        if(score.value >= 0){
                score.value = 50 - Math.floor((new Date().getTime() - starttime)/1000);
                score.text = "南極点まで残り " + score.value + " km";
        } else {
            score.text = "南極点まで残り " + "0" + " km";
            firststage.addChild(snowboy);
            snowboy.x--;
            seal.speed = -4;
            if (snowboy.x <= 100){
                snowboy.x = 100;
                penguin.clearEventListener('enterframe');
                firststage.clearEventListener('enterframe');
                firststage.addChild(snowboymsg);
                game.assets['asset/waltz.mp3'].stop();
                game.assets['asset/finale.mp3'].play();

                setTimeout(function(){
                    game.onload();
                }, 5500);

            }
            }   
         }
       )


    // transferred from title to first stage
    startscene.addEventListener('touchstart',function(){       
        game.replaceScene(firststage);

        firststage.backgroundColor = "#99CCFF";
                
        // display penguin (player)
        
        penguin.image = game.assets['asset/penguin.png'];
        penguin.x = 20; penguin.y = 255;
        penguinhit.x = penguin.x + 14;
        penguinhit.y = penguin.y + 17;
        
        
        firststage.addChild(penguin);
        firststage.addChild(penguinhit);

        // display cloud

        cloud1.image = game.assets['asset/cloud1.png'];
        cloud1.x = 80; cloud1.y = 50;
        firststage.addChild(cloud1);

        cloud2.image = game.assets['asset/cloud1.png'];
        cloud2.x = 280; cloud2.y = 50;
        firststage.addChild(cloud2);

        // display ice

        for(i=0; i<3; i++){
            ice[i].image = game.assets['asset/ice_horizon.png'];
            ice[i].x = i * 250; ice[i].y = 290
            firststage.addChild(ice[i]);
        }

        // display seal

        seal.image = game.assets['asset/seal.png']
        seal.x = 370; seal.y = 259;
        firststage.addChild(seal);

        //display score upper-right on the first stage
        score.value = 20;
        starttime = new Date().getTime();

        score.x = 220;
        score.y = 15;
        score.text = "南極点まで残り " + score.value + " km";
        score.font = "14px meiryo"
        firststage.addChild(score);

        //display snow boy
        snowboy.image = game.assets['asset/snowboy.png'];
        snowboy.x = 370; snowboy.y = 241;

        //stop prologue thema song
         game.assets['asset/waltz.mp3'].play();
    });   


};

game.start();


}