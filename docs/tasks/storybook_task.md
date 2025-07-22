# 📖 PraxisGrove Storybook 重建任务

> **状态**: Storybook 配置完整，但 stories 文件已被清理，需要重新创建
> **优先级**: 中 - 组件文档化对开发效率和团队协作很重要
> **最后更新**: 2025-07-21

## 📋 任务概述

Storybook 配置文件完整且正确，但 `src/stories/` 目录已被清空。需要为项目中的所有组件创建完整的 Storybook 文档，提升开发体验和组件可维护性。

### 🗑️ 当前状态

```
✅ .storybook/main.ts        - 配置完整
✅ .storybook/preview.ts     - 配置完整
❌ src/stories/              - 目录为空，需要重建
```

**目标**: 为 **100+ 组件** 创建 Storybook 文档

## 🎯 需要创建的 Storybook Stories

### 1. **基础 UI 组件** - `src/components/ui/`

#### 1.1 表单组件 Stories

```
src/stories/ui/forms/
├── Button.stories.tsx           # 按钮组件 - 8个变体
├── Input.stories.tsx            # 输入框组件 - 6个变体
├── Label.stories.tsx            # 标签组件 - 3个变体
├── Textarea.stories.tsx         # 文本域组件 - 4个变体
├── Checkbox.stories.tsx         # 复选框组件 - 5个变体
├── RadioGroup.stories.tsx       # 单选组组件 - 4个变体
├── Switch.stories.tsx           # 开关组件 - 3个变体
└── Select.stories.tsx           # 选择器组件 - 6个变体
```

#### 1.2 布局组件 Stories

```
src/stories/ui/layout/
├── Card.stories.tsx             # 卡片组件 - 10个变体
├── Separator.stories.tsx        # 分隔线组件 - 4个变体
├── ScrollArea.stories.tsx       # 滚动区域 - 5个变体
├── Tabs.stories.tsx             # 标签页组件 - 6个变体
├── Accordion.stories.tsx        # 手风琴组件 - 5个变体
└── Collapsible.stories.tsx      # 可折叠组件 - 4个变体
```

#### 1.3 反馈组件 Stories

```
src/stories/ui/feedback/
├── Alert.stories.tsx            # 警告组件 - 6个变体
├── Badge.stories.tsx            # 徽章组件 - 8个变体
├── Progress.stories.tsx         # 进度条组件 - 5个变体
├── Skeleton.stories.tsx         # 骨架屏组件 - 6个变体
├── Tooltip.stories.tsx          # 工具提示 - 4个变体
└── Toast.stories.tsx            # 消息提示 - 7个变体
```

#### 1.4 导航组件 Stories

```
src/stories/ui/navigation/
├── DropdownMenu.stories.tsx     # 下拉菜单 - 8个变体
├── Command.stories.tsx          # 命令面板 - 5个变体
├── Dialog.stories.tsx           # 对话框组件 - 6个变体
├── Sheet.stories.tsx            # 抽屉组件 - 5个变体
├── Menubar.stories.tsx          # 菜单栏组件 - 4个变体
└── NavigationMenu.stories.tsx   # 导航菜单 - 6个变体
```

#### 1.5 数据展示 Stories

```
src/stories/ui/data/
├── Table.stories.tsx            # 表格组件 - 8个变体
├── Calendar.stories.tsx         # 日历组件 - 5个变体
├── Avatar.stories.tsx           # 头像组件 - 6个变体
├── HoverCard.stories.tsx        # 悬停卡片 - 4个变体
└── Popover.stories.tsx          # 弹出框组件 - 5个变体
```

### 2. **动画组件** - `src/components/aceternity/`

#### 2.1 背景效果 Stories

```
src/stories/aceternity/backgrounds/
├── BackgroundBeams.stories.tsx  # 光束背景 - 5个变体
└── ParticleBackground.stories.tsx # 粒子背景 - 4个变体
```

#### 2.2 导航组件 Stories

```
src/stories/aceternity/navigation/
└── FloatingNav.stories.tsx      # 浮动导航 - 6个变体
```

#### 2.3 动画容器 Stories

```
src/stories/aceternity/animation/
├── AnimatedContainer.stories.tsx # 动画容器 - 8个变体
├── AnimatedItem.stories.tsx     # 动画项目 - 6个变体
├── InViewAnimation.stories.tsx  # 视口动画 - 5个变体
└── HoverAnimation.stories.tsx   # 悬停动画 - 7个变体
```

#### 2.4 特殊效果 Stories

```
src/stories/aceternity/effects/
├── BeamScan.stories.tsx         # 光束扫描 - 4个变体
├── PulseGlow.stories.tsx        # 脉冲发光 - 5个变体
├── Floating.stories.tsx         # 浮动效果 - 4个变体
├── GradientShift.stories.tsx    # 渐变变换 - 6个变体
├── ParticleEffect.stories.tsx   # 粒子效果 - 5个变体
└── RippleWave.stories.tsx       # 波纹效果 - 4个变体
```

#### 2.5 样式组件 Stories

