<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Seguimiento de Graduados</title>
    <style>
        @page {
            margin: 1.5cm 1.5cm;
            size: A4;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 10px;
            line-height: 1.3;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 12px;
            border-bottom: 3px solid #183f37;
            padding-bottom: 8px;
        }
        .header h1 {
            color: #183f37;
            font-size: 20px;
            margin-bottom: 2px;
            font-weight: bold;
        }
        .header .subtitle {
            color: #7f8c8d;
            font-size: 10px;
            font-style: italic;
        }
        .emprendedor-info {
            background-color: #ecf0f1;
            padding: 10px;
            margin-bottom: 10px;
            border-left: 4px solid #183f37;
        }
        .emprendedor-info h2 {
            color: #183f37;
            font-size: 13px;
            margin-bottom: 6px;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 3px;
        }
        .photo-container {
            float: right;
            margin-left: 10px;
            margin-bottom: 8px;
        }
        .photo-container img {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 3px solid #183f37;
            object-fit: cover;
        }
        .info-row {
            margin-bottom: 4px;
            clear: left;
        }
        .info-label {
            font-weight: bold;
            color: #183f37;
            font-size: 9px;
        }
        .info-value {
            color: #34495e;
            font-size: 9px;
            margin-left: 5px;
        }
        .section {
            margin-bottom: 10px;
            border: 1px solid #bdc3c7;
            page-break-inside: avoid;
        }
        .section-title {
            background: #183f37;
            color: white;
            padding: 6px 10px;
            font-size: 12px;
            font-weight: bold;
        }
        .section-content {
            padding: 8px 10px;
        }
        .field-row {
            margin-bottom: 5px;
        }
        .field-label {
            font-weight: bold;
            color: #183f37;
            font-size: 9px;
            display: block;
            margin-bottom: 2px;
        }
        .field-value {
            color: #34495e;
            font-size: 9px;
            margin-left: 8px;
        }
        .practices-title {
            font-weight: bold;
            color: #183f37;
            margin-bottom: 5px;
            font-size: 10px;
        }
        .practices-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 5px;
        }
        .practices-table td {
            width: 50%;
            padding: 2px 4px 2px 0;
            vertical-align: middle;
        }
        .practices-table td:nth-child(2) {
            padding-left: 8px;
            padding-right: 0;
        }
        .practice-label {
            color: #34495e;
            font-size: 9px;
        }
        .badge {
            display: inline-block;
            padding: 2px 7px;
            border-radius: 8px;
            font-size: 8px;
            font-weight: bold;
            color: white;
            margin-left: 5px;
        }
        .badge-yes {
            background-color: #27ae60;
        }
        .badge-no {
            background-color: #e74c3c;
        }
        .list-container {
            margin: 3px 0 0 12px;
        }
        .list-item {
            position: relative;
            padding-left: 10px;
            margin-bottom: 2px;
            font-size: 9px;
            color: #34495e;
        }
        .list-item:before {
            content: "•";
            color: #183f37;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        .financial-box {
            background-color: #e8f5e8;
            padding: 8px;
            margin: 3px 0;
        }
        .financial-row {
            margin-bottom: 4px;
        }
        .financial-row:last-child {
            margin-bottom: 0;
        }
        .amount {
            font-weight: bold;
            color: #27ae60;
            font-size: 10px;
            margin-left: 5px;
        }
        .no-data {
            font-style: italic;
            color: #95a5a6;
            margin-left: 12px;
            font-size: 8px;
        }
        .footer {
            margin-top: 12px;
            text-align: center;
            font-size: 8px;
            color: #7f8c8d;
            border-top: 1px solid #bdc3c7;
            padding-top: 6px;
        }
        .clearfix:after {
            content: "";
            display: table;
            clear: both;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Seguimiento de Graduados</h1>
        <div class="subtitle">Evaluación de progreso empresarial</div>
    </div>

    <div class="emprendedor-info clearfix">
        <h2>Información del Emprendedor</h2>
        <?php if (!empty($emprendedor['fotografia'])): ?>
        <div class="photo-container">
            <img src="data:image/jpeg;base64,<?php echo $emprendedor['fotografia']; ?>" alt="Foto">
        </div>
        <?php endif; ?>
        
        <div class="info-row">
            <span class="info-label">Nombre completo:</span>
            <span class="info-value"><?php echo htmlspecialchars($emprendedor['nombre'] . ' ' . $emprendedor['apellidos']); ?></span>
        </div>
        <div class="info-row">
            <span class="info-label">Correo electrónico:</span>
            <span class="info-value"><?php echo htmlspecialchars($emprendedor['correo_electronico']); ?></span>
        </div>
        <div class="info-row">
            <span class="info-label">Número celular:</span>
            <span class="info-value"><?php echo htmlspecialchars($emprendedor['numero_celular']); ?></span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Datos Generales del Seguimiento</div>
        <div class="section-content">
            <span class="info-label">Fecha de Creación:</span>
            <span class="info-value"><?php echo htmlspecialchars($seguimiento['fechaCreacion']); ?></span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Análisis del Estado del Negocio</div>
        <div class="section-content">
            <div class="practices-title">Prácticas administrativas:</div>
            
            <table class="practices-table">
                <tr>
                    <td>
                        <span class="practice-label">Registra entrada/salida:</span>
                        <span class="badge badge-<?php echo strtolower($seguimiento['analisisNegocio']['registraEntradaSalida']['res']) == 'sí' ? 'yes' : 'no'; ?>">
                            <?php echo htmlspecialchars($seguimiento['analisisNegocio']['registraEntradaSalida']['res']); ?>
                        </span>
                    </td>
                    <td>
                        <span class="practice-label">Separa gastos:</span>
                        <span class="badge badge-<?php echo strtolower($seguimiento['analisisNegocio']['separaGastos']['res']) == 'sí' ? 'yes' : 'no'; ?>">
                            <?php echo htmlspecialchars($seguimiento['analisisNegocio']['separaGastos']['res']); ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="practice-label">Conoce utilidades:</span>
                        <span class="badge badge-<?php echo strtolower($seguimiento['analisisNegocio']['conoceUtilidades']['res']) == 'sí' ? 'yes' : 'no'; ?>">
                            <?php echo htmlspecialchars($seguimiento['analisisNegocio']['conoceUtilidades']['res']); ?>
                        </span>
                    </td>
                    <td>
                        <span class="practice-label">Elabora presupuesto:</span>
                        <span class="badge badge-<?php echo strtolower($seguimiento['analisisNegocio']['elaboraPresupuesto']['res']) == 'sí' ? 'yes' : 'no'; ?>">
                            <?php echo htmlspecialchars($seguimiento['analisisNegocio']['elaboraPresupuesto']['res']); ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="practice-label">Identifica competencia:</span>
                        <span class="badge badge-<?php echo strtolower($seguimiento['analisisNegocio']['competencia']['identifica']['res']) == 'sí' ? 'yes' : 'no'; ?>">
                            <?php echo htmlspecialchars($seguimiento['analisisNegocio']['competencia']['identifica']['res']); ?>
                        </span>
                    </td>
                    <td>
                        <span class="practice-label">Asigna ahorro:</span>
                        <span class="badge badge-<?php echo strtolower($seguimiento['analisisNegocio']['ahorro']['asigna']['res']) == 'sí' ? 'yes' : 'no'; ?>">
                            <?php echo htmlspecialchars($seguimiento['analisisNegocio']['ahorro']['asigna']['res']); ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <span class="practice-label">Conoce punto de equilibrio:</span>
                        <span class="badge badge-<?php echo strtolower($seguimiento['analisisNegocio']['conocePuntoEquilibrio']['res']) == 'sí' ? 'yes' : 'no'; ?>">
                            <?php echo htmlspecialchars($seguimiento['analisisNegocio']['conocePuntoEquilibrio']['res']); ?>
                        </span>
                    </td>
                </tr>
            </table>

            <?php if (strtolower($seguimiento['analisisNegocio']['competencia']['identifica']['res']) == 'sí'): ?>
            <div class="field-row">
                <span class="field-label">Competencia identificada:</span>
                <span class="field-value"><?php echo htmlspecialchars($seguimiento['analisisNegocio']['competencia']['quien']); ?></span>
            </div>
            <?php endif; ?>

            <?php if (strtolower($seguimiento['analisisNegocio']['ahorro']['asigna']['res']) == 'sí'): ?>
            <div class="field-row">
                <span class="field-label">Monto de ahorro mensual para mantenimiento:</span>
                <span class="amount">$<?php echo number_format($seguimiento['analisisNegocio']['ahorro']['detalles'], 2); ?></span>
            </div>
            <?php else: ?>
            <div class="field-row">
                <span class="field-label">Razón por la que no ahorra:</span>
                <span class="field-value"><?php echo htmlspecialchars($seguimiento['analisisNegocio']['ahorro']['detalles']); ?></span>
            </div>
            <?php endif; ?>

            <div class="field-row">
                <?php if (strtolower($seguimiento['analisisNegocio']['conoceProductosMayorUtilidad']['conoce']['res']) == 'sí'): ?>
                    <span class="field-label">Porcentaje de ganancias de productos con mayor utilidad:</span>
                    <span class="field-value"><?php echo htmlspecialchars($seguimiento['analisisNegocio']['conoceProductosMayorUtilidad']['porcentaje']); ?>%</span>
                <?php else: ?>
                    <span class="field-label">Productos de mayor utilidad:</span>
                    <span class="field-value"><?php echo htmlspecialchars($seguimiento['analisisNegocio']['conoceProductosMayorUtilidad']['porcentaje']); ?></span>
                <?php endif; ?>
            </div>

            <div class="field-row">
                <span class="field-label">Empleo de ganancias:</span>
                <?php if (!empty($seguimiento['analisisNegocio']['listaEmpleoGanancias'])): ?>
                <div class="list-container">
                    <?php foreach ($seguimiento['analisisNegocio']['listaEmpleoGanancias'] as $empleo): ?>
                    <div class="list-item"><?php echo htmlspecialchars($empleo->descripcion); ?></div>
                    <?php endforeach; ?>
                </div>
                <?php else: ?>
                <div class="no-data">No se especificó el empleo de ganancias</div>
                <?php endif; ?>
            </div>

            <div class="field-row">
                <span class="field-label">Estrategias de ventas:</span>
                <?php if (!empty($seguimiento['analisisNegocio']['listaEstrategiaVentas'])): ?>
                <div class="list-container">
                    <?php foreach ($seguimiento['analisisNegocio']['listaEstrategiaVentas'] as $estrategia): ?>
                    <div class="list-item"><?php echo htmlspecialchars($estrategia['descripcion']); ?></div>
                    <?php endforeach; ?>
                </div>
                <?php else: ?>
                <div class="no-data">No se especificaron estrategias de ventas</div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Administración de Ingresos</div>
        <div class="section-content">
            <div class="financial-box">
                <div class="financial-row">
                    <span class="field-label">Sueldo mensual asignado:</span>
                    <span class="amount">$<?php echo number_format($seguimiento['administracionIngresos']['sueldoMensual'], 2); ?></span>
                </div>
                <div class="financial-row">
                    <span class="field-label">Utilidades mensuales:</span>
                    <span class="amount">$<?php echo number_format($seguimiento['administracionIngresos']['montoMensualUtilidades'], 2); ?></span>
                </div>
                <div class="financial-row">
                    <span class="field-label">Monto de ahorro mensual:</span>
                    <span class="amount">$<?php echo number_format($seguimiento['administracionIngresos']['montoAhorroMensual'], 2); ?></span>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>Documento generado el <?php echo date('d/m/Y H:i:s'); ?> por Fundación Garibi Rivera.</p>
    </div>
</body>
</html>