// map.js

export const tileset = new Image();
tileset.src = "assets/Pixels/Environment/Tilesets/Water_tiles.png";

export const TILE_SIZE = 32;

export const map = {
  cols: 50,
  rows: 50,
  width: 50 * TILE_SIZE,
  height: 50 * TILE_SIZE,
  tiles: [],
};

// Generar mapa base (agua)
for (let y = 0; y < map.rows; y++) {
  const row = [];
  for (let x = 0; x < map.cols; x++) {
    row.push(0); // 0 = agua
  }
  map.tiles.push(row);
}

export const TILE_TYPES = {
  WATER: { x: 0, y: 0 },
  LAND: { x: 1, y: 0 },
  TREE: { x: 2, y: 0 },
};

export function drawMap(ctx, camera) {
  const startCol = Math.floor(camera.x / TILE_SIZE);
  const endCol = startCol + Math.ceil(camera.width / TILE_SIZE);

  const startRow = Math.floor(camera.y / TILE_SIZE);
  const endRow = startRow + Math.ceil(camera.height / TILE_SIZE);

  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      if (row < 0 || col < 0 || row >= map.rows || col >= map.cols) continue;

      const tile = map.tiles[row][col];
      const tileDef = tile === 0 ? TILE_TYPES.WATER : TILE_TYPES.LAND;

      ctx.drawImage(
        tileset,
        tileDef.x * TILE_SIZE,
        tileDef.y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
        col * TILE_SIZE - camera.x,
        row * TILE_SIZE - camera.y,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}
