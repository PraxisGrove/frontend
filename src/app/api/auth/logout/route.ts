import { NextRequest, NextResponse } from 'next/server';

/**
 * 用户登出API
 */
export async function POST(request: NextRequest) {
  try {
    // 创建响应
    const response = NextResponse.json({
      success: true,
      message: '登出成功',
    });

    // 清除认证相关的cookies
    response.cookies.delete('auth-token');
    response.cookies.delete('user-info');

    // 或者设置过期的cookies来确保清除
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    response.cookies.set('user-info', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);

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
 * 获取登出状态（可选）
 */
export async function GET() {
  return NextResponse.json(
    {
      message: '请使用POST方法进行登出操作',
    },
    { status: 405 }
  );
}
