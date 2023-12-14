Shery.mouseFollower({
  duration: 1,
});

Shery.makeMagnet(".magnet" /* Element to target.*/, {
  //Parameters are optional.
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

document.querySelector('.hamburger-menu').addEventListener('click', function() {
  this.classList.toggle('active');
});