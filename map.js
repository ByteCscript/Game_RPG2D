// map.js

// ================================
// CONFIGURACIÓN
// ================================
export const TILE_SIZE = 72;

export const MAP_COLS = 60;
export const MAP_ROWS = 60;

// ================================
// TILESET
// ================================
export const tileset = new Image();
tileset.src = "assets/Pixels/Environment/Tilesets/Water_tiles.png";

// ================================
// MAPA
// ================================
export const map = {
  width: MAP_COLS * TILE_SIZE,
  height: MAP_ROWS * TILE_SIZE,
  tiles: [],
};

// ================================
// 1️⃣ INICIALIZAR TODO COMO MAR
// ================================
for (let y = 0; y < MAP_ROWS; y++) {
  const row = [];
  for (let x = 0; x < MAP_COLS; x++) {
    row.push(0); // 0 = agua
  }
  map.tiles.push(row);
}

// ================================
// 2️⃣ PATRÓN DE ISLA (BLOQUE BASE)
// ================================
const ISLAND_PATTERN = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const islandWidth = ISLAND_PATTERN[0].length;
const islandHeight = ISLAND_PATTERN.length;

// ================================
// 3️⃣ DUPLICAR ISLAS EN EL MAPA
// ================================
const margin = 5;

for (let y = margin; y < MAP_ROWS - islandHeight - margin; y += islandHeight) {
  for (let x = margin; x < MAP_COLS - islandWidth - margin; x += islandWidth) {
    for (let iy = 0; iy < islandHeight; iy++) {
      for (let ix = 0; ix < islandWidth; ix++) {
        if (ISLAND_PATTERN[iy][ix] === 1) {
          map.tiles[y + iy][x + ix] = 1; // tierra
        }
      }
    }
  }
}

// ================================
// 4️⃣ VEGETACIÓN (ÁRBOLES)
// ================================
for (let y = 0; y < MAP_ROWS; y++) {
  for (let x = 0; x < MAP_COLS; x++) {
    if (map.tiles[y][x] === 1 && Math.random() < 0.15) {
      map.tiles[y][x] = 2; // árbol
    }
  }
}

// ================================
// 5️⃣ DEFINICIÓN DE TILES
// ================================
const TILE_TYPES = {
  0: { x: 0, y: 0 }, // agua
  1: { x: 1, y: 0 }, // tierra
  2: { x: 2, y: 0 }, // árbol
};

// ================================
// 6️⃣ DIBUJAR MAPA CON CÁMARA
// ================================
export function drawMap(ctx, camera) {
  const startCol = Math.floor(camera.x / TILE_SIZE);
  const endCol = startCol + Math.ceil(camera.width / TILE_SIZE);

  const startRow = Math.floor(camera.y / TILE_SIZE);
  const endRow = startRow + Math.ceil(camera.height / TILE_SIZE);

  for (let y = startRow; y < endRow; y++) {
    for (let x = startCol; x < endCol; x++) {
      if (y < 0 || x < 0 || y >= MAP_ROWS || x >= MAP_COLS) continue;

      const tile = map.tiles[y][x];
      const def = TILE_TYPES[tile];

      ctx.drawImage(
        tileset,
        def.x * TILE_SIZE,
        def.y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
        x * TILE_SIZE - camera.x,
        y * TILE_SIZE - camera.y,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}
