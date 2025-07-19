'use client';

import React from 'react';
import {
  useForm,
  FormProvider as RHFFormProvider,
  useFormContext as useRHFFormContext,
  UseFormProps,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

// 表单提供者属性
export interface FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  children: React.ReactNode;
  schema?: z.ZodSchema<TFieldValues>;
  defaultValues?: UseFormProps<TFieldValues>['defaultValues'];
  mode?: UseFormProps<TFieldValues>['mode'];
  onSubmit?: SubmitHandler<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
  className?: string;
  id?: string;
  noValidate?: boolean;
  autoComplete?: 'on' | 'off';
}

/**
 * 表单提供者组件
 * 封装 React Hook Form 的 FormProvider，提供统一的表单上下文
 */
export function FormProvider<TFieldValues extends FieldValues = FieldValues>({
  children,
  schema,
  defaultValues,
  mode = 'onChange',
  onSubmit,
  onError,
  className,
  id,
  noValidate = true,
  autoComplete = 'off',
}: FormProviderProps<TFieldValues>) {
  const methods = useForm<TFieldValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    mode,
  });

  const handleSubmit = methods.handleSubmit(onSubmit || (() => {}), onError);

  return (
    <RHFFormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className={cn('space-y-6', className)}
        id={id}
        noValidate={noValidate}
        autoComplete={autoComplete}
      >
        {children}
      </form>
    </RHFFormProvider>
  );
}

/**
 * 使用表单上下文的 Hook
 * 提供类型安全的表单方法访问
 */
export function useFormContext<
  TFieldValues extends FieldValues = FieldValues,
>(): UseFormReturn<TFieldValues> {
  return useRHFFormContext<TFieldValues>();
}

/**
 * 表单字段错误显示组件
 */
export interface FormErrorProps {
  name: string;
  className?: string;
}

export function FormError({ name, className }: FormErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  if (!error) return null;

  return (
    <p className={cn('mt-1 text-sm text-destructive', className)}>
      {error.message as string}
    </p>
  );
}

/**
 * 表单字段标签组件
 */
export interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export function FormLabel({
  htmlFor,
  children,
  required = false,
  className,
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
    >
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </label>
  );
}

/**
 * 表单字段容器组件
 */
export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function FormField({ children, className }: FormFieldProps) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}

/**
 * 表单提交按钮组件
 */
export interface FormSubmitProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function FormSubmit({
  children,
  loading = false,
  disabled = false,
  className,
  variant = 'default',
  size = 'default',
}: FormSubmitProps) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const isDisabled = disabled || loading || isSubmitting || !isValid;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={cn(
        // 基础样式
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',

        // 变体样式
        {
          'bg-primary text-primary-foreground shadow hover:bg-primary/90':
            variant === 'default',
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90':
            variant === 'destructive',
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground':
            variant === 'outline',
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80':
            variant === 'secondary',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'text-primary underline-offset-4 hover:underline': variant === 'link',
        },

        // 尺寸样式
        {
          'h-9 px-4 py-2': size === 'default',
          'h-8 rounded-md px-3 text-xs': size === 'sm',
          'h-10 rounded-md px-8': size === 'lg',
          'h-9 w-9': size === 'icon',
        },

        className
      )}
    >
      {(loading || isSubmitting) && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}

/**
 * 表单重置按钮组件
 */
export interface FormResetProps {
  children: React.ReactNode;
  className?: string;
  onReset?: () => void;
}

export function FormReset({ children, className, onReset }: FormResetProps) {
  const { reset } = useFormContext();

  const handleReset = () => {
    reset();
    onReset?.();
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        'h-9 px-4 py-2',
        className
      )}
    >
      {children}
    </button>
  );
}

// 默认导出
export default FormProvider;
