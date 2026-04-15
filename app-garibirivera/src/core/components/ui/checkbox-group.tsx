"use client"

/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

import * as React from "react"
import { Checkbox } from "@/core/components/ui/checkbox"
import { Label } from "@/core/components/ui/label"
import { cn } from "@/core/utils/utils"

interface CheckboxGroupProps {
  label: string
  name: string
  options: Array<Record<string, any>>
  idKey?: string
  valueKey?: string
  value: string[]
  onChange: (value: string[]) => void
  className?: string
  error?: string
  required?: boolean
  hidden?: boolean
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  options,
  idKey = "id",
  valueKey = "value",
  value,
  onChange,
  className,
  error,
  required = false,
  hidden = false,
}) => {
  // Validation
  if (!options || options.length === 0) {
    return <div className="text-destructive text-sm p-2 bg-destructive/10 rounded-md border border-destructive/20">Error: Options array is empty.</div>
  }
  for (const option of options) {
    if (!(idKey in option) || !(valueKey in option)) {
      return <div className="text-destructive text-sm p-2 bg-destructive/10 rounded-md border border-destructive/20">Error: Each option must have '{idKey}' and '{valueKey}' properties.</div>
    }
  }

  const handleChange = (id: string, checked: boolean) => {
    if (checked) {
      onChange([...value, id])
    } else {
      onChange(value.filter(v => v !== id))
    }
  }

  return (
    <div className={cn("space-y-4", className)} hidden={hidden}>
      {label && (
        <Label className="text-base font-semibold text-foreground leading-tight">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option[idKey]}
            className="group flex items-start space-x-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 hover:border-primary/20 transition-all duration-200"
          >
            <Checkbox
              id={`${name}-${option[idKey]}`}
              name={name}
              checked={value.includes(option[idKey])}
              onCheckedChange={(checked) => handleChange(option[idKey], checked as boolean)}
              className="mt-0.5 h-5 w-5 text-primary focus:ring-primary/20 border-border rounded transition-all duration-200 group-hover:border-primary/50"
            />
            <Label
              htmlFor={`${name}-${option[idKey]}`}
              className="text-sm text-foreground leading-relaxed cursor-pointer flex-1 font-medium group-hover:text-primary/90 transition-colors duration-200"
            >
              {option[valueKey]}
            </Label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-destructive text-sm font-medium flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-destructive rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  )
}
