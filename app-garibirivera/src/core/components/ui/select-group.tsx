"use client"

/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select"
import { Label } from "@/core/components/ui/label"
import { Input } from "@/core/components/ui/input"
import { cn } from "@/core/utils/utils"

interface SelectGroupProps {
  label: string
  name: string
  options: Array<Record<string, any>>
  idKey?: string
  valueKey?: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  error?: string
  required?: boolean
  hidden?: boolean
  allowOther?: boolean
  otherValue?: string
  otherOnChange?: (value: string) => void
  otherPlaceholder?: string
}

export const SelectGroup: React.FC<SelectGroupProps> = ({
  label,
  name,
  options,
  idKey = "id",
  valueKey = "value",
  value = '',
  onChange,
  placeholder = "Select an option",
  className,
  error,
  required = false,
  hidden = false,
  allowOther = false,
  otherValue = '',
  otherOnChange,
  otherPlaceholder = "Especifique otro...",
}) => {
  const [showOther, setShowOther] = React.useState(false);

  React.useEffect(() => {
    if (allowOther && value) {
      const selectedOption = options.find(opt => String(opt[idKey]) === String(value));
      const isOtro = selectedOption && selectedOption[valueKey] && String(selectedOption[valueKey]).toLowerCase().trim() === 'otro';
      setShowOther(Boolean(isOtro));
    } else {
      setShowOther(false);
    }
  }, [value, allowOther, options, idKey, valueKey]);

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
    // Immediately update showOther based on the new value
    if (allowOther && newValue) {
      const selectedOption = options.find(opt => String(opt[idKey]) === String(newValue));
      const isOtro = selectedOption && selectedOption[valueKey] && String(selectedOption[valueKey]).toLowerCase().trim() === 'otro';
      setShowOther(Boolean(isOtro));
    } else {
      setShowOther(false);
    }
  };
  // Validation
  if (!options || options.length === 0) {
    return <div className="text-destructive text-sm p-2 bg-destructive/10 rounded-md border border-destructive/20">Error: Options array is empty.</div>
  }
  for (const option of options) {
    if (!(idKey in option) || !(valueKey in option)) {
      return <div className="text-destructive text-sm p-2 bg-destructive/10 rounded-md border border-destructive/20">Error: Each option must have '{idKey}' and '{valueKey}' properties.</div>
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <Label className="text-base font-semibold text-foreground leading-tight">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Select value={value} onValueChange={handleValueChange} name={name}>
        <SelectTrigger hidden={hidden} className={`h-12 w-full border border-border bg-card text-foreground placeholder:text-muted-foreground transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
          error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''
        }`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-popover border border-border shadow-xl rounded-lg max-h-60">
          {options.map((option) => (
            <SelectItem
              key={option[idKey]}
              value={option[idKey]}
              className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer py-3 px-4 pl-8 text-popover-foreground transition-colors duration-150"
            >
              {option[valueKey]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showOther && (
        <div className="mt-3 p-3 border border-dashed border-muted-foreground/30 rounded-lg bg-muted/20">
          <Input
            value={otherValue}
            onChange={(e) => otherOnChange?.(e.target.value)}
            placeholder={otherPlaceholder}
            className={`h-12 w-full border border-border bg-card text-foreground placeholder:text-muted-foreground transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''
            }`}
          />
        </div>
      )}
      {error && (
        <p className="text-destructive text-sm font-medium flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-destructive rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  )
}
