(function(){
    document.addEventListener('DOMContentLoaded', () => {
        const parametersUrl = new URLSearchParams(window.location.search);
        const idCliente = parseInt(parametersUrl.get('id'));
    })
})();