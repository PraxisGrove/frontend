'use client';

import React from 'react';
import {
  z,
  CommonSchemas,
  BaseValidations,
  ValidationMessages,
  useFormValidation,
  useRealtimeValidation,
} from '@/lib/validations';
import { PageContainer } from '@/components/layout/layout-container';
import { Grid, GridItem } from '@/components/layout/grid-system';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  FormProvider,
  TextInput,
  PasswordInput,
  NumberInput,
  TextareaInput,
  SelectInput,
  MultiSelect,
  RadioInput,
  SwitchInput,
  FormSubmit,
  FormReset,
} from '@/components/forms';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Check,
} from 'lucide-react';

// 用户注册表单验证架构 - 使用验证库
const userRegistrationSchema = z
  .object({
    // 基本信息
    firstName: BaseValidations.name,
    lastName: BaseValidations.name,
    email: BaseValidations.email,
    password: BaseValidations.password,
    confirmPassword: z.string().min(1, ValidationMessages.required),

    // 个人信息
    age: BaseValidations.age.min(18, '年龄必须大于18岁'),
    phone: BaseValidations.phone,
    bio: z.string().max(500, ValidationMessages.string.max(500)).optional(),

    // 选择字段
    gender: z.enum(['male', 'female', 'other'], {
      required_error: '请选择性别',
    }),
    country: z.string().min(1, '请选择国家'),
    interests: z.array(z.string()).min(1, '请至少选择一个兴趣'),

    // 偏好设置
    newsletter: z.boolean(),
    notifications: z.boolean(),
    terms: z.boolean().refine((val) => val === true, '请同意服务条款'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ValidationMessages.password.match,
    path: ['confirmPassword'],
  });

type UserRegistrationForm = z.infer<typeof userRegistrationSchema>;

// 显式类型定义以解决构建问题
interface UserRegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  phone: string;
  bio?: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  interests: string[];
  newsletter: boolean;
  notifications: boolean;
  terms: boolean;
}

