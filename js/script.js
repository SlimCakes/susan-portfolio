var dot = document.getElementById("cursor");
var ring = document.getElementById("ring");

var mouseX = 0;
var mouseY = 0;

var ringX = 0;
var ringY = 0;

document.addEventListener("mousemove", function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});

function moveRing() {
  ringX = ringX + (mouseX - ringX) * 0.11;
  ringY = ringY + (mouseY - ringY) * 0.11;
  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";
  requestAnimationFrame(moveRing);
}

moveRing();

var clickableItems = document.querySelectorAll(
  "a, button, .project-card, .skill-pill",
);

clickableItems.forEach(function (item) {
  item.addEventListener("mouseenter", function () {
    ring.style.width = "58px";
    ring.style.height = "58px";
  });

  item.addEventListener("mouseleave", function () {
    ring.style.width = "38px";
    ring.style.height = "38px";
  });
});

var elementsToReveal = document.querySelectorAll(".reveal");

function handleReveal(entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting === true) {
      entry.target.classList.add("visible");
    }
  });
}

var observer = new IntersectionObserver(handleReveal, {
  threshold: 0.1,
});

elementsToReveal.forEach(function (element) {
  observer.observe(element);
});

var isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  dot.style.display = "none";
  ring.style.display = "none";
}

var words = ["great.", "better.", "meaningful.", "impactful."];
var el = document.getElementById("changing-word");

var wordIndex = 0;
var charIndex = 0;
var isDeleting = false;

window.addEventListener("load", function () {
  if (!el) return;

  var temp = document.createElement("span");
  temp.style.visibility = "hidden";
  temp.style.position = "absolute";
  temp.style.whiteSpace = "nowrap";
  temp.style.font = window.getComputedStyle(el).font;

  document.body.appendChild(temp);

  var maxWidth = 0;

  words.forEach(function (word) {
    temp.textContent = word;
    maxWidth = Math.max(maxWidth, temp.offsetWidth);
  });

  el.style.display = "inline-block";
  el.style.width = maxWidth + "px";

  document.body.removeChild(temp);

  typeEffect();
});

function typeEffect() {
  var currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  el.textContent = currentWord.substring(0, charIndex);

  var speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1200; // pause
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}
