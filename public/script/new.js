let form = document.querySelector("#newform");
let body = document.querySelector("body");
let spinner = document.querySelector("#loader");
form.addEventListener("submit", () => {
  body.style.opacity = "0.7";
  spinner.style.visibility = "visible";
});
