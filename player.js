let playerHealth = 100;
class PlayerClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10; // Set player radius to 10
        this.light_radius = level.visualRadius[levelNumber];
        this.speed = level.playerSpeed[levelNumber]; // Set player speed to level speed
        this.bearing = "right";
        this.isMoving = false;
        this.health = playerHealth; // Pushed health to variable
    }
    display() {
        // Render player rotation animation while moving
        if (this.bearing == "right") {
            push();
            scale(-1, 1);
            rotate(rotationAngle);
            image(playerSprite, -this.x - (40 / 2), this.y - (60 / 2), 40, 60);
            pop();
        } else {
            push();
            rotate(rotationAngle);
            image(playerSprite, this.x - (40 / 2), this.y - (60 / 2), 40, 60);
            pop();
        }

        // Render gun rotation animation
        push();
        translate(this.x - 17, this.y + 6);
        let angle = atan2(mouseY - this.y, mouseX - this.x);
        if (angle > degrees(-PI / 2) && angle < degrees(PI / 2)) {
            scale(1, 1); // Flip the gun vertically if the angle is within -90 to 90 degrees
            rotate(angle);
        } else {
            scale(1, -1);
            rotate(-angle); // Flip the angle to make the gun point towards the mouse in the flipped zone
        }
        image(gunSprite, 0, 0, 25, 12);
        pop();

        // Render the light radius
        for (let i = 0; i < 5; i++) {
            push();
            clip(
                () => {
                    circle(
                        this.x,
                        this.y,
                        this.light_radius * 2 - (i * this.light_radius) / 5
                    );
                },
                { invert: true }
            );
            fill(0, 0, 0, 125);
            rect(0, 0, width, height);
            pop();
        }
        pop();
    }
    update() {
        this.isMoving = false; // Set isMoving to false by default

        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // 65 is the ASCII code for 'A'
            if (this.x - this.speed >= 0) { // Check if moving left will keep the player in bounds
                this.x -= this.speed;
                this.bearing = "left";
                this.isMoving = true; // Set isMoving to true when moving left
            }
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // 68 is the ASCII code for 'D'
            if (this.x + this.speed <= width) { // Check if moving right will keep the player in bounds
                this.x += this.speed;
                this.bearing = "right";
                this.isMoving = true; // Set isMoving to true when moving right
            }
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // 87 is the ASCII code for 'W'
            if (this.y - this.speed >= 0) { // Check if moving up will keep the player in bounds
                this.y -= this.speed;
                this.isMoving = true; // Set isMoving to true when moving up
            }
        }
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // 83 is the ASCII code for 'S'
            if (this.y + this.speed <= height) { // Check if moving down will keep the player in bounds
                this.y += this.speed;
                this.isMoving = true; // Set isMoving to true when moving down
            }
        }
    }
}

// Update the rotation angle based on current time
function updateRotation() {
    if (Player.isMoving) { // Only rotate if the player is moving
        isDialogOpen = false; // Reset dialog flag
        if (floor(millis() / 170) % 2 === 0) {
            rotationAngle = radians(0);
        } else {
            rotationAngle = radians(-20);
        }
    } else {
        rotationAngle = 0;
    }
}

function updateSanityRadius() {
    // Calculate the percentage based on sanity
    let percentage = sanity / 100;
    Player.light_radius = lerp(minRadius, level.visualRadius[levelNumber], percentage);
}

function sanityCheck() {
    // Check if sanity is below 0
    if (sanity <= 0) {
        sanity = 0;
        // Game is over, display game over screen
        openDialog(["You have lost your mind...", "Take care of your sanity..."]);
        gameOver = true;
        displayGameOverScreen();
        keyPressed = function () {
            resetGame();
        }
    }
}

function levelReset() {
    // Reset relevant variables to their initial values
    Enemies = [];
    Projectiles = [];
    sanity = 100;
    rotationAngle = 0;
    Player.x = width / 2;
    Player.y = height / 2;
    Player.health = 100;
    loop(); // Restart the game loop
    levelDialogShown = false;
}