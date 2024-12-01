function Usuario() {
    var NombreUsuario = document.getElementById("alias").value;

    document.getElementById("User").innerHTML = NombreUsuario;
}

document.addEventListener("DOMContentLoaded", function () {

    // Seleccionar el formulario y el div donde se mostrará la respuesta
    const form = document.getElementById("Formulario");

    // Asegurarse de que el formulario exista
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevenir el envío normal del formulario

            const formData = new FormData(form);

            // Enviar los datos usando fetch sin recargar la página
            fetch("php/registro.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                // Mostrar el HTML de respuesta en el div sin recargar la página
                if(data == "El alias ya está en uso"){
                    mensajeValidacion.innerHTML = "<p>" + data + "</p>";
                    mensajeValidacion.style.display = "block";
                } else {
                    Usuario();
                    Validation.innerHTML = "<p>" + data + "</p>";
                    Validation.style.display = "block";
                }
            })
            .catch(error => {
                // Mostrar mensaje de error en caso de que falle
                mensajeValidacion.innerHTML = "<p>Error al enviar el formulario.</p>";
                console.error("Error:", error);
            });
        });
    } else {
        console.error("No se encontró el formulario.");
    }
});