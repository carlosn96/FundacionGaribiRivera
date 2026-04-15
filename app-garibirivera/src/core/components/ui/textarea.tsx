import * as React from 'react';

import {cn} from '@/core/utils/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full',
          'rounded-vision-md',
          'backdrop-blur-vision backdrop-saturate-vision',
          'bg-fundacion-amarillo/5 border border-fundacion-amarillo/25',
          'px-4 py-3 text-base md:text-sm',
          'vision-text-primary',
          'placeholder:text-fundacion-verde/50',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-fundacion-amarillo/50 focus-visible:border-fundacion-amarillo/50',
          'transition-all duration-medium ease-spring-smooth',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-vertical',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
