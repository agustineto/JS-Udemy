window.addEventListener('online', verificar)
window.addEventListener('offline', verificar)

const abrirBtn = document.getElementById("abrir-pantalla-completa")
const salirBtn = document.getElementById('salir-pantalla-completa')

verificar()
function verificar(){
    if(navigator.onLine){
        console.log("hay conexion a internet")
    }

    if(navigator.offLine){
        console.log("No hay conexion a internet")
    }

    abrirBtn.addEventListener("click", abrirPantalla)
    salirBtn.addEventListener("click", salirPantalla)
}


function abrirPantalla(){
    document.documentElement.requestFullscreen();
}

function salirPantalla(){
    document.exitFullscreen();
}