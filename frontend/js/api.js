// API Functions
class NewsAPI {
  static async fetchWithTimeout(url, timeout = CONFIG.timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('API Error:', error);
      throw error;
    }
  }

  static async getNews() {
    return this.fetchWithTimeout(CONFIG.newsEndpoint);
  }

  static async getNewsByCategory(category) {
    return this.fetchWithTimeout(`${CONFIG.newsEndpoint}/category/${category}`);
  }

  static async getCategories() {
    return this.fetchWithTimeout(CONFIG.categoriesEndpoint);
  }

  static async getFavorites(userId) {
    return this.fetchWithTimeout(`${CONFIG.favoritesEndpoint}/${userId}`);
  }

  static async addFavorite(userId, articleId) {
    const response = await fetch(CONFIG.favoritesEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, articleId })
    });
    if (!response.ok) throw new Error('Failed to add favorite');
    return await response.json();
  }

  static async removeFavorite(userId, articleId) {
    const response = await fetch(`${CONFIG.favoritesEndpoint}/${userId}/${articleId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove favorite');
    return await response.json();
  }
}
