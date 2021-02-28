const menuIcon = document.querySelector('.menu-icon')
const indicador = document.querySelector('.indicador')
const buttonsPaquetes = document.querySelectorAll('.paquete button')

window.addEventListener('load', () => {
    // SETEAR ESTYLOS Y CONFIGUARION
    const headerHeight = document.querySelector('header').offsetHeight
    document.querySelector('.team').style.height = `calc(100vh - ${headerHeight}px)`
    document.querySelector('.menu').style.top = `${headerHeight}px`

    

    // EVENTOS CLICK
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active')
        menu.classList.toggle('active')
        indicador.classList.toggle('active')
    })

    menu.querySelectorAll('button').forEach(link => {
        link.addEventListener('click', (e) => {
            const direction = e.currentTarget.dataset.href
            const distance = document.querySelector(`${direction}`).getClientRects()[0].top - headerHeight
            menuIcon.click()
            gsap.to(window, {
                duration: 2,
                scrollTo: window.scrollY + distance,
                ease: Cubic.linear
            })
        })
    })

    paquetes.forEach(paquete => {
        const detalles = paquete.querySelector('.detalles')
        const detallesHeight = detalles.offsetHeight
        detalles.style.height = `${detallesHeight}px`
        detalles.classList.add('hidden')

        paquete.addEventListener('click', () => {
            detalles.classList.toggle('hidden')
        })
    })
    buttonsPaquetes.forEach(buttonPaquete => {
        buttonPaquete.addEventListener('click', () => {
            vistaFormulario.querySelector('#paquete_selecionado').value = buttonPaquete.parentNode.parentNode.querySelector('.title').textContent
            vistaFormulario.classList.add('active')
        })
    })

    // INDICADOR

    window.addEventListener('scroll', ()=> {
        document.querySelectorAll('section').forEach(section => {
            if(section.getClientRects()[0].top < headerHeight + 10 && section.getClientRects()[0].top > headerHeight - 10){
                const index = parseInt(section.dataset.indicador)
                setIndicador(index)
            }else if(section.getClientRects()[0].bottom < innerHeight / 2 + 10 && section.getClientRects()[0].bottom > innerHeight / 2 - 10){
                const index = parseInt(section.dataset.indicador)
                setIndicador(index)
            }
        })
    })

    function setIndicador(index){
        indicador.querySelectorAll('span').forEach((span, i) => {
            if (i < index) {
                span.style.transform = 'translateY(-200%)'
            } else if (i > index) {
                span.style.transform = 'translateY(0%)'
            } else {
                span.style.transform = 'translateY(-100%)'
            }
        })
    }


    // PORTADASPortafolioCards
    portadasPortafolioCards.forEach(portada => {
        gsap.timeline({
            scrollTrigger: {
                trigger: portada,
                pin: false,
                start: "center center",
                scrub: 0
            }
        }).to(portada.querySelector('img'), 1, {
            yPercent: -50
        })
    })
})