
var height = 600
,   width = 800;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
        preload : preload,
        create : create,
        update : update
});

var paddle1, paddle2, ball;
var ballLaunched, ballVel;
var score1Text, score2Text;
var score1, score2;


function preload(){
        game.load.image('paddle', 'assets/images/paddle.png');
        game.load.image('ball', 'assets/images/ball.png');
        
        game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');

        score1 = 0;
        score2 = 0;

        game.load.audio('paddle-bounce', ['assets/sounds/paddle-bounce.wav']);
        game.load.audio('wall-bounce', ['assets/sounds/wall-bounce.wav']);
        

}
function create(){

        paddle1 = createPaddle(0, game.world.centerY); 
        paddle2 = createPaddle(game.world.width - 8, game.world.centerY);
        ball = createBall(game.world.centerX, game.world.centerY);

        game.input.onDown.add(launchBall, this);

        // score1Text = game.add.text(128, 128, '0', {
        //         font : "64px Gabriella",
        //         fill : "#FFFFFF",
        //         align : "center"
        // });

        // score2Text = game.add.text(game.world.width - 128, 128, '0', {
        //         font : "64px Gabriella",
        //         fill : "#FFFFFF",
        //         align : "center"
        // });

        score1Text = game.add.bitmapText(128, 128, 'font', '0', 64);
        score2Text = game.add.bitmapText(game.world.width - 128, 128, 'font', '0', 64);

}
function update(){

        score1Text.text = score1;
        score2Text.text = score2;
        

        controlPaddle(paddle1, game.input.y);

        game.physics.arcade.collide(paddle1, ball, function(){
                game.sound.play('paddle-bounce');
        });
        game.physics.arcade.collide(paddle2, ball, function(){
                game.sound.play('paddle-bounce');
        });

        if(ball.body.blocked.up){
                game.sound.play('wall-bounce');
        }
        if(ball.body.blocked.bottom){
                game.sound.play('wall-bounce');
        }
                        

        if(ball.body.blocked.left){
                score2++;
        }
        if(ball.body.blocked.right){
                score1++;
        }
        
        paddle2.body.velocity.setTo(ball.body.velocity.y);
        paddle2.body.velocity.x = 0;
        paddle2.body.maxVelocity.y = 250;

}

function createPaddle(x, y){
        var paddle = game.add.sprite(x,y,'paddle');
        paddle.anchor.setTo(0.5, 0.5); 
        game.physics.arcade.enable(paddle);
        paddle.body.collideWorldBounds = true;
        paddle.body.immovable = true;

        paddle.scale.setTo(0.5, 0.5);

        return paddle;
}

function controlPaddle(paddle, y){
        paddle.y = y;

        if (paddle.y < paddle.height / 2){
                paddle.y = paddle.height/2;
        }else if(paddle.y > game.world.height - paddle.height/2){
                paddle.y = game.world.height - paddle.height/2;
        }
}

function createBall(x,y){

        ballLaunched = false;
        ballVel = 400;

        var ball = game.add.sprite(x,y,'ball');
        ball.anchor.setTo(0.5,0.5);
        game.physics.arcade.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(1,1);

        return ball;

}

function launchBall(){
        if (ballLaunched){
              ball.x = game.world.centerX;
              ball.y = game.world.centerY;
              ball.body.velocity.setTo(0,0);
              ballLaunched = false; 
        }else{
                ball.body.velocity.x = -ballVel;
                ball.body.velocity.y = ballVel;
                ballLaunched = true;
        }
}