<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Usuarios";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$alias = $_POST['alias'];
$password = $_POST['password'];

// Preparar y ejecutar la consulta
$sql = "SELECT password FROM Usuario WHERE alias = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $alias);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el usuario
if($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashed_password_en_db = $row['password'];

    if (password_verify($password, $hashed_password_en_db)) {
        echo "Inicio de sesión exitoso";
    } else {
        echo "Usuario o contraseña incorrectos";
    }

} else {
    echo "Usuario o contraseña incorrectos";
}

// Cerrar conexión
$stmt->close();
$conn->close();
?>
