// ===== Fetch API Module =====
// ใช้ Fetch API ดึงข้อมูลภาพยนตร์จาก OMDB API

const API = {
  // OMDB API Configuration
  // หาได้ที่: https://www.omdbapi.com/apikey.aspx
  API_KEY: "4850608a", // ⚠️ แก้ตรงนี้ด้วย API key ของคุณ
  BASE_URL: "https://www.omdbapi.com",

  // Cache ข้อมูลเพื่อลด API calls
  cache: {},

  // ดึงรายชื่อภาพยนตร์ (ค้นหา "movie" และจำกัด 5 อัน)
  getMovies: async function () {
    // ถ้ามี cache ให้ใช้เลย
    if (this.cache.movies) {
      return this.cache.movies;
    }

    try {
      // ค้นหาภาพยนตร์ชื่อ "movie"
      const response = await fetch(
        `${this.BASE_URL}/?s=movie&apikey=${this.API_KEY}&type=movie&page=1`,
      );
      const data = await response.json();

      if (data.Response === "False") {
        console.error("API Error:", data.Error);
        return [];
      }

      // แปลงจาก OMDB format เป็น format ของเรา
      const movies =
        data.Search?.slice(0, 5).map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: parseInt(movie.Year) || 0,
          rating: 0, // OMDB ด้านรายการไม่มี rating
          description: `Released: ${movie.Year}`,
          poster: movie.Poster,
        })) || [];

      // บันทึกใน cache
      this.cache.movies = movies;
      return movies;
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  },

  // ดึงภาพยนตร์เดี่ยวตาม ID (IMDb ID)
  getMovieById: async function (imdbID) {
    // ถ้ามี cache ให้ใช้เลย
    if (this.cache[imdbID]) {
      return this.cache[imdbID];
    }

    try {
      const response = await fetch(
        `${this.BASE_URL}/?i=${imdbID}&apikey=${this.API_KEY}`,
      );
      const data = await response.json();

      if (data.Response === "False") {
        console.error("Movie not found:", data.Error);
        return null;
      }

      // แปลงเป็น format ของเรา
      const movie = {
        id: data.imdbID,
        title: data.Title,
        year: parseInt(data.Year) || 0,
        rating: parseFloat(data.imdbRating) || 0,
        description: data.Plot,
        poster: data.Poster,
        director: data.Director,
        actors: data.Actors,
        genre: data.Genre,
      };

      // บันทึกใน cache
      this.cache[imdbID] = movie;
      return movie;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  },

  // ค้นหาภาพยนตร์ตามชื่อ
  searchMovies: async function (query) {
    if (!query.trim()) {
      return [];
    }

    try {
      const response = await fetch(
        `${this.BASE_URL}/?s=${query}&apikey=${this.API_KEY}&type=movie`,
      );
      const data = await response.json();

      if (data.Response === "False") {
        console.log("No movies found for:", query);
        return [];
      }

      // แปลงจาก OMDB format เป็น format ของเรา
      const movies =
        data.Search?.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: parseInt(movie.Year) || 0,
          rating: 0, // OMDB search ไม่มี rating
          description: `Released: ${movie.Year}`,
          poster: movie.Poster,
        })) || [];

      return movies;
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  },
};
