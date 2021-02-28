const arrows = document.querySelectorAll('.arrow')
const vistaModalCard = document.querySelector('.vista_modal_card')
const nosotros = document.querySelector('.nosotros')

window.addEventListener('load', ()=> {
    // setear estilos
    const padding = parseFloat(getComputedStyle(document.querySelector('.hero')).getPropertyValue('padding-left').replace('px',''))
    
    nosotros.querySelector('.content').style.gridTemplateColumns = `50% 50% ${nosotros.querySelector('img').getClientRects()[0].left - padding}px`
    
    // EVENTOS CLICK
    arrows.forEach(arrow => {
        arrow.addEventListener('click', ()=> {
            if(arrow.classList.contains('disable')) return
            
            if(arrow.classList.contains('carousel')){
                if(arrow.classList.contains('right')){
                    glide.go('>')
                }else{
                    glide.go('<')
                }
                return
            }
            
            const section = arrow.parentNode.parentNode.parentNode
            const cards = section.querySelectorAll('.card')
            
            let recorrido =  0
            if(cards[0].dataset.recorrido){
                recorrido = parseFloat(cards[0].dataset.recorrido)
            }
    
            arrow.parentNode.querySelectorAll('.arrow').forEach(flecha => {
                flecha.classList.remove('disable')
            })
    
            if(arrow.classList.contains('right')){
                for(let i= 0; i<cards.length; i++){
                    const card = cards[i].getClientRects()[0]
    
                    if(card.left + card.width > section.offsetWidth){
                        if(i == cards.length - 1){
                            const ultimaCard = cards[cards.length - 1].getClientRects()[0]
                            recorrido += ultimaCard.left - section.offsetWidth + ultimaCard.width + padding
                            arrow.classList.add('disable')
                        }else{
                            recorrido += card.left - padding
                        }
    
                        break
                    }else{
                        continue
                    }
                }
            }
            else{
                for(let i = cards.length - 1; i>=0; i--){
                    const card = cards[i].getClientRects()[0]
    
                    if(card.left < 0){
                        const restar = section.offsetWidth - (card.left + card.width) - padding
                        if(recorrido - restar > 0){
                            recorrido -= restar
                        }else{
                            recorrido = 0
                            arrow.classList.add('disable')
                        }
    
                        break
                    }else{
                        continue
                    }
                }
            }
    
            for(let i= 0; i<cards.length; i++){
                if(i==0){
                    cards[i].dataset.recorrido = recorrido
                }
                cards[i].style.transform = `translateX(-${recorrido}px)`
            }
        })
    })
    
    menu.querySelectorAll('button').forEach(link => {
        link.addEventListener('click', (e) => {
            const direction = e.currentTarget.dataset.href
            gsap.to(window, {
                duration: 2,
                scrollTo: document.querySelector(`${direction}`).offsetTop,
                ease: Cubic.linear
            })
        })
    })
    
    paquetes.forEach(paquete => {
        paquete.addEventListener('click', ()=> {
            const modal = vistaModalCard.querySelector('.modal_card')
    
            modal.querySelector('.title').textContent = paquete.querySelector('.title').textContent
            modal.querySelector('img').src = paquete.querySelector('img').dataset.src
            modal.querySelector('.description').textContent = paquete.querySelector('.detalles p').textContent
    
            vistaModalCard.classList.add('active')
        })
    })
    
    vistaModalCard.querySelector('.close').addEventListener('click', ()=> {
        vistaModalCard.classList.remove('active')
    })
    
    vistaModalCard.querySelector('.close').addEventListener('click', ()=> {
        vistaModalCard.classList.remove('active')
    })
    
    vistaModalCard.querySelector('.call-to-action').addEventListener('click', ()=> {
        vistaModalCard.classList.remove('active')
        vistaFormulario.querySelector('#paquete_selecionado').value = vistaModalCard.querySelector('.title').textContent
        vistaFormulario.classList.add('active')
    })
    
    const butonNosotroPlay = document.querySelector('.nosotros .play')
    
    butonNosotroPlay.addEventListener('click', ()=> {
        const imagen = document.querySelector('.nosotros img')
    
        const recorrido = imagen.getClientRects()[0].left
    
        document.querySelector('.nosotros .content').style.transform = `translateX(calc(-${recorrido}px + 4em))`
    })
})


