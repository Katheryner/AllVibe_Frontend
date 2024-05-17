function crearEvento() {
    alert("Función para crear un nuevo evento.");
    // Aquí se implementaría la lógica para crear un nuevo evento
}

function editarEvento(nombreEvento) {
    alert("Función para editar el evento: " + nombreEvento);
    // Aquí se implementaría la lógica para editar el evento
}

function eliminarEvento(nombreEvento) {
    if (confirm("¿Estás seguro de que deseas eliminar el evento: " + nombreEvento + "?")) {
        alert("Evento eliminado: " + nombreEvento);
        // Aquí se implementaría la lógica para eliminar el evento
    }
}