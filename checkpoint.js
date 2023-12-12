class StaticClass {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  display() {
    rect(this.x, this.y, this.w, this.h);
  }
}

function StaticCollisionCheck(Enemy) {
  for (let i = Statics.length - 1; i >= 0; i--) {
    Static = Statics[i];
    if (
      Enemy.x + Enemy.radius > Static.x &&
      Enemy.x - Enemy.radius < Static.x + Static.w &&
      Enemy.y + Enemy.radius > Static.y &&
      Enemy.y - Enemy.radius < Static.y + Static.h
    ) {
      //if colliding
      if (Enemy.y > Static.y && Enemy.y < Static.y + Static.h) {
        //if between top and bottom of rectangle
        if (Enemy.x > Static.x + Static.w / 2) {
          Enemy.x += (Static.x + Static.w) - (Enemy.x - Enemy.radius)
        }
        else {
          Enemy.x += (Static.x) - (Enemy.x + Enemy.radius)
        }
      }
      else if (Enemy.x > Static.x && Enemy.x < Static.x + Static.w) {
        //if between left and right of rectangle
        if (Enemy.y > Static.y + Static.h / 2) {
          Enemy.y += (Static.y + Static.h) - (Enemy.y - Enemy.radius)
        }
        else {
          Enemy.y += (Static.y) - (Enemy.y + Enemy.radius)
        }
      }

      else {
        //if colliding at corners
        let dx = Enemy.x - Static.x + Static.w / 2;
        let dy = Enemy.y - Static.y + Static.h / 2;
        let angle = atan2(dy, dx);

        if (Enemy.y < Static.y) {
          if (Enemy.x < Static.x + Static.w / 2) {
            //top left corner
            angle += 180
            d = dist(Enemy.x, Enemy.y, Static.x, Static.y) - Enemy.radius;
            Enemy.x -= d * cos(angle)
            Enemy.y -= d * sin(angle)
          }
          else {
            // top right
            d = dist(Enemy.x, Enemy.y, Static.x + Static.w, Static.y) - Enemy.radius;
            Enemy.x -= d * cos(angle)
            Enemy.y -= d * sin(angle)
          }
        }
        else {
          if (Enemy.x < Static.x + Static.w / 2) {
            //bottom left corner
            d = dist(Enemy.x, Enemy.y, Static.x, Static.y + Static.h) - Enemy.radius;
            Enemy.x -= d * cos(angle)
            Enemy.y -= d * sin(angle)
          }
          else {
            //bottom right
            d = dist(Enemy.x, Enemy.y, Static.x + Static.w, Static.y + Static.h) - Enemy.radius
            Enemy.x -= d * cos(angle)
            Enemy.y -= d * sin(angle)

          }
        }
      }
    }
  }
}

// Player distance from checkpoint
function checkpointDistance() {
  let dx = Player.x - (Checkpoint.x + 25);
  let dy = Player.y - (Checkpoint.y + 25);
  let distance = Math.sqrt(dx * dx + dy * dy);
  isNearCheckpoint = distance <= 100;
}

// Conditions for checkpoint interaction
function highlightCheckpoint() {
  if (isNearCheckpoint) {
    if (!isDialogOpen && keyIsDown(69)) { // Add condition to check if dialog is not open
      if (hasEnoughScore()) {
        score = level.checkpointCost[levelNumber]; // Set score to minimum score required for next level
        // Set checkpoint to random location
        Checkpoint.x = random(60, width - 60);
        Checkpoint.y = random(60, height - 60);
        levelReset();
        levelNumber++; // Increase level number
      } else {
        isDialogOpen = true; // Set dialog flag to true
        openDialog(["You're hopeless...", "You need " + (level.checkpointCost[levelNumber] - score) + " more hope"]);
        checkpointDistance();
      }
    }
  } else {
    isDialogOpen = false; // Reset dialog flag when checkpoint is not near
  }
}

// Boolean function to check if player has enough score to interact with checkpoint
function hasEnoughScore() {
  return score >= level.checkpointCost[levelNumber];
}