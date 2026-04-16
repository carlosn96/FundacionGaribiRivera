// src/core/components/step-form/Step.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { StepProps, SubField, Field } from './types';
import { Input } from '@/core/components/ui/input';
import { Textarea } from '@/core/components/ui/textarea';
import { Label } from '@/core/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/core/components/ui/radio-group';
import { Checkbox } from '@/core/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { AutocompleteInput } from './AutocompleteInput';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/ui/alert';
import { CheckCircle2, XCircle, HelpCircle, AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/core/components/ui/tooltip';

const Step: React.FC<StepProps> = ({ config, data, onDataChange, stepIndex, errors = {} }) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const markFieldAsTouched = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  };

  const isFieldValid = (fieldName: string): boolean => {
    return touchedFields.has(fieldName) && !errors[fieldName] && Boolean(data[fieldName]);
  };

  const hasFieldError = (fieldName: string): boolean => {
    return touchedFields.has(fieldName) && Boolean(errors[fieldName]);
  };

  // Función helper para verificar si un valor corresponde a "Otro"
  const isOtroOption = (field: any, selectedValue: any): boolean => {
    if (!field.allowOther || !field.options || !selectedValue) return false;

    const selectedOption = field.options.find((opt: any) => {
      const optionId = field.idKey ? opt[field.idKey] : opt.id;
      return String(optionId) === String(selectedValue);
    });

    if (!selectedOption) return false;

    const optionText = field.valueKey ? selectedOption[field.valueKey] : selectedOption.value || selectedOption.descripcion;
    return String(optionText).toLowerCase().trim() === 'otro';
  };

  // Función helper para verificar si "Otro" está seleccionado en un checkbox múltiple
  const isOtroSelectedInCheckbox = (field: any, selectedValues: any[]): boolean => {
    if (!field.allowOther || !field.options || !Array.isArray(selectedValues)) return false;

    // Buscar si alguno de los valores seleccionados corresponde a "Otro"
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

  const renderTextField = (field: any, fieldValue: any) => {
    return (
      <div key={field.name} className="space-y-2 animate-slide-up">
        <div className="flex items-center gap-2">
          <Label htmlFor={field.name} className="text-sm font-medium flex items-center gap-1">
            <span dangerouslySetInnerHTML={{ __html: field.label }} />
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {field.placeholder && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="tooltip-premium max-w-xs">
                  <p>{field.placeholder}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="relative">
          <Input
            id={field.name}
            name={field.name}
            type="text"
            value={fieldValue || ''}
            onChange={(e) => {
              onDataChange(field.name, e.target.value);
              markFieldAsTouched(field.name);
            }}
            onBlur={() => markFieldAsTouched(field.name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            readOnly={field.readOnly}
            maxLength={field.maxLength}
            className={`w-full pr-10 transition-all ${hasFieldError(field.name) ? 'field-error' :
              isFieldValid(field.name) ? 'field-success border-2' : ''
              }`}
          />
          {/* Icono de estado */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {hasFieldError(field.name) && (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
            {isFieldValid(field.name) && (
              <CheckCircle2 className="w-5 h-5 text-chart-5 animate-success-bounce" />
            )}
          </div>
        </div>
        {/* Mensaje de error */}
        {hasFieldError(field.name) && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-up">
            <AlertCircle className="w-4 h-4" />
            {errors[field.name]}
          </p>
        )}
      </div>
    );
  };

  const renderTelField = (field: any, fieldValue: any) => {
    return (
      <div key={field.name} className="space-y-2 animate-slide-up">
        <div className="flex items-center gap-2">
          <Label htmlFor={field.name} className="text-sm font-medium">
            <span dangerouslySetInnerHTML={{ __html: field.label }} />
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {field.placeholder && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="tooltip-premium">
                  <p>{field.placeholder}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="relative">
          <Input
            id={field.name}
            name={field.name}
            type="tel"
            value={fieldValue || ''}
            onChange={(e) => {
              onDataChange(field.name, e.target.value);
              markFieldAsTouched(field.name);
            }}
            onBlur={() => markFieldAsTouched(field.name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            readOnly={field.readOnly}
            maxLength={field.maxLength}
            className={`w-full pr-10 transition-all ${hasFieldError(field.name) ? 'field-error' :
              isFieldValid(field.name) ? 'field-success border-2' : ''
              }`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {hasFieldError(field.name) && (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
            {isFieldValid(field.name) && (
              <CheckCircle2 className="w-5 h-5 text-chart-5 animate-success-bounce" />
            )}
          </div>
        </div>
        {hasFieldError(field.name) && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-up">
            <AlertCircle className="w-4 h-4" />
            {errors[field.name]}
          </p>
        )}
      </div>
    );
  };

  const renderNumberField = (field: any, fieldValue: any) => {
    return (
      <div key={field.name} className="space-y-2 animate-slide-up">
        <div className="flex items-center gap-2">
          <Label htmlFor={field.name} className="text-sm font-medium">
            <span dangerouslySetInnerHTML={{ __html: field.label }} />
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        </div>
        <div className="relative">
          <Input
            id={field.name}
            name={field.name}
            type="number"
            value={fieldValue || ''}
            onChange={(e) => {
              const value = e.target.value;
              onDataChange(field.name, value === '' ? '' : Number(value));
              markFieldAsTouched(field.name);
            }}
            onBlur={() => markFieldAsTouched(field.name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            readOnly={field.readOnly}
            className={`w-full pr-10 transition-all ${hasFieldError(field.name) ? 'field-error' :
              isFieldValid(field.name) ? 'field-success border-2' : ''
              }`}
            min={field.min !== undefined ? field.min : undefined}
            max={field.max !== undefined ? field.max : undefined}
            step={field.step !== undefined ? field.step : undefined}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {hasFieldError(field.name) && (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
            {isFieldValid(field.name) && (
              <CheckCircle2 className="w-5 h-5 text-chart-5 animate-success-bounce" />
            )}
          </div>
        </div>
        {(field.min !== undefined || field.max !== undefined) && (
          <p className="text-xs text-muted-foreground">
            {field.min !== undefined && field.max !== undefined
              ? `Rango permitido: ${field.min} - ${field.max}`
              : field.min !== undefined
                ? `Valor mínimo: ${field.min}`
                : `Valor máximo: ${field.max}`}
          </p>
        )}
        {hasFieldError(field.name) && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-up">
            <AlertCircle className="w-4 h-4" />
            {errors[field.name]}
          </p>
        )}
      </div>
    );
  };

  const renderTextareaField = (field: any, fieldValue: any) => {
    return (
      <div key={field.name} className="space-y-2 animate-slide-up">
        <div className="flex items-center gap-2">
          <Label htmlFor={field.name} className="text-sm font-medium">
            <span dangerouslySetInnerHTML={{ __html: field.label }} />
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        </div>
        <div className="relative">
          <Textarea
            id={field.name}
            name={field.name}
            value={fieldValue || ''}
            onChange={(e) => {
              onDataChange(field.name, e.target.value);
              markFieldAsTouched(field.name);
            }}
            onBlur={() => markFieldAsTouched(field.name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            readOnly={field.readOnly}
            rows={field.rows}
            cols={field.cols}
            maxLength={field.maxLength}
            className={`w-full min-h-[100px] transition-all ${hasFieldError(field.name) ? 'field-error' :
              isFieldValid(field.name) ? 'field-success border-2' : ''
              }`}
          />
        </div>
        {hasFieldError(field.name) && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-up">
            <AlertCircle className="w-4 h-4" />
            {errors[field.name]}
          </p>
        )}
      </div>
    );
  };

  const renderDateField = (field: any, fieldValue: any) => {
    return (
      <div key={field.name} className="space-y-2 animate-slide-up">
        <div className="flex items-center gap-2">
          <Label htmlFor={field.name} className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        </div>
        <div className="relative">
          <Input
            id={field.name}
            name={field.name}
            type="date"
            value={fieldValue || ''}
            onChange={(e) => {
              onDataChange(field.name, e.target.value);
              markFieldAsTouched(field.name);
            }}
            onBlur={() => markFieldAsTouched(field.name)}
            disabled={field.disabled}
            readOnly={field.readOnly}
            className={`w-full pr-10 transition-all ${hasFieldError(field.name) ? 'field-error' :
              isFieldValid(field.name) ? 'field-success border-2' : ''
              }`}
            min={field.min}
            max={field.max}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {hasFieldError(field.name) && (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
            {isFieldValid(field.name) && (
              <CheckCircle2 className="w-5 h-5 text-chart-5 animate-success-bounce" />
            )}
          </div>
        </div>
        {(field.min || field.max) && (
          <p className="text-xs text-muted-foreground">
            {field.min && field.max
              ? `Rango permitido: ${field.min} a ${field.max}`
              : field.min
                ? `Fecha mínima: ${field.min}`
                : `Fecha máxima: ${field.max}`}
          </p>
        )}
        {hasFieldError(field.name) && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-up">
            <AlertCircle className="w-4 h-4" />
            {errors[field.name]}
          </p>
        )}
      </div>
    );
  };

  const renderSelectField = (field: any, fieldValue: any, showOtherField: boolean) => {
    const otherFieldValue = data[`${field.name}_other`];

    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Select
          value={fieldValue ? String(fieldValue) : ''}
          onValueChange={(value: string) => {
            onDataChange(field.name, value);
            // Limpiar el campo "otro" si se selecciona una opción diferente
            if (!isOtroOption(field, value)) {
              onDataChange(`${field.name}_other`, '');
            }
          }}
          disabled={field.disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={field.placeholder || 'Seleccionar...'} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option: any) => {
              const optionId = field.idKey ? option[field.idKey] : option.id;
              const optionValue = field.valueKey ? option[field.valueKey] : option.value || option.descripcion;

              return (
                <SelectItem key={optionId} value={String(optionId)}>
                  {optionValue}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* Campo adicional para "Otro" */}
        {showOtherField && (
          <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
            <Label htmlFor={`${field.name}_other`} className="text-sm font-medium">
              {field.otherLabel || 'Especifique:'}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id={`${field.name}_other`}
              name={`${field.name}_other`}
              type="text"
              value={typeof otherFieldValue === 'string' ? otherFieldValue : ''}
              onChange={(e) => onDataChange(`${field.name}_other`, e.target.value)}
              placeholder={field.otherLabel || 'Especifique ...'}
              disabled={field.disabled}
              readOnly={field.readOnly}
              className="w-full mt-2"
            />
          </div>
        )}
      </div>
    );
  };

  const renderYesNoRadioField = (field: any, fieldValue: any) => {
    // Modo SI/NO condicional
    const yesValue = 1; // Cambiar a 1
    const noValue = 0; // Cambiar a 0
    const yesLabel = field.yesOption || 'Sí';
    const noLabel = field.noOption || 'No';
    const selectedValue = fieldValue !== undefined ? Number(fieldValue) : '';

    return (
      <div key={field.name} className="space-y-3">
        <Label className="text-sm font-medium">
          <span dangerouslySetInnerHTML={{ __html: field.label }} />
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <RadioGroup
          value={String(selectedValue)} // Convertir a cadena para evitar errores de tipo
          onValueChange={(value: string) => {
            onDataChange(field.name, Number(value)); // Convertir a número
          }}
          disabled={field.disabled}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={String(yesValue)} id={`${field.name}-si`} />
            <Label htmlFor={`${field.name}-si`} className="font-normal cursor-pointer">
              {yesLabel}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={String(noValue)} id={`${field.name}-no`} />
            <Label htmlFor={`${field.name}-no`} className="font-normal cursor-pointer">
              {noLabel}
            </Label>
          </div>
        </RadioGroup>

        {/* Campos adicionales para SI */}
        {selectedValue === yesValue && field.yesFields && field.yesFields.length > 0 && (
          <div className="mt-4 space-y-3 border-l-2 border-primary/20 pl-4 animate-in slide-in-from-top-2 duration-200">
            {field.yesFields.map((subField: SubField, index: number) => {
              return renderField(subField);
            })}
          </div>
        )}

        {/* Campos adicionales para NO */}
        {selectedValue === noValue && field.noFields && field.noFields.length > 0 && (
          <div className="mt-4 space-y-3 border-l-2 border-primary/20 pl-4 animate-in slide-in-from-top-2 duration-200">
            {field.noFields.map((subField: SubField, index: number) => {
              return renderField(subField);
            })}
          </div>
        )}
      </div>
    );
  };

  const renderStandardRadioField = (field: any, fieldValue: any, showOtherField: boolean) => {
    const otherFieldValue = data[`${field.name}_other`];

    return (
      <div key={field.name} className="space-y-3">
        <Label className="text-sm font-medium">
          <span dangerouslySetInnerHTML={{ __html: field.label }} />
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <RadioGroup
          value={fieldValue ? String(fieldValue) : ''}
          onValueChange={(value: string) => {
            onDataChange(field.name, value);
            // Limpiar el campo "otro" si se selecciona una opción diferente
            if (!isOtroOption(field, value)) {
              onDataChange(`${field.name}_other`, '');
            }
          }}
          disabled={field.disabled}
          className="space-y-2"
        >
          {field.options?.map((option: any) => {
            const optionId = field.idKey ? option[field.idKey] : option.id;
            const optionValue = field.valueKey ? option[field.valueKey] : option.value || option.descripcion;

            return (
              <div key={optionId} className="flex items-center space-x-2">
                <RadioGroupItem value={String(optionId)} id={`${field.name}-${optionId}`} />
                <Label htmlFor={`${field.name}-${optionId}`} className="font-normal cursor-pointer">
                  {optionValue}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {/* Campo adicional para "Otro" */}
        {showOtherField && (
          <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
            <Label htmlFor={`${field.name}_other`} className="text-sm font-medium">
              {field.otherLabel || 'Especifique:'}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id={`${field.name}_other`}
              name={`${field.name}_other`}
              type="text"
              value={typeof otherFieldValue === 'string' ? otherFieldValue : ''}
              onChange={(e) => onDataChange(`${field.name}_other`, e.target.value)}
              placeholder="Especifique otro..."
              disabled={field.disabled}
              readOnly={field.readOnly}
              className="w-full mt-2"
            />
          </div>
        )}
      </div>
    );
  };

  const renderCheckboxField = (field: any, fieldValue: any) => {
    const otherFieldValue = data[`${field.name}_other`];

    // Checkbox múltiple (con opciones)
    if (field.options && field.options.length > 0) {
      const showCheckboxOtherField = isOtroSelectedInCheckbox(field, fieldValue);

      return (
        <div key={field.name} className="space-y-3">
          <Label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          <div className="space-y-2">
            {field.options.map((option: any) => {
              const optionId = field.idKey ? option[field.idKey] : option.id;
              const optionValue = field.valueKey ? option[field.valueKey] : option.value || option.descripcion;
              const isChecked = Array.isArray(fieldValue) && fieldValue.includes(optionId);

              return (
                <div key={optionId} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.name}-${optionId}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const currentValues = Array.isArray(fieldValue) ? fieldValue : [];
                      let newValues;
                      if (checked) {
                        newValues = [...currentValues, optionId];
                        onDataChange(field.name, newValues);
                      } else {
                        newValues = currentValues.filter((v: any) => v !== optionId);
                        onDataChange(field.name, newValues);

                        // Si se desmarca "Otro", limpiar el campo adicional
                        if (field.allowOther && isOtroOption(field, optionId)) {
                          onDataChange(`${field.name}_other`, '');
                        }
                      }

                      // Ejecutar onChange personalizado si existe
                      field.onChange?.(newValues, data, onDataChange);

                      // Limpiar el campo "other" si "Otro" ya no está seleccionado
                      if (field.allowOther && !isOtroSelectedInCheckbox(field, newValues)) {
                        onDataChange(`${field.name}_other`, '');
                      }
                    }}
                    disabled={field.disabled}
                  />
                  <Label htmlFor={`${field.name}-${optionId}`} className="font-normal cursor-pointer">
                    {optionValue}
                  </Label>
                </div>
              );
            })}
          </div>

          {/* Campo adicional para "Otro" en checkbox múltiple */}
          {showCheckboxOtherField && (
            <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
              <Label htmlFor={`${field.name}_other`} className="text-sm font-medium">
                {field.otherLabel || 'Especifique otro:'}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id={`${field.name}_other`}
                name={`${field.name}_other`}
                type="text"
                value={typeof otherFieldValue === 'string' ? otherFieldValue : ''}
                onChange={(e) => onDataChange(`${field.name}_other`, e.target.value)}
                placeholder="Especifique otro..."
                disabled={field.disabled}
                readOnly={field.readOnly}
                className="w-full mt-2"
              />
            </div>
          )}
        </div>
      );
    }

    // Checkbox simple (true/false)
    return (
      <div key={field.name} className="flex items-center space-x-2">
        <Checkbox
          id={field.name}
          checked={Boolean(fieldValue)}
          onCheckedChange={(checked) => {
            onDataChange(field.name, checked);
            field.onChange?.(checked, data, onDataChange);
          }}
          disabled={field.disabled}
        />
        <Label htmlFor={field.name} className="font-normal cursor-pointer">
          <span dangerouslySetInnerHTML={{ __html: field.label }} />
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
      </div>
    );
  };

  const renderAutocompleteField = (field: any, fieldValue: any) => {
    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name} className="text-sm font-medium">
          <span dangerouslySetInnerHTML={{ __html: field.label }} />
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <AutocompleteInput
          value={fieldValue ? String(fieldValue) : ''}
          valueLabel={field.valueLabelField ? String(data[field.valueLabelField] ?? '') : undefined}
          onValueChange={(value) => onDataChange(field.name, value)}
          searchFunction={field.searchFunction}
          resolveOptionByValue={field.resolveOptionByValue}
          cacheKey={field.cacheKey || `${config.id}:${field.name}`}
          debounceTime={field.debounceTime}
          minQueryLength={field.minQueryLength}
          placeholder={field.placeholder}
          searchPlaceholder={field.searchPlaceholder || field.placeholder || 'Buscar...'}
          noResultsText={field.noResultsText || 'No se encontraron resultados.'}
          loadingText={field.loadingText || 'Cargando...'}
          disabled={field.disabled}
          readOnly={field.readOnly}
          onSelect={field.onSelect ? (selectedOption) => field.onSelect!(selectedOption, onDataChange) : undefined}
          onClear={field.onClear ? () => field.onClear!(onDataChange) : undefined}
          maxLength={field.maxLength}
          className="w-full"
        />
      </div>
    );
  };

  const renderAlertField = (field: any) => {
    const variant = field.variant ?? 'info';

    const alertConfig = {
      success: {
        icon: '✓',
        iconClass: 'text-chart-5',
        containerClass:
          'border-chart-5 bg-chart-5/10 dark:bg-chart-5/5',
      },
      warning: {
        icon: '⚠',
        iconClass: 'text-primary',
        containerClass:
          'border-primary bg-primary/10 dark:bg-primary/5',
      },
      destructive: {
        icon: '✕',
        iconClass: 'text-destructive',
        containerClass:
          'border-destructive bg-destructive/10 dark:bg-destructive/5',
      },
      info: {
        icon: 'ℹ',
        iconClass: 'text-accent',
        containerClass:
          'border-accent bg-accent/10 dark:bg-accent/5',
      },
    } as const;

    const config =
      alertConfig[variant as keyof typeof alertConfig] ??
      alertConfig.info;

    return (
      <div
        key={field.name}
        className={`border-l-4 p-4 rounded-r-lg text-foreground w-full ${config.containerClass}`}
      >
        <div className="flex items-start">
          <div className={`flex-shrink-0 mr-3 text-lg ${config.iconClass}`}>
            {field.icon ?? config.icon}
          </div>

          <div className="flex-1">
            {field.title && (
              <h4 className="font-semibold text-sm mb-1">
                {field.title}
              </h4>
            )}

            {field.description && (
              <p className="text-sm opacity-90">
                {field.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderField = (field: any) => {
    // Validación de visibilidad
    if ((field.condition && !field.condition(data)) || field.hidden) {
      return null;
    }

    // Valor inicializado desde StepForm
    const fieldValue = data[field.name];
    const showOtherField = isOtroOption(field, fieldValue);
    
    const fieldRenderers: Record<string, () => React.ReactNode> = {
      text: () => renderTextField(field, fieldValue),
      tel: () => renderTelField(field, fieldValue),
      number: () => renderNumberField(field, fieldValue),
      textarea: () => renderTextareaField(field, fieldValue),
      date: () => renderDateField(field, fieldValue),
      select: () =>
        renderSelectField(field, fieldValue, showOtherField),
      radio: () =>
        field.yesNoMode
          ? renderYesNoRadioField(field, fieldValue)
          : renderStandardRadioField(field, fieldValue, showOtherField),
      checkbox: () => renderCheckboxField(field, fieldValue),
      autocomplete: () => renderAutocompleteField(field, fieldValue),
      alert: () => renderAlertField(field),
    };

    return fieldRenderers[field.type]?.() ?? null;
  };


  const hiddenFields = useMemo(() => {
    const hidden = new Set<string>();
    config.fields.forEach(field => {
      if ((field.condition && !field.condition(data)) || field.hidden) {
        hidden.add(field.name);
        hidden.add(`${field.name}_other`);
      }
    });
    return hidden;
  }, [data, config.fields]);

  const previousHiddenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const newHidden = new Set(hiddenFields);
    const toClean = new Set<string>();
    newHidden.forEach(field => {
      if (!previousHiddenRef.current.has(field)) {
        toClean.add(field);
      }
    });
    toClean.forEach(fieldName => {
      if (data[fieldName] !== undefined) {
        onDataChange(fieldName, fieldName.endsWith('_other') ? '' : undefined);
      }
    });
    previousHiddenRef.current = newHidden;
  }, [hiddenFields]);

  return (
    <div className="space-y-6">
      {config.description && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{config.title}</h2>
          <p className="text-muted-foreground">{config.description}</p>
        </div>
      )}

      <div className="space-y-6">
        {config.fields.map((field) => renderField(field))}
      </div>
    </div>
  );
};

export default Step;
