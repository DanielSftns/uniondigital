const sections = document.querySelectorAll('.panel.section')
const paquetes = document.querySelectorAll('.panel.section-paquetes')
let limitesStatus = false
document.querySelector('#limites').addEventListener('click',()=>{
  if(limitesStatus){
    sections.forEach(section=>{
      section.style.backgroundColor = "#000e08"
    })
    paquetes.forEach(paquete=>{
      paquete.style.backgroundColor = "#000e08"
    })
  }else{
    sections.forEach(section=>{
      section.style.backgroundColor = "red"
    })
    paquetes.forEach(paquete=>{
      paquete.style.backgroundColor = "blue"
    })
  }
  limitesStatus = !limitesStatus
})

const controller = new ScrollMagic.Controller();

const tl = gsap.timeline()

tl.fromTo('.pinMaster1 .panel.section-paquetes', 1,
  { xPercent: 100 },
  { xPercent: 0, ease: Linear.easeNone },
  "+=0"
)

new ScrollMagic.Scene({
  triggerElement: ".pinMaster1",
  triggerHook: "onLeave",
  duration: "200%"
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
  "+=0.5"
)
tl2.fromTo('.pinMaster2 .panel.section-paquetes', 1,
  { xPercent: 100 },
  { xPercent: 0, ease: Linear.easeNone },
  "-=1"
)

new ScrollMagic.Scene({
  triggerElement: ".pinMaster2",
  triggerHook: "onLeave",
  duration: "200%"
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