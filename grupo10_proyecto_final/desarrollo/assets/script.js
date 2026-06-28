const CONTRASENIA = '12345';
const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", (e) => {
    let formularioValido = true;

    const inputEmail = document.getElementById("email");
    const inputPasswordElement = document.getElementById("password"); 
    const CONTRASENIA = inputPasswordElement.value.trim(); 

    /* Validación del Email */
    if (inputEmail.value.trim() === "" || !inputEmail.value.includes("@")) {
        inputEmail.classList.add("is-invalid");
        inputEmail.classList.remove("is-valid");
        formularioValido = false;
    } else {
        inputEmail.classList.remove("is-invalid");
        inputEmail.classList.add("is-valid");
    }

    /* Validación de la Contraseña */
    if (CONTRASENIA === CONTRASENIA) {
        inputPasswordElement.classList.remove("is-invalid");
        inputPasswordElement.classList.add("is-valid");
    } else {
        inputPasswordElement.classList.add("is-invalid");
        inputPasswordElement.classList.remove("is-valid");
        formularioValido = false;
    }

    /* Redirección a la home*/
    if (!formularioValido) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault(); /*Frena el envío automático*/
        
        /*Se saca el d-none*/
        const alerta = document.getElementById("avisoExito");
        alerta.classList.remove("d-none");
        

        /*Espera 2000 milisegundos (2 segundos)*/
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);
    }
});
