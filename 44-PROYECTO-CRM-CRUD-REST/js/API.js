const url = "http://localhost:4000/clientes";


export const nuevoCliente = async cliente => {
   
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.location.href="index.html"
        
    } catch (error) {
        console.log(error +  "Fallo al guardar clientes")
    }
};

export const obtenerClientes = async () => {
    try {
        const solicitud = await fetch(url)
        const resultado = await solicitud.json();
        return resultado
    } catch (error) {
        console.log(error + "fallo al obtener clientes")
    }
}

export const eliminarCliente = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method:'DELETE'
        })
        
    } catch (error) {
        console.log(error + "No se pudo eliminar el cliente")
    }
}

export const recuperaCliente = async id => {
    try {
        const solicitud = await fetch(`${url}/${id}`)
        const respuesta = await solicitud.json()
        return respuesta
    } catch (error) {
        console.log(error +"Hubo un error al obtener el cliente")
    }
}


export const editarDatosCliente = async cliente => {
    const {id, nombre, email, telefono, empresa} = cliente
    try {
        console.log(cliente)
        await fetch(`${url}/${cliente.id}`,{
            method:'PUT',
            body: JSON.stringify(cliente),
            headers:{
                'Content-Type': 'application/json'
            }
        });
       window.location.href = 'index.html'
    } catch (error) {
        console.log(error + "error al editar el cliente")
    }
}