import * as UI from './interfaz.js'
import API from  './api.js'

UI.formularioBuscar.addEventListener('submit', buscarCancion)


function buscarCancion(e){
    e.preventDefault()
   
    const artista = document.getElementById('artista').value
    const cancion = document.getElementById('cancion').value

    if(artista === '' || cancion === ''){
        mostrarMensaje("Los campos son necesarios", "error")
        
        return
    }
    Spinner()
    const busqueda = new API(artista, cancion)
    busqueda.consultarApi()
}

export function mostrarMensaje(msg, tipo){

    const error = document.querySelectorAll('.error')

    if(error.length === 0){
        if(tipo === 'error'){
            UI.divMensaje.classList.add('error')
            UI.divMensaje.innerHTML = msg 
        }
    }

    setTimeout( () => {

        UI.divMensaje.innerHTML = ""
        UI.divMensaje.classList.remove("error")
    }, 4000)
}
   

function Spinner(){
    
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('spinner')
    divSpinner.innerHTML = `
                            <div class="rect1"></div>
                            <div class="rect2"></div>
                            <div class="rect3"></div>
                            <div class="rect4"></div>
                            <div class="rect5"></div>
                                `
                                UI.spinner.appendChild(divSpinner)
    setTimeout( () => {
        divSpinner.remove()
    },3000)
}