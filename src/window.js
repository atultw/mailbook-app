const MINIMIZE = document.getElementById("minimize");
const CLOSE = document.getElementById("close");

MINIMIZE.addEventListener("click", () => {
  app.window.minimize();
});
CLOSE.addEventListener("click", () => {
  app.window.close();
});
