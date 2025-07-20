'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedTable, ColumnDef } from '@/components/ui/enhanced-table';
import {
  AceternityThemeProvider,
  EnhancedContainer,
  AnimatedContainer,
  AnimatedItem,
} from '@/components/aceternity';
import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

// 示例数据类型
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin: string;
  avatar?: string;
}

// 示例数据
const sampleUsers: User[] = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20 10:30',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: 'active',
    createdAt: '2024-01-16',
    lastLogin: '2024-01-19 14:20',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    status: 'inactive',
    createdAt: '2024-01-17',
    lastLogin: '2024-01-18 09:15',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '用户',
    status: 'pending',
    createdAt: '2024-01-18',
    lastLogin: '从未登录',
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: '编辑',
    status: 'active',
    createdAt: '2024-01-19',
    lastLogin: '2024-01-20 16:45',
  },
  // 添加更多数据以测试分页
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 6,
    name: `用户${i + 6}`,
    email: `user${i + 6}@example.com`,
    role: ['管理员', '编辑', '用户'][i % 3],
    status: (['active', 'inactive', 'pending'] as const)[i % 3],
    createdAt: `2024-01-${String(i + 20).padStart(2, '0')}`,
    lastLogin:
      i % 4 === 0
        ? '从未登录'
        : `2024-01-${String(i + 20).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  })),
];

export default function TableDemoPage() {
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  // 状态徽章组件
  const StatusBadge = ({ status }: { status: User['status'] }) => {
    const variants = {
      active:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      pending:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    };

    const labels = {
      active: '活跃',
      inactive: '非活跃',
      pending: '待审核',
    };

    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  // 操作按钮组件
  const ActionButtons = ({ user }: { user: User }) => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );

  // 用户表格列定义
  const userColumns: ColumnDef<User>[] = [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      sortable: true,
      width: 80,
    },
    {
      id: 'name',
      header: '姓名',
      accessorKey: 'name',
      sortable: true,
      cell: ({ value }) => <div className="font-medium">{value}</div>,
    },
    {
      id: 'email',
      header: '邮箱',
      accessorKey: 'email',
      sortable: true,
      cell: ({ value }) => <div className="text-muted-foreground">{value}</div>,
    },
    {
      id: 'role',
      header: '角色',
      accessorKey: 'role',
      sortable: true,
      filterable: true,
    },
    {
      id: 'status',
      header: '状态',
      accessorKey: 'status',
      sortable: true,
      cell: ({ value }) => <StatusBadge status={value} />,
      align: 'center',
    },
    {
      id: 'createdAt',
      header: '创建时间',
      accessorKey: 'createdAt',
      sortable: true,
    },
    {
      id: 'lastLogin',
      header: '最后登录',
      accessorKey: 'lastLogin',
      sortable: true,
      cell: ({ value }) => (
        <div className={value === '从未登录' ? 'text-muted-foreground' : ''}>
          {value}
        </div>
      ),
    },
    {
      id: 'actions',
      header: '操作',
      cell: ({ row }) => <ActionButtons user={row} />,
      align: 'center',
      width: 150,
    },
  ];

  // 简单表格列定义（用于基础示例）
  const simpleColumns: ColumnDef<User>[] = [
    {
      id: 'name',
      header: '姓名',
      accessorKey: 'name',
      sortable: true,
    },
    {
      id: 'email',
      header: '邮箱',
      accessorKey: 'email',
      sortable: true,
    },
    {
      id: 'role',
      header: '角色',
      accessorKey: 'role',
      sortable: true,
    },
    {
      id: 'status',
      header: '状态',
      accessorKey: 'status',
      cell: ({ value }) => <StatusBadge status={value} />,
    },
  ];

  return (
    <AceternityThemeProvider>
      <div className="bg-background min-h-screen">
        <EnhancedContainer className="space-y-16 py-16">
          {/* 标题 */}
          <AnimatedContainer
            animation="slideDown"
            className="space-y-4 text-center"
          >
            <h1 className="text-foreground text-4xl font-bold md:text-5xl">
              Table/Pagination 组件演示
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              展示增强的表格组件，支持排序、筛选、分页、搜索和行选择功能
            </p>
          </AnimatedContainer>

          {/* 基础表格 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">基础表格</h2>
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">简单数据展示</h3>
              <EnhancedTable
                data={sampleUsers.slice(0, 5)}
                columns={simpleColumns}
                pagination={false}
                globalSearch={false}
              />
            </Card>
          </section>

          {/* 完整功能表格 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">完整功能表格</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">用户管理</h3>
                  {selectedUsers.length > 0 && (
                    <div className="text-muted-foreground text-sm">
                      已选择 {selectedUsers.length} 个用户
                    </div>
                  )}
                </div>

                <EnhancedTable
                  data={sampleUsers}
                  columns={userColumns}
                  pagination={true}
                  sorting={true}
                  globalSearch={true}
                  selectable={true}
                  pageSize={10}
                  pageSizeOptions={[5, 10, 20, 50]}
                  onRowClick={(user) => console.log('点击用户:', user)}
                  onRowSelect={setSelectedUsers}
                  emptyMessage="没有找到用户数据"
                />
              </div>
            </Card>
          </section>

          {/* 加载状态演示 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">加载状态</h2>
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">数据加载中</h3>
              <EnhancedTable
                data={[]}
                columns={simpleColumns}
                loading={true}
                pagination={false}
              />
            </Card>
          </section>

          {/* 空数据状态 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">空数据状态</h2>
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">无数据展示</h3>
              <EnhancedTable
                data={[]}
                columns={simpleColumns}
                loading={false}
                emptyMessage="暂无用户数据，请添加新用户"
              />
            </Card>
          </section>

          {/* 特性说明 */}
          <section className="space-y-8">
            <Card className="bg-muted/50 p-8 text-center">
              <h2 className="mb-4 text-xl font-bold">表格组件特性</h2>
              <div className="mx-auto grid max-w-4xl gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="text-primary font-medium">🔍 全局搜索</h4>
                  <p className="text-muted-foreground text-sm">
                    支持跨列的全局搜索功能
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">↕️ 排序功能</h4>
                  <p className="text-muted-foreground text-sm">
                    点击列标题进行升序/降序排序
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">📄 分页导航</h4>
                  <p className="text-muted-foreground text-sm">
                    完整的分页控件和页面大小选择
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">☑️ 行选择</h4>
                  <p className="text-muted-foreground text-sm">
                    支持单选和多选行功能
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🎨 自定义渲染</h4>
                  <p className="text-muted-foreground text-sm">
                    灵活的单元格内容自定义
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">📱 响应式设计</h4>
                  <p className="text-muted-foreground text-sm">
                    完美适配移动端和桌面端
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">⚡ 高性能</h4>
                  <p className="text-muted-foreground text-sm">
                    虚拟滚动和优化的渲染性能
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🎭 动画效果</h4>
                  <p className="text-muted-foreground text-sm">
                    流畅的行动画和状态转换
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🔧 易于扩展</h4>
                  <p className="text-muted-foreground text-sm">
                    灵活的配置选项和扩展接口
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </EnhancedContainer>
      </div>
    </AceternityThemeProvider>
  );
}
