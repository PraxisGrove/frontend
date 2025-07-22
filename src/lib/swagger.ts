/**
 * Swagger/OpenAPI 配置
 * 支持动态生成和静态定义
 */

// 基础配置定义
const baseSwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'PraxisGrove API Documentation',
    version: '1.0.0',
    description: `
      PraxisGrove 前端项目的 API 文档
      
      ## 概述
      这是 PraxisGrove 学习平台的 API 文档，包含所有口定义。
      
      ## 认证前端调用的接
      大部分 API 需要 Bearer Token 认证：
      \`\`\`
      Authorization: Bearer <your-token>
      \`\`\`
      
      ## 错误处理
      所有错误响应都遵循统一格式：
      \`\`\`json
      {
        "success": false,
        "error": "错误类型",
        "message": "错误描述",
        "details": {}
      }
      \`\`\`
    `,
    contact: {
      name: 'PraxisGrove Team',
      email: 'dev@praxisgrove.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: '本地后端开发服务器 (待开发)',
    },
    {
      url: 'https://api.praxisgrove.com',
      description: '生产环境后端服务器 (待部署)',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      // 通用响应格式
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: '请求是否成功',
          },
          data: {
            description: '响应数据',
          },
          message: {
            type: 'string',
            description: '响应消息',
          },
          error: {
            type: 'string',
            description: '错误类型',
          },
          details: {
            description: '错误详情',
          },
        },
      },

      // 分页响应
      PaginationResponse: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: '当前页码',
          },
          limit: {
            type: 'integer',
            description: '每页数量',
          },
          total: {
            type: 'integer',
            description: '总记录数',
          },
          totalPages: {
            type: 'integer',
            description: '总页数',
          },
          hasNext: {
            type: 'boolean',
            description: '是否有下一页',
          },
          hasPrev: {
            type: 'boolean',
            description: '是否有上一页',
          },
        },
      },

      // 用户相关
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '用户ID',
          },
          email: {
            type: 'string',
            format: 'email',
            description: '邮箱地址',
          },
          name: {
            type: 'string',
            description: '用户姓名',
          },
          firstName: {
            type: 'string',
            description: '名',
          },
          lastName: {
            type: 'string',
            description: '姓',
          },
          avatar: {
            type: 'string',
            nullable: true,
            description: '头像URL',
          },
          role: {
            type: 'string',
            enum: ['user', 'admin', 'instructor'],
            description: '用户角色',
          },
          isEmailVerified: {
            type: 'boolean',
            description: '邮箱是否已验证',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: '创建时间',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: '更新时间',
          },
        },
        required: ['id', 'email', 'name', 'role', 'isEmailVerified'],
      },

      // 课程相关
      Course: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '课程ID',
          },
          title: {
            type: 'string',
            description: '课程标题',
          },
          description: {
            type: 'string',
            description: '课程描述',
          },
          shortDescription: {
            type: 'string',
            description: '课程简介',
          },
          instructor: {
            $ref: '#/components/schemas/Instructor',
          },
          category: {
            $ref: '#/components/schemas/CourseCategory',
          },
          level: {
            type: 'string',
            enum: ['beginner', 'intermediate', 'advanced'],
            description: '课程难度',
          },
          duration: {
            type: 'integer',
            description: '课程时长(分钟)',
          },
          price: {
            type: 'number',
            description: '课程价格',
          },
          originalPrice: {
            type: 'number',
            description: '原价',
          },
          currency: {
            type: 'string',
            description: '货币单位',
          },
          rating: {
            type: 'number',
            minimum: 0,
            maximum: 5,
            description: '课程评分',
          },
          reviewsCount: {
            type: 'integer',
            description: '评价数量',
          },
          studentsCount: {
            type: 'integer',
            description: '学生数量',
          },
          lessonsCount: {
            type: 'integer',
            description: '课时数量',
          },
          language: {
            type: 'string',
            description: '课程语言',
          },
          lastUpdated: {
            type: 'string',
            format: 'date-time',
            description: '最后更新时间',
          },
          isPublished: {
            type: 'boolean',
            description: '是否已发布',
          },
          isFeatured: {
            type: 'boolean',
            description: '是否为推荐课程',
          },
          isPopular: {
            type: 'boolean',
            description: '是否为热门课程',
          },
          tags: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: '课程标签',
          },
          thumbnail: {
            type: 'string',
            description: '课程缩略图',
          },
          previewVideo: {
            type: 'string',
            description: '预览视频URL',
          },
          certificate: {
            type: 'boolean',
            description: '是否提供证书',
          },
          requirements: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: '课程要求',
          },
          whatYouWillLearn: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: '学习收获',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: '创建时间',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: '更新时间',
          },
        },
        required: [
          'id',
          'title',
          'description',
          'instructor',
          'category',
          'level',
          'duration',
          'price',
        ],
      },

      // 讲师信息
      Instructor: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '讲师ID',
          },
          name: {
            type: 'string',
            description: '讲师姓名',
          },
          title: {
            type: 'string',
            description: '讲师头衔',
          },
          bio: {
            type: 'string',
            description: '讲师简介',
          },
          avatar: {
            type: 'string',
            description: '讲师头像',
          },
          rating: {
            type: 'number',
            minimum: 0,
            maximum: 5,
            description: '讲师评分',
          },
          studentsCount: {
            type: 'integer',
            description: '学生数量',
          },
          coursesCount: {
            type: 'integer',
            description: '课程数量',
          },
        },
        required: ['id', 'name', 'title'],
      },

      // 课程分类
      CourseCategory: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '分类ID',
          },
          name: {
            type: 'string',
            description: '分类名称',
          },
          slug: {
            type: 'string',
            description: '分类标识',
          },
          description: {
            type: 'string',
            description: '分类描述',
          },
          icon: {
            type: 'string',
            description: '分类图标',
          },
          coursesCount: {
            type: 'integer',
            description: '课程数量',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/CourseCategory',
            },
            description: '子分类',
          },
        },
        required: ['id', 'name', 'slug'],
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// 扩展的数据模型定义
const extendedSchemas = {
  // 课程相关模型
  Lesson: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: '课时ID',
        example: 'lesson_123',
      },
      title: {
        type: 'string',
        description: '课时标题',
        example: 'JavaScript 基础语法',
      },
      description: {
        type: 'string',
        description: '课时描述',
        example: '学习 JavaScript 的基本语法和概念',
      },
      content: {
        type: 'string',
        description: '课时内容',
        example: '# JavaScript 基础\n\n本课时将介绍...',
      },
      videoUrl: {
        type: 'string',
        nullable: true,
        description: '视频URL',
        example: 'https://example.com/video.mp4',
      },
      duration: {
        type: 'integer',
        description: '课时时长(秒)',
        example: 1800,
      },
      order: {
        type: 'integer',
        description: '课时顺序',
        example: 1,
      },
      isPreview: {
        type: 'boolean',
        description: '是否为预览课时',
        example: false,
      },
      resources: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            url: { type: 'string' },
            type: { type: 'string', enum: ['pdf', 'doc', 'video', 'link'] },
          },
        },
        description: '课时资源',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: '创建时间',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: '更新时间',
      },
    },
    required: ['id', 'title', 'description', 'duration', 'order'],
  },

  // 学习进度模型
  Progress: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: '进度ID',
      },
      userId: {
        type: 'string',
        description: '用户ID',
      },
      courseId: {
        type: 'string',
        description: '课程ID',
      },
      lessonId: {
        type: 'string',
        nullable: true,
        description: '课时ID',
      },
      status: {
        type: 'string',
        enum: ['not_started', 'in_progress', 'completed'],
        description: '学习状态',
      },
      completionPercentage: {
        type: 'number',
        minimum: 0,
        maximum: 100,
        description: '完成百分比',
      },
      timeSpent: {
        type: 'integer',
        description: '学习时长(秒)',
      },
      lastAccessedAt: {
        type: 'string',
        format: 'date-time',
        description: '最后访问时间',
      },
      completedAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: '完成时间',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: '创建时间',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: '更新时间',
      },
    },
    required: ['id', 'userId', 'courseId', 'status', 'completionPercentage'],
  },

  // 评价模型
  Review: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: '评价ID',
      },
      userId: {
        type: 'string',
        description: '用户ID',
      },
      courseId: {
        type: 'string',
        description: '课程ID',
      },
      rating: {
        type: 'number',
        minimum: 1,
        maximum: 5,
        description: '评分(1-5星)',
      },
      title: {
        type: 'string',
        description: '评价标题',
      },
      content: {
        type: 'string',
        description: '评价内容',
      },
      isRecommended: {
        type: 'boolean',
        description: '是否推荐',
      },
      helpfulCount: {
        type: 'integer',
        description: '有用数量',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: '创建时间',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: '更新时间',
      },
      user: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          avatar: { type: 'string', nullable: true },
        },
        description: '评价用户信息',
      },
    },
    required: ['id', 'userId', 'courseId', 'rating', 'content'],
  },

  // 错误响应模型
  ErrorResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false,
        description: '请求是否成功',
      },
      error: {
        type: 'string',
        description: '错误类型',
        example: 'VALIDATION_ERROR',
      },
      message: {
        type: 'string',
        description: '错误描述',
        example: '请求参数验证失败',
      },
      details: {
        type: 'object',
        description: '错误详情',
        example: {
          field: 'email',
          code: 'INVALID_FORMAT',
        },
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        description: '错误发生时间',
      },
      path: {
        type: 'string',
        description: '请求路径',
        example: '/api/auth/login',
      },
    },
    required: ['success', 'error', 'message', 'timestamp'],
  },
};

