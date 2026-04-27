<!-- TOOLBAR (sin impresión) -->
<div class="no-print pagare-toolbar">
    <button class="btn-tool btn-tool--back" id="btn-volver-p">
        <i class="fas fa-arrow-left"></i> Volver al Expediente
    </button>
    <button class="btn-tool btn-tool--print" id="btn-imprimir-p">
        <i class="fas fa-print"></i> Imprimir / Guardar PDF
    </button>
</div>

<!-- =========================================
     PAGARÉ — FRENTE
     ========================================= -->
<div class="print-wrapper">
    <div class="pagare-doc" id="pagare-canvas">

        <!-- HEADER INSTITUCIONAL -->
        <div class="doc-header">
            <div class="doc-header__brand">
                <img src="../../../assets/images/logos/logo-fgr.png" alt="Fundación Garibi Rivera" class="doc-logo" onerror="this.style.display='none'">
                <div class="doc-header__titles">
                    <div class="doc-header__name">FUNDACIÓN CARDENAL GARIBI RIVERA, A.C.</div>
                    <div class="doc-header__sub">Crédito y Cobranza</div>
                </div>
            </div>
            <div class="doc-header__doctype">
                <div class="doc-header__doctype-label">PAGARÉ</div>
            </div>
        </div>

        <!-- FRANJA DE COLOR + DATOS PRINCIPALES -->
        <div class="doc-meta-bar">
            <div class="doc-meta-cell">
                <span class="doc-meta-label">N° Expediente</span>
                <span class="doc-meta-value" id="pagare-expediente">—</span>
            </div>
            <div class="doc-meta-sep"></div>
            <div class="doc-meta-cell">
                <span class="doc-meta-label">Fecha de Vencimiento</span>
                <span class="doc-meta-value" id="pagare-vencimiento">—</span>
            </div>
            <div class="doc-meta-sep"></div>
            <div class="doc-meta-cell doc-meta-cell--highlight">
                <span class="doc-meta-label">Importe</span>
                <span class="doc-meta-value doc-meta-value--big" id="pagare-importe">$0.00</span>
            </div>
        </div>

        <!-- CUERPO LEGAL -->
        <div class="doc-body">

            <p class="doc-text">
                Por el presente pagaré reconozco deber y me obligo a pagar en esta ciudad o en cualquier otra
                el pago a la <span class="doc-emphasis">FUNDACIÓN CARDENAL GARIBI RIVERA, A.C.</span> o a su
                orden el día de su vencimiento, la cantidad de: <strong id="pagare-monto-num">$0.00</strong>
            </p>

            <div class="doc-amount-words" id="pagare-monto-letras">
                ( &nbsp;—&nbsp; )
            </div>

            <div class="doc-clauses">
                <p>Valor recibido en <u id="pagare-forma-pago">efectivo</u>, a mi entera satisfacción.</p>
                <p>La cantidad que ampara este pagaré es parte de cantidad mayor, por la cual se otorgan otros
                pagarés con vencimientos posteriores y queda expresamente convenido que si no es pagado este
                documento precisamente a su vencimiento, se darán por vencidos anticipadamente los demás
                pagarés a que se refiere esta cláusula.</p>
                <p>Este pagaré es mercantil y está regido por la Ley General de Títulos y Operaciones de
                Crédito en su artículo 173 parte final y artículos correlativos, por no ser pagaré domiciliado.</p>
                <p>De no verificarse el pago de la cantidad que este pagaré expresa el día de su vencimiento,
                abonaré el rédito de <strong id="pagare-interes">—</strong>% por ciento mensual por todo tiempo
                que esté insoluto, sin perjuicio al cobro más los gastos que por ello se originen.</p>
            </div>

            <!-- OTORGANTE -->
            <div class="doc-footer-info">
                <div class="doc-issuer-box">
                    <div class="doc-issuer-row">
                        <span class="doc-issuer-label">Otorgante:</span>
                        <span class="doc-issuer-value" id="pagare-otorgante">— —</span>
                    </div>
                    <div class="doc-issuer-row">
                        <span class="doc-issuer-label">Domicilio:</span>
                        <span class="doc-issuer-value" id="pagare-domicilio">— —</span>
                    </div>
                    <div class="doc-issuer-row">
                        <span class="doc-issuer-label">Colonia:</span>
                        <span class="doc-issuer-value" id="pagare-colonia">— —</span>
                    </div>
                    <div class="doc-issuer-row">
                        <span class="doc-issuer-label">Teléfono:</span>
                        <span class="doc-issuer-value" id="pagare-tel">— —</span>
                    </div>
                    <div class="doc-issuer-row">
                        <span class="doc-issuer-label">Localidad:</span>
                        <span class="doc-issuer-value" id="pagare-localidad">— —</span>
                    </div>
                </div>
            </div>

            <!-- LUGAR / FECHA + FIRMA -->
            <div class="doc-signature-area">
                <div class="doc-signature-slot">
                    <div class="doc-place-date">
                        <div class="doc-place" id="pagare-lugar-fecha">TLAQUEPAQUE, JALISCO</div>
                        <div class="doc-date" id="pagare-fecha-otorgamiento">A — DE — DEL —</div>
                    </div>
                    <div class="doc-signature-line mt-4"></div>
                    <div class="doc-signature-label">FIRMA DEL OTORGANTE</div>
                </div>
            </div>

        </div><!-- /.doc-body -->

        <!-- PIE DE PÁGINA DEL DOCUMENTO -->
        <div class="doc-footer-bar">
            Fundación Cardenal Garibi Rivera, Fundación
        </div>

    </div><!-- /.pagare-doc -->
