
var height = 600
,   width = 800;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
        preload : preload,
        create : create,
        update : update
});

var paddle1, paddle2, ball;
var ballLaunched, ballVel;

function preload(){
        game.load.image('paddle', 'images/paddle.png');
        game.load.image('ball', 'images/ball.png');

}
function create(){

        paddle1 = createPaddle(0, game.world.centerY); 
        paddle2 = createPaddle(game.world.width - 16, game.world.centerY);
        ball = createBall(game.world.centerX, game.world.centerY);

        game.input.onDown.add(launchBall, this);

}
function update(){

        controlPaddle(paddle1, game.input.y);

        game.physics.arcade.collide(paddle1, ball);
        game.physics.arcade.collide(paddle2, ball);

        if(ball.body.blocked.left){
                console.log("P2 scores");
                //finish code
        }
        if(ball.body.blocked.right){
                console.log("P1 scores");
        }
        

}

function createPaddle(x, y){
        var paddle = game.add.sprite(x,y,'paddle');
        paddle.anchor.setTo(0.5, 0.5); 
        game.physics.arcade.enable(paddle);
        paddle.body.collideWorldBounds = true;
        paddle.body.immovable = true;

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