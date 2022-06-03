const cursos = document.querySelector("#lista-cursos")
const carrito = document.querySelector('#lista-carrito')
const containerCarrito = document.querySelector("#carrito")
const vaciarCarrito = document.querySelector('#vaciar-carrito')

let arregloCursos = []

cargaEventos()
function cargaEventos(){
    cursos.addEventListener('click', agregarCurso)
    containerCarrito.addEventListener('click', eliminarCurso)
    vaciarCarrito.addEventListener('click', () => {
       arregloCursos = []
        limpiarHtml()
    })

}

function agregarCurso(e){
    e.preventDefault()
   
    if(e.target.classList.contains("agregar-carrito")){
      
        const curso = e.target.parentElement.parentElement
        leerDatos(curso)
    }
}

function leerDatos(curso){


 
    const objCurso = {
        img: curso.querySelector("img").src,
        nombre: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute('data-id'),
        cantidad: 1
        
    }
    const verifica = arregloCursos.some( data => data.id === objCurso.id)

    if(verifica){
     
       const nuevoArreglo = arregloCursos.map(data => {
          if(data.id === objCurso.id){
            data.cantidad++
            return data
          }else{
            return data
          }

       })

       arregloCursos = [...nuevoArreglo]
    }else{
        arregloCursos = [...arregloCursos, objCurso]
    }

    
    mostrarCursoHtml()
}


function mostrarCursoHtml(){

    limpiarHtml()
    arregloCursos.forEach( curso => {
        const rowDiv = document.createElement("tr")
        rowDiv.innerHTML = `
                            <td><img src="${curso.img}"/></td>
                            <td>${curso.nombre}</td>
                            <td>${curso.precio}</td>
                            <td>${curso.cantidad}</td>
                            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
                            `

        carrito.appendChild(rowDiv)                    
    })

}

function limpiarHtml(){
    while(carrito.firstElementChild){
        carrito.removeChild(carrito.firstChild)
    }
}

function eliminarCurso(e){
  
    if(e.target.classList.contains('borrar-curso')){
        const identificador = e.target.getAttribute('data-id')
        arregloCursos =  arregloCursos.filter( curso => curso.id !== identificador) 
        
    }
    mostrarCursoHtml()
}