// BUILT WITH P5JS
function preload() {
  playerSprite = loadImage('./assets/player.png');
  enemySprite = loadImage('./assets/enemy.png');
  bgImage = loadImage("./assets/bg.png");

  // Load checkpoint assets
  checkpointImg = loadImage('./assets/checkpoint_far.png');
  checkpointImgNear = loadImage('./assets/checkpoint_near.png');

  flower = loadImage('./assets/flower.png');

  gunSprite = loadImage('./assets/gun.png');

  // Load the grass assets
  grassAssets.push(loadImage('./assets/grass1.png'));
  grassAssets.push(loadImage('./assets/grass2.png'));
  grassAssets.push(loadImage('./assets/grass3.png'));
  grassAssets.push(loadImage('./assets/grass4.png'));

  loadFont('./assets/chiller.ttf'); // Load the font for the game if not already installed on the user's system
}

// Initialize the game objects
let Player = new PlayerClass(400, 400);
let Checkpoint = new StaticClass(400, 400, 40, 40);
Statics.push(Checkpoint);

function setup() {
  bgImage.resize(bgImage.width / 2, bgImage.height / 2); // Scale down the bgImage by 50%

  createCanvas(800, 800);
  noStroke();
  angleMode(DEGREES);
  shotSound = loadSound("./assets/shot.mp3");
  shotWhiz = loadSound("./assets/miss.mp3");

  for (let i = 0; i < grassAssets.length; i++) {
    for (let j = 0; j < 2; j++) {
      let x = random(width);
      let y = random(height);
      grassObjects.push({ img: grassAssets[i], x: x, y: y });
    }
  }
}

function draw() {
  // Game won handler
  if (levelNumber == 3 && gameOver === false && gamePaused === false && mainMenu === false) {
    if (!levelDialogShown) {
      levelDialogShown = true;
      openDialog(level.levelDialog[levelNumber]);
      gameWon = true;
    }
    displayWinningScreen();
    keyPressed = function () {
      resetGame();
    }
  }

  if (mainMenu) {
    // Game is paused, display menu screen
    displayMainMenu();
    noLoop();
  } else if (!levelDialogShown) {
    // Game is not paused, display level dialog
    openDialog(level.levelDialog[levelNumber]);
    levelDialogShown = true;
  }

  if (gameOver === false && gamePaused === false && mainMenu === false && gameWon === false) {
    // Normal code that runs during game

    // Draw the background image and tile it seamlessly
    for (let x = 0; x < width; x += bgImage.width) {
      for (let y = 0; y < height; y += bgImage.height) {
        image(bgImage, x, y);
      }
    }
    // Draw the grass objects
    for (let i = 0; i < grassObjects.length; i++) {
      let grass = grassObjects[i];
      image(grass.img, grass.x, grass.y, grass.img.width * 0.15, grass.img.height * 0.15);
    }

    // Check player distance to checkpoint and handle checkpoint sprite update
    checkpointDistance();
    highlightCheckpoint();

    Player.update(); // Player movement
    updateRotation(); // Player rotation animation
    StaticCollisionCheck(Player); // Check for collision with checkpoint


    Enemy_spawn_rate = level.enemySpawnRate[levelNumber]; // Set enemy spawn rate to level spawn rate
    // Update and display enemies
    for (let i = Enemies.length - 1; i >= 0; i--) {
      let Enemy = Enemies[i];
      Enemy.update(Player);

      EnemyCollisionCheck(Enemy, i);
      StaticCollisionCheck(Enemy);

      // Check for collision with player
      if (
        dist(Player.x, Player.y, Enemy.x, Enemy.y) <
        Player.radius + Enemy.radius
      ) {
        handleCollision(Enemy);
        Enemies.splice(i, 1);
      }

      // Render enemy sprite with radius tied to enemy radius
      image(enemySprite, Enemy.x - Enemy.radius, Enemy.y - Enemy.radius, Enemy.radius * 2, Enemy.radius * 2);
    }

    // Draw the checkpoint sprites based on distance to player
    if (isNearCheckpoint) {
      image(checkpointImgNear, Checkpoint.x - 25, Checkpoint.y - 25, 90, 90);
    } else {
      image(checkpointImg, Checkpoint.x - 20, Checkpoint.y - 20, 80, 80);
    }
    Player.display();

    // Spawn enemies randomly
    EnemySpawnTimer -= Enemy_spawn_rate * deltaTime;
    if (EnemySpawnTimer <= 0) {
      spawnEnemy();
      EnemySpawnTimer = random(2, 10) * 60; // 2-10 seconds
    }

    for (let i = Projectiles.length - 1; i >= 0; i--) {
      Projectile = Projectiles[i]
      Projectile.update();
      Projectile.display();
    }

    // Draw health bar and display player's health, drawn last to be on top
    drawHealthBar();
    displayPlayerHealth();

    // Draw sanity bar and display player's sanity, drawn last to be on top
    drawSanityBar();
    displayPlayerSanity();

    // Draw score and display player's score, drawn last to be on top
    displayScore();

    // Update sanity radius based on player's sanity
    updateSanityRadius()

    // Check if sanity is below 0
    sanityCheck();

    // Check if player has enough score to pass checkpoint to next level
    hasEnoughScore()

  }
  if (gameOver) {
    // Game is over, display game over screen
    displayGameOverScreen();

    // Reset the game when the user presses any key
    keyPressed = function () {
      resetGame();
    }
  }
  if (gamePaused) {
    // Game is paused, display dialog screen
    displayDialogScreen(dialogText);
  }
}