Shery.mouseFollower({
  duration: 1,
});

Shery.makeMagnet(".magnet" /* Element to target.*/, {
  //Parameters are optional.
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});


function textanimation() {
  let tl = gsap.timeline();
  
  tl.from("#nav", {
    y: -20,
    opacity: 0,
    stagger: 0.33,
    duration: 0.33,
    delay: 0.65,
  });
  
  tl.to(".item", {
    y: 0,
    ease: Power2,
    duration: 0.33,
    stagger: 0.33,
    delay: 0.4,
  });
  tl.to('#page1last' , {

    opacity : 1,
    y: -20
  })
}
textanimation()
