import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ProductIntro } from '@/components/home/ProductIntro';
import { CTASection } from '@/components/home/CTASection';
import { RoadmapSection } from '@/components/home/RoadmapSection';
import { FooterSection } from '@/components/home/FooterSection';
import { QuickActions } from '@/components/home/QuickActions';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollSpy } from '@/components/ui/ScrollSpy';
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

// 页面区域配置 - 用于 ScrollSpy 跟踪
const sections = [
  { id: 'hero', label: '首页' },
  { id: 'features', label: '功能特性' },
  { id: 'product', label: '产品介绍' },
  { id: 'roadmap', label: '产品路线图' },
  { id: 'cta', label: '开始使用' },
];

// 导航配置
const navItems = [
  { name: '知识宇宙', link: '/knowledge-universe' },
  { name: '仪表板', link: '/dashboard' },
];

export default function HomePage() {
  return (
    <>
      {/* SEO 优化 */}
      <SEOHead
        title="首页"
        description="PraxisGrove - 通过人工智能技术和区块链技术，为您提供个性化学习体验。探索知识的无限可能，开启智慧学习新时代。"
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

      <div className="bg-background min-h-screen">
        <AdaptiveParticles className="fixed inset-0 z-0">
          <div />
        </AdaptiveParticles>

        <FloatingNav navItems={navItems} showLoginButton={true} />
        <ScrollProgress />
        <ScrollSpy sections={sections} />

        <main id="main-content" role="main" className="relative z-10">
          <section id="hero" aria-labelledby="hero-title" className="relative">
            <HeroSection />
          </section>

          <section
            id="features"
            aria-labelledby="features-title"
            className="relative"
          >
            <FeaturesSection />
          </section>

          <section
            id="product"
            aria-labelledby="product-title"
            className="relative"
          >
            <ProductIntro />
          </section>

          <section
            id="roadmap"
            aria-labelledby="roadmap-title"
            className="relative"
          >
            <RoadmapSection />
          </section>

          <section id="cta" aria-labelledby="cta-title" className="relative">
            <CTASection />
          </section>

          <FooterSection />
        </main>

        <QuickActions />
        <FloatingThemeToggle />
        <DevTools />
      </div>
    </>
  );
}
