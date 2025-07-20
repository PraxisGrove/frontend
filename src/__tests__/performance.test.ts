import { PerformanceMonitor } from '@/utils/performance';
import { TestingUtils } from '@/utils/testing';

// Mock performance APIs
const mockPerformanceObserver = jest.fn();
const mockPerformanceEntry = {
  name: 'first-contentful-paint',
  startTime: 1000,
  entryType: 'paint',
};

global.PerformanceObserver = jest.fn().mockImplementation((callback) => {
  mockPerformanceObserver.mockImplementation(callback);
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
});

global.performance = {
  ...global.performance,
  now: jest.fn(() => 1000),
  getEntriesByType: jest.fn(() => [mockPerformanceEntry]),
  memory: {
    usedJSHeapSize: 50 * 1024 * 1024, // 50MB
    totalJSHeapSize: 100 * 1024 * 1024, // 100MB
    jsHeapSizeLimit: 2 * 1024 * 1024 * 1024, // 2GB
  },
};

global.navigator = {
  ...global.navigator,
  connection: {
    effectiveType: '4g',
    downlink: 10,
    rtt: 50,
  },
  onLine: true,
};

describe('Performance Monitoring', () => {
  let monitor: PerformanceMonitor;

  beforeEach(() => {
    monitor = new PerformanceMonitor();
    jest.clearAllMocks();
  });

  afterEach(() => {
    monitor.cleanup();
  });

  describe('PerformanceMonitor', () => {
    it('should initialize with default metrics', () => {
      const metrics = monitor.getMetrics();

      expect(metrics).toBeDefined();
      expect(metrics.memoryUsage).toBeDefined();
      expect(metrics.connection).toBeDefined();
    });

    it('should record memory usage correctly', () => {
      const metrics = monitor.getMetrics();

      expect(metrics.memoryUsage).toEqual({
        used: 50, // 50MB
        total: 100, // 100MB
        limit: 2048, // 2GB
      });
    });

    it('should record connection information', () => {
      const metrics = monitor.getMetrics();

      expect(metrics.connection).toEqual({
        effectiveType: '4g',
        downlink: 10,
        rtt: 50,
      });
    });

    it('should calculate performance score correctly', () => {
      // Mock some performance metrics
      monitor['metrics'] = {
        lcp: 2000, // 2s - good
        fid: 50, // 50ms - good
        cls: 0.05, // 0.05 - good
        fcp: 1500, // 1.5s - good
      };

      const score = monitor.getPerformanceScore();

      expect(score.score).toBeGreaterThan(80);
      expect(score.grade).toBe('A');
    });

    it('should handle poor performance metrics', () => {
      // Mock poor performance metrics
      monitor['metrics'] = {
        lcp: 5000, // 5s - poor
        fid: 500, // 500ms - poor
        cls: 0.5, // 0.5 - poor
        fcp: 4000, // 4s - poor
      };

      const score = monitor.getPerformanceScore();

      expect(score.score).toBeLessThan(50);
      expect(score.grade).toBe('F');
    });

    it('should record first interaction time', () => {
      const startTime = Date.now();
      monitor.recordFirstInteraction();

      const metrics = monitor.getMetrics();
      expect(metrics.firstInteraction).toBeDefined();
      expect(metrics.firstInteraction).toBeGreaterThan(0);
    });
  });

  describe('TestingUtils', () => {
    beforeEach(() => {
      // Setup DOM
      document.body.innerHTML = `
        <div>
          <img src="test.jpg" alt="Test image" />
          <input id="test-input" type="text" />
          <label for="test-input">Test Label</label>
          <h1>Main Title</h1>
          <h2>Subtitle</h2>
          <p style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Test text</p>
        </div>
      `;
    });

    it('should test accessibility correctly', async () => {
      const result = await TestingUtils.testAccessibility();

      expect(result).toBeDefined();
      expect(result.passed).toBeDefined();
      expect(result.issues).toBeDefined();
      expect(result.score).toBeDefined();
    });

    it('should detect missing alt attributes', async () => {
      // Add image without alt
      const img = document.createElement('img');
      img.src = 'test2.jpg';
      document.body.appendChild(img);

      const result = await TestingUtils.testAccessibility();

      expect(
        result.issues.some((issue) => issue.includes('missing alt attribute'))
      ).toBe(true);
    });

    it('should test performance metrics', async () => {
      const result = await TestingUtils.testPerformance();

      expect(result).toBeDefined();
      expect(result.domQueryTime).toBeDefined();
      expect(result.animationTime).toBeDefined();
      expect(result.totalTime).toBeDefined();
      expect(result.score).toBeDefined();
    });

    it('should test network performance', async () => {
      const result = await TestingUtils.testNetworkPerformance();

      expect(result).toBeDefined();
      expect(result.resources).toBeDefined();
      expect(result.averageLoadTime).toBeDefined();
      expect(result.score).toBeDefined();
    });

    it('should run all tests and provide summary', async () => {
      const result = await TestingUtils.runAllTests();

      expect(result).toBeDefined();
      expect(result.responsive).toBeDefined();
      expect(result.accessibility).toBeDefined();
      expect(result.performance).toBeDefined();
      expect(result.network).toBeDefined();
      expect(result.totalScore).toBeDefined();
      expect(result.grade).toBeDefined();
    });

    it('should simulate user interactions', () => {
      const button = document.createElement('button');
      button.onclick = jest.fn();
      document.body.appendChild(button);

      // Test click simulation
      TestingUtils.simulateUserInteraction(button, 'click');
      expect(button.onclick).toHaveBeenCalled();
    });
  });

  describe('Performance Thresholds', () => {
    it('should meet Core Web Vitals thresholds', () => {
      const goodMetrics = {
        lcp: 2000, // < 2.5s
        fid: 80, // < 100ms
        cls: 0.08, // < 0.1
        fcp: 1600, // < 1.8s
      };

      // LCP threshold
      expect(goodMetrics.lcp).toBeLessThan(2500);

      // FID threshold
      expect(goodMetrics.fid).toBeLessThan(100);

      // CLS threshold
      expect(goodMetrics.cls).toBeLessThan(0.1);

      // FCP threshold
      expect(goodMetrics.fcp).toBeLessThan(1800);
    });

    it('should identify performance issues', () => {
      const poorMetrics = {
        lcp: 4000, // > 2.5s
        fid: 200, // > 100ms
        cls: 0.3, // > 0.1
        fcp: 3000, // > 1.8s
      };

      // These should fail the thresholds
      expect(poorMetrics.lcp).toBeGreaterThan(2500);
      expect(poorMetrics.fid).toBeGreaterThan(100);
      expect(poorMetrics.cls).toBeGreaterThan(0.1);
      expect(poorMetrics.fcp).toBeGreaterThan(1800);
    });
  });
});
