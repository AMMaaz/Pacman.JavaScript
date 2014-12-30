var Pacman = (function () {
    function Pacman() {
        this.game = new Phaser.Game(16*36, 16*36, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    Pacman.prototype.preload = function () {
        this.game.load.tilemap('maze', 'assets/some.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('pacman', 'assets/pacman.png');
        this.game.load.spritesheet('man', 'assets/pman.png', 16, 16, 20);
        this.game.load.spritesheet('red', 'assets/red.png', 16, 16, 8);
        this.game.load.spritesheet('blue', 'assets/blue.png', 16, 16, 8);
        this.game.load.spritesheet('clay', 'assets/clay.png', 16, 16, 8);
        this.game.load.spritesheet('pink', 'assets/pink.png', 16, 16, 8);
        //this.game.load.spritesheet('die', 'assets/die.png', 16, 16, 12);

    };

    var player;
    var cursors;
    var layer;
    var count = 0;
    var map;
    var red;
    var blue;
    var clay;
    var pink;
    var ghosts;
    //var direction;
    var gameOver = 0;;
    var directionRed;
    var directionBlue;
    var directionClay;
    var directionPink;

    Pacman.prototype.create = function () {

        //this.game.stage.backgroundColor = '#FFFFFF';

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        map = this.game.add.tilemap('maze');
        map.addTilesetImage('pacman', 'pacman');

        map.setCollisionByExclusion([35], true, 'Tile');

        layer = map.createLayer('Tile');
        layer.resizeWorld();
        player = this.game.add.sprite(15*16, 26*16, 'man');//26
        this.game.physics.arcade.enable(player);
        //this.game.physics.arcade.enable(layer);

        map.setTileIndexCallback(35, pill, this);

        red = this.game.add.sprite(13*16, 14*16, 'red');
        red.name = 'ghost';
        blue = this.game.add.sprite(14*16, 14*16, 'blue');
        blue.name = 'ghost';
        clay = this.game.add.sprite(15*16, 14*16, 'clay');
        clay.name = 'ghost';
        pink = this.game.add.sprite(16*16, 14*16, 'pink');
        pink.name = 'ghost';

        //map.setTileIndexCallback(, )
        //layer.body.immovable = true;
        player.body.collideWorldBounds = true;

        ghosts = this.game.add.group();
        ghosts.enableBody = true;
        ghosts.add(red);
        ghosts.add(blue);
        ghosts.add(clay);
        ghosts.add(pink);

        //this.game.physics.arcade.enable(ghosts);
        //this.game.physics.arcade.enable(red);
        //this.game.physics.arcade.enable(blue);
        //this.game.physics.arcade.enable(clay);
        //this.game.physics.arcade.enable(pink);



        player.animations.add('left', [3, 2], 7, true);
        player.animations.add('right', [1, 0], 7, true);
        player.animations.add('up', [5, 4], 7, true);
        player.animations.add('down', [7, 6], 7, true);
        player.animations.add('die', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 12, false);

        red.animations.add('left', [3, 2], 10, true);
        red.animations.add('right', [1, 0], 10, true);
        red.animations.add('up', [5, 4], 10, true);
        red.animations.add('down', [7, 6], 10, true);

        blue.animations.add('left', [3, 2], 10, true);
        blue.animations.add('right', [1, 0], 10, true);
        blue.animations.add('up', [5, 4], 10, true);
        blue.animations.add('down', [7, 6], 10, true);

        clay.animations.add('left', [3, 2], 10, true);
        clay.animations.add('right', [1, 0], 10, true);
        clay.animations.add('up', [5, 4], 10, true);
        clay.animations.add('down', [7, 6], 10, true);

        pink.animations.add('left', [3, 2], 10, true);
        pink.animations.add('right', [1, 0], 10, true);
        pink.animations.add('up', [5, 4], 10, true);
        pink.animations.add('down', [7, 6], 10, true);

        cursors = this.game.input.keyboard.createCursorKeys();

        red.body.velocity.y = -140;
        directionRed = 1;
        blue.body.velocity.x = 140;
        directionBlue = 0;
        clay.body.velocity.x = -140;
        directionClay = 0;
        pink.body.velocity.y = -140;
        directionPink = 1;
        
    };

    function pill (player, tile) {
        if (player.name == 'ghost')
        {
            return false;
        }

            //tile.destroy();
            tile.alpha = 0;
            layer.dirty = true;
            //count++;
            //console.log(count);
            // if (count == 242)
            // {
            //     player.body.velocity = 0;
            //     red.animations.stop();
            //     red.body.velocity = 0;
            //     blue.animations.stop();
            //     blue.body.velocity = 0;
            //     clay.animations.stop();
            //     clay.body.velocity = 0;
            //     pink.animations.stop();
            //     pink.body.velocity = 0;
                
            //     //player.kill();
            //     msg = this.game.add.text(this.game.canvas.width/2-125, this.game.canvas.height/2-25, 'Woah Woah!!!', { fontSize: '32px Simplifica', fill: '#FFF' });    
            // }
        return false;
    };

    function moveRed() {
        red.body.velocity.y = -140;
        var direction = 1;

    };

    function moveBlue() {
        blue.body.velocity.x = 140;
        var direction = 0;

    };

    function moveClay() {
        clay.body.velocity.x = -140;
        var direction = 0;
    };

    function movePink() {
        pink.body.velocity.y = -140;
        var direction = 1;
    };

    Pacman.prototype.update = function () {

        var colpl = this.game.physics.arcade.collide(player, layer);
        var colpg = this.game.physics.arcade.collide(player, ghosts);
        //var colgl = this.game.physics.arcade.collide(ghosts, layer);
        var colrl = this.game.physics.arcade.collide(red, layer);
        var colbl = this.game.physics.arcade.collide(blue, layer);
        var colcl = this.game.physics.arcade.collide(clay, layer);
        var colpl = this.game.physics.arcade.collide(pink, layer);

        if (!gameOver)
        {
            if (colpg)
            {
                player.animations.play('die');
                player.body.velocity = 0;
                red.animations.stop();
                red.body.velocity = 0;
                blue.animations.stop();
                blue.body.velocity = 0;
                clay.animations.stop();
                clay.body.velocity = 0;
                pink.animations.stop();
                pink.body.velocity = 0;
                
                //player.kill();
                msg = this.game.add.text(this.game.canvas.width/2-125, this.game.canvas.height/2-25, 'Game Over!!!', { fontSize: '32px Simplifica', fill: '#FFF' });
                gameOver = 1;
            }
            if (cursors.left.isDown)
            {
                player.body.velocity.x = -150;
                player.body.velocity.y = !player.body.velocity.y;
                player.animations.play('left');
            }
            else if (cursors.right.isDown)
            {
                player.body.velocity.x = 150;
                player.body.velocity.y = !player.body.velocity.y;
                player.animations.play('right');
            }
            else if (cursors.up.isDown)
            {
                player.body.velocity.y = -150;
                player.body.velocity.x = !player.body.velocity.x;
                player.animations.play('up');
            }
            else if (cursors.down.isDown)
            {
                player.body.velocity.y = 150;
                player.body.velocity.x = !player.body.velocity.x;
                player.animations.play('down');
            }

            player.position

            if (colrl) 
            {
                if (directionRed == 1)
                {
                    var move = Math.floor(Math.random() * 2 + 1);

                    if (move == 1)
                    {
                        red.body.velocity.x = -140;
                        red.animations.play('left');
                        directionRed = 0;
                    }
                    else if (move == 2)
                    {
                        red.body.velocity.x = 140;
                        red.animations.play('right');
                        directionRed = 0;
                    }
                }

                else if (directionRed == 0)
                {
                    var move = Math.floor(Math.random() * 2 + 1);

                    if (move == 1)
                    {
                        red.body.velocity.y = -140;
                        red.animations.play('up');
                        directionRed = 1;
                    }
                    else if (move == 2)
                    {
                        red.body.velocity.y = 140;
                        red.animations.play('down');
                        directionRed = 1;
                    }
                }
                // var move = Math.floor(Math.random() * 4 + 1);

                // if (move == 1)
                // {
                //     red.body.velocity.y = -140;
                //     red.animations.play('up');
                // }
                // else if (move == 2)
                // {
                //     red.body.velocity.y = 140;
                //     red.animations.play('down');
                // }
                // else if (move == 3)
                // {
                //     red.body.velocity.x = -140;
                //     red.animations.play('left');
                // }
                // else if (move == 4)
                // {
                //     red.body.velocity.x = 140;
                //     red.animations.play('right');
                // }

                /*if(colrl)
                {
                    red.body.velocity.x = -140;
                }*/
            }

            if (colbl)
            {
                if (directionBlue == 1)
                {
                    var move = Math.floor(Math.random() * 2 + 1);

                    if (move == 1)
                    {
                        blue.body.velocity.x = -140;
                        blue.animations.play('left');
                        directionBlue = 0;
                    }
                    else if (move == 2)
                    {
                        blue.body.velocity.x = 140;
                        blue.animations.play('right');
                        directionBlue = 0;
                    }
                }

                else if (directionBlue == 0)
                {
                    var move = Math.floor(Math.random() * 2 + 1);

                    if (move == 1)
                    {
                        blue.body.velocity.y = -140;
                        blue.animations.play('up');
                        directionBlue = 1;
                    }
                    else if (move == 2)
                    {
                        blue.body.velocity.y = 140;
                        blue.animations.play('down');
                        directionBlue = 1;
                    }
                }
            }

            if (colcl)
            {
                if (directionClay == 1)
                {
                    var move = Math.floor(Math.random() * 2 + 1);

                    if (move == 1)
                    {
                        clay.body.velocity.x = -140;
                        clay.animations.play('left');
                        directionClay = 0;
                    }
                    else if (move == 2)
                    {
                        clay.body.velocity.x = 140;
                        clay.animations.play('right');
                        directionClay = 0;
                    }
                }

                else if (directionClay == 0)
                {
                    var move = Math.floor(Math.random() * 2 + 1);

                    if (move == 1)
                    {
                        clay.body.velocity.y = -140;
                        clay.animations.play('up');
                        directionClay = 1;
                    }
                    else if (move == 2)
                    {
                        clay.body.velocity.y = 140;
                        clay.animations.play('down');
                        directionClay = 1;
                    }
                }
            }
            if (colpl)
            {
                if (directionPink == 1)
                {
                    var move = Math.floor(Math.random() * 2 + 1);

                    if (move == 1)
                    {
                        pink.body.velocity.x = -140;
                        pink.animations.play('left');
                        directionPink = 0;
                    }
                    else if (move == 2)
                    {
                        pink.body.velocity.x = 140;
                        red.animations.play('right');
                        directionPink = 0;
                    }
                }

                else if (directionPink == 0)
                {
                    var move = Math.floor(Math.random() * 2 + 1);

                    if (move == 1)
                    {
                        pink.body.velocity.y = -140;
                        pink.animations.play('up');
                        directionPink = 1;
                    }
                    else if (move == 2)
                    {
                        pink.body.velocity.y = 140;
                        pink.animations.play('down');
                        directionPink = 1;
                    }
                }
            }

        }
        //this.game.debug.body(layer);
    };
    
    return Pacman;
})();

window.onload = function () {
    var game = new Pacman();
};

