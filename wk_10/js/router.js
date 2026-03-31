// ===== Router Module =====
// ใช้ Hash-based routing เพื่อนำทาง

class Router {
  constructor() {
    this.currentPage = "";
    this.setupListeners();
  }

  // ตั้งค่า Event Listeners
  setupListeners() {
    window.addEventListener("hashchange", () => this.navigate());
    window.addEventListener("load", () => this.navigate());
  }

  // Handle navigation
  async navigate() {
    const hash = window.location.hash.slice(2) || "/"; // ตัด "#/"
    const parts = hash.split("/").filter(Boolean);
    const page = parts[0] || "home";
    const param = parts[1];

    this.currentPage = page;
    const appDiv = document.getElementById("app");

    // Show loading state
    appDiv.innerHTML = Views.loading();

    // Render page based on route
    switch (page) {
      case "home":
      case "":
        appDiv.innerHTML = Views.home();
        break;

      case "movies":
        try {
          const movies = await API.getMovies();
          appDiv.innerHTML = Views.movieList(movies);
        } catch (error) {
          appDiv.innerHTML = `<div class="error">Error loading movies: ${error.message}</div>`;
        }
        break;

      case "movie":
        try {
          const movie = await API.getMovieById(param);
          appDiv.innerHTML = Views.movieDetail(movie);
        } catch (error) {
          appDiv.innerHTML = `<div class="error">Error loading movie: ${error.message}</div>`;
        }
        break;

      case "search":
        appDiv.innerHTML = Views.search();
        break;

      default:
        appDiv.innerHTML = Views.notFound();
    }

    // Update active nav link
    this.updateNavigation();
  }

  // Update active navigation link
  updateNavigation() {
    document.querySelectorAll("nav a").forEach((link) => {
      const href = link.getAttribute("href").slice(2).split("/")[0] || "home";
      const isActive =
        href === this.currentPage ||
        (this.currentPage === "" && href === "home");
      link.classList.toggle("active", isActive);
    });
  }
}

// Initialize Router
const router = new Router();
