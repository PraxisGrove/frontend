'use client';

import React from 'react';
import { useController, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  useFormContext,
  FormField,
  FormLabel,
  FormError,
} from './form-provider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff } from 'lucide-react';

// 基础输入组件属性
export interface BaseInputProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

// 文本输入组件属性
export interface TextInputProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseInputProps<TFieldValues> {
  type?: 'text' | 'email' | 'url' | 'search';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

/**
 * 文本输入组件
 */
export function TextInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  className,
  inputClassName,
  type = 'text',
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus = false,
}: TextInputProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormField className={className}>
      {label && (
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
      )}

      <Input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          inputClassName
        )}
      />

      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}

      <FormError name={name} />
    </FormField>
  );
}

// 密码输入组件属性
export interface PasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseInputProps<TFieldValues> {
  autoComplete?: string;
  showToggle?: boolean;
}

/**
 * 密码输入组件
 */
export function PasswordInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  className,
  inputClassName,
  autoComplete = 'current-password',
  showToggle = true,
}: PasswordInputProps<TFieldValues>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const { control } = useFormContext<TFieldValues>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormField className={className}>
      {label && (
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
      )}

      <div className="relative">
        <Input
          {...field}
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={cn(
            showToggle && 'pr-10',
            error && 'border-destructive focus-visible:ring-destructive',
            inputClassName
          )}
        />

        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}

      <FormError name={name} />
    </FormField>
  );
}

// 数字输入组件属性
export interface NumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseInputProps<TFieldValues> {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
}

/**
 * 数字输入组件
 */
export function NumberInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  className,
  inputClassName,
  min,
  max,
  step = 1,
  precision,
}: NumberInputProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange(undefined);
      return;
    }

    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      const finalVal =
        precision !== undefined
          ? parseFloat(numVal.toFixed(precision))
          : numVal;
      onChange(finalVal);
    }
  };

  return (
    <FormField className={className}>
      {label && (
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
      )}

      <Input
        {...field}
        id={name}
        type="number"
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          inputClassName
        )}
      />

      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}

      <FormError name={name} />
    </FormField>
  );
}

// 文本域组件属性
export interface TextareaInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseInputProps<TFieldValues> {
  rows?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * 文本域组件
 */
export function TextareaInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  className,
  inputClassName,
  rows = 3,
  maxLength,
  minLength,
  resize = 'vertical',
}: TextareaInputProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormField className={className}>
      {label && (
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
      )}

      <Textarea
        {...field}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        minLength={minLength}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          resize === 'none' && 'resize-none',
          resize === 'vertical' && 'resize-y',
          resize === 'horizontal' && 'resize-x',
          resize === 'both' && 'resize',
          inputClassName
        )}
      />

      {maxLength && (
        <div className="text-muted-foreground flex justify-between text-sm">
          <span>{description}</span>
          <span>
            {field.value?.length || 0}/{maxLength}
          </span>
        </div>
      )}

      {description && !maxLength && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}

      <FormError name={name} />
    </FormField>
  );
}

// 默认导出
export default TextInput;