```
src/stories/aceternity/styled/
├── GlassCard.stories.tsx        # 玻璃卡片 - 6个变体
├── GlowBorder.stories.tsx       # 发光边框 - 5个变体
├── FloatingShadow.stories.tsx   # 浮动阴影 - 4个变体
├── GradientText.stories.tsx     # 渐变文字 - 7个变体
├── EnhancedButton.stories.tsx   # 增强按钮 - 8个变体
├── EnhancedCard.stories.tsx     # 增强卡片 - 6个变体
└── EnhancedInput.stories.tsx    # 增强输入框 - 5个变体
```

### 3. **高级动画组件** - `src/components/reactbit/`

#### 3.1 基础组件 Stories

```
src/stories/reactbit/basic/
├── ReactBitButton.stories.tsx   # ReactBit按钮 - 10个变体
├── ReactBitCard.stories.tsx     # ReactBit卡片 - 8个变体
├── ReactBitText.stories.tsx     # ReactBit文字 - 6个变体
├── ReactBitInput.stories.tsx    # ReactBit输入框 - 7个变体
└── ReactBitSpinner.stories.tsx  # ReactBit加载器 - 8个变体
```

#### 3.2 导航组件 Stories

```
src/stories/reactbit/navigation/
├── ReactBitNavbar.stories.tsx   # ReactBit导航栏 - 6个变体
├── ReactBitSidebarMenu.stories.tsx # ReactBit侧边栏 - 5个变体
└── ReactBitTabNavigation.stories.tsx # ReactBit标签导航 - 4个变体
```

#### 3.3 表单组件 Stories

```
src/stories/reactbit/forms/
├── ReactBitSelect.stories.tsx   # ReactBit选择器 - 6个变体
└── ReactBitCheckbox.stories.tsx # ReactBit复选框 - 5个变体
```

#### 3.4 反馈组件 Stories

```
src/stories/reactbit/feedback/
├── ReactBitToast.stories.tsx    # ReactBit消息提示 - 7个变体
├── ReactBitModal.stories.tsx    # ReactBit模态框 - 6个变体
└── ReactBitAlert.stories.tsx    # ReactBit警告 - 5个变体
```

### 4. **业务组件** - `src/components/*/`

#### 4.1 首页组件 Stories

```
src/stories/home/
├── HeroSection.stories.tsx      # 英雄区域 - 5个变体
├── FeaturesSection.stories.tsx  # 功能区域 - 4个变体
├── CTASection.stories.tsx       # 行动号召 - 6个变体
├── ProductIntro.stories.tsx     # 产品介绍 - 4个变体
├── RoadmapSection.stories.tsx   # 路线图 - 3个变体
├── FooterSection.stories.tsx    # 底部区域 - 4个变体
├── TestimonialsSection.stories.tsx # 推荐区域 - 5个变体
└── PricingSection.stories.tsx   # 价格区域 - 6个变体
```

#### 4.2 布局组件 Stories

```
src/stories/layout/
├── MainLayout.stories.tsx       # 主布局 - 4个变体
├── Header.stories.tsx           # 头部组件 - 6个变体
├── Sidebar.stories.tsx          # 侧边栏 - 5个变体
├── Logo.stories.tsx             # Logo组件 - 4个变体
├── ResponsiveLayout.stories.tsx # 响应式布局 - 5个变体
├── GridSystem.stories.tsx       # 网格系统 - 6个变体
├── Navigation.stories.tsx       # 导航组件 - 7个变体
├── Breadcrumb.stories.tsx       # 面包屑 - 4个变体
└── PageContainer.stories.tsx    # 页面容器 - 3个变体
```

#### 4.3 表单组件 Stories

```
src/stories/forms/
├── FormProvider.stories.tsx     # 表单提供者 - 3个变体
├── TextInput.stories.tsx        # 文本输入 - 8个变体
├── SelectInput.stories.tsx      # 选择输入 - 6个变体
├── FileUpload.stories.tsx       # 文件上传 - 7个变体
├── FormValidation.stories.tsx   # 表单验证 - 5个变体
├── FormSubmit.stories.tsx       # 表单提交 - 4个变体
├── SearchInput.stories.tsx      # 搜索输入 - 5个变体
├── DatePicker.stories.tsx       # 日期选择 - 6个变体
├── NumberInput.stories.tsx      # 数字输入 - 5个变体
├── PasswordInput.stories.tsx    # 密码输入 - 4个变体
├── PhoneInput.stories.tsx       # 电话输入 - 4个变体
└── AddressInput.stories.tsx     # 地址输入 - 3个变体
```

#### 4.4 认证组件 Stories

```
src/stories/auth/
├── LoginForm.stories.tsx        # 登录表单 - 6个变体
├── RegisterForm.stories.tsx     # 注册表单 - 5个变体
├── PrivateRoute.stories.tsx     # 私有路由 - 4个变体
├── AuthGuard.stories.tsx        # 认证守卫 - 3个变体
└── PasswordReset.stories.tsx    # 密码重置 - 4个变体
```

