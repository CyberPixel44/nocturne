class EnemyClass {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = level.enemySpeed[levelNumber]; // Set enemy speed to level speed
  }

  // Update enemy position to move towards player
  update(Player) {
    let dx = Player.x - this.x;
    let dy = Player.y - this.y;
    let angle = atan2(dy, dx);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;
  }
}

function spawnEnemy() {
  let side = random(0, 4); // 0: top, 1: right, 2: bottom, 3: left
  side = floor(side);
  let x, y;

  if (side === 0) {
    x = random(width);
    y = -10;
  } else if (side === 1) {
    x = width + 10;
    y = random(height);
  } else if (side === 2) {
    x = random(width);
    y = height + 10;
  } else {
    x = -10;
    y = random(height);
  }
  let radius = random(25, 40);
  radius = floor(radius);
  let Enemy = new EnemyClass(x, y, radius);
  Enemies.push(Enemy);
}