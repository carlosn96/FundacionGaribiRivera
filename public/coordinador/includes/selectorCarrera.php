<div class="row g-3">
    <!-- Carrera -->
    <div class="col-12 col-md-4">
        <div class="card border-start border-primary">
            <div class="card-body">
                <div class="card-title fw-semibold mb-3">
                    Carrera
                </div>
                <select class="form-select" id="selectorCarrera" name="carrera" required onchange="recuperarPlanteles()">
                    <!-- Opciones de carrera se llenarán dinámicamente -->
                </select>
            </div>
        </div>
    </div>

    <!-- Plantel -->
    <div class="col-12 col-md-4">
        <div class="card border-start border-primary">
            <div class="card-body">
                <div class="card-title fw-semibold mb-3">
                    Plantel
                </div>
                <select class="form-select" id="selectorPlantel" name="plantel" required>
                    <!-- Opciones del plantel se llenarán dinámicamente -->
                </select>
            </div>
        </div>
    </div>

    <!-- Ciclo Escolar -->
    <div class="col-12 col-md-4">
        <div class="card border-start border-primary">
            <div class="card-body">
                <div class="card-title fw-semibold mb-3">
                    Ciclo escolar
                </div>
                <select class="form-select" id="selectorCicloEscolar" name="cicloEscolar" required>
                    <!-- Opciones del ciclo escolar se llenarán dinámicamente -->
                </select>
            </div>
        </div>
    </div>
</div>

<script>
    let carrerasPlantelesAPI = "../../includes/CarrerasPlantelesAPI.php";
    let plantelActual;
    function recuperarCarreras(fnChange) {
        crearPeticion(carrerasPlantelesAPI, {case: "recuperar_carreras_coordinador"}, function (res) {
            let selectorCarrera = $("#selectorCarrera");
            let lista = JSON.parse(res);
            let idPlantel;
            lista.carreras.forEach(function (carrera) {
                crearOpcionSelector(selectorCarrera, carrera.id_carrera, carrera.tipo + " " + carrera.nombre);
            });
            lista.ciclos_escolares.forEach(function (ciclo) {
                crearOpcionSelector($("#selectorCicloEscolar"), ciclo.id_ciclo_escolar, ciclo.ciclo_escolar);
            });
            if ((idPlantel = lista.carrera_plantel_actual.id_plantel_actual) === null) {
                selectorCarrera.first();
                $("#selectorCicloEscolar").first();
            } else {
                plantelActual = idPlantel;
                selectorCarrera.val(lista.carrera_plantel_actual.id_carrera_actual);
                $("#selectorCicloEscolar").val(lista.carrera_plantel_actual.id_ciclo_escolar_actual);
            }
            selectorCarrera.trigger("change");
            $("#selectorPlantel, #selectorCicloEscolar").change(() => {
                //print(data);
                const data = $.param({
                    id_carrera: selectorCarrera.val(),
                    id_plantel: $("#selectorPlantel").val(),
                    ciclo_escolar: $("#selectorCicloEscolar").val()
                });
                crearPeticion(carrerasPlantelesAPI, {case: "guardar_configuracion_plantel", data: data}, () => {
                });
                fnChange();
            });
        });
    }
    function recuperarPlanteles() {
        let data = {
            case: "recuperar_listado_planteles_por_carrera",
            data: "id_carrera=" + $("#selectorCarrera").val()
        };
        crearPeticion(carrerasPlantelesAPI, data, function (res) {
            //print(res);
            let planteles = JSON.parse(res);
            let selectorPlantel = $("#selectorPlantel");
            selectorPlantel.empty();
            planteles.forEach(function (plantel) {
                crearOpcionSelector(selectorPlantel, plantel.id_plantel, plantel.nombre);
            });
            if (plantelActual) {
                selectorPlantel.val(plantelActual);
            } else {
                selectorPlantel.first();
            }
            plantelActual = null;
            selectorPlantel.trigger("change");
        });
    }
</script>

