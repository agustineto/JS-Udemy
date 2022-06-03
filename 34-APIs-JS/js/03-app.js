const notificationBtn = document.querySelector('#notificar')
const verNotificationBtn = document.querySelector('#verNotificacion')

notificationBtn.addEventListener('click', () => { 
    console.log("notification API")
    Notification
    .requestPermission()
    .then( callback => {
        console.log("El resultado es: ", callback)
    })

})

verNotificationBtn.addEventListener('click', () => {
    if(Notification.permission === 'granted'){
        const notify = new Notification("Esta es la notificacion",{
            icon: 'img/ccj.png',
            body: 'Programacion Javascript'
        });

        notify.onclick = () => {
            window.open('https://www.youtube.com/watch?v=wTpuKOhGfJE&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7.com')
        }

    }
})