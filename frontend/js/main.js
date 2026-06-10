// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

async function initializeApp() {
  try {
    UI.showLoading(true);
    
    // Load categories
    await loadCategories();
    
    // Load initial news
    await loadNews();
    
    // Setup event listeners
    setupEventListeners();
    
    UI.showLoading(false);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    UI.showError('Failed to load application');
    UI.showLoading(false);
  }
}

async function loadNews() {
  try {
    const category = document.getElementById('categoryFilter').value;
    const articles = category 
      ? await NewsAPI.getNewsByCategory(category)
      : await NewsAPI.getNews();
    UI.renderGrid(articles);
  } catch (error) {
    console.error('Failed to load news:', error);
    UI.showError('Failed to load news articles');
  }
}

async function loadCategories() {
  try {
    const categories = await NewsAPI.getCategories();
    const select = document.getElementById('categoryFilter');
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.category;
      option.textContent = cat.category;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  searchInput.addEventListener('input', () => {
    // Implement search functionality
    console.log('Search:', searchInput.value);
  });

  categoryFilter.addEventListener('change', () => {
    loadNews();
  });
}
