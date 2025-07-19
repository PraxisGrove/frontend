/**
 * 验证库统一导出
 * 提供完整的表单验证解决方案
 */

// 通用验证规则和架构
export {
  ValidationMessages,
  BaseValidations,
  AdvancedValidations,
  CommonSchemas,
  ValidationUtils as CommonValidationUtils,
} from './common';

export type {
  LoginSchema,
  RegisterSchema,
  ProfileSchema,
  ContactSchema,
  AddressSchema,
  PaymentSchema,
} from './common';

// 业务验证架构
export {
  CourseValidations,
  UserValidations,
  LearningValidations,
  PaymentValidations,
  ContentValidations,
  SystemValidations,
} from './business';

export type {
  CourseInfoSchema,
  ChapterSchema,
  ReviewSchema,
  StudentProfileSchema,
  TeacherProfileSchema,
  PreferencesSchema,
  ProgressSchema,
  AssignmentSchema,
  ExamAnswerSchema,
  NoteSchema,
  OrderSchema,
  CouponSchema,
  RefundSchema,
  ArticleSchema,
  QuestionSchema,
  AnswerSchema,
  SiteConfigSchema,
  EmailTemplateSchema,
} from './business';

// 验证工具和 Hook
export {
  ValidationUtils,
  useFormValidation,
  useRealtimeValidation,
} from './utils';

export type { ValidationResult, FieldValidationResult } from './utils';

// Zod 重新导出
export { z } from 'zod';
export { zodResolver } from '@hookform/resolvers/zod';
