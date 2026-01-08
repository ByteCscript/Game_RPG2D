const TILE_SIZE = 32;
const PLAYER_SCALE = 1.5;
const TILESET_COLUMNS = 8;

// Mapa RPG (20x15 tiles)
const map = [
  [0, 1, 2, 3, 4, 5],
  [8, 9, 10, 11, 12, 13],
  [16, 17, 18, 19, 20, 21],
];

const tileset = new Image();
tileset.src = "assets/tileset.png";

function drawMap() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tileIndex = map[row][col];

      const tileX = (tileIndex % TILESET_COLUMNS) * TILE_SIZE;
      const tileY = Math.floor(tileIndex / TILESET_COLUMNS) * TILE_SIZE;

      ctx.drawImage(
        tileset,
        tileX,
        tileY,
        TILE_SIZE,
        TILE_SIZE,
        col * TILE_SIZE,
        row * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

const BACKGROUND_TILE_X = 3;
const BACKGROUND_TILE_Y = 0;

function drawBackground() {
  for (let y = 0; y < canvas.height; y += TILE_SIZE) {
    for (let x = 0; x < canvas.width; x += TILE_SIZE) {
      ctx.drawImage(
        tileset,
        BACKGROUND_TILE_X * TILE_SIZE,
        BACKGROUND_TILE_Y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
        x,
        y,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

const playerSprites = {
  up: new Image(),
  down: new Image(),
  right: new Image(),
};

playerSprites.up.src =
  "assets/Pixels/Entities/Characters/Body_A/Animations/Walk_Base/Walk_Up-Sheet.png";
playerSprites.down.src =
  "assets/Pixels/Entities/Characters/Body_A/Animations/Walk_Base/Walk_Down-Sheet.png";
playerSprites.right.src =
  "assets/Pixels/Entities/Characters/Body_A/Animations/Walk_Base/Walk_Side-Sheet.png";

const player = {
  x: 300,
  y: 220,
  width: 64,
  height: 64,
  speed: 0.8,

  frameX: 0,
  frameCount: 6,
  frameTimer: 0,
  frameInterval: 14,

  moving: false,
  direction: "down",
};

// Obtener canvas y contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Estado del jugador

// Teclas presionadas
const keys = {};

// Detectar teclado
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Actualizar lógica del juego
function update() {
  player.moving = false;

  if (keys["ArrowUp"] || keys["w"]) {
    player.y -= player.speed;
    player.direction = "up";
    player.moving = true;
  } else if (keys["ArrowDown"] || keys["s"]) {
    player.y += player.speed;
    player.direction = "down";
    player.moving = true;
  } else if (keys["ArrowLeft"] || keys["a"]) {
    player.x -= player.speed;
    player.direction = "right"; // reutilizamos right
    player.moving = true;
    player.flip = true;
  } else if (keys["ArrowRight"] || keys["d"]) {
    player.x += player.speed;
    player.direction = "right";
    player.moving = true;
    player.flip = false;
  }

  // animación
  if (player.moving) {
    player.frameTimer++;
    if (player.frameTimer >= player.frameInterval) {
      player.frameTimer = 0;
      player.frameX = (player.frameX + 1) % player.frameCount;
    }
  } else {
    player.frameX = 0; // idle
  }
}

// Dibujar en pantalla

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();

  const sprite = playerSprites[player.direction];

  const drawWidth = player.width * PLAYER_SCALE;
  const drawHeight = player.height * PLAYER_SCALE;

  ctx.save();

  if (player.flip) {
    ctx.scale(-1, 1);
    ctx.drawImage(
      sprite,
      player.frameX * player.width,
      0,
      player.width,
      player.height,
      -player.x - drawWidth,
      player.y,
      drawWidth,
      drawHeight
    );
  } else {
    ctx.drawImage(
      sprite,
      player.frameX * player.width,
      0,
      player.width,
      player.height,
      player.x,
      player.y,
      drawWidth,
      drawHeight
    );
  }

  ctx.restore();
}

// Game loop (corazón del juego)
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Iniciar juego
gameLoop();
