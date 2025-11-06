import axios from 'axios';

// Base URL da API OpenWeather
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// A chave da API deve ser armazenada em arquivo .env e lida via processo de ambiente.
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';

/**
 * Serviço para consumir dados meteorológicos da API OpenWeather.
 */
class WeatherService {
  /**
   * Consulta o tempo atual de uma cidade.
   * @param {string} city Nome da cidade
   * @param {string} units Unidades (standard, metric, imperial)
   * @param {string} lang Idioma (pt, en, etc.)
   * @returns {Promise<object>} Dados da previsão atual
   */
  static async getCurrentWeather(city, units = 'metric', lang = 'pt') {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units,
          lang,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clima atual:', error);
      throw error;
    }
  }

  /**
   * Consulta a previsão das próximas horas para uma cidade.
   * Este método utiliza a API de previsão a cada 3 horas (forecast) da OpenWeather.
   * @param {string} city Nome da cidade
   * @param {string} units Unidades (standard, metric, imperial)
   * @param {string} lang Idioma (pt, en, etc.)
   * @returns {Promise<object>} Dados de previsão
   */
  static async getForecast(city, units = 'metric', lang = 'pt') {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units,
          lang,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar previsão:', error);
      throw error;
    }
  }
}

export default WeatherService;