// Este módulo se encarga de guardar y cargar las estadísticas del juego utilizando localStorage. Define una clave constante para almacenar los datos y dos funciones: saveStats para guardar las estadísticas y loadStats para cargarlas.
const STORAGE_KEY = "memory-game-stats";

// Esta función guarda las estadísticas del juego en localStorage. Recibe un objeto con las estadísticas y lo convierte a JSON antes de guardarlo.
export function saveStats(data) {
  const json = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, json);
}

// Esta función carga las estadísticas del juego desde localStorage. Si no hay datos o si los datos no son válidos, devuelve null.
export function loadStats() {
  const raw = localStorage.getItem(STORAGE_KEY);

  // Si no hay datos, devolvemos null.
  if (!raw) return null;

  // Intentamos parsear el JSON. Si falla, devolvemos null.
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

