let Enemies = [];
let Statics = [];
let Projectiles = [];
let EnemySpawnTimer = 0;
//The higher, the quicker the spawn rate. a range of (0,1] seems to be sufficient
let Enemy_spawn_rate = 0.1; // Set enemy spawn rate to level 1 spawn rate

let mainMenu = true;
let gameOver = false;
let gameWon = false;

let gamePaused = false; //for dialog screen
let isDialogOpen = false; // Flag to track if dialog is open
let dialogText = "";
let dialogQueue = [];

let sanity = 100; // Initial sanitys value

let rotationAngle = 0; // Initial rotation angle of the player

let grassAssets = []; // Locations of grasses image assets
let grassObjects = []; // Grass objects on screen

let score = 0; // Initial score value

let minRadius = 150; // Minimum radius of visibility

// Checkpoint variables
let isNearCheckpoint = false;

// Story dialog variables
let level1Dialog =
  ["I can't sleep...",
  "Real life feels like a dream...",
  "And I just... want to wake up..."];

let level2Dialog =
  ["Every day is a struggle...",
  "Lost in a fog of confusion...",
  "It's hard to see beyond the darkness..."];

let level3Dialog =
  ["Perhaps there is a way out...",
  "A path to a brighter future..."]

let level4Dialog =
  ["Embracing the dawn of change...",
  "I feel a spark within, a glimmer of hope...",
  "As I navigate through the mist, purpose becomes clear...",
  "I have the strength to break free from this nightmare...",
  "No longer defined by the shadows, I emerge stronger and resilient...",
  "Depression becomes a chapter, not the whole story...",
  "I wake up not just to existence, but to a life filled with possibilities..."]; // Only used for the final level

let levelDialogShown = false;

let levelNumber = 0; // Initial level value

let level = { // Level data in parrallel arrays
  enemySpeed: [0.7, 1.2, 1.4],
  enemySpawnRate: [0.1, 0.18, 0.24],
  playerSpeed: [3, 2, 1.5],
  checkpointCost: [100, 220, 340],
  sanityPenalty: [5, 10, 15],
  visualRadius: [450, 350, 230],
  levelDialog: [level1Dialog, level2Dialog, level3Dialog, level4Dialog]
};

function resetGame() {
  // Reset all variables to their initial values
  levelNumber = 0;
  Enemies = [];
  Checkpoint.x = 400;
  Checkpoint.y = 400;
  Projectiles = [];
  EnemySpawnTimer = 0;
  sanity = 100;
  rotationAngle = 0;
  score = 0;
  gameOver = false;
  gamePaused = false;
  gameWon = false;
  mainMenu = true;
  levelDialogShown = false;
  Player.x = width / 2;
  Player.y = height / 2;
  Player.health = playerHealth;
  loop(); // Restart the game loop
}