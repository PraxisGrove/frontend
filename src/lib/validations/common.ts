import { z } from 'zod';

/**
 * 通用验证规则
 * 提供常用的验证模式和错误消息
 */

// 错误消息配置
export const ValidationMessages = {
  required: '此字段为必填项',
  email: '请输入有效的邮箱地址',
  phone: '请输入有效的手机号码',
  password: {
    min: '密码至少需要8位字符',
    complexity: '密码必须包含大小写字母、数字和特殊字符',
    match: '两次输入的密码不一致',
  },
  string: {
    min: (min: number) => `至少需要${min}个字符`,
    max: (max: number) => `不能超过${max}个字符`,
  },
  number: {
    min: (min: number) => `最小值为${min}`,
    max: (max: number) => `最大值为${max}`,
    positive: '必须为正数',
    integer: '必须为整数',
  },
  array: {
    min: (min: number) => `至少选择${min}项`,
    max: (max: number) => `最多选择${max}项`,
  },
  file: {
    size: (size: string) => `文件大小不能超过${size}`,
    type: '文件类型不支持',
  },
  url: '请输入有效的URL地址',
  date: {
    invalid: '请输入有效的日期',
    future: '日期不能早于今天',
    past: '日期不能晚于今天',
  },
} as const;

// 基础验证规则
export const BaseValidations = {
  // 邮箱验证
  email: z.string().email(ValidationMessages.email),

  // 手机号验证（中国大陆）
  phone: z.string().regex(/^1[3-9]\d{9}$/, ValidationMessages.phone),

  // 密码验证
  password: z
    .string()
    .min(8, ValidationMessages.password.min)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      ValidationMessages.password.complexity
    ),

  // 简单密码验证（仅长度）
  simplePassword: z.string().min(6, '密码至少需要6位字符'),

  // URL验证
  url: z.string().url(ValidationMessages.url),

  // 身份证号验证
  idCard: z
    .string()
    .regex(
      /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      '请输入有效的身份证号码'
    ),

  // 用户名验证
  username: z
    .string()
    .min(3, ValidationMessages.string.min(3))
    .max(20, ValidationMessages.string.max(20))
    .regex(/^[a-zA-Z0-9_]+$/, '用户名只能包含字母、数字和下划线'),

  // 姓名验证
  name: z
    .string()
    .min(1, ValidationMessages.required)
    .max(50, ValidationMessages.string.max(50))
    .regex(/^[\u4e00-\u9fa5a-zA-Z\s]+$/, '姓名只能包含中文、英文和空格'),

  // 年龄验证
  age: z
    .number()
    .min(0, ValidationMessages.number.min(0))
    .max(150, ValidationMessages.number.max(150))
    .int(ValidationMessages.number.integer),

  // 正整数验证
  positiveInteger: z
    .number()
    .positive(ValidationMessages.number.positive)
    .int(ValidationMessages.number.integer),

  // 金额验证（保留两位小数）
  money: z
    .number()
    .min(0, ValidationMessages.number.min(0))
    .multipleOf(0.01, '金额最多保留两位小数'),

  // 百分比验证
  percentage: z
    .number()
    .min(0, ValidationMessages.number.min(0))
    .max(100, ValidationMessages.number.max(100)),
} as const;

// 高级验证规则
export const AdvancedValidations = {
  // 确认密码验证
  confirmPassword: <T extends { password: string; confirmPassword: string }>(
    data: T
  ) => data.password === data.confirmPassword,

  // 日期范围验证
  dateRange: (startDate: Date, endDate: Date) => startDate <= endDate,

  // 文件大小验证（MB）
  fileSize: (maxSizeMB: number) => (file: File) =>
    file.size <= maxSizeMB * 1024 * 1024,

  // 文件类型验证
  fileType: (allowedTypes: string[]) => (file: File) =>
    allowedTypes.includes(file.type),

  // 数组长度验证
  arrayLength: (min: number, max?: number) =>
    z
      .array(z.any())
      .min(min, ValidationMessages.array.min(min))
      .max(max || Infinity, max ? ValidationMessages.array.max(max) : ''),

  // 唯一值验证
  unique: <T>(array: T[], getValue: (item: T) => any) => {
    const values = array.map(getValue);
    return values.length === new Set(values).size;
  },
} as const;

