document.addEventListener("DOMContentLoaded", function () {

    // Función para verificar si el usuario está logueado
    function verificarSesion() {
        fetch("php/login.php")
            .then(response => response.json())
            .then(data => {
                if (data.logged_in) {
                    // Si la sesión está activa, mostrar el mensaje de bienvenida
                    mostrarMensajeBienvenida(data.alias);
                } else {
                    // Si no está logueado, mostrar el formulario de login
                    mostrarFormularioLogin();
                }
            })
            .catch(error => {
                console.error("Error al verificar la sesión:", error);
            });
    }

    // Función para mostrar el mensaje de bienvenida
    function mostrarMensajeBienvenida(alias) {
        const userDiv = document.getElementById("User");
        userDiv.innerHTML = "Bienvenido, " + alias;
        // Aquí puedes agregar el redireccionamiento si lo deseas
        // window.location.href = "pagina_principal.html"; // Descomenta para redirigir
    }

    // Función para mostrar el formulario de login
    function mostrarFormularioLogin() {
        const form = document.getElementById("Formulario");
        if (form) {
            form.style.display = "block"; // Asegúrate de que el formulario sea visible
        }
    }

    // Llamar a la función para verificar la sesión al cargar la página
    verificarSesion();

    // Seleccionar el formulario y el div donde se mostrará la respuesta
    const form = document.getElementById("Formulario");

    // Asegurarse de que el formulario exista
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevenir el envío normal del formulario

            const formData = new FormData(form);

            // Enviar los datos usando fetch sin recargar la página
            fetch("php/login.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.logged_in) {
                    // Si el login es exitoso, mostrar el mensaje de bienvenida
                    mostrarMensajeBienvenida(data.alias);
                } else {
                    const mensajeValidacion = document.getElementById("mensajeValidacion");
                    mensajeValidacion.innerHTML = "<p>" + data.message + "</p>";
                    mensajeValidacion.style.display = "block";
                }
            })
            .catch(error => {
                const mensajeValidacion = document.getElementById("mensajeValidacion");
                mensajeValidacion.innerHTML = "<p>Error al enviar el formulario.</p>";
                console.error("Error:", error);
            });
        });
    } else {
        console.error("No se encontró el formulario.");
    }
});