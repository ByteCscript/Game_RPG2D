// player.js
export const PLAYER_SCALE = 1.5;

export const playerSprites = {
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

export const player = {
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
  flip: false,
};

// 👉 Movimiento y animación
export function updatePlayer(keys) {
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
    player.direction = "right";
    player.flip = true;
    player.moving = true;
  } else if (keys["ArrowRight"] || keys["d"]) {
    player.x += player.speed;
    player.direction = "right";
    player.flip = false;
    player.moving = true;
  }

  // Animación
  if (player.moving) {
    player.frameTimer++;
    if (player.frameTimer >= player.frameInterval) {
      player.frameTimer = 0;
      player.frameX = (player.frameX + 1) % player.frameCount;
    }
  } else {
    player.frameX = 0;
  }
}

// 👉 Dibujo del jugador

export function drawPlayer(ctx, camera) {
  const sprite = playerSprites[player.direction];
  const drawWidth = player.width * PLAYER_SCALE;
  const drawHeight = player.height * PLAYER_SCALE;

  const screenX = player.x - camera.x;
  const screenY = player.y - camera.y;

  ctx.save();

  if (player.flip) {
    ctx.scale(-1, 1);
    ctx.drawImage(
      sprite,
      player.frameX * player.width,
      0,
      player.width,
      player.height,
      -screenX - drawWidth,
      screenY,
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
      screenX,
      screenY,
      drawWidth,
      drawHeight
    );
  }

  ctx.restore();
}
