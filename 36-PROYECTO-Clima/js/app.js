const formulario = document.querySelector('#formulario')
const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')


window.addEventListener('load', () => {
    formulario.addEventListener('submit', cargarClima)

})

function cargarClima(e){
    e.preventDefault()
    console.log("Carga clima")
    const ciudad = document.getElementById('ciudad').value
    const pais = document.getElementById('pais').value

    if(ciudad.value === "" || pais.value === ''){
        mostrarMensaje("Los campos son necesarios", "error")
        return
    }else{

    }

    consultarAPI(ciudad, pais)
}

function mostrarMensaje(msg, tipo){

    const divMsg = document.createElement('div')
    const errores = document.querySelectorAll('.error')

    if(errores.length === 0 ){

        if(tipo === 'error' ){
            const divMsg = document.createElement('div')
            divMsg.classList.add('error','bg-red-100', 'border-red-400', 'text-red-700', 'p-4', 'm-4', 'rounded', 'text-center' )
            divMsg.innerHTML = `<strong>Error!</strong><span class="block">${msg}</span>`
            container.appendChild(divMsg)

            setTimeout( () => {
                divMsg.remove()
               },4000)
        }
    }
}

function consultarAPI(ciudad, pais){
    
    const apiId = '4c8ba920190bfff008c8ed1f04a8bc2e';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`
    spinner()
    setTimeout (() =>{
        fetch(url)
        .then( respuesta => respuesta.json())
        .then(  datos => {
            limpiarHtml()
            if(datos.cod === '404'){
                mostrarMensaje("Ciudad no econtrada", 'error')
                return 
            }else if(datos.cod  === ''){

            }

            muestraDatos(datos)
        })
    }, 4000)
   
}

function muestraDatos(datos){
    const { main:{temp, temp_max, temp_min}, name} = datos;

    const centigrados = kelvinaGrados(temp)
    const centigradosMax = kelvinaGrados(temp_max)
    const centigradosMin = kelvinaGrados(temp_min)

    const divCiudad = document.createElement('p')
    divCiudad.innerHTML = `El Clima en ${name} `
    divCiudad.classList.add('font-bold', 'text-2xl')

    const climaCentrgrados = document.createElement('p')
    climaCentrgrados.innerHTML = `${centigrados} &#8451`;
    climaCentrgrados.classList.add('font-bold', 'text-6xl')

    const parrafoMinima = document.createElement('p')
    parrafoMinima.classList.add('text-xl')
    parrafoMinima.innerHTML = `Min: ${centigradosMin}&#8451`

    const parrafoMax = document.createElement('p')
    parrafoMax.classList.add('text-xl')
    parrafoMax.innerHTML = `Max: ${centigradosMax}&#8451`

    const divClima = document.createElement('div');
    divClima.classList.add('text-center', 'text-white')
    divClima.appendChild(divCiudad)
    divClima.appendChild(climaCentrgrados)
    divClima.appendChild(parrafoMax)
    divClima.appendChild(parrafoMinima)

    resultado.appendChild(divClima)
}

const kelvinaGrados = grados => parseInt(grados - 273.15); 

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner(){

   limpiarHtml()
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-chase', 'grid', 'content-center')
    divSpinner.innerHTML = 
    `
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    `

    resultado.appendChild(divSpinner)

  
}