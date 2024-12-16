document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  // Cargar tema desde localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const currentTheme = body.classList.contains("dark-theme")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme); // Guardar preferencia
  });
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".menu-item");
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? "block" : "none";
  });
});
