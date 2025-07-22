'use client';

import React from 'react';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EnhancedCard,
  AceternityGlassCard,
  Badge,
} from '@/components/unified';
import { motion } from 'framer-motion';

/**
 * 3D知识宇宙页面
 */
export default function KnowledgeUniversePage() {
  // 导航配置
  const navItems = [
    { name: '知识宇宙', link: '/knowledge-universe' },
    { name: '仪表板', link: '/dashboard' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* 浮动导航栏 */}
      <FloatingNav navItems={navItems} />

      {/* 主题切换按钮 */}
      <div className="fixed right-4 top-4 z-40">
        <ThemeToggle />
      </div>

      <div className="container mx-auto space-y-8 px-4 py-20">
        {/* 页面标题 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
            3D知识宇宙
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            在三维空间中探索知识的无限可能，发现概念之间的深层联系
          </p>
        </motion.div>

        {/* 控制面板 */}
        <EnhancedCard variant="glow" className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  知识领域
                </label>
                <select className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-gray-900 backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 dark:text-white">
                  <option>全部领域</option>
                  <option>前端开发</option>
                  <option>人工智能</option>
                  <option>数据科学</option>
                  <option>3D图形</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  难度级别
                </label>
                <select className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-gray-900 backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 dark:text-white">
                  <option>所有级别</option>
                  <option>初级</option>
                  <option>中级</option>
                  <option>高级</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                className="rounded-md bg-blue-600/80 px-4 py-2 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                重置视角
              </motion.button>
              <motion.button
                className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-gray-700 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 dark:text-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                全屏模式
              </motion.button>
            </div>
          </div>
        </EnhancedCard>

        {/* 3D 渲染区域 */}
        <EnhancedCard variant="glow" className="mb-8 p-8">
          <div
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
            style={{ height: '600px' }}
          >
            {/* 3D Canvas 占位符 */}
            <div className="flex h-full w-full items-center justify-center text-white">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
                <motion.h3
                  className="mb-2 text-xl font-semibold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  3D知识图谱加载中...
                </motion.h3>
                <motion.p
                  className="text-white/70"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  正在构建您的个性化知识宇宙
                </motion.p>
                <motion.div
                  className="mx-auto mt-4 h-2 w-48 overflow-hidden rounded-full bg-white/20"
                  initial={{ width: 0 }}
                  animate={{ width: 192 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ width: '0%' }}
                    animate={{ width: '60%' }}
                    transition={{ delay: 1, duration: 2, ease: 'easeInOut' }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* 浮动控制器 */}
            <motion.div
              className="absolute right-4 top-4 rounded-lg border border-white/10 bg-black/30 p-3 backdrop-blur-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="space-y-2">
                <motion.button
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white transition-all hover:scale-110 hover:bg-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white transition-all hover:scale-110 hover:bg-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white transition-all hover:scale-110 hover:bg-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* 信息面板 */}
            <motion.div
              className="absolute bottom-4 left-4 max-w-sm rounded-lg border border-white/10 bg-black/30 p-4 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <motion.h4
                className="mb-2 font-semibold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                JavaScript 核心概念
              </motion.h4>
              <motion.p
                className="mb-3 text-sm text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                探索 JavaScript 的核心概念，包括变量、函数、对象等基础知识点。
              </motion.p>
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <span className="rounded border border-blue-500/20 bg-blue-500/30 px-2 py-1 text-xs text-blue-200">
                  初级
                </span>
                <span className="rounded border border-green-500/20 bg-green-500/30 px-2 py-1 text-xs text-green-200">
                  已学习
                </span>
              </motion.div>
            </motion.div>
          </div>
        </EnhancedCard>

        {/* 统计卡片 */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <EnhancedCard variant="glow" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  已掌握概念
                </p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    24
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-xs text-green-600 dark:text-green-400"
                  >
                    +12% 本周
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  共50个概念
                </p>
              </div>
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-600 dark:text-blue-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard variant="glow" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  学习进度
                </p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    68%
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-xs text-green-600 dark:text-green-400"
                  >
                    +8% 本月
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  总体完成度
                </p>
              </div>
              <div className="rounded-lg bg-green-500/20 p-2 text-green-600 dark:text-green-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard variant="glow" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  连接强度
                </p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    85%
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-xs text-green-600 dark:text-green-400"
                  >
                    +5% 提升
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  知识关联度
                </p>
              </div>
              <div className="rounded-lg bg-purple-500/20 p-2 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard variant="glow" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  学习时长
                </p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    48h
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-xs text-green-600 dark:text-green-400"
                  >
                    +15% 增长
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  本月累计
                </p>
              </div>
              <div className="rounded-lg bg-orange-500/20 p-2 text-orange-600 dark:text-orange-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </EnhancedCard>
        </div>

        {/* 导航和统计 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 学习路径 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-600 dark:text-blue-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                推荐学习路径
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                基于您的学习进度智能推荐
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center space-x-3 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      JavaScript 基础
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      变量、函数、对象
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-sm font-semibold text-white">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      DOM 操作
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      元素选择、事件处理
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-sm font-semibold text-white">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      异步编程
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Promise、async/await
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* 知识统计 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg bg-green-500/20 p-2 text-green-600 dark:text-green-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                知识统计
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                详细的学习数据分析
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      已掌握概念
                    </span>
                    <span className="text-gray-900 dark:text-white">24/50</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: '48%' }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      学习进度
                    </span>
                    <span className="text-gray-900 dark:text-white">68%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-600"
                      initial={{ width: 0 }}
                      animate={{ width: '68%' }}
                      transition={{ delay: 0.7, duration: 1 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      连接强度
                    </span>
                    <span className="text-gray-900 dark:text-white">85%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ delay: 0.9, duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 最近探索 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg bg-purple-500/20 p-2 text-purple-600 dark:text-purple-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                最近探索
              </CardTitle>
              <p className="text-muted-foreground text-sm">您的学习足迹</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/20">
                    <span className="text-xs font-semibold text-blue-400">
                      JS
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      闭包概念
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      2分钟前
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20">
                    <span className="text-xs font-semibold text-green-400">
                      AI
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      神经网络
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      15分钟前
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/20">
                    <span className="text-xs font-semibold text-purple-400">
                      3D
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      材质系统
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      1小时前
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 使用说明 */}
        <EnhancedCard
          variant="glass"
          className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10"
        >
          <h3 className="mb-4 text-lg font-semibold text-blue-900 dark:text-blue-100">
            如何使用3D知识宇宙
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <motion.div
              className="flex items-start space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                1
              </div>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  探索节点
                </p>
                <p className="text-blue-700 dark:text-blue-200">
                  点击知识节点查看详细信息和相关内容
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                2
              </div>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  导航空间
                </p>
                <p className="text-blue-700 dark:text-blue-200">
                  使用鼠标拖拽旋转，滚轮缩放视角
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                3
              </div>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  跟踪进度
                </p>
                <p className="text-blue-700 dark:text-blue-200">
                  查看学习路径和知识连接强度
                </p>
              </div>
            </motion.div>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
}
