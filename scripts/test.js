let boxElement;

// Setup
window.addEventListener(
  "load",
  () => {
    boxElement = document.querySelector("#box");
    createObserver();
  },
  false
);

function createObserver() {
  const options = {
    root: null, // Viewport is de root
    rootMargin: "-50% 0px -50% 0px", // 50% aan de boven- en onderkant van het scherm
    threshold: 0, // Geen drempelwaarde, alleen intersectie detecteren
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("Box is meer dan 50% in beeld!");
      entry.target.style.opacity = "1";
      document.getElementById("box2").classList.add("wow");
    } 
  });
}
