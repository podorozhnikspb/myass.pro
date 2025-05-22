window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const h1 = document.querySelector("h1");
  const header = document.querySelector("header");
  const headerBottom = header.getBoundingClientRect().bottom;

  if (headerBottom <= 0) {
    nav.classList.add("sticky");
    h1.classList.add("scrolled");
  } else {
    nav.classList.remove("sticky");
    h1.classList.remove("scrolled");
  }
});