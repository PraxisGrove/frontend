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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

// 选项类型
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// 基础选择组件属性
export interface BaseSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// 下拉选择组件属性
export interface SelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseSelectProps<TFieldValues> {
  options: SelectOption[];
  clearable?: boolean;
}

/**
 * 下拉选择组件
 */
export function SelectInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder = '请选择...',
  description,
  required = false,
  disabled = false,
  className,
  options,
  clearable = false,
}: SelectInputProps<TFieldValues>) {
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

      <Select
        value={field.value || ''}
        onValueChange={field.onChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(error && 'border-destructive focus:ring-destructive')}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {clearable && field.value && (
            <SelectItem value="">
              <span className="text-muted-foreground">清除选择</span>
            </SelectItem>
          )}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <FormError name={name} />
    </FormField>
  );
}

// 多选组件属性
export interface MultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseSelectProps<TFieldValues> {
  options: SelectOption[];
  maxSelections?: number;
}

/**
 * 多选组件
 */
export function MultiSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  options,
  maxSelections,
}: MultiSelectProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const selectedValues: string[] = field.value || [];

  const handleChange = (optionValue: string, checked: boolean) => {
    let newValues: string[] = [...selectedValues];

    if (checked) {
      if (!maxSelections || newValues.length < maxSelections) {
        newValues.push(optionValue);
      }
    } else {
      newValues = newValues.filter((value) => value !== optionValue);
    }

    field.onChange(newValues);
  };

  return (
    <FormField className={className}>
      {label && (
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
      )}

      <div
        className={cn(
          'space-y-3 rounded-md border p-3',
          error && 'border-destructive',
          disabled && 'pointer-events-none opacity-50'
        )}
      >
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
          const isDisabled = Boolean(
            disabled ||
              option.disabled ||
              (maxSelections &&
                !isChecked &&
                selectedValues.length >= maxSelections)
          );

          return (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${name}-${option.value}`}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleChange(option.value, checked as boolean)
                }
                disabled={isDisabled}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  isDisabled && 'opacity-50'
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {maxSelections && (
        <p className="text-xs text-muted-foreground">
          已选择 {selectedValues.length}/{maxSelections} 项
        </p>
      )}

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <FormError name={name} />
    </FormField>
  );
}

// 单选组件属性
export interface RadioInputProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseSelectProps<TFieldValues> {
  options: SelectOption[];
  orientation?: 'horizontal' | 'vertical';
}

/**
 * 单选组件
 */
export function RadioInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  options,
  orientation = 'vertical',
}: RadioInputProps<TFieldValues>) {
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

      <RadioGroup
        value={field.value || ''}
        onValueChange={field.onChange}
        disabled={disabled}
        className={cn(
          orientation === 'horizontal' ? 'flex flex-wrap gap-6' : 'space-y-2',
          error && 'rounded-md border border-destructive p-2'
        )}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              disabled={disabled || option.disabled}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                (disabled || option.disabled) && 'opacity-50'
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <FormError name={name} />
    </FormField>
  );
}

// 开关组件属性
export interface SwitchInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseSelectProps<TFieldValues> {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 开关组件
 */
export function SwitchInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  size = 'md',
}: SwitchInputProps<TFieldValues>) {
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
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          {label && (
            <FormLabel htmlFor={name} required={required}>
              {label}
            </FormLabel>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        <Switch
          id={name}
          checked={field.value || false}
          onCheckedChange={field.onChange}
          disabled={disabled}
          className={cn(
            error && 'border-destructive',
            size === 'sm' && 'scale-75',
            size === 'lg' && 'scale-125'
          )}
        />
      </div>

      <FormError name={name} />
    </FormField>
  );
}

// 默认导出
export default SelectInput;
