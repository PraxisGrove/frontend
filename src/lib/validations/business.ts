import { z } from 'zod';
import { BaseValidations, ValidationMessages } from './common';

/**
 * 业务相关的验证架构
 * 针对 PraxisGrove 教育平台的特定业务场景
 */

// 课程相关验证
export const CourseValidations = {
  // 课程基本信息
  courseInfo: z.object({
    title: z
      .string()
      .min(1, ValidationMessages.required)
      .max(100, ValidationMessages.string.max(100)),
    description: z
      .string()
      .min(10, ValidationMessages.string.min(10))
      .max(2000, ValidationMessages.string.max(2000)),
    category: z.string().min(1, '请选择课程分类'),
    level: z.enum(['beginner', 'intermediate', 'advanced'], {
      required_error: '请选择课程难度',
    }),
    duration: z
      .number()
      .min(1, '课程时长至少1分钟')
      .max(10080, '课程时长不能超过7天'), // 7天 = 10080分钟
    price: z
      .number()
      .min(0, '价格不能为负数')
      .max(99999, '价格不能超过99999元'),
    tags: z.array(z.string()).max(10, '标签不能超过10个'),
    thumbnail: z.string().url('请上传有效的缩略图'),
  }),

  // 课程章节
  chapter: z.object({
    title: z
      .string()
      .min(1, ValidationMessages.required)
      .max(100, ValidationMessages.string.max(100)),
    description: z
      .string()
      .max(500, ValidationMessages.string.max(500))
      .optional(),
    order: BaseValidations.positiveInteger,
    duration: z.number().min(1, '章节时长至少1分钟'),
    isPublished: z.boolean().default(false),
  }),

  // 课程评价
  review: z.object({
    rating: z
      .number()
      .min(1, '评分至少1星')
      .max(5, '评分最多5星')
      .int('评分必须为整数'),
    comment: z
      .string()
      .min(10, ValidationMessages.string.min(10))
      .max(1000, ValidationMessages.string.max(1000)),
    isAnonymous: z.boolean().default(false),
  }),
} as const;

// 用户相关验证
export const UserValidations = {
  // 学生档案
  studentProfile: z.object({
    firstName: BaseValidations.name,
    lastName: BaseValidations.name,
    email: BaseValidations.email,
    phone: BaseValidations.phone.optional(),
    dateOfBirth: z.date().max(new Date(), '出生日期不能晚于今天'),
    gender: z.enum(['male', 'female', 'other']).optional(),
    education: z
      .enum(['high_school', 'bachelor', 'master', 'phd', 'other'])
      .optional(),
    interests: z.array(z.string()).max(20, '兴趣爱好不能超过20个'),
    learningGoals: z
      .string()
      .max(500, ValidationMessages.string.max(500))
      .optional(),
    timezone: z.string().default('Asia/Shanghai'),
    language: z.string().default('zh-CN'),
  }),

  // 教师档案
  teacherProfile: z.object({
    firstName: BaseValidations.name,
    lastName: BaseValidations.name,
    email: BaseValidations.email,
    phone: BaseValidations.phone,
    bio: z
      .string()
      .min(50, ValidationMessages.string.min(50))
      .max(2000, ValidationMessages.string.max(2000)),
    expertise: z
      .array(z.string())
      .min(1, '至少选择一个专业领域')
      .max(10, '专业领域不能超过10个'),
    experience: z
      .number()
      .min(0, '教学经验不能为负数')
      .max(50, '教学经验不能超过50年'),
    education: z.string().min(1, '请填写教育背景'),
    certifications: z.array(z.string()).optional(),
    socialLinks: z
      .object({
        website: BaseValidations.url.optional(),
        linkedin: BaseValidations.url.optional(),
        twitter: BaseValidations.url.optional(),
      })
      .optional(),
  }),

  // 用户偏好设置
  preferences: z.object({
    notifications: z.object({
      email: z.boolean().default(true),
      push: z.boolean().default(true),
      sms: z.boolean().default(false),
      marketing: z.boolean().default(false),
    }),
    privacy: z.object({
      profileVisibility: z
        .enum(['public', 'private', 'friends'])
        .default('public'),
      showProgress: z.boolean().default(true),
      showAchievements: z.boolean().default(true),
    }),
    learning: z.object({
      autoplay: z.boolean().default(true),
      playbackSpeed: z.number().min(0.5).max(2).default(1),
      subtitles: z.boolean().default(false),
      reminderTime: z.string().optional(),
    }),
  }),
} as const;

