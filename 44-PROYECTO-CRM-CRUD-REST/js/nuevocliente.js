import {mostarAlerta} from './funciones.js'

(function(){
    const formulario = document.querySelector('#formulario')
    formulario.addEventListener('submit', validarCliente)
    
    function validarCliente(e){
        e.preventDefault()
        const nombre = document.getElementById('nombre')
        const email = document.getElementById('email')
        const telefono = document.getElementById('telefono')
        const empresa = document.getElementById('empresa')
    
        const objValidation = {
            nombre,
            email,
            telefono,
            empresa
        }
    
        if(!validaCampos(objValidation)){
            mostarAlerta("Los campos son necesario", "error")
            return
        }
        console.log('Validacion correcta')
    }
    function validaCampos(obj){
        return Object.values(obj).every(input => input === '')
    }
})();


