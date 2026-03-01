/* ==========================================
   script.js — Susan Nkere Portfolio
   
   This file controls two things:
   1. The custom cursor (the dot + ring that 
      follows your mouse around the screen)
   2. The scroll reveal (sections fade in 
      as you scroll down the page)
========================================== */

/* ------------------------------------------
   PART 1: CUSTOM CURSOR
   
   There are two cursor elements in the HTML:
   - A small red dot  (#cursor)
   - A larger ring   (#ring)
   
   The dot follows the mouse instantly.
   The ring follows with a slight delay
   to give it that smooth trailing effect.
------------------------------------------ */

/* Step 1: Find the cursor elements in the HTML */
var dot = document.getElementById("cursor");
var ring = document.getElementById("ring");

/* Step 2: Create variables to store positions */

/* Where the mouse actually is right now */
var mouseX = 0;
var mouseY = 0;

/* Where the ring currently is on screen */
var ringX = 0;
var ringY = 0;

/* Step 3: Every time the mouse moves, update mouseX and mouseY */
document.addEventListener("mousemove", function (event) {
  /* event.clientX = how far from the left edge of the screen */
  /* event.clientY = how far from the top edge of the screen  */
  mouseX = event.clientX;
  mouseY = event.clientY;

  /* Move the small dot to exactly where the mouse is */
  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});

/* Step 4: Make the ring follow the mouse with a smooth delay */
/*
   This function runs over and over (about 60 times per second).
   Each time it runs, it moves the ring a little bit closer to the mouse.
   0.11 controls the speed — lower = more delay, higher = snappier.
*/
function moveRing() {
  /* Move ringX a little bit toward mouseX */
  ringX = ringX + (mouseX - ringX) * 0.11;

  /* Move ringY a little bit toward mouseY */
  ringY = ringY + (mouseY - ringY) * 0.11;

  /* Apply the new position to the ring element */
  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";

  /* Call this function again on the next animation frame */
  requestAnimationFrame(moveRing);
}

/* Start the ring movement loop */
moveRing();

/* Step 5: Make the ring grow when hovering over clickable things */
var clickableItems = document.querySelectorAll(
  "a, button, .project-card, .skill-pill",
);

clickableItems.forEach(function (item) {
  /* When mouse enters the item — make ring bigger */
  item.addEventListener("mouseenter", function () {
    ring.style.width = "58px";
    ring.style.height = "58px";
  });

  /* When mouse leaves the item — return ring to normal */
  item.addEventListener("mouseleave", function () {
    ring.style.width = "38px";
    ring.style.height = "38px";
  });
});

/* ------------------------------------------
   PART 2: SCROLL REVEAL

   Any element with class="reveal" starts
   invisible (set in the CSS).
   
   When you scroll and that element comes
   into view, we add the class "visible"
   which triggers the CSS fade-in animation.
------------------------------------------ */

/* Step 1: Find all elements that should animate in on scroll */
var elementsToReveal = document.querySelectorAll(".reveal");

/* Step 2: Define what happens when an element comes into view */
function handleReveal(entries) {
  entries.forEach(function (entry) {
    /* If this element is now visible on screen... */
    if (entry.isIntersecting === true) {
      /* ...add the "visible" class to trigger the CSS animation */
      entry.target.classList.add("visible");
    }
  });
}

/* Step 3: Create the observer */
var observer = new IntersectionObserver(handleReveal, {
  threshold: 0.1 /* trigger when 10% of the element is on screen */,
});

/* Step 4: Tell the observer to watch each element */
elementsToReveal.forEach(function (element) {
  observer.observe(element);
});
