#!/usr/bin/env node

/**
 * 简单的模拟 API 服务器
 * 用于开发环境测试
 */

const http = require('http');
const url = require('url');

const PORT = 8000;

// 模拟数据
const mockData = {
  categories: [
    {
      id: '1',
      name: '前端开发',
      slug: 'frontend',
      description: '现代前端开发技术',
      icon: '💻',
      coursesCount: 25,
      children: [
        { id: '1-1', name: 'React', slug: 'react', coursesCount: 8 },
        { id: '1-2', name: 'Vue.js', slug: 'vue', coursesCount: 6 },
      ],
    },
    {
      id: '2',
      name: '后端开发',
      slug: 'backend',
      description: '服务器端开发技术',
      icon: '⚙️',
      coursesCount: 20,
    },
  ],
  courses: [
    {
      id: '1',
      title: 'React 18 完整指南',
      description: '从零开始学习 React 18 的所有新特性',
      shortDescription: '全面掌握 React 18 新特性',
      instructor: {
        id: 'instructor-1',
        name: '张老师',
        avatar: '/images/instructors/zhang.jpg',
        bio: '前端架构师，拥有10年React开发经验',
        rating: 4.9,
        studentsCount: 15000,
        coursesCount: 12,
        specialties: ['React', 'JavaScript', 'TypeScript'],
      },
      category: {
        id: '1-1',
        name: 'React',
        slug: 'react',
        description: 'React 开发课程',
      },
      level: 'intermediate',
      duration: 1200,
      price: 299,
      originalPrice: 399,
      currency: 'CNY',
      rating: 4.8,
      reviewsCount: 1250,
      studentsCount: 8500,
      lessonsCount: 45,
      language: '中文',
      lastUpdated: '2024-01-15',
      isPublished: true,
      isFeatured: true,
      isPopular: true,
      tags: ['React', 'JavaScript', 'Frontend'],
      thumbnail: '/images/courses/react-18.jpg',
      certificate: true,
      requirements: ['基础的 HTML、CSS、JavaScript 知识'],
      whatYouWillLearn: ['掌握 React 18 的所有新特性'],
      curriculum: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
    },
  ],
};

// 创建服务器
const server = http.createServer((req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  console.log(`${new Date().toISOString()} - ${method} ${path}`);

  // 设置响应头
  res.setHeader('Content-Type', 'application/json');

  try {
    // 健康检查
    if (path === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'mock-api',
        version: '1.0.0',
      }));
      return;
    }

    // 获取课程分类
    if (path === '/api/courses/categories' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(mockData.categories));
      return;
    }

    // 获取课程列表
    if (path === '/api/courses' && method === 'GET') {
      const query = parsedUrl.query;
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedCourses = mockData.courses.slice(startIndex, endIndex);
      const totalPages = Math.ceil(mockData.courses.length / limit);

      const response = {
        data: {
          items: paginatedCourses,
          pagination: {
            page,
            limit,
            total: mockData.courses.length,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          },
        },
      };

      res.writeHead(200);
      res.end(JSON.stringify(response));
      return;
    }

    // 获取单个课程
    if (path.startsWith('/api/courses/') && method === 'GET') {
      const courseId = path.split('/')[3];
      const course = mockData.courses.find(c => c.id === courseId);
      
      if (course) {
        res.writeHead(200);
        res.end(JSON.stringify(course));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Course not found' }));
      }
      return;
    }

    // 404 - 路由不存在
    res.writeHead(404);
    res.end(JSON.stringify({ 
      error: 'Not Found',
      message: `Route ${path} not found`,
      availableRoutes: [
        'GET /api/health',
        'GET /api/courses/categories',
        'GET /api/courses',
        'GET /api/courses/:id',
      ],
    }));

  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ 
      error: 'Internal Server Error',
      message: error.message,
    }));
  }
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/courses/categories`);
  console.log(`   GET  http://localhost:${PORT}/api/courses`);
  console.log(`   GET  http://localhost:${PORT}/api/courses/:id`);
  console.log(`\n💡 To test the API, try:`);
  console.log(`   curl http://localhost:${PORT}/api/health`);
  console.log(`\n🛑 Press Ctrl+C to stop the server`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down mock API server...');
  server.close(() => {
    console.log('✅ Mock API server stopped');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  server.close(() => {
    console.log('✅ Mock API server stopped');
    process.exit(0);
  });
});
