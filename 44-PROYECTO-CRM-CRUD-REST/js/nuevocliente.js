import {mostarAlerta, validaCampos} from './funciones.js'
import {nuevoCliente} from './API.js'

(function(){
    const formulario = document.querySelector('#formulario')
    formulario.addEventListener('submit', validarCliente)
    
    function validarCliente(e){
        e.preventDefault()
        const nombre = document.getElementById('nombre').value
        const email = document.getElementById('email').value
        const telefono = document.getElementById('telefono').value
        const empresa = document.getElementById('empresa').value
    
        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }
    
        if(validaCampos(cliente)){
            mostarAlerta("Los campos son necesario", "error")
            return
        }
        console.log('Validacion correcta')
        nuevoCliente(cliente)
    }
  
})();


