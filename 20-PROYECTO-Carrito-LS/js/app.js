const listaCursos = document.querySelector('#lista-cursos')
const listaCarrito = document.querySelector('#lista-carrito tbody')
const carrito = document.querySelector('#carrito')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
let cursos = []

window.onload = () => {
    listaCursos.addEventListener('click', añadeCurso) 
    carrito.addEventListener('click', eliminaCurso)
    vaciarCarrito.addEventListener('click', () => {
        cursos = []
        mostrarCurso();
    })
}

function añadeCurso(e){
    e.preventDefault();
    const Validacioncurso = e.target.classList.contains('agregar-carrito')
    if(Validacioncurso){
        const curso = e.target.parentElement.parentElement
        agregarCurso(curso)
    }
}

const agregarCurso = curso => {

    const objCurso = {
        img: curso.querySelector('.imagen-curso').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        cantidad: 1,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    const valida = cursos.some( e => e.id === objCurso.id)
    if(valida){
        const newCurso = cursos.map( elemento => {
            if(elemento.id === objCurso.id){
                elemento.cantidad++;
                return elemento
            }
            return elemento
        })
        cursos = [...newCurso]
    }else{
        cursos.unshift(objCurso)
    }
    mostrarCurso()
}

const mostrarCurso = () => {
    limpiarHtml()

    cursos.forEach( curso => {
        const {id, img, nombre, precio, cantidad} = curso
        const row = document.createElement('tr')
        row.innerHTML = 
                        `<td><img src="${img}"></img></td>
                         <td>${nombre}</td>
                         <td>${precio}</td>
                         <td>${cantidad}</td>
                         <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
                        `
        listaCarrito.appendChild(row)                
    })


}

const eliminaCurso = (e) =>{
    e.preventDefault();
    const id = e.target.getAttribute('data-id')
    console.log(id)
    if(e.target.classList.contains('borrar-curso')){
        cursos = cursos.filter( curso => curso.id !== id )
        mostrarCurso()
    }
}

const limpiarHtml = () => {
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}