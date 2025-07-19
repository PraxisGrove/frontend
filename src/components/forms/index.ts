/**
 * 表单组件库统一导出
 */

// 表单提供者和基础组件
export {
  FormProvider,
  useFormContext,
  FormError,
  FormLabel,
  FormField,
  FormSubmit,
  FormReset,
} from './form-provider';
export type {
  FormProviderProps,
  FormErrorProps,
  FormLabelProps,
  FormFieldProps,
  FormSubmitProps,
  FormResetProps,
} from './form-provider';

// 输入组件
export {
  TextInput,
  PasswordInput,
  NumberInput,
  TextareaInput,
} from './form-input';
export type {
  BaseInputProps,
  TextInputProps,
  PasswordInputProps,
  NumberInputProps,
  TextareaInputProps,
} from './form-input';

// 选择组件
export {
  SelectInput,
  MultiSelect,
  RadioInput,
  SwitchInput,
} from './form-select';
export type {
  SelectOption,
  BaseSelectProps,
  SelectInputProps,
  MultiSelectProps,
  RadioInputProps,
  SwitchInputProps,
} from './form-select';

// 文件上传组件
export { FileUpload } from './file-upload';
export type {
  FileUploadProps,
  FileType,
  UploadStatus,
  FileInfo,
} from './file-upload';
