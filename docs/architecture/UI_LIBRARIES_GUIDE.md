# UI 组件库使用指南

## 📚 概述

PraxisGrove 前端项目集成了三个主要的 UI 组件库，每个库都有其特定的用途和优势：

1. **shadcn/ui** - 基础 UI 组件
2. **Aceternity UI** - 动画和特效组件
3. **ReactBit UI** - 高级动画组件

## 🎯 使用原则

### 优先级顺序

1. **基础组件** → shadcn/ui
2. **动画特效** → Aceternity UI
3. **特定动画** → ReactBit UI

### 统一导入

```typescript
// 推荐：使用统一导入
import {
  Button,
  Card,
  BackgroundBeams,
  ReactBitSpinner,
} from '@/components/unified';

// 避免：直接从各个库导入
import { Button } from '@/components/ui';
import { BackgroundBeams } from '@/components/aceternity';
import { LoadingSpinner } from '@/components/reactbit';
```

## 🧩 组件库详解

### 1. shadcn/ui - 基础组件库

**用途：** 提供标准的、可访问的基础 UI 组件

**特点：**

- ✅ 完整的可访问性支持
- ✅ 一致的设计系统
- ✅ TypeScript 类型安全
- ✅ 主题系统集成

**主要组件：**

```typescript
// 表单组件
(Button, Input, Label, Textarea, Checkbox, RadioGroup, Switch, Select);

// 布局组件
(Card, Separator, ScrollArea, Tabs, Accordion);

// 反馈组件
(Alert, Badge, Progress, Skeleton, Tooltip);

// 导航组件
(DropdownMenu, Command, Dialog, Sheet);

// 数据展示
(Table, Calendar, Avatar);
```

**使用示例：**

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/unified';

function BasicExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>基础卡片</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">点击按钮</Button>
      </CardContent>
    </Card>
  );
}
```

### 2. Aceternity UI - 动画特效库

**用途：** 提供高质量的动画效果和视觉特效

**特点：**

- ✨ 丰富的动画效果
- 🎨 现代化的视觉设计
- ⚡ 性能优化的动画
- 🎯 易于集成

**主要组件：**

```typescript
// 背景效果
(BackgroundBeams, ParticleBackground, ParticleEffect);

// 导航组件
FloatingNav;

// 动画容器
(AnimatedContainer, InViewAnimation, HoverAnimation);

// 特殊效果
(BeamScan, PulseGlow, Floating, GradientShift, Magnetic, RippleWave);

// 样式组件
(GlassCard, GlowBorder, FloatingShadow, GradientText);

// 高级组件
(HeroSection, FeatureCard, StatsCounter, Timeline);
```

**使用示例：**

```tsx
import {
  BackgroundBeams,
  FloatingNav,
  GlassCard,
  HeroSection,
} from '@/components/unified';

function AnimatedExample() {
  return (
    <div className="relative">
      <BackgroundBeams />
      <FloatingNav
        navItems={[
          { name: '首页', link: '/' },
          { name: '关于', link: '/about' },
        ]}
      />
      <HeroSection
        title="欢迎来到 PraxisGrove"
        subtitle="现代化的学习平台"
        backgroundEffect="beams"
      />
      <GlassCard className="mt-8">
        <p>这是一个玻璃效果卡片</p>
      </GlassCard>
    </div>
  );
}
```

### 3. ReactBit UI - 高级动画库

**用途：** 提供细粒度控制的动画组件

**特点：**

- 🎮 精确的动画控制
- 🔧 高度可定制
- 📱 响应式动画
- ⚙️ 性能优化选项

**主要组件：**

```typescript
// 动画组件（重命名避免冲突）
(ReactBitButton, ReactBitCard, ReactBitText, ReactBitIcon, ReactBitList);

// 背景效果
(ReactBitBackground, ReactBitGradientBackground, ReactBitParticleField);

// 交互组件
(ReactBitHoverCard, ReactBitClickEffect, ReactBitScrollAnimation);

// 加载组件
(ReactBitSpinner, ReactBitProgressBar, ReactBitSkeletonLoader);

// 表单组件
(ReactBitInput, ReactBitSelect, ReactBitCheckbox);

// 反馈组件
(ReactBitToast, ReactBitModal, ReactBitAlert);
```

**使用示例：**

```tsx
import {
  ReactBitButton,
  ReactBitText,
  ReactBitSpinner,
  ReactBitCard,
} from '@/components/unified';

