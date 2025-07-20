import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface SvgLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  variant?: 'icon' | 'full' | 'text';
  color?: 'primary' | 'white' | 'black' | 'custom';
  customColor?: string;
  uniqueId?: string; // 添加唯一 ID 支持
}

/**
 * SVG Logo 组件
 * 提供矢量图形的 Logo，支持无损缩放
 */
export function SvgLogo({
  size = 'md',
  className,
  variant = 'icon',
  color = 'primary',
  customColor,
  uniqueId,
}: SvgLogoProps) {
  // 使用 React 18 的 useId 钩子生成唯一 ID，确保服务端和客户端一致
  const reactId = useId();
  const componentId = uniqueId || reactId;

  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const actualSize = typeof size === 'number' ? size : sizeMap[size];

  const getColor = () => {
    if (color === 'custom' && customColor) return customColor;
    if (color === 'white') return '#ffffff';
    if (color === 'black') return '#000000';
    return `url(#primaryGradient-${componentId})`;
  };

  const IconSvg = () => (
    <svg
      width={actualSize}
      height={actualSize}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      <defs>
        <linearGradient
          id={`primaryGradient-${componentId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient
          id={`secondaryGradient-${componentId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* 外圆环 */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke={getColor()}
        strokeWidth="2"
        opacity="0.3"
      />

      {/* 主要图标 - 抽象的知识树/网络结构 */}
      <g fill={getColor()}>
        {/* 中心节点 */}
        <circle cx="32" cy="32" r="4" />

        {/* 分支节点 */}
        <circle cx="20" cy="20" r="2.5" />
        <circle cx="44" cy="20" r="2.5" />
        <circle cx="20" cy="44" r="2.5" />
        <circle cx="44" cy="44" r="2.5" />
        <circle cx="32" cy="16" r="2" />
        <circle cx="32" cy="48" r="2" />
        <circle cx="16" cy="32" r="2" />
        <circle cx="48" cy="32" r="2" />

        {/* 连接线 */}
        <path
          d="M32 28 L32 16 M32 36 L32 48 M28 32 L16 32 M36 32 L48 32"
          stroke={getColor()}
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M29 29 L20 20 M35 29 L44 20 M29 35 L20 44 M35 35 L44 44"
          stroke={getColor()}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </g>

      {/* 字母 P (如果是图标模式) */}
      {variant === 'icon' && (
        <text
          x="32"
          y="38"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="white"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          P
        </text>
      )}
    </svg>
  );

  const TextSvg = () => (
    <svg
      width={actualSize * 4}
      height={actualSize}
      viewBox="0 0 256 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      <defs>
        <linearGradient
          id={`textGradient-${componentId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <text
        x="128"
        y="40"
        textAnchor="middle"
        fontSize="24"
        fontWeight="600"
        fill={
          color === 'primary' ? `url(#textGradient-${componentId})` : getColor()
        }
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5px"
      >
        PraxisGrove
      </text>
    </svg>
  );

  if (variant === 'text') {
    return <TextSvg />;
  }

  if (variant === 'full') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <IconSvg />
        <TextSvg />
      </div>
    );
  }

  return <IconSvg />;
}

/**
 * 生成 SVG 字符串的纯函数
 */
function generateSvgString(
  type: 'icon' | 'text' | 'full',
  size: number = 64
): string {
  const uniqueId = `download-${type}-${Date.now()}`;

  if (type === 'icon') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="primaryGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#primaryGradient-${uniqueId})" stroke-width="2" opacity="0.3" />
      <g fill="url(#primaryGradient-${uniqueId})">
        <circle cx="32" cy="32" r="4" />
        <circle cx="20" cy="20" r="2.5" />
        <circle cx="44" cy="20" r="2.5" />
        <circle cx="20" cy="44" r="2.5" />
        <circle cx="44" cy="44" r="2.5" />
        <circle cx="32" cy="16" r="2" />
        <circle cx="32" cy="48" r="2" />
        <circle cx="16" cy="32" r="2" />
        <circle cx="48" cy="32" r="2" />
        <path d="M32 28 L32 16 M32 36 L32 48 M28 32 L16 32 M36 32 L48 32" stroke="url(#primaryGradient-${uniqueId})" stroke-width="1.5" fill="none" opacity="0.8" />
        <path d="M29 29 L20 20 M35 29 L44 20 M29 35 L20 44 M35 35 L44 44" stroke="url(#primaryGradient-${uniqueId})" stroke-width="1.5" fill="none" opacity="0.6" />
      </g>
      <text x="32" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="white" font-family="system-ui, -apple-system, sans-serif">P</text>
    </svg>`;
  }

  if (type === 'text') {
    const textWidth = size * 4;
    return `<svg width="${textWidth}" height="${size}" viewBox="0 0 256 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="textGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="50%" stop-color="#8b5cf6" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
      </defs>
      <text x="128" y="40" text-anchor="middle" font-size="24" font-weight="600" fill="url(#textGradient-${uniqueId})" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-0.5px">PraxisGrove</text>
    </svg>`;
  }

  // full variant
  const textWidth = size * 4;
  const totalWidth = size + 12 + textWidth; // icon + gap + text
  return `<svg width="${totalWidth}" height="${size}" viewBox="0 0 ${totalWidth} 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="primaryGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
      <linearGradient id="textGradient-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="50%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
    </defs>
    <g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#primaryGradient-${uniqueId})" stroke-width="2" opacity="0.3" />
      <g fill="url(#primaryGradient-${uniqueId})">
        <circle cx="32" cy="32" r="4" />
        <circle cx="20" cy="20" r="2.5" />
        <circle cx="44" cy="20" r="2.5" />
        <circle cx="20" cy="44" r="2.5" />
        <circle cx="44" cy="44" r="2.5" />
        <circle cx="32" cy="16" r="2" />
        <circle cx="32" cy="48" r="2" />
        <circle cx="16" cy="32" r="2" />
        <circle cx="48" cy="32" r="2" />
        <path d="M32 28 L32 16 M32 36 L32 48 M28 32 L16 32 M36 32 L48 32" stroke="url(#primaryGradient-${uniqueId})" stroke-width="1.5" fill="none" opacity="0.8" />
        <path d="M29 29 L20 20 M35 29 L44 20 M29 35 L20 44 M35 35 L44 44" stroke="url(#primaryGradient-${uniqueId})" stroke-width="1.5" fill="none" opacity="0.6" />
      </g>
      <text x="32" y="38" text-anchor="middle" font-size="16" font-weight="bold" fill="white" font-family="system-ui, -apple-system, sans-serif">P</text>
    </g>
    <text x="${size + 12 + textWidth / 2}" y="40" text-anchor="middle" font-size="24" font-weight="600" fill="url(#textGradient-${uniqueId})" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-0.5px">PraxisGrove</text>
  </svg>`;
}

/**
 * 可下载的 SVG Logo 组件
 * 提供下载 SVG 文件的功能，修复了水合不匹配问题
 */
export function DownloadableSvgLogo({ size = 'lg' }: SvgLogoProps) {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const actualSize = typeof size === 'number' ? size : sizeMap[size];

  const downloadSvg = (type: 'icon' | 'text' | 'full') => {
    // 确保只在客户端执行
    if (typeof window === 'undefined') return;

    const svgString = generateSvgString(type, actualSize);
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `praxisgrove-logo-${type}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2 text-center">
          <div className="bg-muted/50 rounded-lg border p-4">
            <SvgLogo variant="icon" size={size} uniqueId="preview-icon" />
          </div>
          <button
            onClick={() => downloadSvg('icon')}
            className="rounded border border-blue-200 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800"
          >
            下载图标 SVG
          </button>
        </div>

        <div className="space-y-2 text-center">
          <div className="bg-muted/50 rounded-lg border p-4">
            <SvgLogo variant="text" size={size} uniqueId="preview-text" />
          </div>
          <button
            onClick={() => downloadSvg('text')}
            className="rounded border border-blue-200 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800"
          >
            下载文字 SVG
          </button>
        </div>

        <div className="space-y-2 text-center">
          <div className="bg-muted/50 rounded-lg border p-4">
            <SvgLogo variant="full" size={size} uniqueId="preview-full" />
          </div>
          <button
            onClick={() => downloadSvg('full')}
            className="rounded border border-blue-200 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800"
          >
            下载完整 SVG
          </button>
        </div>
      </div>
    </div>
  );
}
