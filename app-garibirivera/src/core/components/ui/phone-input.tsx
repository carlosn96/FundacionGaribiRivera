import * as React from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { Input } from "./input";

/**
 * PhoneInput - Componente especializado para números celulares con máscara profesional.
 * Utiliza 'react-number-format' para una gestión de máscaras robusta y probada.
 * Formato: (##) ####-####
 */
export interface PhoneInputProps extends Omit<PatternFormatProps, 'format'> {
  // Puedes añadir props personalizadas aquí si es necesario
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (props, ref) => {
    return (
      <PatternFormat
        {...props}
        format="(##) ####-####"
        mask="_"
        allowEmptyFormatting={false}
        customInput={Input}
        getInputRef={ref}
        type="tel"
        // Estilos por defecto si no se pasan otros
        placeholder="(33) 1234-5678"
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
