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
