function drawHealthBar() {
  noFill();
  stroke(255);
  rect(10, height - 30, 200, 20); // Position and size of the health bar
  fill(255, 0, 0);
  rect(10, height - 30, map(Player.health, 0, playerHealth, 0, 200), 20);
}

function displayPlayerHealth() {
  fill(255);
  textSize(16);
  textAlign(LEFT); // Set text alignment to the left
  text(`Health: ${Player.health}`, 10, height - 40); // Use a fixed x-position
}

function drawSanityBar() {
  noFill();
  stroke(255);
  let barWidth = 200;
  let barHeight = 20;
  let x = width - barWidth - 10; // Position at the bottom-right corner
  let y = height - barHeight - 10; // Position at the bottom-right corner
  rect(x, y, barWidth, barHeight);
  fill(0, 0, 255);
  rect(x, y, map(sanity, 0, 100, 0, barWidth), barHeight);
}

function displayPlayerSanity() {
  fill(255);
  textSize(16);
  textAlign(RIGHT); // Set text alignment to the right
  let x = width - 10; // Position at the bottom-right corner
  let y = height - 40; // Position at the bottom-right corner
  text(`Sanity: ${sanity}`, x, y);
}

function displayGameOverScreen() {
  background(0); // Aesthetics can be altered later
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 50);
  text(`Score: ${score}`, width / 2, height / 2);
  textSize(20);
  text("Press any key restart", width / 2, height / 2 + 50);
}

function displayDialogScreen() {
  // Aesthetics can be altered later
  background(0); // Dark overlay
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(dialogText, width / 2, height / 2);
  textSize(16);
  fill(100);
  text("Press any key to continue", width - 70, height - 20);

  // Add a keyPressed event to go to the next dialog when any key is pressed
  keyPressed = function () {
    nextDialog();
  }
}

function openDialog(inputTexts) {
  //function to call to show dialog text, Aesthetics can be altered later
  gamePaused = true;
  dialogQueue = dialogQueue.concat(inputTexts);
  nextDialog();
  noLoop(); // Pause the game loop
}

function nextDialog() {
  if (dialogQueue.length > 0) {
    dialogText = dialogQueue.shift();
    displayDialogScreen();
  } else {
    gamePaused = false;
    loop(); // Resume the game loop
  }
}

function displayMainMenu() {
  background(0);
  textSize(150);
  textAlign(CENTER, CENTER);
  textFont('Chiller'); // Set for all text in the game
  textStyle(BOLDITALIC);
  fill(255);
  text('Nocturne', width / 2.01, height / 3.01);
  fill(0);
  text('Nocturne', width / 2, height / 3);
  textSize(50);
  fill(255);
  text("Press any key to start", width / 2.005, height / 2.005);
  fill(0);
  text("Press any key to start", width / 2, height / 2);
  fill(255);
  textSize(20);
  text("Use WASD/Arrows to move", width / 2, height / 2 + 100);
  text("Use mouse to aim and shoot", width / 2, height / 2 + 130);
  text("Use ' E ' to interact with a checkpoint when near it", width / 2, height / 2 + 160);

  keyPressed = function () {
    mainMenu = false;
    loop();
  }
}

function displayScore() {
  fill(255);
  textSize(24);
  textAlign(LEFT); // Set text alignment to the left
  text(`Hope: ${score}`, 10, 30); // Use a fixed x-position
}

function displayWinningScreen() {
  background(0); // Aesthetics can be altered later
  image(flower, width / 2 - 50, height / 2 + 40, 100, 130);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win... For Now...", width / 2, height / 2 - 50);
  textSize(20);
  fill(100);
  text("Press any key to restart", width / 2, height - 140);
  fill(255);
  text("Remember, you hold the brush to paint your own sunrise against the canvas of depression", width / 2, height / 2);
}