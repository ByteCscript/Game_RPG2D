import { updatePlayer, drawPlayer, player } from "./player.js";
import { attack } from "./playerActions.js";
import { drawMap, map } from "./map.js";
import { camera, initCamera, updateCamera } from "./camera.js";

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Init camera
initCamera(canvas);

// Input
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " ") attack();
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Game loop
function gameLoop() {
  updatePlayer(keys);
  updateCamera(player, map);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMap(ctx, camera);
  drawPlayer(ctx, camera);

  requestAnimationFrame(gameLoop);
}

gameLoop();
