const menu = document.querySelector('.menu')
const paquetes = document.querySelectorAll('.paquete')
const vistaFormulario = document.querySelector('.vista_formulario')
const buttonCerrarFormulario = vistaFormulario.querySelector('.close')
const buttonSubmitFormulario = vistaFormulario.querySelector('.call-to-action')
const portadasPortafolioCards = document.querySelectorAll('.portada.animation')
let glide

const telegram = {
    configTelegram: {
        baseURL: 'https://api.telegram.org/bot',
        token: '1653505117:AAFa-tRib1iSDaNdFtRpf302BX09Xc30gig',
        chat_id: '-366222609',
        parse_mode: 'html',
    },

    send: async (msn = '') => {
        const { baseURL, token, chat_id, parse_mode } = telegram.configTelegram;
        const endPoint = 'sendMessage';
        const url = new URL(`${baseURL}${token}/${endPoint}`);
        const params = {
            chat_id: chat_id,
            parse_mode: parse_mode
        };

        params['text'] = msn;
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        return await (await fetch(url)).json().catch(error => error);
    }
}


window.addEventListener('load', ()=> {
    const headerHeight = document.querySelector('header').offsetHeight
    document.querySelector('.hero').style.height = `calc(100vh - ${headerHeight}px)`
    document.querySelector('.hero div').style.transform = `translateY(-${headerHeight / 2}px)`
    
    portadasPortafolioCards.forEach(portada => {
        portada.style.height = Math.round(portada.offsetWidth * 0.5625) + 'px'
    })

    document.querySelector('.loader').classList.remove('active');
    
    const inputTlf = document.querySelector("#phone")
    const iti = window.intlTelInput(inputTlf, {
        preferredCountries: ["ve", "us"],
        initialCountry: "VE",
        geoIpLookup: function(success, failure) {
            fetch('https://ipapi.co/json/')
                .then(function(response) {
                    response.json().then(jsonData => {
                        success(jsonData.country_code)
                    });
                })
                .catch(function(error) {
                    console.log(error)
                });
        },
        utilsScript: './js/utils.js'
    });

    glide = new Glide('#team .glide',{
        type: "carousel",
        gap: 0,
        autoplay: 5000,
        perTouch: 1,
        animationDuration: 1000
    })
    .mount()

    // EVENTOS CLICK
    buttonCerrarFormulario.addEventListener('click', () => {
        vistaFormulario.classList.remove('active')
    })

    buttonSubmitFormulario.addEventListener('click', (e) => {
        e.preventDefault()
        const name = vistaFormulario.querySelector('#name')
        const email = vistaFormulario.querySelector('#email')
        const paqueteSelecionado = vistaFormulario.querySelector('#paquete_selecionado').value

        name.parentNode.classList.remove('error')
        inputTlf.parentNode.classList.remove('error')
        email.parentNode.classList.remove('error')

        if (name.value == '') {
            name.parentNode.classList.add('error')
            return
        }

        if (email.value == '' && inputTlf.value == '') {
            vistaFormulario.querySelector('.formulario').classList.add('error')
            return
        } else {
            if (!iti.isValidNumber() && inputTlf.value != '') {
                inputTlf.parentNode.parentNode.classList.add('error')
                return
            }

            const regexEmail = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
            if (!regexEmail.test(email.value) && email.value != '') {
                email.parentNode.classList.add('error')
                return
            }
        }

        // ENVIAR DATA A API
        const data = {
            paquete: paqueteSelecionado,
            nombre: name.value.trim(),
            telefono: iti.getNumber(),
            correo: email.value.trim()
        }

        const message = `<b>Nuevos datos recibidos</b> \nPaquete: ${data.paquete} \nNombre: ${data.nombre} \nCorreo: ${data.correo} \nTelefono: ${data.telefono}`


        console.log(message)

        telegram.send(message).then((status)=> {
            console.log(status)
            if(status.ok){
                vistaFormulario.querySelector('.messaje_pos_send').classList.add('active')
        
                setTimeout(() => {
                    buttonCerrarFormulario.click()
                    vistaFormulario.querySelector('.messaje_pos_send').classList.remove('active')
                    inputTlf.value = ''
                    name.value = ''
                    email.value = ''
                }, 5000)
            }
        })


    })


    // LIBRERIA TELEFONO
    const resetInputTlf = () => {
        inputTlf.parentNode.parentNode.classList.remove('error')
    }

    inputTlf.addEventListener('blur', () => {
        resetInputTlf()
        if (inputTlf.value.trim()) {
            if (!iti.isValidNumber()) {
                inputTlf.parentNode.parentNode.classList.add('error')
            }
        }
    });

    inputTlf.addEventListener('change', resetInputTlf);
    inputTlf.addEventListener('keyup', resetInputTlf);

})