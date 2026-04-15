// src/core/components/step-form/StepForm.tsx
/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Step from './Step';
import { StepFormProps, StepConfig, Field } from './types';
import { Button } from '@/core/components/ui/button';
import { Progress } from '@/core/components/ui/progress';
import { VisionGlassWindow, VisionOrnament, VisionInteractive, VisionTypography } from '@/core/components/ui/vision-glass';
import { CheckCircle2, ArrowLeft, ArrowRight, Send, Save, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useToast } from '@/core/hooks/use-toast';
import * as yup from 'yup';

const StepForm: React.FC<StepFormProps> = ({ steps, onSubmit, initialData = {} }) => {
  // Validación de seguridad: verificar que steps esté definido y tenga elementos
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return (
      <VisionGlassWindow className="p-8 text-center border-destructive/30 bg-destructive/5 max-w-lg mx-auto mt-8">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-destructive/70 to-destructive rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-destructive-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <VisionTypography variant="headline" className="text-foreground mb-2">
              ¡Ups! Algo no está del todo bien
            </VisionTypography>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Parece que el formulario no está configurado correctamente en este momento.
              Estamos trabajando para solucionarlo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recargar página
              </Button>
              <p className="text-sm text-muted-foreground">
                ¿El problema persiste? <a href="https://fundaciongaribirivera.com/contact" className="text-primary hover:underline">Contacta a soporte</a>
              </p>
            </div>
          </div>
      </VisionGlassWindow>
    );
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitLockRef = useRef(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [hasDraftBeenRestored, setHasDraftBeenRestored] = useState(false);
  
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    let initialFormData = { ...initialData };

    // Intentar recuperar del localStorage primero
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('stepform-draft');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.data && parsed.timestamp) {
            const savedDate = new Date(parsed.timestamp);
            const now = new Date();
            const hoursDiff = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60);
            if (hoursDiff < 24) {
              setHasDraftBeenRestored(true);
              initialFormData = { ...initialData, ...parsed.data };
            }
          }
        } catch (e) {
          console.error('Error al recuperar borrador:', e);
        }
      }
    }

    steps.forEach(step => {
      step.fields.forEach(field => {
        if (initialFormData[field.name] === undefined) {
          if (field.type === 'radio' && 'isSelected' in field && field.isSelected !== undefined) {
            initialFormData[field.name] = field.isSelected;
          } else if (field.type === 'checkbox' && 'isChecked' in field && field.isChecked !== undefined) {
            initialFormData[field.name] = field.isChecked;
          } else if (field.initialValue !== undefined) {
            initialFormData[field.name] = field.initialValue;
          } else if (field.defaultValue !== undefined) {
            initialFormData[field.name] = field.defaultValue;
          }
        }
      });
    });

    // Limpiar campos _other para campos que no permiten "Otro"
    steps.forEach(step => {
      step.fields.forEach(field => {
        if (!field.allowOther) {
          delete initialFormData[`${field.name}_other`];
        }
      });
    });

    return initialFormData;
  });
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Asegurar que los valores enviados al servidor sean 1 o 0 para campos booleanos
  const handleDataChange = useCallback((field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: typeof value === 'boolean' ? (value ? 1 : 0) : value };

      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }

      autoSaveTimerRef.current = setTimeout(() => {
        if (typeof window !== 'undefined') {
          try {
            // Limpiar campos _other antes de guardar
            const cleanedData = { ...newData };
            steps.forEach(step => {
              step.fields.forEach(field => {
                if (!field.allowOther) {
                  delete cleanedData[`${field.name}_other`];
                }
              });
            });

            localStorage.setItem('stepform-draft', JSON.stringify({
              data: cleanedData,
              timestamp: new Date().toISOString(),
              currentStep,
            }));
            setLastSaved(new Date());
          } catch (e) {
            console.error('Error al guardar borrador:', e);
          }
        }
      }, 2000);

      return newData;
    });
  }, [currentStep]);
  
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (hasDraftBeenRestored) {
      toast({
        title: "Borrador recuperado",
        description: "Se recuperó tu progreso anterior.",
        duration: 2000,
      });
    }
  }, [hasDraftBeenRestored, toast]);
  
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(formData).length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData]);

  const currentConfig = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const isOtroOption = (field: any, selectedValue: any, data: Record<string, any>): boolean => {
    if (!field.allowOther || !field.options || !selectedValue) return false;

    const selectedOption = field.options.find((opt: any) => {
      const optionId = field.idKey ? opt[field.idKey] : opt.id;
      return String(optionId) === String(selectedValue);
    });

    if (!selectedOption) return false;

    const optionText = field.valueKey ? selectedOption[field.valueKey] : selectedOption.value || selectedOption.descripcion;
    return String(optionText).toLowerCase().trim() === 'otro';
  };

  const isOtroSelectedInCheckbox = (field: any, selectedValues: any[]): boolean => {
    if (!field.allowOther || !field.options || !Array.isArray(selectedValues)) return false;

    return selectedValues.some(selectedId => {
      const option = field.options.find((opt: any) => {
        const optionId = field.idKey ? opt[field.idKey] : opt.id;
        return String(optionId) === String(selectedId);
      });

      if (!option) return false;

      const optionText = field.valueKey ? option[field.valueKey] : option.value || option.descripcion;
      return String(optionText).toLowerCase().trim() === 'otro';
    });
  };

  const isStepValid = (stepConfig: StepConfig, data: Record<string, any>) => {
    const collectVisibleFields = (fields: Field[], data: Record<string, any>): Field[] => {
      const visibleFields: Field[] = [];

      fields.forEach(field => {
        const isConditionMet = field.condition ? field.condition(data) : true;

        if (!field.hidden && isConditionMet && field.type !== 'alert') {
          visibleFields.push(field);

          if (field.type === 'radio' && field.yesNoMode) {
            const fieldValue = data[field.name];
            // Los valores para yesNoMode son numéricos: 1 para "Sí" y 0 para "No"
            // (definidos en renderYesNoRadioField de Step.tsx)
            if (fieldValue === 1 && field.yesFields) {
              visibleFields.push(...collectVisibleFields(field.yesFields, data));
            } else if (fieldValue === 0 && field.noFields) {
              visibleFields.push(...collectVisibleFields(field.noFields, data));
            }
          }
        }
      });

      return visibleFields;
    };

    const visibleFields = collectVisibleFields(stepConfig.fields, data);

    const schema = yup.object().shape(
      visibleFields.reduce((acc: Record<string, any>, field) => {
          let validator: any;

          switch (field.type) {
            case 'text':
            case 'tel':
            case 'textarea':
              validator = yup.string();
              break;

            case 'number':
              validator = yup.number();

              if (field.min !== undefined) {
                validator = validator.min(field.min, `El valor debe ser mayor o igual a ${field.min}`);
              }
              if (field.max !== undefined) {
                validator = validator.max(field.max, `El valor debe ser menor o igual a ${field.max}`);
              }
              break;

            case 'date':
              validator = yup.date();

              if (field.min !== undefined) {
                validator = validator.min(new Date(field.min), `La fecha debe ser posterior a ${field.min}`);
              }
              if (field.max !== undefined) {
                validator = validator.max(new Date(field.max), `La fecha debe ser anterior a ${field.max}`);
              }
              break;

            case 'autocomplete':
              validator = yup.string();
              break;

            case 'select':
            case 'radio':
              validator = yup.string();

              if (field.allowOther) {
                validator = validator.test(
                  'other-required',
                  'Especifique el valor para "Otro"',
                  function (value: any) {
                    if (isOtroOption(field, value, data)) {
                      const otherValue = data[`${field.name}_other`];
                      return otherValue && otherValue.trim().length > 0;
                    }
                    return true;
                  }
                );
              }
              break;

            case 'checkbox':
              if (field.options && field.options.length > 0) {
                validator = yup.array().of(yup.number());

                if (field.allowOther) {
                  validator = validator.test(
                    'other-required-checkbox',
                    'Especifique el valor para "Otro"',
                    function (value: any) {
                      if (isOtroSelectedInCheckbox(field, value)) {
                        const otherValue = data[`${field.name}_other`];
                        return otherValue && otherValue.trim().length > 0;
                      }
                      return true;
                    }
                  );
                }
              } else {
                validator = yup.boolean();
              }
              break;

            default:
              validator = yup.mixed();
          }

          if (field.required) {
            validator = validator.required('Este campo es requerido');
          }

          acc[field.name] = validator;

        return acc;
      }, {})
    );

    try {
      schema.validateSync(data, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // console.log('Errores de validación:', error.errors);
      }
      return false;
    }
  };
  
  const handleNext = () => {
    if (isStepValid(currentConfig, formData)) {
      setNavigationDirection('forward');
      setIsAnimating(true);
      // Hacer scroll al top - buscar el contenedor de scroll o usar window
      const scrollContainer = formRef.current?.closest('main') || formRef.current?.closest('[class*="overflow"]');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos requeridos antes de continuar.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handlePrev = () => {
    setNavigationDirection('backward');
    setIsAnimating(true);
    // Hacer scroll al top - buscar el contenedor de scroll o usar window
    const scrollContainer = formRef.current?.closest('main') || formRef.current?.closest('[class*="overflow"]');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async () => {
    if (submitLockRef.current || isSubmittingForm) {
      return;
    }

    if (isStepValid(currentConfig, formData)) {
      setIsSubmittingForm(true);
      submitLockRef.current = true;
      try {
        // Limpiar campos _other antes de enviar
        const cleanedData = { ...formData };
        steps.forEach(step => {
          step.fields.forEach(field => {
            if (!field.allowOther) {
              delete cleanedData[`${field.name}_other`];
            }
          });
        });

        await onSubmit(cleanedData);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('stepform-draft');
        }
        toast({
          title: "¡Formulario enviado!",
          description: "Tu información ha sido guardada exitosamente.",
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: "Error al enviar",
          description: "Hubo un problema al guardar tu información. Por favor intenta de nuevo.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        submitLockRef.current = false;
        setIsSubmittingForm(false);
      }
    } else {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos requeridos antes de enviar.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };
  
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = isStepValid(currentConfig, formData);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && !(e.target instanceof HTMLTextAreaElement)) {
        if (!isLastStep && canProceed) {
          e.preventDefault();
          handleNext();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, canProceed, isLastStep]);
  
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const diffX = touchStartX - touchEndX;
      const diffY = Math.abs(touchStartY - touchEndY);
      const minSwipeDistance = 50;
      
      if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffX) > diffY) {
        if (diffX > 0 && !isLastStep && canProceed) {
          handleNext();
        } else if (diffX < 0 && currentStep > 0) {
          handlePrev();
        }
      }
    };
    
    const formElement = formRef.current;
    if (formElement && window.innerWidth < 768) {
      formElement.addEventListener('touchstart', handleTouchStart);
      formElement.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        formElement.removeEventListener('touchstart', handleTouchStart);
        formElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentStep, canProceed, isLastStep]);

  return (
    <div ref={formRef} className="w-full relative min-h-screen pb-12">
      {/* Sticky Compact Header - Mobile First */}
      <div className="sticky top-4 z-40 px-2 sm:px-0 mb-6">
        <VisionGlassWindow variant="lighter" className="mx-auto max-w-3xl p-3 flex items-center gap-4 shadow-lg">
          {/* Circular Progress Indicator (Compact) */}
          <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted/30"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-primary transition-all duration-500 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${progress}, 100`}
              />
            </svg>
            <span className="absolute text-[10px] font-bold">{Math.round(progress)}%</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <VisionTypography variant="caption" className="text-muted-foreground">
                Paso {currentStep + 1} de {steps.length}
              </VisionTypography>
              {lastSaved && (
                 <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                   • <Save className="w-3 h-3" />
                 </span>
              )}
            </div>
            <VisionTypography variant="headline" className="truncate">
              {currentConfig.title}
            </VisionTypography>
          </div>
        </VisionGlassWindow>
      </div>

      {/* Main Content Area - Floating Island */}
      <div className="px-2 sm:px-0 max-w-3xl mx-auto">
        <VisionGlassWindow
          variant="default"
          className={`transition-all duration-500 ${
            isAnimating
              ? `opacity-50 blur-sm scale-95`
              : 'opacity-100 blur-0 scale-100'
          }`}
        >
          <div className="p-6 min-h-[300px]">
            <Step
              config={currentConfig}
              data={formData}
              onDataChange={handleDataChange}
              stepIndex={currentStep}
              errors={errors[currentStep] || {}}
            />
          </div>

          {/* Navigation Buttons - Mobile First Design */}
          <div className="border-t border-border/50 bg-muted/20 px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Botón Anterior - Mobile First */}
              <VisionInteractive asChild>
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`
                    flex items-center gap-1.5 sm:gap-2 
                    h-12 sm:h-10 
                    px-4 sm:px-3
                    text-base sm:text-sm
                    min-w-[100px] sm:min-w-0
                    touch-manipulation
                    ${currentStep === 0 ? 'invisible' : ''}
                  `}
                >
                  <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="font-medium sm:font-normal">Anterior</span>
                </Button>
              </VisionInteractive>

              {/* Indicador de paso - Responsive */}
              <div className="text-center hidden xs:block sm:block">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Paso <span className="font-semibold text-foreground">{currentStep + 1}</span> de {steps.length}
                </p>
              </div>

              {/* Botón Siguiente/Finalizar - Mobile First */}
              {!isLastStep ? (
                <VisionInteractive asChild>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed || isAnimating}
                    className="
                      flex items-center gap-1.5 sm:gap-2 
                      h-12 sm:h-10 
                      px-5 sm:px-4
                      text-base sm:text-sm
                      min-w-[110px] sm:min-w-0
                      bg-primary hover:bg-primary/90
                      font-semibold sm:font-medium
                      shadow-md sm:shadow-sm
                      touch-manipulation
                    "
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
                  </Button>
                </VisionInteractive>
              ) : (
                <VisionInteractive asChild>
                  <Button
                    variant="default"
                    onClick={handleSubmit}
                    disabled={!canProceed || isSubmittingForm}
                    className="
                      flex items-center gap-1.5 sm:gap-2 
                      h-12 sm:h-10 
                      px-5 sm:px-4
                      text-base sm:text-sm
                      min-w-[110px] sm:min-w-0
                      bg-primary hover:bg-primary/90
                      font-semibold sm:font-medium
                      shadow-md sm:shadow-sm
                      touch-manipulation
                    "
                  >
                    {isSubmittingForm ? (
                      <>
                        <Loader2 className="w-5 h-5 sm:w-4 sm:h-4 animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>Finalizar</span>
                        <Send className="w-5 h-5 sm:w-4 sm:h-4" />
                      </>
                    )}
                  </Button>
                </VisionInteractive>
              )}
            </div>
            
            {/* Mobile: Step indicator below buttons */}
            <div className="block xs:hidden sm:hidden mt-2 text-center">
              <p className="text-xs text-muted-foreground">
                Paso <span className="font-semibold text-foreground">{currentStep + 1}</span> de {steps.length}
              </p>
            </div>
          </div>
        </VisionGlassWindow>
      </div>
    </div>
  );
};

export default StepForm;
