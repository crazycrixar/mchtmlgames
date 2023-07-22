const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const blocksContainer = document.querySelector(".blocks");

let currentPlayer = player1;
let selectedBlock = "grass"; // Default block selection

// Movement states and orientation for each player
const playerStates = {
  player1: {
    left: false,
    right: false,
    up: false,
    down: false,
    orientation: "front",
  },
  player2: {
    left: false,
    right: false,
    up: false,
    down: false,
    orientation: "front",
  },
};

// Function to place a block
function placeBlock(x, y) {
  const block = document.createElement("div");
  block.classList.add(selectedBlock, "block");
  block.style.left = x + "px";
  block.style.top = y + "px";
  blocksContainer.appendChild(block);
}

// Function to remove a block
function removeBlock(x, y) {
  const block = document.elementFromPoint(x, y);
  if (block.classList.contains("block")) {
    block.remove();
  }
}

// Function to handle player movement and orientation
function movePlayer(dx, dy, player) {
  const playerX = parseFloat(player.style.left) || 0;
  const playerY = parseFloat(player.style.top) || 0;

  const newX = playerX + dx;
  const newY = playerY + dy;

  // Determine player orientation
  if (dx > 0) {
    playerStates[player.id].orientation = "right";
  } else if (dx < 0) {
    playerStates[player.id].orientation = "left";
  } else if (dy > 0) {
    playerStates[player.id].orientation = "front";
  } else if (dy < 0) {
    playerStates[player.id].orientation = "back";
  }

  player.style.left = newX + "px";
  player.style.top = newY + "px";
  player.className = "player " + playerStates[player.id].orientation;
}

// Update player positions based on movement states
function updatePlayerPositions() {
  const playerStep = 14; // Reduce step size for smoother movement

  if (playerStates.player1.left) {
    movePlayer(-playerStep, 0, player1);
  }
  if (playerStates.player1.right) {
    movePlayer(playerStep, 0, player1);
  }
  if (playerStates.player1.up) {
    movePlayer(0, -playerStep, player1);
  }
  if (playerStates.player1.down) {
    movePlayer(0, playerStep, player1);
  }

  if (playerStates.player2.left) {
    movePlayer(-playerStep, 0, player2);
  }
  if (playerStates.player2.right) {
    movePlayer(playerStep, 0, player2);
  }
  if (playerStates.player2.up) {
    movePlayer(0, -playerStep, player2);
  }
  if (playerStates.player2.down) {
    movePlayer(0, playerStep, player2);
  }
}

// Set interval to update player positions
setInterval(updatePlayerPositions, 1000 / 60); // 60 FPS

// Event listeners for key input (Player 1 - arrow keys and WASD)
document.addEventListener("keydown", (event) => {
  const { keyCode } = event;

  if (currentPlayer === player1) {
    if (keyCode === 37 || keyCode === 65) {
      // Left arrow key or 'A' key
      playerStates.player1.left = true;
    } else if (keyCode === 38 || keyCode === 87) {
      // Up arrow key or 'W' key
      playerStates.player1.up = true;
    } else if (keyCode === 39 || keyCode === 68) {
      // Right arrow key or 'D' key
      playerStates.player1.right = true;
    } else if (keyCode === 40 || keyCode === 83) {
      // Down arrow key or 'S' key
      playerStates.player1.down = true;
    } else if (keyCode === 32) {
      // Spacebar (place block for Player 1)
      const x = parseFloat(player1.style.left) || 0;
      const y = parseFloat(player1.style.top) || 0;
      placeBlock(x, y);
    } else if (keyCode === 8) {
      // Backspace (remove block for Player 1)
      const x = parseFloat(player1.style.left) || 0;
      const y = parseFloat(player1.style.top) || 0;
      removeBlock(x, y);
    }
  }
});

document.addEventListener("keyup", (event) => {
  const { keyCode } = event;

  if (currentPlayer === player1) {
    if (keyCode === 37 || keyCode === 65) {
      playerStates.player1.left = false;
    } else if (keyCode === 38 || keyCode === 87) {
      playerStates.player1.up = false;
    } else if (keyCode === 39 || keyCode === 68) {
      playerStates.player1.right = false;
    } else if (keyCode === 40 || keyCode === 83) {
      playerStates.player1.down = false;
    }
  }
});

// Event listeners for key input (Player 2 - arrow keys and "1" key)
document.addEventListener("keydown", (event) => {
  const { keyCode } = event;

  if (currentPlayer === player2) {
    if (keyCode === 37) {
      // Left arrow key
      playerStates.player2.left = true;
    } else if (keyCode === 38) {
      // Up arrow key
      playerStates.player2.up = true;
    } else if (keyCode === 39) {
      // Right arrow key
      playerStates.player2.right = true;
    } else if (keyCode === 40) {
      // Down arrow key
      playerStates.player2.down = true;
    } else if (keyCode === 49) {
      // "1" key (place block for Player 2)
      const x = parseFloat(player2.style.left) || 0;
      const y = parseFloat(player2.style.top) || 0;
      placeBlock(x, y);
    } else if (keyCode === 8) {
      // Backspace (remove block for Player 2)
      const x = parseFloat(player2.style.left) || 0;
      const y = parseFloat(player2.style.top) || 0;
      removeBlock(x, y);
    }
  }
});

document.addEventListener("keyup", (event) => {
  const { keyCode } = event;

  if (currentPlayer === player2) {
    if (keyCode === 37) {
      playerStates.player2.left = false;
    } else if (keyCode === 38) {
      playerStates.player2.up = false;
    } else if (keyCode === 39) {
      playerStates.player2.right = false;
    } else if (keyCode === 40) {
      playerStates.player2.down = false;
    }
  }
});

// Switch between players on click
player1.addEventListener("click", () => {
  currentPlayer = player1;
});

player2.addEventListener("click", () => {
  currentPlayer = player2;
});

