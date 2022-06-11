export function mostarAlerta(msg, type){
    const formulario = document.querySelector('#formulario')
    const alerta = document.querySelector('.alert')
    if(!alerta){
        if(type === 'error'){
            const newAlerta = document.createElement('p')
            newAlerta.classList.add('alert', 'bg-red-100', 'border-red-400', 
                                'text-red-700', 'px-4', 'rounded', 'text-center',
                                'max-w-lg', 'mx-auto', 'mt-6')
            newAlerta.innerHTML = `<strong>Error!</strong><span class="block sm:inline">${msg}</span>`

            formulario.appendChild(newAlerta)
            setTimeout(()=> {
                newAlerta.remove()
            },4000)
        }  
    }   
}

export function validaCampos(obj){

    return !Object.values(obj).every(input => input !== '')
}