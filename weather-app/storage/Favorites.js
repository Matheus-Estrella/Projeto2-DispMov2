import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@favorite_cities';

/**
 * Obtém a lista de cidades favoritas do armazenamento local.
 * @returns {Promise<string[]>}
 */
export async function getFavorites() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

/**
 * Adiciona uma cidade às favoritas.
 * @param {string} city
 */
export async function addFavorite(city) {
  const favorites = await getFavorites();
  if (!favorites.includes(city)) {
    favorites.push(city);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
}

/**
 * Remove uma cidade das favoritas.
 * @param {string} city
 */
export async function removeFavorite(city) {
  const favorites = await getFavorites();
  const filtered = favorites.filter(c => c !== city);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}