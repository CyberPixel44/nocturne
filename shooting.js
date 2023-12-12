class ProjectileClass {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle + 180;
  }

  update() {
    this.x += cos(this.angle) * 20
    this.y += sin(this.angle) * 20
  }
  display() {
    push()
    translate(this.x, this.y)
    stroke(255, 224, 138)
    strokeWeight(3)
    rotate(this.angle)
    line(0, 0, 30, 0)
    pop()
  }
}

// Mouse click event handler
function mouseClicked() {
  if (!gamePaused && !gameOver && !mainMenu) { // Disables mouse click when menu is open
    isDialogOpen = false; // Reset dialog flag
    shotSound.play(0, 1, 0.3);
    let dx = Player.x - 17 - mouseX;
    let dy = Player.y + 6 - mouseY;
    let angle_of_shot = atan2(dy, dx);
    let shot_miss = true;
    let Projectile = new ProjectileClass(Player.x - 17, Player.y + 6, angle_of_shot)
    Projectiles.push(Projectile)
    for (let i = Enemies.length - 1; i >= 0; i--) {
      let Enemy = Enemies[i];
      let dx = Player.x - 17 - Enemy.x;
      let dy = Player.y + 6 - Enemy.y;
      let angle_to_enemy = atan2(dy, dx);
      let theta =
        (360 * Enemy.radius) /
        (2 * PI * dist(Player.x, Player.y, Enemy.x, Enemy.y));
      if (
        angle_of_shot > angle_to_enemy - theta &&
        angle_of_shot < angle_to_enemy + theta
      ) {
        shot_miss = false;
        Enemy.radius -= 4;

        if (Enemy.radius < 10) { // Change the condition to check if radius is less than 10
          Enemy.radius = 10; // Set the radius to 10 if it goes below 1
        }
        if (Enemy.radius <= 10) { // Destroy the enemy if the radius is less than 0
          Enemies.splice(i, 1);
          score += 4;
        }
      }
    }
    if (shot_miss) {
      shotWhiz.play(0, 1, 0.4); // Play the shot miss sound
      sanity -= level.sanityPenalty[levelNumber]; // Reduce sanity according to the level's sanity penalty
    }
  }
}