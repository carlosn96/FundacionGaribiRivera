import * as z from "zod";

const MAX_TESTIGOS = 2;

export const informacionGeneralSchema = z.object({
  nombreFundacion: z.string().min(1, "El nombre de la fundación es obligatorio"),
  representanteLegal: z.string().min(1, "El representante legal es obligatorio"),
  domicilio: z.object({
    calle: z.string().min(1, "La calle es obligatoria"),
    numeroExterior: z.string().min(1, "El número exterior es obligatorio"),
    numeroInterior: z.string().optional(),
    colonia: z.string().min(1, "La colonia es obligatoria"),
    codigoPostal: z.string().min(1, "El código postal es obligatorio"),
    municipio: z.string().min(1, "El municipio es obligatorio"),
    estado: z.string().min(1, "El estado es obligatorio"),
    entreCalles: z.string().optional(),
    referencias: z.string().optional(),
  }),
  testigos: z
    .array(
      z.object({
        nombre: z.string().min(1, "El nombre del testigo no puede estar vacío"),
      })
    )
    .max(MAX_TESTIGOS, `Solo se permiten máximo ${MAX_TESTIGOS} testigos`),
});

export type InformacionGeneralForm = z.infer<typeof informacionGeneralSchema>;
export { MAX_TESTIGOS };
