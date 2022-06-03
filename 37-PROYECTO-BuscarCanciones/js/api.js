import * as UI from './interfaz.js'
import {mostrarMensaje} from './app.js'

class API {
    constructor(artista, cancion){
        this.artista = artista;
        this.cancion = cancion;
    }

    consultarApi(){

        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => {
                if(datos.lyrics){
                    const { lyrics } = datos
                    UI.divResultado.innerHTML = lyrics;
                    UI.headResultado.textContent = `La letra de la canción: ${this.cancion} de ${this.artista}`
                }else{
                    mostrarMensaje("La cancion no existe", 'error')
                }

              
               
            })
            .catch(error => console.log(error))
    }
}

export default API;