import { updatePlayer, drawPlayer } from "./player.js";
import { attack } from "./playerActions.js";

const TILE_SIZE = 32;

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Teclas
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  if (e.key === " ") {
    attack(); // barra espaciadora
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Fondo simple
function drawBackground() {
  ctx.fillStyle = "#88aa88";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  updatePlayer(keys);
  drawPlayer(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
