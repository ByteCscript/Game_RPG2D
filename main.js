const TILE_SIZE = 32;
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
const BACKGROUND_TILE_Y = 2;

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

// Obtener canvas y contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Estado del jugador
const player = {
  x: 300,
  y: 220,
  width: 32,
  height: 32,
  color: "red",
  speed: 3,
};

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
  if (keys["ArrowUp"] || keys["w"]) {
    player.y -= player.speed;
  }
  if (keys["ArrowDown"] || keys["s"]) {
    player.y += player.speed;
  }
  if (keys["ArrowLeft"] || keys["a"]) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"] || keys["d"]) {
    player.x += player.speed;
  }
}

// Dibujar en pantalla
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground(); // mapa de fondo

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Game loop (corazón del juego)
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Iniciar juego
gameLoop();
