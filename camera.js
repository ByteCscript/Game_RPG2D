// camera.js

export const camera = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export function initCamera(canvas) {
  camera.width = canvas.width;
  camera.height = canvas.height;
}

export function updateCamera(target, map) {
  // Centrar la cámara en el jugador
  camera.x = target.x - camera.width / 2;
  camera.y = target.y - camera.height / 2;

  // Limitar la cámara dentro del mapa
  camera.x = Math.max(0, Math.min(camera.x, map.width - camera.width));
  camera.y = Math.max(0, Math.min(camera.y, map.height - camera.height));
}
