/*  ------------------LOGIN-------------------  */

const CONTRASENIA_VALIDA = '12345';
const formulario = document.getElementById("formLogin");

/* Solo se ejecuta al estar en la página de Login */
if (formulario) {
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
        if (CONTRASENIA === CONTRASENIA_VALIDA) {
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

}

/* ------------------PRODUCTO------------------- */

function cambiarFavorito(event) {
    event.preventDefault(); /*Evita que la página intente navegar o recargarse*/
        
    const icono = document.getElementById("heart-icon");
        
    if (icono) {
        /*Toggle*/
        icono.classList.toggle("bi-suit-heart");
        icono.classList.toggle("bi-suit-heart-fill");
            
    }
}

/* A partir de acá los botones */

const btnAgregar = document.getElementById('btn-agregar');

if (btnAgregar) {
    const btnSumar = document.getElementById('btn-sumar');
    const btnRestar = document.getElementById('btn-restar');
    const cantidadTxt = document.getElementById('cantidad-producto');
    const precioTotalTxt = document.getElementById('precio-total');
    const iconoRestar = document.getElementById('icono-restar');
    const radiosTamanio = document.querySelectorAll('input[name="opcionTamanio"]');

    const precioBase = parseFloat(btnAgregar.getAttribute('data-precio-base'));
    let cantidad = 1;

    function formatearMoneda(valor) {
        return '$' + valor.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function actualizarInterfaz() {
        cantidadTxt.textContent = cantidad;
        const totalCalculado = precioBase * cantidad;
        precioTotalTxt.textContent = formatearMoneda(totalCalculado);

        if (cantidad === 1) {
            if (iconoRestar.tagName === "SPAN") {
                const nuevoIcono = document.createElement('i');
                nuevoIcono.id = "icono-restar";
                nuevoIcono.className = "bi bi-trash3-fill";
                iconoRestar.replaceWith(nuevoIcono);
            } else {
                iconoRestar.className = "bi bi-trash3-fill";
                iconoRestar.textContent = "";
            }
        } else {
            iconoRestar.className = "fs-4 fw-bold d-block";
            iconoRestar.textContent = "−";
            iconoRestar.style.lineHeight = "1";
        }
    }

    btnSumar.addEventListener('click', () => {
        if (cantidad < 3) {
            cantidad++;
            actualizarInterfaz();
        } else {
            alert("El límite máximo por producto es de 3 unidades.");
        }
    });

    btnRestar.addEventListener('click', () => {
        if (cantidad > 1) {
            cantidad--;
            actualizarInterfaz();
        } else {
            if (confirm("¿Deseas quitar este producto de la selección?")) {
                console.log("Producto removido");
            }
        }
    });


    btnAgregar.addEventListener('click', () => {
        /* Validación de Leches*/
        const radioLeche = document.querySelector('input[name="opcionLeche"]:checked');
        if (!radioLeche) {
            alert("Selecciona una opción de leche.");
            return;
        }

        /*Validación de Tamaños*/
        const radioTamanio = document.querySelector('input[name="opcionTamanio"]:checked');
        if (!radioTamanio) {
            alert("Selecciona un tamaño para tu bebida.");
            return;
        }


        /* Para que en Mobile NO ABRA el offcanvas y rediriga a otra sección exclusiva */
        const esMobile = window.innerWidth < 576;

        if (esMobile) {
            window.location.href = "carrito.html";
        } else {
            const selectorTarget = document.getElementById('carritoOverlay');
            if (selectorTarget) {
                const miCarritoOverlay = new bootstrap.Offcanvas(selectorTarget);
                miCarritoOverlay.show();
            }
        }
    });
}