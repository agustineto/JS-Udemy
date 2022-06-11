import { recuperaCliente, editarDatosCliente } from "./API.js";
import {mostarAlerta, validaCampos} from './funciones.js'

(function(){

    const nombreInput = document.querySelector('#nombre')
    const telefonoInput = document.querySelector('#telefono')
    const empresaInput = document.querySelector('#empresa')
    const emailInput = document.querySelector('#email')
    const idInput = document.querySelector('#id')
   

    document.addEventListener('DOMContentLoaded', async () => {
        const parametersUrl = new URLSearchParams(window.location.search);
        const idCliente = parseInt(parametersUrl.get('id'));
        const cliente = await recuperaCliente(idCliente)
        mostrarCliente(cliente)
        const formulario = document.querySelector('#formulario')
        formulario.addEventListener('submit', validarClienteUpdate)
    })

    function mostrarCliente(cliente){
        const {id, nombre, telefono, empresa, email} = cliente
        
        nombreInput.value = nombre;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
        emailInput.value = email;
        idInput.value = id;

        console.log(cliente)
    }

    function validarClienteUpdate(e){
        e.preventDefault();

        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }
    
        if(validaCampos(cliente)){
            mostarAlerta("Los campos son necesario", "error")
            return
        }

     editarDatosCliente(cliente)

    }
})();