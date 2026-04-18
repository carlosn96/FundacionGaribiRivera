        @php
            $nombreE = mb_strtoupper(trim(($emprendedor->usuario->nombre ?? '') . ' ' . ($emprendedor->usuario->apellidos ?? '')), 'UTF-8');
            $nombreA = $aval ? mb_strtoupper(trim($aval->nombre_completo ?? $aval->nombre ?? '— NO ASIGNADO —'), 'UTF-8') : '— NO ASIGNADO —';

            $calleE = mb_strtoupper($domicilio->calle ?? '—', 'UTF-8');
            $numExtE = $domicilio->num_exterior ?? ($domicilio->numeroExterior ?? '—');
            $numIntE = isset($domicilio->num_interior) ? ' Int. ' . $domicilio->num_interior : (isset($domicilio->numeroInterior) ? ' Int. ' . $domicilio->numeroInterior : '');
            $domEStr = $calleE . ' #' . $numExtE . $numIntE;
            $cruce1E = mb_strtoupper($domicilio->calle_cruce_1 ?? ($domicilio->calleCruce1 ?? '—'), 'UTF-8');
            $cruce2E = mb_strtoupper($domicilio->calle_cruce_2 ?? ($domicilio->calleCruce2 ?? '—'), 'UTF-8');
            $coloniaE = mb_strtoupper($domicilio->colonia ?? '—', 'UTF-8');
            $municipioE = mb_strtoupper($domicilio->codigoPostal->municipio->nombre ?? '—', 'UTF-8');
            $cpE = $domicilio->codigoPostal->codigo_postal ?? ($domicilio->codigoPostal->codigoPostal ?? '—');
            $telE = $emprendedor->usuario->numero_celular ?? ($emprendedor->usuario->numeroCelular ?? '—');

            $calleA = mb_strtoupper($domicilio_aval->calle ?? '—', 'UTF-8');
            $numExtA = $domicilio_aval->num_exterior ?? ($domicilio_aval->numeroExterior ?? '—');
            $numIntA = isset($domicilio_aval->num_interior) ? ' Int. ' . $domicilio_aval->num_interior : (isset($domicilio_aval->numeroInterior) ? ' Int. ' . $domicilio_aval->numeroInterior : '');
            $domAStr = $calleA . ' #' . $numExtA . $numIntA;
            $cruce1A = mb_strtoupper($domicilio_aval->calle_cruce_1 ?? ($domicilio_aval->calleCruce1 ?? '—'), 'UTF-8');
            $cruce2A = mb_strtoupper($domicilio_aval->calle_cruce_2 ?? ($domicilio_aval->calleCruce2 ?? '—'), 'UTF-8');
            $coloniaA = mb_strtoupper($domicilio_aval->colonia ?? '—', 'UTF-8');
            $municipioA = mb_strtoupper($domicilio_aval->codigoPostal->municipio->nombre ?? '—', 'UTF-8');
            $cpA = $domicilio_aval->codigoPostal->codigo_postal ?? ($domicilio_aval->codigoPostal->codigoPostal ?? '—');
            $telA = $aval->celular ?? '—';

            $calleI = mb_strtoupper($inmueble->calle ?? '—', 'UTF-8');
            $numExtI = $inmueble->num_exterior ?? ($inmueble->numeroExterior ?? '—');
            $cruce1I = mb_strtoupper($inmueble->calle_cruce_1 ?? ($inmueble->calleCruce1 ?? '—'), 'UTF-8');
            $cruce2I = mb_strtoupper($inmueble->calle_cruce_2 ?? ($inmueble->calleCruce2 ?? '—'), 'UTF-8');
            $colI = mb_strtoupper($inmueble->colonia ?? '—', 'UTF-8');
            $munI = mb_strtoupper($inmueble->codigoPostal->municipio->nombre ?? '—', 'UTF-8');
            $cpI = $inmueble->codigoPostal->codigo_postal ?? ($inmueble->codigoPostal->codigoPostal ?? '—');
            $predialI = mb_strtoupper($inmueble->cuenta_predial ?? ($inmueble->cuentaPredial ?? '—'), 'UTF-8');

            $negocioNombre = mb_strtoupper($domicilio_negocio->nombre ?? '—', 'UTF-8');
            $calleN = mb_strtoupper($domicilio_negocio->calle ?? '—', 'UTF-8');
            $numExtN = $domicilio_negocio->num_exterior ?? ($domicilio_negocio->numeroExterior ?? '—');
            $numIntN = isset($domicilio_negocio->num_interior) ? ' Int. ' . $domicilio_negocio->num_interior : (isset($domicilio_negocio->numeroInterior) ? ' Int. ' . $domicilio_negocio->numeroInterior : '');
            $domNStr = $calleN . ' #' . $numExtN . $numIntN;
            $cruce1N = mb_strtoupper($domicilio_negocio->calle_cruce_1 ?? ($domicilio_negocio->calleCruce1 ?? '—'), 'UTF-8');
            $cruce2N = mb_strtoupper($domicilio_negocio->calle_cruce_2 ?? ($domicilio_negocio->calleCruce2 ?? '—'), 'UTF-8');
            $colN = mb_strtoupper($domicilio_negocio->colonia ?? '—', 'UTF-8');
            $munN = mb_strtoupper($domicilio_negocio->codigoPostal->municipio->nombre ?? '—', 'UTF-8');

            $expNum = $expediente->numero_expediente ?? '—';

            $montoFmt = '$' . number_format($monto, 2);
            $montoLetrasUpper = str_replace(['(', ')'], '', mb_strtoupper($monto_letras, 'UTF-8'));

            $montoMensualFmt = '$' . number_format($monto_mensual, 2);
            $montoMensualLetrasUpper = str_replace(['(', ')'], '', mb_strtoupper($monto_mensual_letras, 'UTF-8'));

            $domicilioFundacionTexto = mb_strtoupper(
                $domicilio_fundacion_texto ?? 'la finca marcada con el numero 4235 de la calle COBRE de la colonia LOMAS DE LA VICTORIA de la ciudad de Tlaquepaque, Jalisco',
                'UTF-8'
            );
            $testigosContrato = $testigos ?? [];
        @endphp

        <div class="contract-doc">
            <div class="doc-body">
                <h5>CONTRATO DE PRÉSTAMO DE IMPULSO AL EMPRENDIMIENTO</h5>

                <p class="mb-3 text-justify">
                    CONTRATO DE PRÉSTAMO DE IMPULSO AL EMPRENDIMIENTO QUE CELEBRAN POR UNA PARTE LA
                    <strong>{{ mb_strtoupper($configuracion->nombre_fundacion ?? 'FUNDACIÓN CARDENAL GARIBI RIVERA, A.C.', 'UTF-8') }}</strong>, REPRESENTADA POR EL C. 
                    {{ mb_strtoupper($configuracion->representante_legal ?? 'EDUARDO DELFINO MENDOZA MEDINA', 'UTF-8') }}, EN SU CARÁCTER DE PRESIDENTE EJECUTIVO, A QUIEN EN LO SUCESIVO SE LE
                    DENOMINARÁ "LA FUNDACIÓN", Y POR LA OTRA EL C. <strong
                        class="underline-span">{{ $nombreE }}</strong>, A QUIEN EN LO SUCESIVO SE LE DENOMINARÁ "EL
                    EMPRENDEDOR", Y EL C. <strong class="underline-span">{{ $nombreA }}</strong> A QUIEN EN LO SUCESIVO
                    SE LE DENOMINARÁ "EL AVAL", QUIENES MANIFIESTAN SU VOLUNTAD DE CELEBRAR EL PRESENTE CONTRATO Y
                    SOMETERSE AL TENOR DE LAS SIGUIENTES:
                </p>

                <h6>D E C L A R A C I O N E S :</h6>

                <div class="mt-3">
                    <p class="fw-bold mb-1">I.- DECLARA LA FUNDACION:</p>
                    <p>1.1 Que es una fundación de carácter privado, sin fines de lucro, que está legalmente
                        constituida, con domicilio ubicado en {{ $domicilioFundacionTexto }}.</p>
                    <p>1.2 Que su objeto social es <em>"Impulsar programas y proyectos de promoción y asistencia social
                            que generen un desarrollo Humano Integral entre la población de escasos recursos en Zonas
                            marginadas, inspirados en la solidaridad cristiana..."</em></p>
                    <p>Además de las que se describen en el acta constitutiva.</p>
                    <p>1.3. Que su presidente ejecutivo C. {{ mb_strtoupper($configuracion->representante_legal ?? 'EDUARDO DELFINO MENDOZA MEDINA', 'UTF-8') }} tiene facultades
                        suficientes para celebrar el Presente Documento en representación de {{ mb_strtoupper($configuracion->nombre_fundacion ?? 'FUNDACION CARDENAL GARIBI RIVERA, FUNDACION', 'UTF-8') }} y que es su voluntad celebrar el presente "CONTRATO DE IMPULSO AL
                        EMPRENDIMIENTO" con las condiciones y principios que se han establecido en reuniones previas.
                    </p>
                </div>

                <div class="mt-3">
                    <p class="fw-bold mb-1">II.- DECLARA ELEMPRENDEDOR</p>
                    <p>2.1 Ser mexicano (a), mayor de edad, con domicilio en <strong>{{ $domEStr }}</strong>, entre
                        calle <strong>{{ $cruce1E }}</strong> y calle <strong>{{ $cruce2E }}</strong> de la colonia
                        <strong>{{ $coloniaE }}</strong> del municipio de <strong>{{ $municipioE }}</strong>, Jalisco,
                        C.P. <strong>{{ $cpE }}</strong> que su teléfono celular es <strong>{{ $telE }}</strong> y que
                        cuenta con capacidad suficiente para obligarse al presente contrato.</p>
                    <p>2.2 Contar con los elementos necesarios para crear y/o fortalecer el emprendimiento que propone,
                        incluidos la preparación, la realización de la ficha técnica y proyecciones, así como la
                        disposición, actitud y aptitud para desarrollarlo.</p>
                    <p>2.3. Tener los documentos suficientes para crear y/o fortalecer el negocio que pretende
                        implementar, y conocer los requisitos mínimos indispensables para crear y/o fortalecer el
                        proyecto que presenta a la fundación.</p>
                </div>

                <h6>DATOS DEL AVAL</h6>

                <div class="mt-2">
                    <p class="fw-bold mb-1">III.- DECLARA EL FIADOR, AVAL Y DEUDOR SOLIDARIO:</p>
                    <p>3.1 Es mexicano (a) mayor de edad, con domicilio en <strong>{{ $domAStr }}</strong> entre calle
                        <strong>{{ $cruce1A }}</strong> y calle <strong>{{ $cruce2A }}</strong> de la colonia
                        <strong>{{ $coloniaA }}</strong> del municipio de <strong>{{ $municipioA }}</strong>, Jalisco,
                        C.P. <strong>{{ $cpA }}</strong> y que su teléfono celular es <strong>{{ $telA }}</strong> y que
                        cuenta con capacidad suficiente para obligarse al presente contrato.</p>
                    <p>3.2 Declara que es propietario (a) del inmueble ubicado en la calle
                        <strong>{{ $calleI }}</strong> número <strong>{{ $numExtI }}</strong> entre calle
                        <strong>{{ $cruce1I }}</strong> y calle <strong>{{ $cruce2I }}</strong> de la colonia
                        <strong>{{ $colI }}</strong> del municipio de <strong>{{ $munI }}</strong>, Jalisco, con código
                        postal <strong>{{ $cpI }}</strong>; el cual acredita con la cuenta predial número
                        <strong>{{ $predialI }}</strong> bajo protesta de decir verdad afirma está libre de gravamen y
                        cumple con todos los requisitos para presentarlo como garantía del préstamo otorgado.</p>
                    <p>3.3. Que es su voluntad, celebrar el presente contrato de "IMPULSO AL EMPRENDIMIENTO", con el
                        objetivo de ser el fiador, aval y deudor solidario y quien se obliga y responde con todos sus
                        bienes a favor de "LA FUNDACION", en el cumplimiento de todas y cada una de las obligaciones
                        pactadas en el presente contrato hasta el día de la devolución y entrega material del préstamo
                        entregado, por lo que renuncia a los beneficios de orden, excusión y división a que se refiere
                        el Código Civil del Estado de Jalisco y el Código de Comercio</p>
                </div>

                <p class="mt-4">En virtud de las declaraciones que anteceden, las partes convienen en sujetarse a las
                    siguientes:</p>

                <h6>C L Á U S U L A S</h6>

                <div>
                    <p><strong>PRIMERA. OBJETO. -</strong> El objeto del presente contrato es la creación y/o
                        fortalecimiento del negocio denominado <strong
                            class="underline-span">{{ $negocioNombre }}</strong>, con domicilio en
                        <strong>{{ $domNStr }}</strong> entre calle <strong>{{ $cruce1N }}</strong> y calle
                        <strong>{{ $cruce2N }}</strong> de la colonia <strong>{{ $colN }}</strong> del municipio de
                        <strong>{{ $munN }}</strong> con número de expediente <strong>{{ $expNum }}</strong> el cual
                        será utilizado de acuerdo a la ficha técnica y de evaluación presentada ante la FUNDACIÓN.</p>
                </div>

                <div class="mt-3">
                    <p><strong>SEGUNDA: DE LAS OBLIGACIONES DEL EMPRENDEDOR:</strong> El emprendedor conoce y acepta las
                        siguientes acciones;</p>
                    <ol>
                        <li>Aplicar el crédito otorgado en los términos y condiciones que fue aprobado por el comité
                            técnico de "LA FUNDACIÓN".</li>
                        <li>Prestar el servicio con calidad y aportar toda su experiencia y capacidad dedicando el
                            tiempo necesario para cumplir su emprendimiento.</li>
                        <li>Permitir al personal designado por "LA FUNDACIÓN", inspeccionar las instalaciones y avance
                            donde se esté llevando a cabo el objeto de este documento a efecto de verificar la
                            utilización y empleo de los recursos en el mismo.</li>
                        <li>A efecto de formalizar el negocio la fundación solicita el emprendedor tener vigentes la
                            licencia municipal, de salud y las acreditaciones fiscales ante el SAT, y las que se
                            requieran ante las autoridades competentes para el desarrollo de su actividad.</li>
                        <li>Presentar en el domicilio de "LA FUNDACIÓN" en un plazo no mayor a 30 treinta días, los
                            documentos, facturas, recibos o cualquier comprobante que se requiera que corresponda a la
                            aplicación del Préstamo Otorgado en el proyecto aprobado por "LA FUNDACIÓN".</li>
                        <li>Asistir a los talleres de fortalecimiento, y otros que "LA FUNDACIÓN" considere necesarios
                            para impulsar el crecimiento y consolidación del proyecto, de acuerdo a la calendarización
                            planeada.</li>
                        <li>Recibir las asesorías necesarias para optimizar los recursos disponibles y favorecer el buen
                            funcionamiento del proyecto.</li>
                        <li>En caso de que se le solicite, compartir su experiencia y testimonio con otros emprendedores
                            para incentivar el desarrollo y creación de nuevas empresas.</li>
                        <li>Realizar los pagos correspondientes en tiempo y forma.</li>
                    </ol>
                </div>

                <div class="mt-3">
                    <p><strong>TERCERA. - OBLIGACIONES DE LA FUNDACIÓN:</strong> "LA FUNDACIÓN" favorecerá y apoyará la
                        creatividad de las personas que requieran crear o fortalecer un proyecto de Emprendimiento como
                        medio para un mejor modo de vida proporcionando una formación integral, por lo cual se
                        compromete con "EL EMPRENDEDOR" a:</p>
                    <ol>
                        <li>Darle a conocer los lineamientos que deberá sujetarse en la aplicación de los recursos del
                            préstamo solicitado.</li>
                        <li>Darle a conocer los Principios en los que se basa el préstamo que se le está otorgando, para
                            que, al implementar su proyecto, los cuales son: Honestidad, Trabajo, Solidaridad y
                            Transparencia.</li>
                        <li>Realizar visitas de inspección en los domicilios de la creación y/o fortalecimiento del
                            proyecto, a los 6 meses de entregado el recurso, a fin de verificar el impacto del crédito y
                            de la capacitación.</li>
                        <li>Otorgar asesorías a los emprendedores a fin de optimizar los recursos de que dispone y
                            favorecer el buen funcionamiento del proyecto.</li>
                        <li>Ofrecer talleres de capacitación y formación para impulsar el crecimiento y consolidación
                            del proyecto.</li>
                        <li>Emitir los recibos correspondientes a los pagos realizados por" EL EMPRENDEDOR", en los
                            plazos y términos marcados para tal efecto.</li>
                    </ol>
                </div>

                <div class="mt-3">
                    <p><strong>CUARTA. - DEL PRESTAMO. -</strong> "LA FUNDACIÓN" se obliga en este acto a entregar un
                        PRESTAMO por la cantidad de <strong class="underline-span">{{ $montoFmt }}</strong>, <strong
                            class="underline-span">{{ $montoLetrasUpper }}</strong> el cual será entregado a la firma
                        del presente documento y el cual servirá de base para la creación y/o fortalecimiento del
                        proyecto establecido en la cláusula primera del este documento.</p>
                </div>

                <div class="mt-3">
                    <p><strong>QUINTA. - DE LA FORMA DE PAGO . -</strong> "EL EMPRENDEDOR" se obliga a pagar a "LA
                        FUNDACIÓN" la cantidad de <strong class="underline-span">{{ $montoFmt }}</strong>, <strong
                            class="underline-span">{{ $montoLetrasUpper }}</strong> como pago del préstamo aquí otorgado
                        en las parcialidades que ambas partes acordaron, las cuales se desglosarán de la siguiente
                        manera:</p>
                    <ul class="list-unstyled ms-5">
                        <li><strong>{{ $num_pagos }}</strong> pagos de la cantidad de
                            <strong>{{ $montoMensualFmt }}</strong> (<strong>{{ $montoMensualLetrasUpper }}</strong>)
                        </li>
                    </ul>
                </div>

                <div class="mt-3">
                    <p>Los cuales serán depositados en la cuenta Número 0111027506 del banco BBVA, o en las
                        instalaciones de LA FUNDACIÓN, ubicadas en CALLE COBRE NUMERO 4235, COLONIA LOMAS DE LA
                        VICTORIA, EN TLAQUEPAQUE, JALISCO, comprobante que será enviado al teléfono 333 477 03 17 como
                        testimonio del pago realizado en tiempo y forma, juntamente con la aportación solidaria que "EL
                        EMPRENDEDOR" otorga a "LA FUNDACIÓN" como donativo para realizar las actividades de esta.</p>
                </div>

                <div class="mt-3">
                    <p><strong>SEXTA. - PENALIZACIONES EN CASO DE MORA.</strong> Es FACULTAD de "LA FUNDACIÓN", en caso
                        de MORA O INCUMPLIMIENTO en los pagos mensuales establecido la cláusula 5 del presente
                        documento, solas o en conjunto las siguientes penalizaciones:</p>
                    <ol>
                        <li>En caso de incumplimiento de pago durante el transcurso del crédito otorgado o dejar de
                            pagar la mensualidad correspondiente, la deuda podrá ser derivada a un despacho jurídico
                            externo ajeno a la FUNDACIÓN CARDENAL GARIBI RIVERA, sin compromiso ni responsabilidad por
                            parte de esta.</li>
                        <li>En caso de que estas acciones requieran trámites judiciales o con la intervención de
                            abogados, "EL EMPRENDEDOR" se obliga a cubrir los gastos de ejecución, cobranza, intereses
                            acumulados, y otros costos derivados de esta acción, de conformidad con lo establecido por
                            el Código Civil del estado de Jalisco, el Código de Comercio y demás leyes respectivas.</li>
                    </ol>
                </div>

                <div class="mt-3">
                    <p><strong>SÉPTIMA. -PENA CONVENCIONAL POR INCUMPLIMIENTO. -</strong> "EL EMPRENDEDOR" pagará como
                        pena convencional a "LA FUNDACIÓN" el 10% mensual de la totalidad del Préstamo, por todo el
                        tiempo que tuvo a su disposición el recurso y deberá devolver de manera inmediata el PRÉSTAMO
                        que le fue otorgado en los siguientes casos:</p>
                    <ol>
                        <li>Que al vencimiento del PLAZO ACORDADO para la creación y/o fortalecimiento del proyecto
                            empresarial (30 treinta días después de entregado el recurso) no justifique de manera
                            adecuada y a la entera satisfacción de "LA FUNDACIÓN" la utilización del préstamo para
                            creación y/o fortalecimiento del proyecto;</li>
                        <li>Que, al momento de hacer uso del recurso aprobado, este no se utilice para los fines
                            solicitados.</li>
                        <li>NO asistir o cursar las capacitaciones de fortalecimiento, que se plantean como requisito
                            para la obtención del préstamo base de este documento, toda vez que es requisito
                            indispensable para el otorgamiento de este.</li>
                    </ol>
                </div>

                <p class="mt-3">En caso de que estas acciones requieran la intervención de abogados "EL EMPRENDEDOR" se
                    obliga a cubrir los gastos que por su falta de responsabilidad en cumplimiento de sus obligaciones
                    sea necesarias estas gestiones así como también que en caso de que estas acciones requieran trámites
                    judiciales "EL EMPRENDEDOR" se obliga a cubrir los gastos y costas derivadas de esta acción, de
                    conformidad con lo establecido por el Código Civil del estado de Jalisco, el Código de Comercio y
                    demás leyes respectivas.</p>

                <div class="mt-3">
                    <p><strong>OCTAVA. VIGENCIA.</strong> Este contrato es de tracto sucesivo por lo que iniciará su
                        vigencia a la firma de este documento y concluirá una vez se cumplan las obligaciones derivadas
                        de este.</p>
                </div>

                <div class="mt-3">
                    <p><strong>NOVENA. TERMINACIÓN;</strong> Este contrato terminará y en su caso facultará a la parte
                        cumplida para dar por terminado el acuerdo sin perjuicio de las acciones legales por las
                        siguientes causales:</p>
                    <ul class="list-unstyled ms-5">
                        <li>A. Por el mutuo acuerdo de las partes.</li>
                        <li>B. El incumplimiento en los pagos puntuales.</li>
                        <li>C. Por no asistir a los talleres o capacitaciones obligatorias ofertadas por LA FUNDACIÓN.
                        </li>
                        <li>D. Por MALOS TRATAMIENTOS, de manera personal o a través de redes sociales, difundiendo
                            rumores o propiciando un menoscabo o afectación patrimonial, fama pública o cualquier
                            situación que pueda afectar de forma grave, la imagen de "LA FUNDACIÓN" o de su personal sin
                            causa justificada.</li>
                    </ul>
                </div>

                <p class="mt-2 text-justify">En tal caso, "EL EMPRENDEDOR" se compromete a devolver a "LA FUNDACIÓN" en
                    su totalidad la cantidad que no haya cubierto por motivo del préstamo que le fue entregado.</p>

                <div class="mt-3">
                    <p><strong>DÉCIMA: DOMICILIO Y NOTIFICACIONES:</strong> Para todos los efectos contractuales y
                        legales, las partes establecen como domicilio la ciudad de Tlaquepaque, Jalisco. Las
                        notificaciones a que haya lugar por causa de este contrato se harán en las direcciones
                        establecidas en el presente contrato.</p>
                </div>

                <div class="mt-3">
                    <p><strong>DÉCIMA PRIMERA. -</strong> Para todos los efectos en cuanto a la interpretación y
                        cumplimiento del presente contrato, las partes se someten a la jurisdicción y competencia de los
                        Tribunales Civiles y Mercantiles de Zapopan, Jalisco, renunciando al fuero que por razón de sus
                        domicilios actuales o futuros pudiera corresponderles.</p>
                </div>

                <p class="mt-4">Leído el presente contrato y no existiendo dolo, error, mala fe o vicios de
                    consentimiento por las partes se firma por duplicado en la ciudad de <strong>Tlaquepaque, Jalisco,
                        {{ mb_strtoupper($fecha_letras, 'UTF-8') }}</strong></p>

                <table class="sig-wrapper-table">
                    <tr>
                        <td class="sig-wrapper-cell">
                            <table class="sig-section">
                                {{-- Fila 1: Fundación + Emprendedor --}}
                                <tr>
                                    <td class="sig-col">
                                        <div class="sig-role">"La Fundación"</div>
                                        <div class="sig-blank"></div>
                                        <div class="sig-line"></div>
                                        <div class="sig-name">C. {{ mb_strtoupper($configuracion->representante_legal ?? 'EDUARDO D. MENDOZA MEDINA', 'UTF-8') }}</div>
                                        <div class="sig-cargo">Presidente Ejecutivo</div>
                                    </td>
                                    <td class="sig-col">
                                        <div class="sig-role">"El Emprendedor"</div>
                                        <div class="sig-blank"></div>
                                        <div class="sig-line"></div>
                                        <div class="sig-name">C. {{ $nombreE }}</div>
                                    </td>
                                </tr>

                                {{-- Fila 2: Aval (centrado) --}}
                                <tr>
                                    <td colspan="2" class="sig-col-full">
                                        <div class="sig-role">El Aval</div>
                                        <div class="sig-blank"></div>
                                        <div class="sig-line"></div>
                                        <div class="sig-name">C. {{ $nombreA }}</div>
                                    </td>
                                </tr>

                                {{-- Fila 3: Testigos --}}
                                @if (count($testigosContrato) === 1)
                                    <tr>
                                        <td colspan="2" class="sig-col-full">
                                            <div class="sig-role">Testigo</div>
                                            <div class="sig-blank"></div>
                                            <div class="sig-line"></div>
                                            <div class="sig-name">C. {{ mb_strtoupper($testigosContrato[0], 'UTF-8') }}</div>
                                        </td>
                                    </tr>
                                @elseif (count($testigosContrato) >= 2)
                                    <tr>
                                        <td class="sig-col">
                                            <div class="sig-role">Testigo</div>
                                            <div class="sig-blank"></div>
                                            <div class="sig-line"></div>
                                            <div class="sig-name">C. {{ mb_strtoupper($testigosContrato[0], 'UTF-8') }}</div>
                                        </td>
                                        <td class="sig-col">
                                            <div class="sig-role">Testigo</div>
                                            <div class="sig-blank"></div>
                                            <div class="sig-line"></div>
                                            <div class="sig-name">C. {{ mb_strtoupper($testigosContrato[1], 'UTF-8') }}</div>
                                        </td>
                                    </tr>
                                @endif
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

