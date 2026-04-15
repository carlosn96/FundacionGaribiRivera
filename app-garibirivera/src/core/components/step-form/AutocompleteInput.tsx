"use client"

import * as React from "react"
import AsyncSelect from 'react-select/async'
import { components } from 'react-select'

export type AutocompleteOption = { value: string; label: string; [key: string]: unknown }

const globalOptionsCacheByKey: Map<string, Map<string, AutocompleteOption>> = new Map()

function getOptionsCache(cacheKey: string) {
  let cache = globalOptionsCacheByKey.get(cacheKey)
  if (!cache) {
    cache = new Map<string, AutocompleteOption>()
    globalOptionsCacheByKey.set(cacheKey, cache)
  }
  return cache
}

interface AutocompleteInputProps {
  value?: string
  valueLabel?: string
  onValueChange: (value: string) => void
  searchFunction?: (query: string) => Promise<AutocompleteOption[]>
  resolveOptionByValue?: (value: string) => Promise<AutocompleteOption | null>
  cacheKey?: string
  debounceTime?: number
  minQueryLength?: number
  placeholder?: string
  searchPlaceholder?: string
  noResultsText?: string
  loadingText?: string
  disabled?: boolean
  readOnly?: boolean
  onSelect?: (selectedOption: AutocompleteOption) => void
  onClear?: () => void
  className?: string
  maxLength?: number
}