function AdvancedAnimationExample() {
  return (
    <ReactBitCard variant="glass" animation="tilt" interactive={true}>
      <ReactBitText variant="typewriter" speed={100} delay={500}>
        这是打字机效果文本
      </ReactBitText>

      <ReactBitButton animation="ripple" variant="default" loading={false}>
        涟漪效果按钮
      </ReactBitButton>

      <ReactBitSpinner variant="wave" size="md" speed={1.5} />
    </ReactBitCard>
  );
}
```

## 🔧 最佳实践

### 1. 组件选择策略

```typescript
// ✅ 好的做法：根据需求选择合适的组件
function GoodExample() {
  return (
    <div>
      {/* 基础表单使用 shadcn/ui */}
      <Card>
        <CardContent>
          <Label>用户名</Label>
          <Input placeholder="请输入用户名" />
          <Button>提交</Button>
        </CardContent>
      </Card>

      {/* 需要动画效果时使用 Aceternity UI */}
      <AnimatedContainer animation="slideUp">
        <GlassCard>
          <GradientText>动画文本</GradientText>
        </GlassCard>
      </AnimatedContainer>

      {/* 需要特定动画控制时使用 ReactBit UI */}
      <ReactBitButton
        animation="magnetic"
        onClick={() => console.log('磁性按钮点击')}
      >
        磁性效果按钮
      </ReactBitButton>
    </div>
  );
}

// ❌ 避免的做法：混乱的组件选择
function BadExample() {
  return (
    <div>
      {/* 不要为了动画而放弃基础组件的可访问性 */}
      <ReactBitButton variant="default">
        普通按钮 {/* 应该使用 shadcn/ui Button */}
      </ReactBitButton>

      {/* 不要重复使用相似功能的组件 */}
      <Card>
        <GlassCard> {/* 功能重叠 */}
          内容
        </GlassCard>
      </Card>
    </div>
  );
}
```

### 2. 性能优化

```typescript
// 动画性能优化
import { reactBitUtils } from '@/components/unified';

function PerformanceOptimizedComponent() {
  // 检查是否应该启用动画
  const shouldAnimate = reactBitUtils.shouldAnimate();

  return (
    <div>
      {shouldAnimate ? (
        <ReactBitCard animation="float">
          动画卡片
        </ReactBitCard>
      ) : (
        <Card>
          静态卡片
        </Card>
      )}
    </div>
  );
}
```

### 3. 主题一致性

```typescript
// 使用统一的主题系统
import { useAceternityTheme, reactBitConfig } from '@/components/unified';

function ThemedComponent() {
  const { theme } = useAceternityTheme();

  // 确保所有组件使用一致的主题
  return (
    <div>
      <Button variant="default">shadcn/ui 按钮</Button>
      <GlowBorder color={theme.colors.primary}>
        Aceternity UI 边框
      </GlowBorder>
      <ReactBitButton
        theme={{ colors: { primary: theme.colors.primary } }}
      >
        ReactBit UI 按钮
      </ReactBitButton>
    </div>
  );
}
```

## 🚫 常见问题和解决方案

### 1. 命名冲突

**问题：** 多个库有相同名称的组件

**解决方案：** 使用重命名导出

```typescript
// ✅ 使用重命名导出避免冲突
import {
  RippleEffect as AceternityRippleEffect,
  Typewriter as AceternityTypewriter,
  ReactBitButton,
  ReactBitCard,
} from '@/components/unified';
```

### 2. 样式冲突

**问题：** 不同库的样式相互覆盖

**解决方案：** 使用 CSS 模块或明确的类名优先级

```css
/* 确保样式隔离 */
.aceternity-component {
  /* Aceternity UI 特定样式 */
}

.reactbit-component {
  /* ReactBit UI 特定样式 */
}
```

### 3. 性能问题

**问题：** 过多动画影响性能

**解决方案：** 使用性能监控和条件渲染

```typescript
// 根据设备性能调整动画
const devicePerformance = reactBitUtils.performance.getDevicePerformance();

if (devicePerformance === 'low') {
  // 使用简单动画或静态组件
} else {
  // 使用复杂动画
}
```

## 📖 参考资源

- [shadcn/ui 官方文档](https://ui.shadcn.com/)
- [Aceternity UI 组件示例](https://ui.aceternity.com/)
- [Framer Motion 动画指南](https://www.framer.com/motion/)
- [React Bits 文档](https://github.com/DavidHDev/react-bits)

## 🔄 更新日志

- **v1.0.0** - 初始集成三个 UI 组件库
- **v1.1.0** - 添加统一导出和冲突解决
- **v1.2.0** - 完善性能优化和最佳实践指南
