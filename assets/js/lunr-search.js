// Lunr.js Search Functionality for Jekyll Site

document.addEventListener('DOMContentLoaded', function() {
  // Initialize search functionality
  initSearch();
});

function initSearch() {
  // Get search elements
  const navSearchInput = document.getElementById('search-input');
  const navSearchButton = document.getElementById('search-button');
  const pageSearchInput = document.getElementById('search-input-page');
  const pageSearchButton = document.getElementById('search-button-page');
  const resultsContainer = document.getElementById('search-results');

  // Load search index
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      // Create Lunr index
      const idx = lunr(function() {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('tags');
        this.field('categories');

        data.forEach(function(doc, index) {
          doc.id = index;
          this.add(doc);
        }, this);
      });

      // Set up search handlers
      if (navSearchButton && navSearchInput) {
        navSearchButton.addEventListener('click', () => performSearch(idx, navSearchInput.value, true));
        navSearchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            performSearch(idx, navSearchInput.value, true);
          }
        });
      }

      if (pageSearchButton && pageSearchInput) {
        pageSearchButton.addEventListener('click', () => performSearch(idx, pageSearchInput.value, false));
        pageSearchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            performSearch(idx, pageSearchInput.value, false);
          }
        });
      }
    })
    .catch(error => {
      console.error('Error loading search index:', error);
    });

  initMobileNav();
}

function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) {
    return;
  }

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('closed');
  });
}

function performSearch(index, query, redirectToSearchPage = false) {
  if (!query.trim()) {
    return;
  }

  const results = index.search(query);
  const resultsContainer = document.getElementById('search-results');

  if (redirectToSearchPage) {
    // Redirect to search page with query
    window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
    return;
  }

  if (resultsContainer) {
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found for "' + query + '"</p>';
      return;
    }

    let html = `<h3>Search results for "${query}"</h3>`;
    html += '<div class="search-result-list">';

    results.forEach(result => {
      const doc = result.doc || result;
      html += `
        <div class="search-result-item">
          <h4 class="search-result-title">
            <a href="${doc.url}">${doc.title}</a>
          </h4>
          <p class="search-result-excerpt">${doc.excerpt || 'No excerpt available'}</p>
          <div class="search-result-meta">
            ${doc.categories ? `<span class="categories">Categories: ${doc.categories.join(', ')}</span>` : ''}
            ${doc.tags ? `<span class="tags">Tags: ${doc.tags.join(', ')}</span>` : ''}
          </div>
        </div>
      `;
    });

    html += '</div>';
    resultsContainer.innerHTML = html;
  }
}

// Handle search query from URL parameters
function handleUrlSearchQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');

  if (query) {
    const searchInput = document.getElementById('search-input-page');
    if (searchInput) {
      searchInput.value = query;
      // Trigger search after index is loaded
      setTimeout(() => {
        const event = new Event('keypress');
        event.key = 'Enter';
        searchInput.dispatchEvent(event);
      }, 500);
    }
  }
}

// Call this when on search page
if (window.location.pathname.includes('/search.html')) {
  handleUrlSearchQuery();
}