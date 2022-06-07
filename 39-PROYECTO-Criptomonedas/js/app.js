const selectMoneda = document.querySelector("#moneda")
const selectCryptos = document.querySelector('#criptomonedas')
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

window.addEventListener('load', ()=> {
    APIMonedas()
    consultarCryptomonedas()
    selectCryptos.addEventListener('change', leerBusqueda)
    selectMoneda.addEventListener('change', leerBusqueda)
    formulario.addEventListener('submit', submitFormulario)
})

function leerBusqueda(e){
    objBusqueda[e.target.name] = e.target.value
    objBusqueda[e.target.name] = e.target.value
    
}

// CREAR UN PROMISE
const obtenerCryptos = cryptomonedas => new Promise ( resolve => {
    resolve(cryptomonedas)
})

async function APIMonedas(){

    const url = "./js/moneda.json"
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            datos.forEach( elementos => {
                const option = document.createElement('option')
                option.value = elementos.val
                option.textContent = elementos.moneda
                selectMoneda.appendChild(option)
            });
           
        })
    
}

function consultarCryptomonedas(){
    const url = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => obtenerCryptos(datos.Data) )
        .then( cryptomonedas => llenaSelectCryptos(cryptomonedas)) 
}

function llenaSelectCryptos(cryptomonedas){

    cryptomonedas.forEach( crypto => {
        const {FullName, Name } = crypto.CoinInfo;
        const option = document.createElement('option')
        option.value = Name
        option.textContent = FullName

        selectCryptos.appendChild(option)
    })
}

function submitFormulario(e){
    e.preventDefault();
    const {moneda, criptomoneda} = objBusqueda

    if(moneda === '' || criptomoneda === ''){
        mostrarMensaje("Los campos son necesarios", "error")
        return
    }

    consultaApi()
}

function consultaApi(){
    const {moneda, criptomoneda} = objBusqueda
    Spinner()
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado.DISPLAY)
            mostrarCotizacionHtml(resultado.DISPLAY[criptomoneda][moneda])
        })

}

function mostrarMensaje(msg, tipo){

    const divMensaje = document.createElement('div')
    const errores = document.querySelectorAll('.error')

    if(errores.length === 0){
        if(tipo === 'error'){
            divMensaje.classList.add('error')
            divMensaje.textContent = msg
            formulario.appendChild(divMensaje)
        }
        
    }

    setTimeout( ()=> {
        divMensaje.remove()
    },4000)

}

function mostrarCotizacionHtml(cotizacion){

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion
    limpiarHtml()
   
    setTimeout( () => {

        const price = document.createElement('p')
        price.innerHTML = `El precio es: <span>${PRICE}</span>`
        resultado.appendChild(price)
    
        const highday = document.createElement('p')
        highday.innerHTML = `<p>El precio más alto es: <span>${HIGHDAY}</span></p>`
        resultado.appendChild(highday)
    
        const lowday = document.createElement('p')
        lowday.innerHTML = `<p>El precio más alto es: <span>${LOWDAY}</span></p>`
        resultado.appendChild(lowday)
    
        const changeday = document.createElement('p')
        changeday.innerHTML = `<p>El precio más bajo es: <span>${CHANGEPCT24HOUR}</span></p>`
        resultado.appendChild(changeday)
    
        const lastupdate = document.createElement('p')
        lastupdate.innerHTML = `<p>Variación últimas horas: <span>${LASTUPDATE}%</span></p>`
        resultado.appendChild(lastupdate)
    }, 4000)
 

}


function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }   
}

function Spinner(){
    limpiarHtml()
    const divSpinner = document.createElement("div")
    divSpinner.classList.add('sk-cube-grid')
    divSpinner.innerHTML = `
                            <div class="sk-cube sk-cube1"></div>
                            <div class="sk-cube sk-cube2"></div>
                            <div class="sk-cube sk-cube3"></div>
                            <div class="sk-cube sk-cube4"></div>
                            <div class="sk-cube sk-cube5"></div>
                            <div class="sk-cube sk-cube6"></div>
                            <div class="sk-cube sk-cube7"></div>
                            <div class="sk-cube sk-cube8"></div>
                            <div class="sk-cube sk-cube9"></div>
                            `

    resultado.appendChild(divSpinner)
    setTimeout(() => {
        divSpinner.remove()
    },4000)
}