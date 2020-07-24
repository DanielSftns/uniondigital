const controller = new ScrollMagic.Controller();

const tl = gsap.timeline()

tl.fromTo('.pinMaster1 .panel.section-paquetes', 1,
  { xPercent: 100 },
  { xPercent: 0, ease: Linear.easeNone },
  "+=1"
)

new ScrollMagic.Scene({
  triggerElement: ".pinMaster1",
  triggerHook: "onLeave",
  duration: "100%"
})
  .setPin(".pinMaster1")
  .setTween(tl)
  .addIndicators({
    colorTrigger: "white",
    colorStart: "white",
    colorEnd: "white",
    indent: 40
  })
  .addTo(controller);


const tl2 = gsap.timeline()

tl2.fromTo('.pinMaster2 .panel.section', 1,
  { xPercent: 0 },
  { xPercent: -100, ease: Linear.easeNone },
  "+=1"
)
tl2.fromTo('.pinMaster2 .panel.section-paquetes', 1,
  { xPercent: 100 },
  { xPercent: 0, ease: Linear.easeNone },
  "+=1"
)

new ScrollMagic.Scene({
  triggerElement: ".pinMaster2",
  triggerHook: "onLeave",
  duration: "100%"
})
  .setPin(".pinMaster2")
  .setTween(tl2)
  .addIndicators({
    colorTrigger: "white",
    colorStart: "white",
    colorEnd: "white",
    indent: 40
  })
  .addTo(controller);