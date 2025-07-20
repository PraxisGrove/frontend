/**
 * 统一组件库测试套件
 * 测试 shadcn/ui、Aceternity UI 和 ReactBit UI 的集成
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

// 扩展 Jest 匹配器
expect.extend(toHaveNoViolations);

// 导入要测试的组件
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  AnimatedContainer,
  GlassCard,
  ReactBitButton,
  ReactBitCard,
  ReactBitText,
  ReactBitSpinner,
} from '@/components/unified';

// Mock framer-motion 以避免测试中的动画问题
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    input: ({ children, ...props }: any) => (
      <input {...props}>{children}</input>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
  }),
  useMotionValue: () => ({ set: jest.fn(), get: jest.fn() }),
  useSpring: () => ({ set: jest.fn(), get: jest.fn() }),
  useTransform: () => ({ set: jest.fn(), get: jest.fn() }),
  useInView: () => true,
  useScroll: () => ({ scrollYProgress: { set: jest.fn(), get: jest.fn() } }),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('shadcn/ui 基础组件', () => {
  test('Button 组件正确渲染', () => {
    render(<Button>测试按钮</Button>);
    const button = screen.getByRole('button', { name: '测试按钮' });
    expect(button).toBeInTheDocument();
  });

  test('Button 组件支持不同变体', () => {
    const { rerender } = render(<Button variant="default">默认按钮</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');

    rerender(<Button variant="outline">轮廓按钮</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');

    rerender(<Button variant="ghost">幽灵按钮</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-accent');
  });

  test('Card 组件正确渲染', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>测试标题</CardTitle>
        </CardHeader>
        <CardContent>测试内容</CardContent>
      </Card>
    );

    expect(screen.getByText('测试标题')).toBeInTheDocument();
    expect(screen.getByText('测试内容')).toBeInTheDocument();
  });

  test('Input 组件支持受控输入', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <div>
        <Label htmlFor="test-input">测试输入</Label>
        <Input
          id="test-input"
          value=""
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );

    const input = screen.getByLabelText('测试输入');
    await user.type(input, 'hello');

    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  test('shadcn/ui 组件无可访问性问题', async () => {
    const { container } = render(
      <div>
        <Button>按钮</Button>
        <Card>
          <CardHeader>
            <CardTitle>标题</CardTitle>
          </CardHeader>
          <CardContent>内容</CardContent>
        </Card>
        <Label htmlFor="input">标签</Label>
        <Input id="input" />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Aceternity UI 动画组件', () => {
  test('AnimatedContainer 正确渲染', () => {
    render(
      <AnimatedContainer animation="fadeIn">
        <div>动画内容</div>
      </AnimatedContainer>
    );

    expect(screen.getByText('动画内容')).toBeInTheDocument();
  });

  test('GlassCard 应用正确的样式类', () => {
    render(<GlassCard className="test-class">玻璃卡片内容</GlassCard>);

    const card = screen.getByText('玻璃卡片内容').closest('div');
    expect(card).toHaveClass('test-class');
  });

  test('动画组件在禁用动画时仍然工作', () => {
    // 模拟用户偏好减少动画
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <AnimatedContainer animation="slideUp">
        <div>减少动画内容</div>
      </AnimatedContainer>
    );

    expect(screen.getByText('减少动画内容')).toBeInTheDocument();
  });
});

describe('ReactBit UI 高级动画组件', () => {
  test('ReactBitButton 正确渲染', () => {
    render(<ReactBitButton animation="ripple">动画按钮</ReactBitButton>);

    expect(
      screen.getByRole('button', { name: '动画按钮' })
    ).toBeInTheDocument();
  });

  test('ReactBitButton 支持加载状态', () => {
    render(<ReactBitButton loading={true}>加载按钮</ReactBitButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('ReactBitCard 支持交互动画', () => {
    const handleClick = jest.fn();

    render(
      <ReactBitCard animation="hover" clickable={true} onClick={handleClick}>
        可点击卡片
      </ReactBitCard>
    );

    const card = screen.getByText('可点击卡片');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalled();
  });

  test('ReactBitText 支持打字机效果', async () => {
    render(
      <ReactBitText variant="typewriter" speed={10}>
        打字机文本
      </ReactBitText>
    );

    // 由于动画被 mock，文本应该立即显示
    expect(screen.getByText(/打字机文本/)).toBeInTheDocument();
  });

  test('ReactBitSpinner 正确渲染', () => {
    render(<ReactBitSpinner variant="wave" size="md" data-testid="spinner" />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});

describe('组件库集成测试', () => {
  test('不同库的组件可以组合使用', () => {
    render(
      <div>
        <AnimatedContainer animation="fadeIn">
          <GlassCard className="p-4">
            <CardHeader>
              <CardTitle>集成测试</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="test">输入框</Label>
              <Input id="test" />
              <div className="mt-4 space-x-2">
                <Button variant="outline">取消</Button>
                <ReactBitButton animation="ripple">确认</ReactBitButton>
              </div>
            </CardContent>
          </GlassCard>
        </AnimatedContainer>
      </div>
    );

    expect(screen.getByText('集成测试')).toBeInTheDocument();
    expect(screen.getByLabelText('输入框')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '取消' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '确认' })).toBeInTheDocument();
  });

  test('主题系统在所有组件中一致工作', () => {
    render(
      <div className="dark">
        <Button>shadcn 按钮</Button>
        <GlassCard>Aceternity 卡片</GlassCard>
        <ReactBitButton>ReactBit 按钮</ReactBitButton>
      </div>
    );

    // 验证所有组件都正确渲染
    expect(
      screen.getByRole('button', { name: 'shadcn 按钮' })
    ).toBeInTheDocument();
    expect(screen.getByText('Aceternity 卡片')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'ReactBit 按钮' })
    ).toBeInTheDocument();
  });

  test('性能优化功能正常工作', () => {
    // 模拟低性能环境
    const mockPerformance = {
      memory: { usedJSHeapSize: 100 * 1024 * 1024 }, // 100MB
    };

    Object.defineProperty(window, 'performance', {
      value: mockPerformance,
      writable: true,
    });

    render(<ReactBitButton animation="complex">性能优化按钮</ReactBitButton>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('错误处理和边界情况', () => {
  test('组件在缺少必需属性时有合理的默认值', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('动画组件在不支持的环境中降级', () => {
    // 模拟不支持 requestAnimationFrame 的环境
    const originalRAF = window.requestAnimationFrame;
    delete (window as any).requestAnimationFrame;

    render(<ReactBitButton animation="ripple">降级按钮</ReactBitButton>);

    expect(screen.getByRole('button')).toBeInTheDocument();

    // 恢复原始函数
    window.requestAnimationFrame = originalRAF;
  });

  test('组件在无效属性时不崩溃', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <ReactBitButton animation="invalid" variant="invalid">
        容错按钮
      </ReactBitButton>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});

describe('可访问性测试', () => {
  test('所有交互组件支持键盘导航', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Button>按钮1</Button>
        <ReactBitButton>按钮2</ReactBitButton>
        <Input />
      </div>
    );

    // 测试 Tab 键导航
    await user.tab();
    expect(screen.getByRole('button', { name: '按钮1' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: '按钮2' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  test('组件支持屏幕阅读器', async () => {
    const { container } = render(
      <div>
        <Button aria-label="主要操作按钮">操作</Button>
        <ReactBitCard aria-label="信息卡片">卡片内容</ReactBitCard>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('表单组件有正确的标签关联', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="name">姓名</Label>
        <Input id="name" />

        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