// 完整的 OpenAPI 规范
export const swaggerSpec = {
  ...baseSwaggerDefinition,
  components: {
    ...baseSwaggerDefinition.components,
    schemas: {
      ...baseSwaggerDefinition.components.schemas,
      ...extendedSchemas,
    },
  },
  paths: {
    '/api/health': {
      get: {
        summary: '健康检查',
        description: '检查 API 服务状态',
        tags: ['System'],
        responses: {
          200: {
            description: '服务正常',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/courses': {
      get: {
        summary: '获取课程列表',
        description: '分页获取课程列表，支持筛选和排序',
        tags: ['Courses'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
              minimum: 1,
              default: 1,
            },
            description: '页码',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 12,
            },
            description: '每页数量',
          },
          {
            in: 'query',
            name: 'category',
            schema: {
              type: 'string',
            },
            description: '课程分类',
          },
          {
            in: 'query',
            name: 'level',
            schema: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced'],
            },
            description: '课程难度',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'string',
            },
            description: '搜索关键词',
          },
          {
            in: 'query',
            name: 'sort',
            schema: {
              type: 'string',
              enum: ['title', 'price', 'rating', 'createdAt', 'updatedAt'],
              default: 'createdAt',
            },
            description: '排序字段',
          },
          {
            in: 'query',
            name: 'order',
            schema: {
              type: 'string',
              enum: ['asc', 'desc'],
              default: 'desc',
            },
            description: '排序方向',
          },
        ],
        responses: {
          200: {
            description: '课程列表获取成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            items: {
                              type: 'array',
                              items: {
                                $ref: '#/components/schemas/Course',
                              },
                            },
                            pagination: {
                              $ref: '#/components/schemas/PaginationResponse',
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: '请求参数错误',
          },
          500: {
            description: '服务器内部错误',
          },
        },
      },
    },
    '/api/courses/{id}': {
      get: {
        summary: '获取课程详情',
        description: '根据课程ID获取详细信息',
        tags: ['Courses'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: '课程ID',
          },
        ],
        responses: {
          200: {
            description: '课程详情获取成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/Course',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          404: {
            description: '课程不存在',
          },
          500: {
            description: '服务器内部错误',
          },
        },
      },
    },
    '/api/courses/categories': {
      get: {
        summary: '获取课程分类',
        description: '获取所有课程分类，包含层级结构',
        tags: ['Courses'],
        responses: {
          200: {
            description: '课程分类获取成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/CourseCategory',
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          500: {
            description: '服务器内部错误',
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: '用户登录',
        description: '使用邮箱和密码登录',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    description: '邮箱地址',
                  },
                  password: {
                    type: 'string',
                    minLength: 6,
                    description: '密码',
                  },
                  remember: {
                    type: 'boolean',
                    description: '记住登录状态',
                    default: false,
                  },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: '登录成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            user: {
                              $ref: '#/components/schemas/User',
                            },
                            token: {
                              type: 'string',
                              description: 'JWT 访问令牌',
                            },
                            refreshToken: {
                              type: 'string',
                              description: '刷新令牌',
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: '请求参数错误',
          },
          401: {
            description: '邮箱或密码错误',
          },
          500: {
            description: '服务器内部错误',
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        summary: '用户注册',
        description: '创建新用户账号',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    description: '邮箱地址',
                  },
                  password: {
                    type: 'string',
                    minLength: 6,
                    description: '密码',
                  },
                  name: {
                    type: 'string',
                    minLength: 2,
                    description: '用户姓名',
                  },
                  firstName: {
                    type: 'string',
                    description: '名',
                  },
                  lastName: {
                    type: 'string',
                    description: '姓',
                  },
                },
                required: ['email', 'password', 'name'],
              },
            },
          },
        },
        responses: {
          201: {
            description: '注册成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            user: {
                              $ref: '#/components/schemas/User',
                            },
                            token: {
                              type: 'string',
                              description: 'JWT 访问令牌',
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: '请求参数错误',
          },
          409: {
            description: '邮箱已存在',
          },
          500: {
            description: '服务器内部错误',
          },
        },
      },
    },
    '/api/auth/profile': {
      get: {
        summary: '获取用户信息',
        description: '获取当前登录用户的详细信息',
        tags: ['Authentication'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: '用户信息获取成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: '未授权访问',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          500: {
            description: '服务器内部错误',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      put: {
        summary: '更新用户信息',
        description: '更新当前登录用户的个人信息',
        tags: ['Authentication'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 50,
                    description: '用户姓名',
                  },
                  firstName: {
                    type: 'string',
                    maxLength: 25,
                    description: '名',
                  },
                  lastName: {
                    type: 'string',
                    maxLength: 25,
                    description: '姓',
                  },
                  avatar: {
                    type: 'string',
                    format: 'uri',
                    description: '头像URL',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: '用户信息更新成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/User' },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: '请求参数错误',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          401: {
            description: '未授权访问',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },

    '/api/auth/logout': {
      post: {
        summary: '用户登出',
        description: '登出当前用户，使令牌失效',
        tags: ['Authentication'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: '登出成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: '登出成功' },
                  },
                },
              },
            },
          },
          401: {
            description: '未授权访问',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },

    '/api/auth/refresh': {
      post: {
        summary: '刷新访问令牌',
        description: '使用刷新令牌获取新的访问令牌',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  refreshToken: {
                    type: 'string',
                    description: '刷新令牌',
                  },
                },
                required: ['refreshToken'],
              },
            },
          },
        },
        responses: {
          200: {
            description: '令牌刷新成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            token: {
                              type: 'string',
                              description: '新的访问令牌',
                            },
                            refreshToken: {
                              type: 'string',
                              description: '新的刷新令牌',
                            },
                            expiresIn: {
                              type: 'integer',
                              description: '令牌过期时间(秒)',
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: '刷新令牌无效或已过期',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },

    '/api/courses/{id}/lessons': {
      get: {
        summary: '获取课程课时列表',
        description: '获取指定课程的所有课时信息',
        tags: ['Courses'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: '课程ID',
          },
        ],
        responses: {
          200: {
            description: '课时列表获取成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/Lesson' },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          404: {
            description: '课程不存在',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },

    '/api/courses/{id}/enroll': {
      post: {
        summary: '报名课程',
        description: '用户报名参加指定课程',
        tags: ['Courses'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: '课程ID',
          },
        ],
        responses: {
          200: {
            description: '报名成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            enrollmentId: {
                              type: 'string',
                              description: '报名ID',
                            },
                            enrolledAt: {
                              type: 'string',
                              format: 'date-time',
                              description: '报名时间',
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: '已经报名或课程不可报名',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          401: {
            description: '未授权访问',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          404: {
            description: '课程不存在',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },

    '/api/lessons/{id}/progress': {
      put: {
        summary: '更新课时学习进度',
        description: '更新用户在指定课时的学习进度',
        tags: ['Learning'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: '课时ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['in_progress', 'completed'],
                    description: '学习状态',
                  },
                  completionPercentage: {
                    type: 'number',
                    minimum: 0,
                    maximum: 100,
                    description: '完成百分比',
                  },
                  timeSpent: {
                    type: 'integer',
                    minimum: 0,
                    description: '本次学习时长(秒)',
                  },
                },
                required: ['status', 'completionPercentage'],
              },
            },
          },
        },
        responses: {
          200: {
            description: '进度更新成功',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/Progress' },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: '请求参数错误',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          401: {
            description: '未授权访问',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          404: {
            description: '课时不存在或未报名',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'System',
      description: '系统相关接口',
      externalDocs: {
        description: '了解更多',
        url: 'https://docs.praxisgrove.com/system',
      },
    },
    {
      name: 'Authentication',
      description: '用户认证相关接口',
      externalDocs: {
        description: '认证指南',
        url: 'https://docs.praxisgrove.com/auth',
      },
    },
    {
      name: 'Courses',
      description: '课程管理相关接口',
      externalDocs: {
        description: '课程API指南',
        url: 'https://docs.praxisgrove.com/courses',
      },
    },
    {
      name: 'Learning',
      description: '学习进度相关接口',
      externalDocs: {
        description: '学习进度指南',
        url: 'https://docs.praxisgrove.com/learning',
      },
    },
  ],
};

/**
 * 动态生成 Swagger 规范
 * 支持运行时配置和环境变量
 */
export async function getSwaggerSpec() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  // 动态服务器配置
  const servers = [
    {
      url: baseUrl,
      description: isDevelopment
        ? '开发环境 API 服务器'
        : '生产环境 API 服务器',
    },
  ];

  // 如果是开发环境，添加本地前端代理
  if (isDevelopment) {
    servers.push({
      url: 'http://localhost:3000',
      description: '前端开发服务器 (API 代理)',
    });
  }

  // 增强的规范
  const enhancedSpec = {
    ...swaggerSpec,
    info: {
      ...swaggerSpec.info,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      'x-api-id': 'praxisgrove-api',
      'x-audience': 'external',
      'x-environment': process.env.NODE_ENV || 'development',
    },
    servers,
    'x-tagGroups': [
      {
        name: '核心功能',
        tags: ['Authentication', 'Courses', 'Learning'],
      },
      {
        name: '系统功能',
        tags: ['System'],
      },
    ],
  };

  return enhancedSpec;
}

// 默认导出动态生成函数
export default getSwaggerSpec;
