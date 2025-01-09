<div class="d-flex border-bottom title-part-padding px-0 mb-4 align-items-center justify-content-between">
    <div class="flex-grow-1">
        <h4 class="mb-0 fs-4 text-success">Novedades</h4> <!-- Título mejorado con clase de color -->
    </div>
    <div class="ms-3">
        <a href="https://fundaciongaribirivera.com/eventos" target="_blank" class="btn btn-primary btn-sm">Ver todo</a> <!-- Botón de acción -->
    </div>
</div>

<div class="row justify-content-center gy-4 px-3" id="eventos-container">
</div>



<style>

    .card-img-top {
        width: 100%; /* Asegura que la imagen ocupe todo el ancho de la tarjeta */
        height: 200px; /* Altura fija para la imagen */
        object-fit: cover; /* Ajusta la imagen para cubrir el área sin distorsionar */
    }

    .card-body {
        height: calc(100% - 200px); /* Resta la altura de la imagen para que el contenido de la tarjeta ocupe el espacio restante */
        padding: 15px;
        overflow-y: auto; /* Si el contenido es demasiado largo, permite desplazamiento */
    }

</style>