export default function FormDemoPage() {
  const [submittedData, setSubmittedData] =
    React.useState<UserRegistrationFormData | null>(null);
  const [validationDemo, setValidationDemo] = React.useState({
    email: '',
    password: '',
    emailValid: true,
    passwordValid: true,
  });

  // 表单选项数据
  const genderOptions = [
    { value: 'male', label: '男性' },
    { value: 'female', label: '女性' },
    { value: 'other', label: '其他' },
  ];

  const countryOptions = [
    { value: 'cn', label: '中国' },
    { value: 'us', label: '美国' },
    { value: 'uk', label: '英国' },
    { value: 'jp', label: '日本' },
    { value: 'kr', label: '韩国' },
  ];

  const interestOptions = [
    { value: 'technology', label: '科技' },
    { value: 'sports', label: '体育' },
    { value: 'music', label: '音乐' },
    { value: 'reading', label: '阅读' },
    { value: 'travel', label: '旅行' },
    { value: 'cooking', label: '烹饪' },
    { value: 'photography', label: '摄影' },
    { value: 'gaming', label: '游戏' },
  ];

  // 表单提交处理
  const handleSubmit = (data: UserRegistrationFormData) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    toast.success('表单提交成功！', {
      description: '用户注册信息已保存',
    });
  };

  // 表单错误处理
  const handleError = (errors: any) => {
    console.log('Form errors:', errors);
    toast.error('表单验证失败', {
      description: '请检查并修正表单中的错误',
    });
  };

  return (
    <PageContainer
      title="表单组件演示"
      description="展示 React Hook Form 集成和各种表单组件的功能"
      actions={
        <div className="flex gap-2">
          <Badge variant="secondary">React Hook Form</Badge>
          <Badge variant="outline">Zod 验证</Badge>
        </div>
      }
      animated
    >
      <div className="space-y-8">
        {/* 表单演示 */}
        <Card>
          <CardHeader>
            <CardTitle>用户注册表单</CardTitle>
            <CardDescription>
              完整的用户注册表单，展示各种输入组件和验证功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider
              schema={userRegistrationSchema}
              onSubmit={handleSubmit}
              onError={handleError}
              defaultValues={{
                newsletter: false,
                notifications: true,
                terms: false,
              }}
            >
              <Grid cols={{ xs: 1, md: 2 }} gap="lg">
                {/* 基本信息 */}
                <GridItem span={{ xs: 1, md: 2 }}>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <User className="h-5 w-5" />
                    基本信息
                  </h3>
                </GridItem>

                <TextInput
                  name="firstName"
                  label="名字"
                  placeholder="请输入您的名字"
                  required
                />

                <TextInput
                  name="lastName"
                  label="姓氏"
                  placeholder="请输入您的姓氏"
                  required
                />

                <TextInput
                  name="email"
                  type="email"
                  label="邮箱地址"
                  placeholder="example@email.com"
                  required
                />

                <TextInput
                  name="phone"
                  label="手机号码"
                  placeholder="请输入手机号码"
                  required
                />

                <PasswordInput
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  required
                  description="密码必须包含大小写字母和数字，至少8位"
                />

                <PasswordInput
                  name="confirmPassword"
                  label="确认密码"
                  placeholder="请再次输入密码"
                  required
                />

                <NumberInput
                  name="age"
                  label="年龄"
                  placeholder="请输入年龄"
                  min={18}
                  max={120}
                  required
                />

                <SelectInput
                  name="country"
                  label="国家/地区"
                  placeholder="请选择国家"
                  options={countryOptions}
                  required
                />

                {/* 个人信息 */}
                <GridItem span={{ xs: 1, md: 2 }}>
                  <Separator className="my-6" />
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Settings className="h-5 w-5" />
                    个人信息
                  </h3>
                </GridItem>

                <GridItem span={{ xs: 1, md: 2 }}>
                  <RadioInput
                    name="gender"
                    label="性别"
                    options={genderOptions}
                    orientation="horizontal"
                    required
                  />
                </GridItem>

                <GridItem span={{ xs: 1, md: 2 }}>
                  <MultiSelect
                    name="interests"
                    label="兴趣爱好"
                    description="请选择您的兴趣爱好（最多选择3项）"
                    options={interestOptions}
                    maxSelections={3}
                    required
                  />
                </GridItem>

                <GridItem span={{ xs: 1, md: 2 }}>
                  <TextareaInput
                    name="bio"
                    label="个人简介"
                    placeholder="请简单介绍一下自己..."
                    rows={4}
                    maxLength={500}
                    description="可选，最多500个字符"
                  />
                </GridItem>

                {/* 偏好设置 */}
                <GridItem span={{ xs: 1, md: 2 }}>
                  <Separator className="my-6" />
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Settings className="h-5 w-5" />
                    偏好设置
                  </h3>
                </GridItem>

                <SwitchInput
                  name="newsletter"
                  label="订阅邮件通知"
                  description="接收产品更新和优惠信息"
                />

                <SwitchInput
                  name="notifications"
                  label="推送通知"
                  description="接收重要消息推送"
                />

                <GridItem span={{ xs: 1, md: 2 }}>
                  <SwitchInput
                    name="terms"
                    label="同意服务条款"
                    description="我已阅读并同意服务条款和隐私政策"
                    required
                  />
                </GridItem>

                {/* 提交按钮 */}
                <GridItem span={{ xs: 1, md: 2 }}>
                  <div className="flex gap-4 pt-4">
                    <FormSubmit>
                      <Check className="mr-2 h-4 w-4" />
                      注册账户
                    </FormSubmit>
                    <FormReset>重置表单</FormReset>
                  </div>
                </GridItem>
              </Grid>
            </FormProvider>
          </CardContent>
        </Card>

        {/* 提交结果展示 */}
        {submittedData && (
          <Card>
            <CardHeader>
              <CardTitle>提交结果</CardTitle>
              <CardDescription>表单提交成功，以下是提交的数据</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-auto rounded-lg bg-muted p-4 text-sm">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Zod 验证功能演示 */}
        <Card>
          <CardHeader>
            <CardTitle>Zod 验证功能演示</CardTitle>
            <CardDescription>
              实时验证功能演示，输入内容查看验证效果
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Grid cols={{ xs: 1, md: 2 }} gap="lg">
              {/* 邮箱验证演示 */}
              <div className="space-y-3">
                <h4 className="font-medium">邮箱验证</h4>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="请输入邮箱地址"
                    value={validationDemo.email}
                    onChange={(e) => {
                      const email = e.target.value;
                      const isValid =
                        BaseValidations.email.safeParse(email).success;
                      setValidationDemo((prev) => ({
                        ...prev,
                        email,
                        emailValid: isValid,
                      }));
                    }}
                    className={cn(
                      'w-full rounded-md border px-3 py-2 text-sm',
                      validationDemo.email && !validationDemo.emailValid
                        ? 'border-destructive focus:ring-destructive'
                        : 'border-input focus:ring-ring'
                    )}
                  />
                  <div className="flex items-center gap-2 text-sm">
                    {validationDemo.email && (
                      <>
                        {validationDemo.emailValid ? (
                          <Badge variant="default" className="bg-green-500">
                            ✓ 邮箱格式正确
                          </Badge>
                        ) : (
                          <Badge variant="destructive">✗ 邮箱格式错误</Badge>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 密码验证演示 */}
              <div className="space-y-3">
                <h4 className="font-medium">密码强度验证</h4>
                <div className="space-y-2">
                  <input
                    type="password"
                    placeholder="请输入密码"
                    value={validationDemo.password}
                    onChange={(e) => {
                      const password = e.target.value;
                      const isValid =
                        BaseValidations.password.safeParse(password).success;
                      setValidationDemo((prev) => ({
                        ...prev,
                        password,
                        passwordValid: isValid,
                      }));
                    }}
                    className={cn(
                      'w-full rounded-md border px-3 py-2 text-sm',
                      validationDemo.password && !validationDemo.passwordValid
                        ? 'border-destructive focus:ring-destructive'
                        : 'border-input focus:ring-ring'
                    )}
                  />
                  <div className="space-y-1">
                    {validationDemo.password && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          {validationDemo.passwordValid ? (
                            <Badge variant="default" className="bg-green-500">
                              ✓ 密码强度符合要求
                            </Badge>
                          ) : (
                            <Badge variant="destructive">✗ 密码强度不足</Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div
                            className={cn(
                              'flex items-center gap-1',
                              validationDemo.password.length >= 8
                                ? 'text-green-600'
                                : 'text-red-600'
                            )}
                          >
                            {validationDemo.password.length >= 8 ? '✓' : '✗'}{' '}
                            至少8位字符
                          </div>
                          <div
                            className={cn(
                              'flex items-center gap-1',
                              /[a-z]/.test(validationDemo.password)
                                ? 'text-green-600'
                                : 'text-red-600'
                            )}
                          >
                            {/[a-z]/.test(validationDemo.password) ? '✓' : '✗'}{' '}
                            包含小写字母
                          </div>
                          <div
                            className={cn(
                              'flex items-center gap-1',
                              /[A-Z]/.test(validationDemo.password)
                                ? 'text-green-600'
                                : 'text-red-600'
                            )}
                          >
                            {/[A-Z]/.test(validationDemo.password) ? '✓' : '✗'}{' '}
                            包含大写字母
                          </div>
                          <div
                            className={cn(
                              'flex items-center gap-1',
                              /\d/.test(validationDemo.password)
                                ? 'text-green-600'
                                : 'text-red-600'
                            )}
                          >
                            {/\d/.test(validationDemo.password) ? '✓' : '✗'}{' '}
                            包含数字
                          </div>
                          <div
                            className={cn(
                              'flex items-center gap-1',
                              /[@$!%*?&]/.test(validationDemo.password)
                                ? 'text-green-600'
                                : 'text-red-600'
                            )}
                          >
                            {/[@$!%*?&]/.test(validationDemo.password)
                              ? '✓'
                              : '✗'}{' '}
                            包含特殊字符
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Grid>

            <Separator />

            {/* 验证架构展示 */}
            <div className="space-y-4">
              <h4 className="font-medium">常用验证架构</h4>
              <Grid cols={{ xs: 1, md: 2, lg: 3 }} gap="md">
                <Card className="p-4">
                  <h5 className="mb-2 font-medium">登录表单</h5>
                  <pre className="overflow-auto rounded bg-muted p-2 text-xs">
                    {`CommonSchemas.login
{
  email: string (email),
  password: string (min 1),
  remember?: boolean
}`}
                  </pre>
                </Card>

                <Card className="p-4">
                  <h5 className="mb-2 font-medium">注册表单</h5>
                  <pre className="overflow-auto rounded bg-muted p-2 text-xs">
                    {`CommonSchemas.register
{
  username: string (3-20),
  email: string (email),
  password: string (complex),
  confirmPassword: string,
  terms: boolean (true)
}`}
                  </pre>
                </Card>

                <Card className="p-4">
                  <h5 className="mb-2 font-medium">个人信息</h5>
                  <pre className="overflow-auto rounded bg-muted p-2 text-xs">
                    {`CommonSchemas.profile
{
  firstName: string,
  lastName: string,
  email: string (email),
  phone?: string (mobile),
  bio?: string (max 500)
}`}
                  </pre>
                </Card>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
