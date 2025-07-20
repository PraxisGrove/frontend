'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  Zap,
  Rocket,
  Brain,
  Globe,
  Users,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapSectionProps {
  className?: string;
}

interface RoadmapItem {
  id: string;
  quarter: string;
  title: string;
  description: string;
  features: string[];
  status: 'completed' | 'in-progress' | 'planned';
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    id: 'q1-2025',
    quarter: '2025 Q1',
    title: 'AI 学习助手 2.0',
    description: '全面升级 AI 学习助手，提供更智能的个性化学习体验',
    features: [
      '多模态学习内容理解',
      '实时学习状态分析',
      '智能学习计划生成',
      '个性化难度调整',
    ],
    status: 'completed',
    icon: Brain,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'q2-2025',
    quarter: '2025 Q2',
    title: '3D 知识宇宙增强',
    description: '打造更加沉浸式的 3D 学习环境，支持 VR/AR 设备',
    features: [
      'VR/AR 设备支持',
      '物理引擎集成',
      '多人协作空间',
      '知识图谱可视化',
    ],
    status: 'in-progress',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'q3-2025',
    quarter: '2025 Q3',
    title: '智能学习社区',
    description: '构建全球学习者社区，实现智能匹配和协作学习',
    features: [
      '智能学习伙伴匹配',
      '实时协作工具',
      '知识分享平台',
      '学习成就系统',
    ],
    status: 'planned',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'q4-2025',
    quarter: '2025 Q4',
    title: '企业级解决方案',
    description: '为企业和教育机构提供定制化的学习管理系统',
    features: [
      '企业级权限管理',
      '学习数据分析',
      '定制化课程体系',
      'API 集成支持',
    ],
    status: 'planned',
    icon: Target,
    gradient: 'from-orange-500 to-red-500',
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    label: '已完成',
    color: 'bg-green-500',
    textColor: 'text-green-600',
  },
  'in-progress': {
    icon: Zap,
    label: '进行中',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
  },
  planned: {
    icon: Clock,
    label: '计划中',
    color: 'bg-muted',
    textColor: 'text-muted-foreground',
  },
};

export function RoadmapSection({ className }: RoadmapSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden py-12',
        // 使用透明背景以不遮挡粒子效果
        'bg-transparent',
        className
      )}
    >
      {/* 完全透明背景，让粒子效果完全展示 */}

      <div className="container relative z-10 mx-auto px-4">
        {/* 标题区域 */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 flex items-center justify-center">
            <Rocket className="text-primary mr-3 h-8 w-8" />
            <h2 className="text-foreground text-3xl font-bold md:text-4xl lg:text-5xl">
              产品路线图
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
            探索 PraxisGrove 的未来发展规划，见证教育科技的创新之路
          </p>
        </motion.div>

        {/* 路线图时间线 */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* 时间线连接线 */}
          <div className="from-primary via-secondary absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b to-transparent opacity-30" />

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <RoadmapCard
                key={item.id}
                item={item}
                index={index}
                variants={itemVariants}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface RoadmapCardProps {
  item: RoadmapItem;
  index: number;
  variants: any;
}

function RoadmapCard({ item, index, variants }: RoadmapCardProps) {
  const Icon = item.icon;
  const StatusIcon = statusConfig[item.status].icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={variants}
      className={cn(
        'relative flex items-center',
        isEven ? 'justify-start' : 'justify-end'
      )}
    >
      {/* 时间线节点 */}
      <div className="absolute left-1/2 z-20 -translate-x-1/2 transform">
        <div
          className={cn(
            'border-background h-6 w-6 rounded-full border-4',
            `bg-gradient-to-br ${item.gradient}`
          )}
        />
      </div>

      {/* 卡片内容 */}
      <div className={cn('w-full max-w-md', isEven ? 'pr-8' : 'pl-8')}>
        <Card
          className={cn(
            'bg-card/40 backdrop-blur-sm',
            'border-none',
            'transition-all duration-300',
            'hover:scale-105'
          )}
        >
          <CardHeader>
            <div className="mb-2 flex items-center justify-between">
              <Badge
                variant="secondary"
                className={cn(
                  'text-xs font-medium',
                  statusConfig[item.status].textColor
                )}
              >
                <StatusIcon className="mr-1 h-3 w-3" />
                {statusConfig[item.status].label}
              </Badge>
              <span className="text-muted-foreground text-sm font-medium">
                {item.quarter}
              </span>
            </div>

            <div className="mb-3 flex items-center">
              <div
                className={cn(
                  'mr-4 flex h-12 w-12 items-center justify-center rounded-full',
                  `bg-gradient-to-br ${item.gradient}`
                )}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-card-foreground text-xl font-bold">
                {item.title}
              </CardTitle>
            </div>

            <CardDescription className="text-muted-foreground leading-relaxed">
              {item.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2">
              {item.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="text-muted-foreground flex items-center text-sm"
                >
                  <div className="from-primary to-secondary mr-3 h-1.5 w-1.5 rounded-full bg-gradient-to-r" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
