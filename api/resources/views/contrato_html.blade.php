<style>
    @include('partials.contrato_css', ['p' => '.print-wrapper'])
    
    .print-wrapper {
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: 10pt;
        line-height: 1.4;
        color: #0f1f1a;
    }

    /* Omitimos aplicar 100% de width a .contract-doc para que conserve su "tamaño hoja" desde contrato.css externo */
    /* .print-wrapper .contract-doc { width: 100%; } */
</style>

<div class="print-wrapper">
    @include('partials.contrato_body')
</div>
