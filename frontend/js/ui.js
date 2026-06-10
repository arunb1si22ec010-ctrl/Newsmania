// UI Functions
class UI {
  static renderArticle(article) {
    return `
      <div class="article-card">
        <img src="${article.image_url || 'placeholder.jpg'}" alt="${article.title}" class="article-image">
        <div class="article-content">
          <span class="article-category">${article.category}</span>
          <h3 class="article-title">${article.title}</h3>
          <p class="article-description">${article.description}</p>
          <div class="article-footer">
            <span>${new Date(article.published_date).toLocaleDateString()}</span>
            <button class="favorite-btn" data-id="${article.id}">♡</button>
          </div>
        </div>
      </div>
    `;
  }

  static renderGrid(articles) {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = articles.map(article => this.renderArticle(article)).join('');
    this.attachEventListeners();
  }

  static attachEventListeners() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
      });
    });

    document.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', () => {
        console.log('Article clicked:', card);
      });
    });
  }

  static showLoading(show = true) {
    const loading = document.getElementById('loading');
    loading.classList.toggle('active', show);
  }

  static showError(message) {
    alert(`Error: ${message}`);
  }
}
