'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  id: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  id,
  required = false,
  hint,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-medium text-white/80 tracking-wide"
        >
          {label} {required && <span className="text-[#e0231c]">*</span>}
        </label>
        {hint && <span className="text-[11px] text-white/40">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#ff5c57] flex items-center gap-1 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
