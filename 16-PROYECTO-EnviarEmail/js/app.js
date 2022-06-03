const btnEnviar = document.querySelector("#enviar")
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje")
const formulario = document.querySelector('#enviar-mail')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 

cargaEventos()
function cargaEventos(){
    document.addEventListener('DOMContentLoaded', cargaHtml)
    email.addEventListener('blur', validaFormulario)
    asunto.addEventListener('blur', validaFormulario)
    mensaje.addEventListener('blur', validaFormulario)
}

function cargaHtml(){
    console.log("cargo el hmtl")
    btnEnviar.disables = true
    btnEnviar.classList.add('cursor-not-allowed','opacity-50')
}

function validaFormulario(e){
   
    if(e.target.value.length > 0){
        const errores = document.querySelector('.errores')
        if(errores){
            errores.remove()
        }
        
        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    }else{
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')
        mostrarError("Todos los campos son necesarios")
    }


    if(e.target.type === 'email'){
        if(er.test(e.target.value)){
            const errores = document.querySelector('.errores')
            if(errores.length > 0){
                errores.remove()
            }
            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        }else{
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError("Email invalido")
        }
    }
    
    //activa boton de enviar
    if(er.test(email.value) && asunto.value !== ''  && mensaje.value !== ''){
        btnEnviar.disables = false
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50')
    }

}

function mostrarError(msj){
    const mensaje = document.createElement('p');
    mensaje.textContent = msj;
    mensaje.classList.add('border', 'border-red-500', 'p-3', 'text-center', 'mt-5', 'text-red-500', 'errores');

    const errores = document.querySelectorAll('.errores')
    if(errores.length === 0){
        formulario.appendChild(mensaje);
    }
    
}