// ===== Main Application Logic =====

// Handle search functionality
async function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.trim();
  const resultsDiv = document.getElementById("searchResults");

  if (!query) {
    resultsDiv.innerHTML = "";
    return;
  }

  resultsDiv.innerHTML = Views.loading();

  try {
    const results = await API.searchMovies(query);
    resultsDiv.innerHTML = Views.movieList(results);
  } catch (error) {
    resultsDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

// Log application start
console.log("🎬 Movie Database SPA Started!");
console.log("Available routes:");
console.log("  #/ - Home");
console.log("  #/movies - Movie List");
console.log("  #/movie/:id - Movie Detail");
console.log("  #/search - Search Movies");