#### 4.5 课程组件 Stories

```
src/stories/course/
├── CourseCard.stories.tsx       # 课程卡片 - 8个变体
├── CourseList.stories.tsx       # 课程列表 - 5个变体
├── CourseDetail.stories.tsx     # 课程详情 - 6个变体
├── CourseProgress.stories.tsx   # 课程进度 - 4个变体
└── CourseRating.stories.tsx     # 课程评分 - 5个变体
```

#### 4.6 仪表板组件 Stories

```
src/stories/dashboard/
├── DashboardLayout.stories.tsx  # 仪表板布局 - 4个变体
├── StatsCard.stories.tsx        # 统计卡片 - 8个变体
├── ActivityFeed.stories.tsx     # 活动流 - 5个变体
├── QuickActions.stories.tsx     # 快速操作 - 6个变体
└── RecentActivity.stories.tsx   # 最近活动 - 4个变体
```

### 5. **特殊组件** Stories

#### 5.1 3D 组件 Stories

```
src/stories/3d/
├── KnowledgeGraph.stories.tsx   # 知识图谱 - 4个变体
└── Scene.stories.tsx            # 3D场景 - 3个变体
```

#### 5.2 SEO 组件 Stories

```
src/stories/seo/
└── SEOHead.stories.tsx          # SEO头部 - 5个变体
```

#### 5.3 工具组件 Stories

```
src/stories/utils/
├── PerformanceInitializer.stories.tsx # 性能初始化 - 2个变体
├── AccessibilityFeatures.stories.tsx  # 无障碍功能 - 4个变体
└── DevTools.stories.tsx               # 开发工具 - 3个变体
```

## 📊 Storybook 优先级

### 🔴 **高优先级** (立即实施)

1. **基础 UI 组件** - Button, Input, Card, Alert 等核心组件
2. **表单组件** - 登录、注册等关键表单
3. **布局组件** - Header, Sidebar, MainLayout 等

### 🟡 **中优先级** (第二阶段)

1. **动画组件** - Aceternity UI 和 ReactBit UI 组件
2. **业务组件** - 课程、仪表板等功能组件
3. **导航组件** - 各种导航和菜单组件

### 🟢 **低优先级** (第三阶段)

1. **特殊效果组件** - 复杂动画和3D组件
2. **工具组件** - 开发和调试相关组件
3. **SEO组件** - 元数据和优化组件

## 🛠️ Storybook 配置要求

### 必需的 Story 结构

```typescript
// 标准 Story 模板
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '组件描述和使用说明',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // 属性控制配置
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Default: Story = {
  args: {
    // 默认属性
  },
};

// 变体示例
export const Variant1: Story = {
  args: {
    // 变体属性
  },
};
```

### Story 分类标准

```
UI/Forms/          - 基础表单组件
UI/Layout/         - 基础布局组件
UI/Feedback/       - 基础反馈组件
UI/Navigation/     - 基础导航组件
UI/Data/           - 基础数据展示组件

Aceternity/        - Aceternity UI 组件
ReactBit/          - ReactBit UI 组件

Business/Home/     - 首页业务组件
Business/Course/   - 课程业务组件
Business/Dashboard/ - 仪表板业务组件
Business/Auth/     - 认证业务组件

Layout/            - 布局相关组件
Forms/             - 表单相关组件
Utils/             - 工具组件
```

## 🎯 实施计划

### 阶段一：基础组件 Stories (2-3天)

- [ ] 创建基础 UI 组件 Stories (Button, Input, Card 等)
- [ ] 创建表单组件 Stories
- [ ] 创建布局组件 Stories

### 阶段二：业务组件 Stories (3-4天)

- [ ] 创建认证组件 Stories
- [ ] 创建首页组件 Stories
- [ ] 创建课程组件 Stories
- [ ] 创建仪表板组件 Stories

### 阶段三：动画组件 Stories (2-3天)

- [ ] 创建 Aceternity UI 组件 Stories
- [ ] 创建 ReactBit UI 组件 Stories
- [ ] 创建特殊效果组件 Stories

### 阶段四：完善和优化 (1-2天)

- [ ] 添加交互测试
- [ ] 完善文档说明
- [ ] 优化 Story 组织结构
- [ ] 添加可访问性测试

## 📝 Story 标准

### 每个组件至少包含

- **Default** - 默认状态
- **Variants** - 所有变体展示
- **Interactive** - 交互状态演示
- **Edge Cases** - 边界情况展示
- **Accessibility** - 可访问性演示

### 文档要求

- 组件用途说明
- 属性详细描述
- 使用示例代码
- 最佳实践建议
- 注意事项说明

## 🚀 开始实施

**下一步行动**:

1. 从基础 UI 组件开始创建 Stories
2. 建立 Story 模板和规范
3. 逐步扩展到业务组件
4. 完善文档和交互演示

**成功标准**:

- 100+ 组件 Stories 完成 ✅
- 文档覆盖率 > 90% ✅
- 交互演示完整 ✅
- 团队开发效率提升 ✅