// 学习相关验证
export const LearningValidations = {
  // 学习进度
  progress: z.object({
    courseId: z.string().min(1, ValidationMessages.required),
    chapterId: z.string().min(1, ValidationMessages.required),
    progress: BaseValidations.percentage,
    timeSpent: z.number().min(0, '学习时间不能为负数'),
    completed: z.boolean().default(false),
    lastAccessedAt: z.date(),
  }),

  // 作业提交
  assignment: z.object({
    title: z
      .string()
      .min(1, ValidationMessages.required)
      .max(200, ValidationMessages.string.max(200)),
    content: z
      .string()
      .min(50, ValidationMessages.string.min(50))
      .max(10000, ValidationMessages.string.max(10000)),
    attachments: z.array(z.string().url()).max(5, '附件不能超过5个'),
    submittedAt: z.date().max(new Date(), '提交时间不能晚于当前时间'),
  }),

  // 考试答案
  examAnswer: z.object({
    questionId: z.string().min(1, ValidationMessages.required),
    answer: z.union([
      z.string(), // 文本答案
      z.array(z.string()), // 多选答案
      z.number(), // 数值答案
    ]),
    timeSpent: z.number().min(0, '答题时间不能为负数'),
    isCorrect: z.boolean().optional(),
  }),

  // 学习笔记
  note: z.object({
    title: z
      .string()
      .min(1, ValidationMessages.required)
      .max(100, ValidationMessages.string.max(100)),
    content: z
      .string()
      .min(1, ValidationMessages.required)
      .max(5000, ValidationMessages.string.max(5000)),
    tags: z.array(z.string()).max(10, '标签不能超过10个'),
    isPublic: z.boolean().default(false),
    courseId: z.string().optional(),
    chapterId: z.string().optional(),
  }),
} as const;

// 支付相关验证
export const PaymentValidations = {
  // 订单信息
  order: z.object({
    courseId: z.string().min(1, ValidationMessages.required),
    couponCode: z.string().optional(),
    paymentMethod: z.enum(['alipay', 'wechat', 'credit_card', 'bank_transfer']),
    amount: BaseValidations.money,
    currency: z.string().default('CNY'),
  }),

  // 优惠券
  coupon: z
    .object({
      code: z
        .string()
        .min(3, ValidationMessages.string.min(3))
        .max(20, ValidationMessages.string.max(20))
        .regex(/^[A-Z0-9]+$/, '优惠券代码只能包含大写字母和数字'),
      discount: z
        .number()
        .min(0, '折扣不能为负数')
        .max(100, '折扣不能超过100%'),
      discountType: z.enum(['percentage', 'fixed']),
      minAmount: BaseValidations.money.optional(),
      maxDiscount: BaseValidations.money.optional(),
      validFrom: z.date(),
      validTo: z.date(),
      usageLimit: BaseValidations.positiveInteger.optional(),
    })
    .refine((data) => data.validFrom <= data.validTo, {
      message: '有效期开始时间不能晚于结束时间',
      path: ['validTo'],
    }),

  // 退款申请
  refund: z.object({
    orderId: z.string().min(1, ValidationMessages.required),
    reason: z.enum([
      'not_satisfied',
      'technical_issues',
      'duplicate_purchase',
      'other',
    ]),
    description: z
      .string()
      .min(10, ValidationMessages.string.min(10))
      .max(500, ValidationMessages.string.max(500)),
    amount: BaseValidations.money,
  }),
} as const;

