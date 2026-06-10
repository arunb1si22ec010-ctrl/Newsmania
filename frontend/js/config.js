// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const API_TIMEOUT = 10000;

const CONFIG = {
  apiBaseUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
  newsEndpoint: `${API_BASE_URL}/news`,
  categoriesEndpoint: `${API_BASE_URL}/categories`,
  favoritesEndpoint: `${API_BASE_URL}/favorites`
};
