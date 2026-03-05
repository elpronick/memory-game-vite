import { createBoard } from "./board.js";
import { loadStats, saveStats } from "./storage.js";

let moves = 0;

// 🔹 Cargamos estadísticas guardadas
let stats = loadStats() ?? {
  bestScore: null,
  gamesPlayed: 0,
};

// Esta función inicializa el juego. Resetea el contador de movimientos, crea el tablero y actualiza la interfaz de usuario.
export function initGame() {
  moves = 0;

  createBoard(handleMove, handleWin);
  updateUI();

  const restartBtn = document.getElementById("restart");

  restartBtn.addEventListener("click", () => {
    restartGame();
  });

  function handleWin() {
    simulateWin()
  }

  // Esta función reinicia el juego. Resetea el contador de movimientos, crea un nuevo tablero y actualiza la interfaz de usuario.
  function restartGame() {
    moves = 0;

    createBoard(handleMove);

    updateUI();
  }
}

// Esta función se llama cada vez que el jugador hace un movimiento. Incrementa el contador de movimientos y actualiza la interfaz de usuario.
function handleMove() {
  moves++;
  updateUI();
}

// Esta función actualiza la interfaz de usuario con el número de movimientos y la mejor puntuación. Si no hay una mejor puntuación, se muestra un mensaje indicando que no hay una puntuación registrada.
function updateUI() {
  document.getElementById("moves").textContent = moves;

  if (stats.bestScore !== null) {
    document.getElementById("best-score").textContent =
      stats.bestScore;
  }
}

// 🔹 Función temporal para probar guardado
export function simulateWin() {
  stats.gamesPlayed++;

  if (stats.bestScore === null || moves < stats.bestScore) {
    stats.bestScore = moves;
  }

  saveStats(stats);
}
