// ===== Views Module =====
// เก็บ HTML templates สำหรับแต่ละหน้า

const Views = {
  // Home Page
  home: () => {
    return `
      <h1>🎬 ยินดีต้อนรับสู่ Movie Database</h1>
      <p>ค้นหาและเรียนรู้เกี่ยวกับภาพยนตร์ที่คุณชอบ</p>
      <br>
      <a href="#/movies" style="padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 4px; display: inline-block;">
        ดูรายชื่อภาพยนตร์
      </a>
    `;
  },

  // Movie List Page
  movieList: (movies) => {
    if (!movies || movies.length === 0) {
      return '<div class="no-results">ไม่พบภาพยนตร์ (โปรดตรวจสอบ API key)</div>';
    }

    let html = '<h1>🎬 รายชื่อภาพยนตร์</h1><div class="movie-list">';
    movies.forEach((movie) => {
      const posterImage =
        movie.poster && movie.poster !== "N/A"
          ? movie.poster
          : "https://via.placeholder.com/200x300?text=No+Poster";

      html += `
        <div class="movie-card" onclick="location.hash='#/movie/${movie.id}'">
          <img src="${posterImage}" alt="${movie.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;">
          <h3>${movie.title}</h3>
          <p><strong>ปี:</strong> ${movie.year}</p>
          <p><strong>Rating:</strong> <span class="rating">⭐ ${movie.rating || "N/A"}</span></p>
          <p>${movie.description}</p>
        </div>
      `;
    });
    html += "</div>";
    return html;
  },

  // Movie Detail Page
  movieDetail: (movie) => {
    if (!movie) {
      return `
        <h1>❌ ไม่พบภาพยนตร์</h1>
        <a href="#/movies" class="back-link">← กลับไปรายชื่อ</a>
      `;
    }

    const posterImage =
      movie.poster && movie.poster !== "N/A"
        ? movie.poster
        : "https://via.placeholder.com/300x450?text=No+Poster";

    return `
      <a href="#/movies" class="back-link">← กลับไปรายชื่อ</a>
      <div style="display: flex; gap: 20px; margin-top: 20px;">
        <div style="flex-shrink: 0;">
          <img src="${posterImage}" alt="${movie.title}" style="width: 250px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
        </div>
        <div>
          <h1>${movie.title}</h1>
          <p><strong>ปี:</strong> ${movie.year}</p>
          <p><strong>Rating:</strong> <span class="rating">⭐ ${movie.rating} / 10</span></p>
          ${movie.genre ? `<p><strong>ประเภท:</strong> ${movie.genre}</p>` : ""}
          ${movie.director ? `<p><strong>ผู้กำกับ:</strong> ${movie.director}</p>` : ""}
          ${movie.actors ? `<p><strong>นักแสดง:</strong> ${movie.actors}</p>` : ""}
          <hr style="margin: 20px 0;">
          <h3>สรุปเรื่อง</h3>
          <p>${movie.description}</p>
          <hr>
          <p style="color: #999; font-size: 14px;">
            IMDb ID: ${movie.id}
          </p>
        </div>
      </div>
    `;
  },

  // Search Page
  search: () => {
    return `
      <h1>🔍 ค้นหาภาพยนตร์</h1>
      <div class="search-form">
        <input 
          type="text" 
          id="searchInput" 
          placeholder="ค้นหาชื่อภาพยนตร์..."
          onkeyup="handleSearch()"
        >
        <button onclick="handleSearch()">ค้นหา</button>
      </div>
      <div id="searchResults"></div>
    `;
  },

  // 404 Page
  notFound: () => {
    return `
      <h1>❌ 404 - ไม่พบหน้า</h1>
      <p><a href="#/">กลับไปหน้า Home</a></p>
    `;
  },

  // Loading
  loading: () => {
    return '<div class="loading">⏳ กำลังโหลด...</div>';
  },
};
