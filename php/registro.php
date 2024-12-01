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

// Preparar y ejecutar la consulta
$sql = "SELECT * FROM Usuario WHERE alias = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $alias);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el usuario
if ($result->num_rows > 0) {
    echo "El alias ya está en uso";
} else {
    // Obtener el resto de datos del formulario
    $password = $_POST['password'];
    $name = $_POST['name'];
    $apellidos = $_POST['apellidos'];
    $date = $_POST['date'];

    // Preparar la consulta de inserción
    $sq2 = "INSERT INTO `usuario` (`alias`, `password`, `nombre`, `apellidos`, `fecha_nacimiento`) VALUES (?, ?, ?, ?, ?);";
    $stmt2 = $conn->prepare($sq2);
    if($stmt2){
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt2->bind_param("sssss", $alias, $hashed_password, $name, $apellidos, $date);
        
        if($stmt2->execute()){
            echo "Registro exitoso";
        } else {
            echo "Fallo al introducir los datos en la base de datos";
        }

        $stmt2->close();
    }
    /*
    $result2 = $stmt2->get_result();
    if($result2 -> num_rows > 0) {
        echo "Registro exitoso";
    } else {
        echo "Fallo al introducir los datos en la base de datos";
    }*/
}

// Cerrar conexión
$stmt->close();
$conn->close();
?>