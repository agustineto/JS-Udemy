const contenido = document.querySelector('#contenido')

// FECHT 
const cargaBtn = document.querySelector('#cargarTxt');
cargaBtn.addEventListener('click', () => {
    const url = 'data/datos.txt';
    fetch(url)
        .then(respuesta => {
            console.log(respuesta)
            return respuesta.text()
        })
        .then( datos => {
            console.log(datos)
        })
        .catch( error => {
            console.log(error)
        }) 
})

// FECHT JSON
const cargaBtnJson = document.getElementById('cargarJSON')
cargaBtnJson.addEventListener('click', () => {
    const url = 'data/empleado.json'
    fetch(url)
        .then(respuesta => {
            console.log(respuesta)
            return respuesta.json()
        })
        .then(resultado => muestraJson(resultado))
        .catch(error => console.log(error))
})

function muestraJson({empresa,id, nombre, trabajo}){
    const divJson = document.createElement('div')
    divJson.innerHTML = `   <p>Empleado:${empresa}</p>
                            <p>Trabajo:${trabajo}</p>
                        `
    contenido.appendChild(divJson)
}


// FECHT JSON ARRAY 
const cargaBtnJsonArray = document.getElementById('cargarJSONArray')
cargaBtnJsonArray.addEventListener('click', () => {
    const url = 'data/empleados.json'
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado => muestraDatos(resultado))
        .catch( error => console.log(error)) 
})

function muestraDatos(empleadosArray){
    const divJsonArray = document.createElement('div')
    empleadosArray.forEach( empleadoArray => {
        const {id, nombre, empresa, trabajo} = empleadoArray
        divJsonArray.innerHTML += ` <p>ID:${id}</p>
                                    <p>Empleado:${empresa}</p>
                                    <p>Trabajo:${trabajo}</p>
                                    `
       
    });
    contenido.appendChild(divJsonArray)
}


const cargaBtnApi = document.querySelector('#cargarAPI')
cargaBtnApi.addEventListener('click', () => {
    const url = 'https://picsum.photos/list'

    fetch(url)  
        .then( respuesta => respuesta.json())
        .then( resultado => muestraAPI(resultado))
})

function muestraAPI(datos){
    const divJ = document.createElement('div')

    datos.forEach( perfil => {
        const {author, post_url} = perfil
        divJ.innerHTML += ` <p>ID:${author}</p>
                                    
                            `
       
    });
    contenido.appendChild(divJ)
}