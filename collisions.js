// Health handling
function handleCollision(Enemy) {
  Player.health -= 10;
  if (Player.health <= 0) {
    Player.health = 0;
    gameOver = true; // Set game over to true
  } else {
  }
}

function EnemyCollisionCheck(Enemy, i) {
  for (let j = Enemies.length - 1; j >= 0; j--) {
    Enemy2 = Enemies[j];
    d = dist(Enemy.x, Enemy.y, Enemy2.x, Enemy2.y);
    if (i != j && d < Enemy.radius + Enemy2.radius) {
      let dx = Enemy.x - Enemy2.x;
      let dy = Enemy.y - Enemy2.y;
      let angle = atan2(dy, dx);
      let pen_depth = Enemy2.radius + Enemy.radius - d;
      Enemy.x += cos(angle) * pen_depth;
      Enemy.y += sin(angle) * pen_depth;
    }
  }
}