export function AutocompleteInput({
  value,
  valueLabel,
  onValueChange,
  searchFunction,
  resolveOptionByValue,
  cacheKey = "default",
  debounceTime = 300,
  minQueryLength = 1,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  noResultsText = "No results found.",
  loadingText = "Loading...",
  disabled = false,
  readOnly = false,
  onSelect,
  onClear,
  className,
  maxLength,
}: AutocompleteInputProps) {
  const [selectedOption, setSelectedOption] = React.useState<AutocompleteOption | null>(null)
  const selectedOptionRef = React.useRef<AutocompleteOption | null>(null)
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastLoadRequestId = React.useRef(0)
  const lastResolveRequestId = React.useRef(0)
  const optionsByValueRef = React.useRef<Map<string, AutocompleteOption>>(getOptionsCache(cacheKey))

  React.useEffect(() => {
    optionsByValueRef.current = getOptionsCache(cacheKey)
  }, [cacheKey])

  React.useEffect(() => {
    selectedOptionRef.current = selectedOption
  }, [selectedOption])

  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
      lastLoadRequestId.current += 1
      lastResolveRequestId.current += 1
    }
  }, [])

  const loadOptions = React.useCallback(
    async (inputValue: string) => {
      const requestId = ++lastLoadRequestId.current

      return new Promise<AutocompleteOption[]>((resolve) => {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current)
        }
        debounceTimer.current = setTimeout(async () => {
          if (requestId !== lastLoadRequestId.current) {
            resolve([])
            return
          }
          if (inputValue.length < minQueryLength) {
            resolve([])
            return
          }
          try {
            const results = searchFunction ? await searchFunction(inputValue) : []

            for (const opt of results) {
              if (opt?.value) {
                optionsByValueRef.current.set(opt.value, opt)
              }
            }
            resolve(results)
          } catch (error) {
            console.error("Search error:", error)
            resolve([])
          }
        }, debounceTime)
      })
    },
    [searchFunction, minQueryLength, debounceTime]
  )

  // Sync selectedOption with value prop.
  // Key behavior: if the form only stores the ID (value), we try to restore the label
  // via cache, resolveOptionByValue, or a best-effort searchFunction fallback.
  React.useEffect(() => {
    const nextValue = (value ?? '').trim()
    const nextValueLabel = (valueLabel ?? '').trim()

    if (!nextValue) {
      setSelectedOption(null)
      return
    }

    // If caller provides the label for the current value, prefer it.
    // This is critical when the backend search cannot resolve by ID.
    if (nextValueLabel) {
      const optFromLabel: AutocompleteOption = { value: nextValue, label: nextValueLabel }
      optionsByValueRef.current.set(nextValue, optFromLabel)
      setSelectedOption(optFromLabel)
      return
    }

    const current = selectedOptionRef.current
    if (current?.value === nextValue && current.label && current.label !== nextValue) {
      return
    }

    const cached = optionsByValueRef.current.get(nextValue)
    if (cached) {
      setSelectedOption(cached)
      return
    }

    // Show something immediately (ID) while resolving label
    if (!current || current.value !== nextValue) {
      setSelectedOption({ value: nextValue, label: nextValue })
    }

    const requestId = ++lastResolveRequestId.current

    ;(async () => {
      let resolved: AutocompleteOption | null = null

      if (resolveOptionByValue) {
        try {
          resolved = await resolveOptionByValue(nextValue)
        } catch (error) {
          console.error('Resolve option error:', error)
        }
      }

      // Fallback: try searching with the ID itself (works if the backend supports it)
      if (!resolved && searchFunction) {
        try {
          const results = await searchFunction(nextValue)
          resolved =
            results.find((r) => r?.value === nextValue) ??
            (results.length === 1 ? results[0] : null)
        } catch (error) {
          console.error('Search (resolve) error:', error)
        }
      }

      if (!resolved) return
      if (requestId !== lastResolveRequestId.current) return

      optionsByValueRef.current.set(resolved.value, resolved)
      setSelectedOption(resolved)
    })()
  }, [value, valueLabel, resolveOptionByValue, searchFunction])

  return (
    <AsyncSelect
      value={selectedOption}
      onChange={(option) => {
        const opt = (option ?? null) as AutocompleteOption | null
        setSelectedOption(opt)

        if (opt?.value) {
          optionsByValueRef.current.set(opt.value, opt)
        }

        onValueChange(opt ? opt.value : "")
        if (opt && onSelect) {
          onSelect(opt)
        } else if (!opt && onClear) {
          onClear()
        }
      }}
      loadOptions={loadOptions}
      defaultOptions={[]} // No default options
      placeholder={placeholder}
      isDisabled={disabled || readOnly}
      isClearable
      cacheOptions
      noOptionsMessage={() => noResultsText}
      loadingMessage={() => loadingText}
      menuPortalTarget={typeof window !== 'undefined' ? document.body : undefined}
      menuPosition="fixed"
      className={className}
      styles={{
        control: (provided, state) => ({
          ...provided,
          backgroundColor: 'var(--glass-lighter-bg)',
          backdropFilter: 'blur(35px)',
          WebkitBackdropFilter: 'blur(35px)',
          border: state.isFocused 
            ? '1px solid var(--primary)'
            : '1px solid var(--glass-lighter-border)',
          borderRadius: '9999px',
          boxShadow: state.isFocused 
            ? '0 0 0 3px rgba(243, 208, 62, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.05)',
          minHeight: '48px',
          fontSize: '16px',
          paddingLeft: '8px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'var(--primary)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-1px)',
          },
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          backgroundColor: 'var(--glass-lighter-bg)',
          backdropFilter: 'blur(35px)',
          WebkitBackdropFilter: 'blur(35px)',
          border: '1px solid var(--glass-lighter-border)',
          zIndex: 9999,
          overflow: 'hidden',
          padding: '8px',
          animation: 'slideDown 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        option: (provided, state) => ({
          ...provided,
          borderRadius: '12px',
          marginBottom: '2px',
          backgroundColor: state.isSelected
            ? 'var(--primary)'
            : state.isFocused
            ? 'rgba(23, 63, 54, 0.1)'
            : 'transparent',
          color: state.isSelected
            ? 'var(--primary-foreground)'
            : 'var(--foreground)',
          padding: '12px 16px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: state.isSelected ? 600 : 400,
          transition: 'all 0.2s ease',
          borderLeft: 'none',
          '&:hover': {
            backgroundColor: state.isSelected
              ? 'var(--primary)'
              : 'rgba(23, 63, 54, 0.15)',
            transform: 'scale(0.98)',
          },
          '&:active': {
            transform: 'scale(0.96)',
          },
        }),
        input: (provided) => ({
          ...provided,
          fontSize: '16px', // Prevent zoom
          color: 'hsl(var(--foreground))',
        }),
        placeholder: (provided) => ({
          ...provided,
          fontSize: '16px',
          color: 'hsl(var(--muted-foreground))',
        }),
        singleValue: (provided) => ({
          ...provided,
          fontSize: '16px',
          color: 'hsl(var(--foreground))',
        }),
        noOptionsMessage: (provided) => ({
          ...provided,
          color: 'hsl(var(--muted-foreground))',
          fontSize: '14px',
          padding: '16px',
          textAlign: 'center',
          fontStyle: 'italic',
        }),
        loadingMessage: (provided) => ({
          ...provided,
          color: 'hsl(var(--muted-foreground))',
          fontSize: '14px',
          padding: '16px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }),
      }}
      components={maxLength ? {
        Input: (props) => <components.Input {...props} maxLength={maxLength} />
      } : undefined}
    />
  )
}
