function SpawnEnemy () {
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        Guard = sprites.create(img`
            ...............ff.......
            .............ff2ffff....
            ............ff2feeeeff..
            ...........ff22feeeeeff.
            ...........feeeeffeeeef.
            ..........fe2222eefffff.
            ..........f2effff222efff
            ..........fffeeeffffffff
            ..........fee44fbe44efef
            ...........feddfb4d4eef.
            ..........c.eeddd4eeef..
            ....ccccccceddee2222f...
            .....dddddcedd44e444f...
            ......ccccc.eeeefffff...
            ..........c...ffffffff..
            ...............ff..fff..
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        tiles.placeOnTile(Guard, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        Coins.scale = 1.4
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    game.gameOver(false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Hero.setVelocity(0, -130)
})
function SpawnPlayer () {
    for (let value of tiles.getTilesByType(assets.tile`myTile1`)) {
        Hero = sprites.create(img`
            . . . . . f f f f f f . . . . . 
            . . . f f e e e e f 2 f . . . . 
            . . f f e e e e f 2 2 2 f . . . 
            . . f e e e f f e e e e f . . . 
            . . f f f f e e 2 2 2 2 e f . . 
            . . f e 2 2 2 f f f f e 2 f . . 
            . f f f f f f f e e e f f f . . 
            . f f e 4 4 e b f 4 4 e e f . . 
            . f e e 4 d 4 1 f d d e f f . . 
            . . f e e e 4 d d d d f d d f . 
            . . . f f e e 4 e e e f b b f . 
            . . . . f 2 2 2 4 d d e b b f . 
            . . . . e 2 2 2 e d d e b f . . 
            . . . . f 4 4 4 f e e f f . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . f f f . . . . . . . 
            `, SpriteKind.Player)
        Hero.scale = 1.15
        tiles.placeOnTile(Hero, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        scene.cameraFollowSprite(Hero)
        controller.moveSprite(Hero, 100, 0)
        Hero.ay = 160
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    info.changeScoreBy(1)
    sprites.destroy(Coins)
})
function Coin () {
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        Coins = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(Coins, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        Coins.scale = 1.4
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let Hero: Sprite = null
let Coins: Sprite = null
let Guard: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
info.setScore(0)
SpawnPlayer()
Coin()
SpawnEnemy()
