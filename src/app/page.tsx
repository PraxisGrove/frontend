import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ProductIntro } from '@/components/home/ProductIntro';
import { CTASection } from '@/components/home/CTASection';
import { RoadmapSection } from '@/components/home/RoadmapSection';
import { FooterSection } from '@/components/home/FooterSection';
import { QuickActions } from '@/components/home/QuickActions';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollSpy } from '@/components/ui/ScrollSpy';
import { BackToTop } from '@/components/ui/BackToTop';
import { MainLayout } from '@/components/layout/MainLayout';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import {
  SEOHead,
  WebsiteStructuredData,
  OrganizationStructuredData,
  EducationalOrganizationStructuredData,
} from '@/components/seo/SEOHead';

import { DevTools } from '@/components/dev/DevTools';

import { FloatingThemeToggle } from '@/components/ui/theme-toggle';
import { AdaptiveParticles } from '@/components/ui/PerformanceOptimizer';

// 页面区域配置
const sections = [
  { id: 'hero', label: '首页' },
  { id: 'features', label: '功能特性' },
  { id: 'product', label: '产品介绍' },
  { id: 'roadmap', label: '产品路线图' },
  { id: 'cta', label: '开始使用' },
];

// 浮动导航栏配置
const navItems = [
  { name: '首页', link: '#hero' },
  { name: '功能', link: '#features' },
  { name: '产品', link: '#product' },
  { name: '路线图', link: '#roadmap' },
  { name: '开始', link: '#cta' },
];

export default function HomePage() {
  return (
    <>
      {/* SEO 优化 */}
      <SEOHead
        title="首页"
        description="PraxisGrove - AI驱动的沉浸式在线教育平台，通过人工智能技术和3D知识宇宙，为您提供个性化学习体验。探索知识的无限可能，开启智慧学习新时代。"
        keywords={[
          '在线教育',
          'AI学习',
          '3D知识宇宙',
          '个性化学习',
          '人工智能教育',
          'PraxisGrove',
          '沉浸式学习',
        ]}
        type="website"
      />

      {/* 结构化数据 */}
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      <EducationalOrganizationStructuredData />

      <MainLayout showHeader={false}>
        {/* 全局粒子背景效果 */}
        <AdaptiveParticles className="fixed inset-0 z-0">
          <div />
        </AdaptiveParticles>

        {/* 浮动导航栏 - 确保在粒子效果之上 */}
        <div className="relative z-40">
          <FloatingNav
            navItems={navItems}
            showLoginButton={false}
            className="bg-background/80 border-border/50 border shadow-lg backdrop-blur-md"
          />
        </div>

        {/* 滚动进度指示器 */}
        <ScrollProgress />

        {/* 滚动间谍导航 */}
        <ScrollSpy sections={sections} />

        {/* 主要内容 - 确保在粒子效果之上 */}
        <main id="main-content" role="main" className="relative z-10">
          {/* Hero 区域 - 使用 TextGenerateEffect */}
          <section id="hero" aria-labelledby="hero-title" className="relative">
            <HeroSection />
          </section>

          {/* 功能特性展示区 - 使用 Card 组件和 HoverEffect */}
          <section
            id="features"
            aria-labelledby="features-title"
            className="relative"
          >
            <FeaturesSection />
          </section>

          {/* 产品介绍区域 - 使用 StickyScroll 效果 */}
          <section
            id="product"
            aria-labelledby="product-title"
            className="relative"
          >
            <ProductIntro />
          </section>

          {/* 产品路线图展示 */}
          <section
            id="roadmap"
            aria-labelledby="roadmap-title"
            className="relative"
          >
            <RoadmapSection />
          </section>

          {/* CTA 行动召唤区域 - 统一使用全局 AdaptiveParticles 背景 */}
          <section id="cta" aria-labelledby="cta-title" className="relative">
            <CTASection />
          </section>

          {/* 页脚区域 */}
          <FooterSection />
        </main>

        {/* 快速操作按钮 - 确保在粒子效果之上 */}
        <div className="relative z-20">
          <QuickActions />
        </div>

        {/* 返回顶部按钮 - 确保在粒子效果之上 */}
        <div className="relative z-30">
          <BackToTop />
        </div>

        {/* 浮动主题切换按钮 - 确保在粒子效果之上 */}
        <div className="relative z-30">
          <FloatingThemeToggle />
        </div>

        {/* 开发工具 - 确保在粒子效果之上 */}
        <div className="relative z-30">
          <DevTools />
        </div>
      </MainLayout>
    </>
  );
}
