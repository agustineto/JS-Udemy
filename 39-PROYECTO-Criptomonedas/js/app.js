const selectMoneda = document.querySelector("#moneda")
const selectCryptos = document.querySelector('#criptomonedas')
const formulario = document.querySelector('#formulario')

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
    console.log(objBusqueda)

}

// CREAR UN PROMISE
const obtenerCryptos = cryptomonedas => new Promise ( resolve => {
    resolve(cryptomonedas)
})

function APIMonedas(){

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
}
