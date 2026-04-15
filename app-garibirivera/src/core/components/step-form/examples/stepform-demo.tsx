/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

import React, { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { Badge } from '@/core/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/ui/alert';
import { CheckCircle2, Code, FileText, Sparkles, Terminal } from 'lucide-react';

const StepFormDemo = () => {
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  // Simulación de datos del formulario de ejemplo
  const exampleData = {
    categoria: '0',
    categoria_other: 'Ciencias de la Salud',
    pais: 'mx',
    edad: 28,
    intereses: [1, 2, 0],
    intereses_other: 'Inteligencia Artificial y Machine Learning',
    genero: 'O',
    genero_other: 'Prefiero no especificar',
    comentarios: 'Me gustaría aprender más sobre desarrollo web moderno.',
    fecha_nacimiento: '1995-06-15',
    acepta_terminos: true,
    nivel_experiencia: 'intermedio'
  };

  const handleSubmitDemo = () => {
    setFormData(exampleData);
    setShowResult(true);
    setTimeout(() => setShowResult(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              StepForm Component
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sistema completo de formularios multi-paso con validación, campos condicionales y soporte para opciones personalizadas
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="text-sm">React + TypeScript</Badge>
            <Badge variant="secondary" className="text-sm">Yup Validation</Badge>
            <Badge variant="secondary" className="text-sm">Shadcn/ui</Badge>
            <Badge variant="secondary" className="text-sm">Tailwind CSS</Badge>
          </div>
        </div>

        {/* Alert de resultado */}
        {showResult && (
          <Alert className="border-green-200 bg-green-50 animate-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">¡Formulario enviado con éxito!</AlertTitle>
            <AlertDescription className="text-green-700">
              Los datos se han procesado correctamente. Revisa la pestaña "Resultado" para ver los datos.
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs principales */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2 h-auto p-1">
            <TabsTrigger value="overview" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Features</span>
            </TabsTrigger>
            <TabsTrigger value="usage" className="gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Usage</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="gap-2">
              <Terminal className="w-4 h-4" />
              <span className="hidden sm:inline">Demo</span>
            </TabsTrigger>
            <TabsTrigger value="result" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">Result</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>¿Qué es StepForm?</CardTitle>
                <CardDescription>
                  Un sistema robusto de formularios multi-paso para React
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">
                  <strong>StepForm</strong> es un componente React altamente configurable que permite crear formularios complejos divididos en pasos, con validación en tiempo real, campos condicionales y soporte completo para opciones personalizadas.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Componentes Principales</h3>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• <code className="bg-blue-100 px-1 rounded">StepForm.tsx</code> - Contenedor principal</li>
                      <li>• <code className="bg-blue-100 px-1 rounded">Step.tsx</code> - Renderizador de campos</li>
                      <li>• <code className="bg-blue-100 px-1 rounded">types.ts</code> - Definiciones TypeScript</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">Validación</h3>
                    <ul className="space-y-1 text-sm text-green-800">
                      <li>• Validación con <strong>Yup</strong></li>
                      <li>• Validación por paso</li>
                      <li>• Campos requeridos/opcionales</li>
                      <li>• Validación condicional</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Tipos de Campo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span><strong>Text / Number</strong> - Inputs básicos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span><strong>Textarea</strong> - Texto largo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span><strong>Date</strong> - Selector de fecha</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span><strong>Select</strong> - Dropdown con opciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span><strong>Radio</strong> - Selección única</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span><strong>Checkbox</strong> - Selección múltiple o booleana</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">✨ Características Avanzadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span><strong>allowOther</strong> - Campo adicional "Otro"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span><strong>condition</strong> - Campos condicionales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span><strong>idKey / valueKey</strong> - Keys personalizados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span><strong>defaultValue</strong> - Valores iniciales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span><strong>hidden / disabled</strong> - Control de estado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span><strong>Progress bar</strong> - Visualización del progreso</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">🔥 Opción "Otro" (allowOther)</CardTitle>
                  <CardDescription>Característica clave para opciones personalizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">Select</h4>
                      <p className="text-sm text-purple-800">
                        Aparece input de texto cuando se selecciona "Otro". El campo adicional es obligatorio.
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">Radio</h4>
                      <p className="text-sm text-purple-800">
                        Similar a select. Input aparece al seleccionar la opción "Otro".
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">Checkbox</h4>
                      <p className="text-sm text-purple-800">
                        Input aparece al marcar "Otro". Se limpia automáticamente al desmarcar.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Usage */}
          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ejemplo de Uso Básico</CardTitle>
                <CardDescription>Cómo implementar un formulario con StepForm</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import StepForm from '@/core/components/step-form/StepForm';
import { StepConfig } from '@/core/components/step-form/types';

const steps: StepConfig[] = [
  {
    id: 'step1',
    title: 'Información Personal',
    description: 'Datos básicos',
    fields: [
      {
        name: 'nombre',
        label: 'Nombre completo',
        type: 'text',
        required: true,
      },
      {
        name: 'categoria',
        label: 'Categoría de interés',
        type: 'select',
        options: [
          { id: 1, value: 'Tecnología' },
          { id: 2, value: 'Educación' },
          { id: 0, value: 'Otro' }
        ],
        required: true,
        allowOther: true, // ← Habilita campo "Otro"
      }
    ]
  }
];

function MyForm() {
  const handleSubmit = (data) => {
    console.log('Datos del formulario:', data);
    // data incluirá:
    // { nombre: '...', categoria: '0', categoria_other: '...' }
  };

  return (
    <StepForm 
      steps={steps} 
      onSubmit={handleSubmit}
      initialData={{}}
    />
  );
}`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estructura de Datos</CardTitle>
                <CardDescription>Cómo se almacenan los datos con "Otro"</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Ejemplo: Select con "Otro"
{
  categoria: "0",              // ID de la opción "Otro"
  categoria_other: "Ciencias"  // Texto personalizado
}

// Ejemplo: Checkbox múltiple con "Otro"
{
  intereses: [1, 2, 0],        // IDs incluyendo "Otro"
  intereses_other: "IA y ML"   // Texto personalizado
}

// Ejemplo: Campo condicional
{
  razonRecurre: "2",           // ID = Crédito
  solicitaCredito: "1",        // Solo aparece si incluye "crédito"
  utilizaCredito: "3"          // Solo aparece si incluye "crédito"
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demo */}
          <TabsContent value="demo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Simulación Interactiva</CardTitle>
                <CardDescription>Observa cómo funciona el formulario en acción</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Demo Interactiva</AlertTitle>
                  <AlertDescription>
                    Esta es una simulación. En producción, el StepForm renderizaría campos reales con navegación entre pasos.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900">Campos del formulario de ejemplo:</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>✓ Categoría (select con "Otro")</li>
                    <li>✓ País (select normal)</li>
                    <li>✓ Edad (number)</li>
                    <li>✓ Intereses (checkbox múltiple con "Otro")</li>
                    <li>✓ Género (radio con "Otro")</li>
                    <li>✓ Comentarios (textarea)</li>
                    <li>✓ Fecha de nacimiento (date)</li>
                    <li>✓ Términos y condiciones (checkbox simple)</li>
                    <li>✓ Nivel de experiencia (select condicional)</li>
                  </ul>
                </div>

                <Button
                  variant="visionPrimary"
                  size="lg"
                  onClick={handleSubmitDemo}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Simular Envío de Formulario
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Result */}
          <TabsContent value="result" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Datos del Formulario</CardTitle>
                <CardDescription>
                  {formData ? 'Resultado de la última simulación' : 'Ejecuta la demo para ver los datos'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formData ? (
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aún no hay datos. Ve a la pestaña "Demo" y ejecuta la simulación.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {formData && (
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Campos "Otro"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-1">categoria + categoria_other</h4>
                      <p className="text-sm text-blue-800">
                        ID: {formData.categoria} → "{formData.categoria_other}"
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-1">intereses + intereses_other</h4>
                      <p className="text-sm text-green-800">
                        IDs: [{formData.intereses.join(', ')}] → "{formData.intereses_other}"
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-1">genero + genero_other</h4>
                      <p className="text-sm text-purple-800">
                        ID: {formData.genero} → "{formData.genero_other}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">¿Listo para usar StepForm?</h3>
                <p className="text-slate-300 text-sm">
                  Revisa el ejemplo completo en <code className="bg-slate-700 px-2 py-1 rounded">field-properties-example.ts</code>
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-slate-600 text-slate-300">v1.0.0</Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300">TypeScript</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepFormDemo;