// 内容管理验证
export const ContentValidations = {
  // 文章/博客
  article: z.object({
    title: z
      .string()
      .min(1, ValidationMessages.required)
      .max(200, ValidationMessages.string.max(200)),
    content: z
      .string()
      .min(100, ValidationMessages.string.min(100))
      .max(50000, ValidationMessages.string.max(50000)),
    excerpt: z.string().max(300, ValidationMessages.string.max(300)).optional(),
    tags: z.array(z.string()).max(15, '标签不能超过15个'),
    category: z.string().min(1, '请选择文章分类'),
    featuredImage: z.string().url().optional(),
    isPublished: z.boolean().default(false),
    publishedAt: z.date().optional(),
    seoTitle: z.string().max(60, 'SEO标题不能超过60个字符').optional(),
    seoDescription: z.string().max(160, 'SEO描述不能超过160个字符').optional(),
  }),

  // 问答
  question: z.object({
    title: z
      .string()
      .min(10, ValidationMessages.string.min(10))
      .max(200, ValidationMessages.string.max(200)),
    content: z
      .string()
      .min(20, ValidationMessages.string.min(20))
      .max(5000, ValidationMessages.string.max(5000)),
    tags: z
      .array(z.string())
      .min(1, '至少选择一个标签')
      .max(5, '标签不能超过5个'),
    category: z.string().min(1, '请选择问题分类'),
    isAnonymous: z.boolean().default(false),
  }),

  // 回答
  answer: z.object({
    questionId: z.string().min(1, ValidationMessages.required),
    content: z
      .string()
      .min(10, ValidationMessages.string.min(10))
      .max(5000, ValidationMessages.string.max(5000)),
    isAccepted: z.boolean().default(false),
  }),
} as const;

// 系统设置验证
export const SystemValidations = {
  // 网站配置
  siteConfig: z.object({
    siteName: z
      .string()
      .min(1, ValidationMessages.required)
      .max(100, ValidationMessages.string.max(100)),
    siteDescription: z.string().max(300, ValidationMessages.string.max(300)),
    siteUrl: BaseValidations.url,
    logo: z.string().url().optional(),
    favicon: z.string().url().optional(),
    contactEmail: BaseValidations.email,
    supportEmail: BaseValidations.email,
    socialLinks: z
      .object({
        facebook: BaseValidations.url.optional(),
        twitter: BaseValidations.url.optional(),
        instagram: BaseValidations.url.optional(),
        linkedin: BaseValidations.url.optional(),
      })
      .optional(),
  }),

  // 邮件模板
  emailTemplate: z.object({
    name: z
      .string()
      .min(1, ValidationMessages.required)
      .max(100, ValidationMessages.string.max(100)),
    subject: z
      .string()
      .min(1, ValidationMessages.required)
      .max(200, ValidationMessages.string.max(200)),
    content: z
      .string()
      .min(10, ValidationMessages.string.min(10))
      .max(10000, ValidationMessages.string.max(10000)),
    type: z.enum([
      'welcome',
      'verification',
      'reset_password',
      'notification',
      'marketing',
    ]),
    isActive: z.boolean().default(true),
  }),
} as const;

// 类型导出
export type CourseInfoSchema = z.infer<typeof CourseValidations.courseInfo>;
export type ChapterSchema = z.infer<typeof CourseValidations.chapter>;
export type ReviewSchema = z.infer<typeof CourseValidations.review>;
export type StudentProfileSchema = z.infer<
  typeof UserValidations.studentProfile
>;
export type TeacherProfileSchema = z.infer<
  typeof UserValidations.teacherProfile
>;
export type PreferencesSchema = z.infer<typeof UserValidations.preferences>;
export type ProgressSchema = z.infer<typeof LearningValidations.progress>;
export type AssignmentSchema = z.infer<typeof LearningValidations.assignment>;
export type ExamAnswerSchema = z.infer<typeof LearningValidations.examAnswer>;
export type NoteSchema = z.infer<typeof LearningValidations.note>;
export type OrderSchema = z.infer<typeof PaymentValidations.order>;
export type CouponSchema = z.infer<typeof PaymentValidations.coupon>;
export type RefundSchema = z.infer<typeof PaymentValidations.refund>;
export type ArticleSchema = z.infer<typeof ContentValidations.article>;
export type QuestionSchema = z.infer<typeof ContentValidations.question>;
export type AnswerSchema = z.infer<typeof ContentValidations.answer>;
export type SiteConfigSchema = z.infer<typeof SystemValidations.siteConfig>;
export type EmailTemplateSchema = z.infer<
  typeof SystemValidations.emailTemplate
>;
