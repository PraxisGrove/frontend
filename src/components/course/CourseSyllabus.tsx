'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, FileText, HelpCircle, PenTool, Clock, Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  AnimatedContainer,
} from '@/components/unified';
import type { Course, CourseChapter, CourseLesson } from '@/types/api';

interface CourseSyllabusProps {
  course: Course;
  userProgress?: {
    completedLessons: string[];
    currentLesson?: string;
  };
  onLessonClick?: (lessonId: string) => void;
  className?: string;
}

/**
 * 课程大纲展示组件
 * 支持章节折叠、课时预览等功能
 */
export function CourseSyllabus({
  course,
  userProgress,
  onLessonClick,
  className = '',
}: CourseSyllabusProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const { curriculum, lessonsCount } = course;

  // 切换章节展开状态
  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  // 展开所有章节
  const expandAll = () => {
    setExpandedChapters(new Set(curriculum.map(chapter => chapter.id)));
  };

  // 折叠所有章节
  const collapseAll = () => {
    setExpandedChapters(new Set());
  };

  // 获取课时图标
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4" />;
      case 'assignment':
        return <PenTool className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // 获取课时类型文本
  const getLessonTypeText = (type: string) => {
    switch (type) {
      case 'video':
        return '视频';
      case 'text':
        return '文档';
      case 'quiz':
        return '测验';
      case 'assignment':
        return '作业';
      default:
        return '课时';
    }
  };

  // 格式化时长
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}分钟`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}小时${mins > 0 ? `${mins}分钟` : ''}`;
  };

  // 计算章节总时长
  const getChapterDuration = (chapter: CourseChapter) => {
    return chapter.lessons.reduce((total, lesson) => total + lesson.duration, 0);
  };

  // 计算章节完成进度
  const getChapterProgress = (chapter: CourseChapter) => {
    if (!userProgress) return 0;
    const completedLessons = chapter.lessons.filter(lesson =>
      userProgress.completedLessons.includes(lesson.id)
    ).length;
    return Math.round((completedLessons / chapter.lessons.length) * 100);
  };

  // 检查课时是否已完成
  const isLessonCompleted = (lessonId: string) => {
    return userProgress?.completedLessons.includes(lessonId) || false;
  };

  // 检查课时是否为当前课时
  const isCurrentLesson = (lessonId: string) => {
    return userProgress?.currentLesson === lessonId;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <AnimatedContainer animation="slideUp" delay={0.1}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                课程大纲
                <Badge variant="secondary" className="ml-2">
                  {lessonsCount} 课时
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={expandAll}
                  className="text-xs"
                >
                  展开全部
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={collapseAll}
                  className="text-xs"
                >
                  折叠全部
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {curriculum.map((chapter, chapterIndex) => {
              const isExpanded = expandedChapters.has(chapter.id);
              const chapterProgress = getChapterProgress(chapter);
              const chapterDuration = getChapterDuration(chapter);

              return (
                <AnimatedContainer
                  key={chapter.id}
                  animation="slideUp"
                  delay={0.1 * (chapterIndex + 1)}
                >
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                    <Collapsible
                      open={isExpanded}
                      onOpenChange={() => toggleChapter(chapter.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <div className="flex w-full cursor-pointer items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <div className="flex items-center gap-3">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                            <div className="text-left">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                第{chapterIndex + 1}章：{chapter.title}
                              </h3>
                              {chapter.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {chapter.description}
                                </p>
                              )}
                              <div className="mt-1 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                <span>{chapter.lessons.length} 课时</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDuration(chapterDuration)}
                                </span>
                                {userProgress && (
                                  <span>完成度: {chapterProgress}%</span>
                                )}
                              </div>
                            </div>
                          </div>
                          {userProgress && (
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                  className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                                  style={{ width: `${chapterProgress}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">
                                {chapterProgress}%
                              </span>
                            </div>
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t border-gray-200 dark:border-gray-700">
                          {chapter.lessons.map((lesson, lessonIndex) => {
                            const isCompleted = isLessonCompleted(lesson.id);
                            const isCurrent = isCurrentLesson(lesson.id);

                            return (
                              <div
                                key={lesson.id}
                                className={`flex items-center justify-between p-4 transition-colors ${
                                  isCurrent
                                    ? 'bg-blue-50 dark:bg-blue-900/20'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                } ${
                                  lessonIndex < chapter.lessons.length - 1
                                    ? 'border-b border-gray-100 dark:border-gray-800'
                                    : ''
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    {isCompleted ? (
                                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </div>
                                    ) : (
                                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600">
                                        <span className="text-xs text-gray-500">
                                          {lessonIndex + 1}
                                        </span>
                                      </div>
                                    )}
                                    <div className="text-gray-500 dark:text-gray-400">
                                      {getLessonIcon(lesson.type)}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`text-sm ${
                                          isCurrent
                                            ? 'font-medium text-blue-600 dark:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                      >
                                        {lesson.title}
                                      </span>
                                      <Badge variant="outline" className="text-xs">
                                        {getLessonTypeText(lesson.type)}
                                      </Badge>
                                      {lesson.isPreview && (
                                        <Badge variant="secondary" className="text-xs">
                                          <Eye className="mr-1 h-3 w-3" />
                                          预览
                                        </Badge>
                                      )}
                                    </div>
                                    {lesson.description && (
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {lesson.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDuration(lesson.duration)}
                                  </span>
                                  {(lesson.isPreview || isCompleted || userProgress) && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => onLessonClick?.(lesson.id)}
                                      className="h-8 px-2 text-xs"
                                    >
                                      {lesson.isPreview ? '预览' : isCompleted ? '重播' : '播放'}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </AnimatedContainer>
              );
            })}
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
}

export default CourseSyllabus;
