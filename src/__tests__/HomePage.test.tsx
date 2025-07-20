import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/page';

// Mock the providers and complex components
jest.mock('@/contexts/providers', () => ({
  AppProviders: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/home/HeroSection', () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section</div>,
}));

jest.mock('@/components/home/FeaturesSection', () => ({
  FeaturesSection: () => (
    <div data-testid="features-section">Features Section</div>
  ),
}));

jest.mock('@/components/home/ProductIntro', () => ({
  ProductIntro: () => <div data-testid="product-intro">Product Intro</div>,
}));

jest.mock('@/components/home/TestimonialsSection', () => ({
  TestimonialsSection: () => (
    <div data-testid="testimonials-section">Testimonials Section</div>
  ),
}));

jest.mock('@/components/home/CTASection', () => ({
  CTASection: () => <div data-testid="cta-section">CTA Section</div>,
}));

jest.mock('@/components/layout/MainLayout', () => ({
  MainLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  ),
}));

jest.mock('@/components/optimization/FirstScreenOptimizer', () => ({
  FirstScreenOptimizer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CriticalResourcePreloader: () => null,
}));

jest.mock('@/components/seo/SEOHead', () => ({
  SEOHead: () => null,
  WebsiteStructuredData: () => null,
  OrganizationStructuredData: () => null,
  EducationalOrganizationStructuredData: () => null,
}));

jest.mock('@/components/accessibility/AccessibilityFeatures', () => ({
  AccessibilityPanel: () => (
    <div data-testid="accessibility-panel">Accessibility Panel</div>
  ),
}));

jest.mock('@/components/dev/DevTools', () => ({
  DevTools: () => <div data-testid="dev-tools">Dev Tools</div>,
}));

jest.mock('@/components/ui/ScrollProgress', () => ({
  ScrollProgress: () => (
    <div data-testid="scroll-progress">Scroll Progress</div>
  ),
}));

jest.mock('@/components/ui/ScrollSpy', () => ({
  ScrollSpy: () => <div data-testid="scroll-spy">Scroll Spy</div>,
}));

jest.mock('@/components/ui/BackToTop', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

jest.mock('@/components/home/QuickActions', () => ({
  QuickActions: () => <div data-testid="quick-actions">Quick Actions</div>,
}));

describe('HomePage', () => {
  it('renders all main sections', () => {
    render(<HomePage />);

    // Check if all main sections are rendered
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
    expect(screen.getByTestId('product-intro')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
  });

  it('renders navigation and utility components', () => {
    render(<HomePage />);

    // Check if navigation and utility components are rendered
    expect(screen.getByTestId('scroll-progress')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-spy')).toBeInTheDocument();
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
    expect(screen.getByTestId('quick-actions')).toBeInTheDocument();
  });

  it('renders accessibility and development tools', () => {
    render(<HomePage />);

    // Check if accessibility and development tools are rendered
    expect(screen.getByTestId('accessibility-panel')).toBeInTheDocument();
    expect(screen.getByTestId('dev-tools')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<HomePage />);

    // Check for semantic HTML elements
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute('id', 'main-content');
  });

  it('includes skip link for accessibility', () => {
    render(<HomePage />);

    // Check for skip link
    const skipLink = screen.getByText('跳转到主内容');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink).toHaveClass('skip-link');
  });

  it('has proper section structure with IDs', () => {
    render(<HomePage />);

    // Check for section IDs for navigation
    expect(document.querySelector('#hero')).toBeInTheDocument();
    expect(document.querySelector('#features')).toBeInTheDocument();
    expect(document.querySelector('#product')).toBeInTheDocument();
    expect(document.querySelector('#testimonials')).toBeInTheDocument();
    expect(document.querySelector('#cta')).toBeInTheDocument();
  });
});