</div><!-- /.print-wrapper -->


<!-- =========================================
     PAGARÉ — REVERSO (AVAL)
     ========================================= -->
<div class="print-wrapper page-break-before" id="pagare-back">
    <div class="pagare-doc pagare-doc--back">

        <div class="doc-header">
            <div class="doc-header__brand">
                <img src="../../../assets/images/logos/logo-fgr.png" alt="Fundación Garibi Rivera" class="doc-logo" onerror="this.style.display='none'">
                <div class="doc-header__titles">
                    <div class="doc-header__name">FUNDACIÓN CARDENAL GARIBI RIVERA, A.C.</div>
                    <div class="doc-header__sub">Reverso del Pagaré · Información del Aval</div>
                </div>
            </div>
            <div class="doc-header__doctype">
                <div class="doc-header__doctype-label doc-header__doctype-label--secondary">REVERSO</div>
            </div>
        </div>

        <div class="doc-back-body">

            <div class="doc-section-title">Datos del Aval</div>

            <div class="doc-back-name" id="aval-nombre">— —</div>

            <div class="doc-back-grid">
                <div class="doc-back-field">
                    <div class="doc-back-field__label">Parentesco</div>
                    <div class="doc-back-field__value" id="aval-parentesco">—</div>
                </div>
                <div class="doc-back-field">
                    <div class="doc-back-field__label">Edad</div>
                    <div class="doc-back-field__value" id="aval-edad">—</div>
                </div>
                <div class="doc-back-field">
                    <div class="doc-back-field__label">Celular</div>
                    <div class="doc-back-field__value" id="aval-celular">—</div>
                </div>
                <div class="doc-back-field">
                    <div class="doc-back-field__label">Tel. Fijo</div>
                    <div class="doc-back-field__value" id="aval-telfijo">—</div>
                </div>
            </div>

            <div class="doc-section-title mt-4">Domicilio del Aval</div>

            <div class="doc-address-grid">
                <div class="doc-address-field doc-address-field--wide">
                    <div class="doc-back-field__label">Calle y Núm.</div>
                    <div class="doc-back-field__value" id="aval-domicilio">—</div>
                </div>
                <div class="doc-address-field">
                    <div class="doc-back-field__label">Colonia</div>
                    <div class="doc-back-field__value" id="aval-colonia">—</div>
                </div>
                <div class="doc-address-field doc-address-field--full">
                    <div class="doc-back-field__label">Entre Calles</div>
                    <div class="doc-back-field__value" id="aval-cruces">—</div>
                </div>
                <div class="doc-address-field">
                    <div class="doc-back-field__label">Municipio</div>
                    <div class="doc-back-field__value" id="aval-municipio">—</div>
                </div>
                <div class="doc-address-field">
                    <div class="doc-back-field__label">C.P.</div>
                    <div class="doc-back-field__value" id="aval-cp">—</div>
                </div>
                <div class="doc-address-field">
                    <div class="doc-back-field__label">Estado</div>
                    <div class="doc-back-field__value" id="aval-estado">—</div>
                </div>
            </div>

            <div class="doc-signature-area">
                <div class="doc-signature-slot">
                    <div class="doc-signature-line"></div>
                    <div class="doc-signature-label">FIRMA DEL AVAL</div>
                </div>
            </div>

        </div>

        <div class="doc-footer-bar">
            Fundación Cardenal Garibi Rivera, Fundación
        </div>

    </div>
</div>
