/*Cambio de color al pulsar los navlinks del offcanvas*/
const enlacesMenu = document.querySelectorAll ('.enlace-menu');

enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', function(event) {
        event.preventDefault();
        enlacesMenu.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});