// 常用表单验证架构
export const CommonSchemas = {
  // 登录表单
  login: z.object({
    email: BaseValidations.email,
    password: z.string().min(1, ValidationMessages.required),
    remember: z.boolean().optional(),
  }),

  // 注册表单
  register: z
    .object({
      username: BaseValidations.username,
      email: BaseValidations.email,
      password: BaseValidations.password,
      confirmPassword: z.string(),
      terms: z.boolean().refine((val) => val === true, '请同意服务条款'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: ValidationMessages.password.match,
      path: ['confirmPassword'],
    }),

  // 个人信息表单
  profile: z.object({
    firstName: z.string().min(1, ValidationMessages.required),
    lastName: z.string().min(1, ValidationMessages.required),
    email: BaseValidations.email,
    phone: BaseValidations.phone.optional(),
    bio: z.string().max(500, ValidationMessages.string.max(500)).optional(),
    avatar: z.string().url().optional(),
  }),

  // 联系表单
  contact: z.object({
    name: BaseValidations.name,
    email: BaseValidations.email,
    subject: z.string().min(1, ValidationMessages.required),
    message: z
      .string()
      .min(10, ValidationMessages.string.min(10))
      .max(1000, ValidationMessages.string.max(1000)),
  }),

  // 地址表单
  address: z.object({
    country: z.string().min(1, '请选择国家'),
    province: z.string().min(1, '请选择省份'),
    city: z.string().min(1, '请选择城市'),
    district: z.string().optional(),
    street: z.string().min(1, '请输入详细地址'),
    postalCode: z.string().regex(/^\d{6}$/, '请输入有效的邮政编码'),
  }),

  // 支付表单
  payment: z.object({
    cardNumber: z.string().regex(/^\d{16}$/, '请输入有效的银行卡号'),
    expiryMonth: z.number().min(1).max(12),
    expiryYear: z.number().min(new Date().getFullYear()),
    cvv: z.string().regex(/^\d{3,4}$/, '请输入有效的CVV'),
    cardholderName: BaseValidations.name,
  }),
} as const;

// 验证工具函数
export const ValidationUtils = {
  // 创建可选字段
  optional: <T extends z.ZodTypeAny>(schema: T) => schema.optional(),

  // 创建可空字段
  nullable: <T extends z.ZodTypeAny>(schema: T) => schema.nullable(),

  // 创建数组验证
  array: <T extends z.ZodTypeAny>(schema: T, min?: number, max?: number) => {
    let arraySchema = z.array(schema);
    if (min !== undefined) {
      arraySchema = arraySchema.min(min, ValidationMessages.array.min(min));
    }
    if (max !== undefined) {
      arraySchema = arraySchema.max(max, ValidationMessages.array.max(max));
    }
    return arraySchema;
  },

  // 创建枚举验证
  enum: <T extends readonly [string, ...string[]]>(
    values: T,
    message = '请选择有效的选项'
  ) => z.enum(values, { required_error: message }),

  // 创建条件验证
  conditional: <T extends z.ZodTypeAny>(
    condition: boolean,
    schema: T,
    fallback?: T
  ) => (condition ? schema : fallback || (z.any() as unknown as T)),

  // 创建自定义验证
  custom: <T>(validator: (value: T) => boolean, message: string) =>
    z.custom<T>((value) => validator(value as T), { message }),

  // 合并验证架构
  merge: <T extends z.ZodRawShape, U extends z.ZodRawShape>(
    schema1: z.ZodObject<T>,
    schema2: z.ZodObject<U>
  ) => schema1.merge(schema2),

  // 扩展验证架构
  extend: <T extends z.ZodRawShape, U extends z.ZodRawShape>(
    schema: z.ZodObject<T>,
    extension: U
  ) => schema.extend(extension),
} as const;

// 类型导出
export type LoginSchema = z.infer<typeof CommonSchemas.login>;
export type RegisterSchema = z.infer<typeof CommonSchemas.register>;
export type ProfileSchema = z.infer<typeof CommonSchemas.profile>;
export type ContactSchema = z.infer<typeof CommonSchemas.contact>;
export type AddressSchema = z.infer<typeof CommonSchemas.address>;
export type PaymentSchema = z.infer<typeof CommonSchemas.payment>;
