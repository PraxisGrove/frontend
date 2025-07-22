'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ProgressChart,
  LearningCalendar,
  Achievements,
  LearningStats,
  RecentCourses,
  defaultLearningStats,
} from '@/components/dashboard';
import { AnimatedContainer, GradientText } from '@/components/unified';
import { useAuth } from '@/hooks/useAuth';

// 注意：由于使用了 'use client'，metadata 需要在其他地方定义
// export const metadata: Metadata = {
//   title: '学习仪表板 - PraxisGrove',
//   description: '查看您的学习进度、成就和推荐内容',
// };

/**
 * 用户学习仪表板页面
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>(
    '30d'
  );

  // 模拟数据
  const [progressData, setProgressData] = useState([
    { date: '2024-01-01', studyTime: 45, completedLessons: 2, progress: 15 },
    { date: '2024-01-02', studyTime: 60, completedLessons: 3, progress: 25 },
    { date: '2024-01-03', studyTime: 30, completedLessons: 1, progress: 30 },
    { date: '2024-01-04', studyTime: 90, completedLessons: 4, progress: 45 },
    { date: '2024-01-05', studyTime: 75, completedLessons: 3, progress: 55 },
    { date: '2024-01-06', studyTime: 120, completedLessons: 5, progress: 70 },
    { date: '2024-01-07', studyTime: 45, completedLessons: 2, progress: 75 },
  ]);

  const [courseProgress] = useState([
    { name: 'JavaScript', progress: 75, color: '#3b82f6' },
    { name: '机器学习', progress: 45, color: '#10b981' },
    { name: 'Three.js', progress: 30, color: '#8b5cf6' },
    { name: 'React', progress: 60, color: '#f59e0b' },
  ]);

  const [learningCalendarData] = useState([
    {
      date: '2024-01-01',
      studyTime: 45,
      completedLessons: 2,
      courses: [
        { id: '1', name: 'JavaScript', progress: 15, color: '#3b82f6' },
      ],
      streak: true,
    },
    {
      date: '2024-01-02',
      studyTime: 60,
      completedLessons: 3,
      courses: [
        { id: '1', name: 'JavaScript', progress: 25, color: '#3b82f6' },
        { id: '2', name: '机器学习', progress: 10, color: '#10b981' },
      ],
      streak: true,
    },
  ]);

  const [achievements] = useState([
    {
      id: '1',
      title: '初学者',
      description: '完成第一门课程',
      icon: 'BookOpen',
      category: 'learning' as const,
      rarity: 'common' as const,
      isUnlocked: true,
      unlockedAt: '2024-01-01',
      progress: 1,
      maxProgress: 1,
      reward: { type: 'points' as const, value: 100 },
    },
    {
      id: '2',
      title: '连续学习者',
      description: '连续学习7天',
      icon: 'Target',
      category: 'streak' as const,
      rarity: 'rare' as const,
      isUnlocked: false,
      progress: 5,
      maxProgress: 7,
      reward: { type: 'badge' as const, value: '坚持徽章' },
    },
  ]);

  const [recentCourses] = useState([
    {
      id: '1',
      title: 'JavaScript 高级编程',
      instructor: '张老师',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      lastAccessedAt: '2024-01-07T10:30:00Z',
      nextLesson: {
        id: '16',
        title: '异步编程进阶',
        duration: 25,
      },
      rating: 4.8,
      category: '前端开发',
      difficulty: 'intermediate' as const,
    },
    {
      id: '2',
      title: '机器学习基础',
      instructor: '李博士',
      progress: 45,
      totalLessons: 30,
      completedLessons: 13,
      lastAccessedAt: '2024-01-06T15:20:00Z',
      nextLesson: {
        id: '14',
        title: '神经网络入门',
        duration: 35,
      },
      rating: 4.9,
      category: '人工智能',
      difficulty: 'beginner' as const,
    },
  ]);

  const [stats, setStats] = useState(defaultLearningStats);

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      // 更新统计数据
      const updatedStats = [...defaultLearningStats];
      updatedStats[0].value = 48; // 总学习时间
      updatedStats[1].value = 3; // 完成课程
      updatedStats[2].value = 5; // 连续学习天数
      updatedStats[3].value = 8; // 获得成就
      updatedStats[3].progress = { current: 8, total: 50, label: '成就进度' };
      updatedStats[4].value = 15; // 学习天数
      updatedStats[5].value = 4.7; // 平均评分
      updatedStats[6].value = 2.3; // 学习效率
      updatedStats[7].value = 2; // 获得证书
      updatedStats[7].progress = { current: 2, total: 10, label: '证书进度' };

      setStats(updatedStats);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 处理时间范围变化
  const handleTimeRangeChange = (range: '7d' | '30d' | '90d' | '1y') => {
    setTimeRange(range);
    // 这里可以根据时间范围重新获取数据
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <AnimatedContainer animation="slideDown" delay={0.1}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            <GradientText>学习仪表板</GradientText>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            欢迎回来，{user?.name || '学习者'}！查看您的学习进度和成就
          </p>
        </div>
      </AnimatedContainer>

      {/* 统计卡片 */}
      <LearningStats stats={stats} />

      {/* 主要内容选项卡 */}
      <AnimatedContainer animation="slideUp" delay={0.3}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="progress">学习进度</TabsTrigger>
            <TabsTrigger value="calendar">学习日历</TabsTrigger>
            <TabsTrigger value="achievements">成就</TabsTrigger>
            <TabsTrigger value="courses">我的课程</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <RecentCourses courses={recentCourses} />
              <ProgressChart
                data={progressData}
                courseProgress={courseProgress}
                timeRange={timeRange}
                onTimeRangeChange={handleTimeRangeChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <ProgressChart
              data={progressData}
              courseProgress={courseProgress}
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <LearningCalendar
              data={learningCalendarData}
              currentDate={new Date()}
              onDateSelect={(date) => console.log('Selected date:', date)}
            />
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Achievements
              achievements={achievements}
              totalPoints={1250}
              level={5}
              nextLevelProgress={65}
            />
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <RecentCourses
              courses={recentCourses}
              maxItems={10}
              showViewAll={false}
            />
          </TabsContent>
        </Tabs>
      </AnimatedContainer>
    </div>
  );
}
