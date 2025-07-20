'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink,
  BookOpen,
  Users,
  Zap,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterSectionProps {
  className?: string;
}

const footerLinks = {
  product: [
    { name: 'AI 学习助手', href: '/features/ai-tutor' },
    { name: '3D 知识宇宙', href: '/features/3d-universe' },
    { name: '学习社区', href: '/features/community' },
    { name: '智能推荐', href: '/features/recommendations' },
  ],
  company: [
    { name: '关于我们', href: '/about' },
    { name: '团队介绍', href: '/team' },
    { name: '职业机会', href: '/careers' },
    { name: '新闻动态', href: '/news' },
  ],
  resources: [
    { name: '帮助中心', href: '/help' },
    { name: '开发者文档', href: '/docs' },
    { name: 'API 参考', href: '/api' },
    { name: '社区论坛', href: '/forum' },
  ],
  legal: [
    { name: '服务条款', href: '/terms' },
    { name: '隐私政策', href: '/privacy' },
    { name: 'Cookie 政策', href: '/cookies' },
    { name: '版权声明', href: '/copyright' },
  ],
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/praxisgrove' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/praxisgrove' },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/praxisgrove',
  },
];

const features = [
  { icon: BookOpen, text: '丰富的学习资源' },
  { icon: Users, text: '全球学习社区' },
  { icon: Zap, text: 'AI 智能助手' },
  { icon: Shield, text: '数据安全保护' },
];

export function FooterSection({ className }: FooterSectionProps) {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理邮件订阅逻辑
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer
      className={cn(
        'relative overflow-hidden',
        // 使用透明背景以不遮挡粒子效果
        'bg-transparent',
        className
      )}
    >
      {/* 微妙的背景渐变，不影响粒子效果 */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* 主要内容区域 */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* 品牌信息和订阅 */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h3 className="text-foreground mb-3 text-2xl font-bold">
                  PraxisGrove
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  革新教育体验，用 AI 和 3D
                  技术打造个性化学习平台，让知识获取更加高效有趣。
                </p>
              </div>

              {/* 特色功能 */}
              <div className="mb-6 space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-muted-foreground flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <feature.icon className="text-primary mr-3 h-4 w-4" />
                    <span className="text-sm">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* 邮件订阅 */}
              <div>
                <h4 className="text-foreground mb-3 font-semibold">订阅更新</h4>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="输入您的邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-card/50 border-border"
                    required
                  />
                  <Button
                    type="submit"
                    className="from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 w-full bg-gradient-to-r"
                  >
                    订阅
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* 链接区域 */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-3">
              {/* 产品 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground mb-4 font-semibold">产品</h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 公司 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground mb-4 font-semibold">公司</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 资源 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground mb-4 font-semibold">资源</h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground flex items-center text-sm transition-colors duration-200"
                      >
                        {link.name}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 法律 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground mb-4 font-semibold">法律</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* 底部信息 */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* 版权信息 */}
            <motion.div
              className="text-muted-foreground flex items-center text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span>© 2025 PraxisGrove. 保留所有权利.</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                Made with <Heart className="mx-1 h-4 w-4 text-red-400" /> in
                China
              </span>
            </motion.div>

            {/* 社交媒体链接 */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>

            {/* 联系信息 */}
            <motion.div
              className="text-muted-foreground flex items-center space-x-6 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a
                href="mailto:contact@praxisgrove.com"
                className="hover:text-foreground flex items-center transition-colors duration-200"
              >
                <Mail className="mr-2 h-4 w-4" />
                contact@praxisgrove.com
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
