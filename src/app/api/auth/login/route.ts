import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 登录请求验证schema
const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少6位'),
  remember: z.boolean().optional(),
});

/**
 * 用户登录API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证请求数据
    const validatedData = loginSchema.parse(body);

    // 模拟用户验证逻辑
    // 在实际应用中，这里应该查询数据库验证用户凭据
    const { email, password, remember } = validatedData;

    // 模拟用户数据
    const mockUsers = [
      {
        id: '1',
        email: 'user@example.com',
        password: 'password123', // 在实际应用中应该是哈希密码
        name: '张三',
        avatar: null,
        role: 'user',
      },
      {
        id: '2',
        email: 'admin@example.com',
        password: 'admin123',
        name: '管理员',
        avatar: null,
        role: 'admin',
      },
    ];

    // 查找用户
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        {
          error: 'INVALID_CREDENTIALS',
          message: '邮箱或密码错误',
        },
        { status: 401 }
      );
    }

    // 生成JWT token（简化版本）
    // 在实际应用中，应该使用proper JWT库
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Date.now(),
      exp:
        Date.now() + (remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000), // 7天或1天
    };

    const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

    // 准备响应数据
    const responseData = {
      success: true,
      message: '登录成功',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        },
        token,
        expiresAt: tokenPayload.exp,
      },
    };

    // 创建响应
    const response = NextResponse.json(responseData);

    // 设置认证cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60, // 7天或1天（秒）
      path: '/',
    });

    // 设置用户信息cookie（非敏感信息）
    response.cookies.set(
      'user-info',
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }),
      {
        httpOnly: false, // 允许客户端访问
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60,
        path: '/',
      }
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: '请求数据格式错误',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: '服务器内部错误',
      },
      { status: 500 }
    );
  }
}

/**
 * 获取登录状态
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: 'NO_TOKEN',
          message: '未找到认证令牌',
        },
        { status: 401 }
      );
    }

    // 验证token（简化版本）
    try {
      const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());

      if (tokenData.exp < Date.now()) {
        return NextResponse.json(
          {
            error: 'TOKEN_EXPIRED',
            message: '认证令牌已过期',
          },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          userId: tokenData.userId,
          email: tokenData.email,
          role: tokenData.role,
          expiresAt: tokenData.exp,
        },
      });
    } catch (error) {
      return NextResponse.json(
        {
          error: 'INVALID_TOKEN',
          message: '无效的认证令牌',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: '服务器内部错误',
      },
      { status: 500 }
    );
  }
}
