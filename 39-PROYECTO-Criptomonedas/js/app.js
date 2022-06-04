const selectMoneda = document.querySelector("#moneda")
const selectCryptos = document.querySelector('#criptomonedas')

window.addEventListener('load', ()=> {
    console.log("cargo...")
    APIMonedas()
    consultarCryptomonedas()
})


function APIMonedas(){

    const url = "./js/moneda.json"
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
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
        .then(datos => )
}