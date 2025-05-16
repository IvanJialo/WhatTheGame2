const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = import.meta.env.VITE_RAWG_API_URL;

async function getStoreById(storeId) {
  try {
    const response = await fetch(`${BASE_URL}/stores/${storeId}?key=${API_KEY}`);
    if (!response.ok) throw new Error('Error al obtener la tienda');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener la tienda con ID ${storeId}:`, error);
    throw error;
  }
}

async function getGamesHome() {
  const randomPage = Math.floor(Math.random() * 200) + 1;

  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${randomPage}&page_size=10000`);
    if (!response.ok) throw new Error('Error al obtener juegos');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error al obtener juegos para el Home:', error);
    throw error;
  }
}

async function getGameDetailsById(id) {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    if (!response.ok) throw new Error('Error al obtener los detalles del juego');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener detalles del juego con ID ${id}:`, error);
    throw error;
  }
}

async function getGameStores(id) {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}/stores?key=${API_KEY}`);
    if (!response.ok) throw new Error('Error al obtener las tiendas del juego');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener las tiendas del juego con ID ${id}:`, error);
    throw error;
  }
}

async function getGameTrailers(id) {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`);
    if (!response.ok) throw new Error('Error al obtener los trailers del juego');
    const data = await response.json();
    // console.log("Trailers: " + JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(`Error al obtener los trailers del juego con ID ${id}:`, error);
    throw error;
  }
}

async function getGameScreenshots(id) {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
    if (!response.ok) throw new Error('Error al obtener las capturas de pantalla del juego');
    const data = await response.json();
    // console.log("Screenshots: " + JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(`Error al obtener las capturas de pantalla del juego con ID ${id}:`, error);
    throw error;
  }
}

async function getGameGenres() {
  try {
    const response = await fetch(`${BASE_URL}/genres?page=1&page_size=30&key=${API_KEY}`);
    if (!response.ok) throw new Error('Error al obtener los géneros');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los géneros:', error);
    throw error;
  }
}

async function getGamesByGenre(genreSlug) {
  const randomPage = Math.floor(Math.random() * 100) + 1;

  try {
    const response = await fetch(`${BASE_URL}/games?genres=${genreSlug}&page=${randomPage}&page_size=1000&key=${API_KEY}`);
    if (!response.ok) throw new Error('Error al obtener juegos por género');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener juegos por género con ID ${genreId}:`, error);
    throw error;
  }
}

async function searchGames(query) {
  try {
    const response = await fetch(`${BASE_URL}/games?search=${encodeURIComponent(query)}&key=${API_KEY}`);
    if (!response.ok) throw new Error('Error al obtener juegos por búsqueda');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error en searchGames con query "${query}":`, error);
    throw error;
  }
}

export { 
    getGamesHome,
    getGameDetailsById,
    getGameStores,
    getStoreById,
    getGameTrailers,
    getGameScreenshots,
    getGameGenres,
    getGamesByGenre,
    searchGames,

 };

