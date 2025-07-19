'use client';

import React from 'react';
import { useController, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  useFormContext,
  FormField,
  FormLabel,
  FormError,
} from './form-provider';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  X,
  File,
  Image,
  FileText,
  Video,
  Music,
  Archive,
  AlertCircle,
  Check,
} from 'lucide-react';

// 文件类型
export type FileType =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'archive'
  | 'any';

// 上传状态
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

// 文件信息
export interface FileInfo {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: UploadStatus;
  progress: number;
  error?: string;
}

// 文件上传组件属性
export interface FileUploadProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;

  // 文件限制
  accept?: FileType | string;
  maxSize?: number; // MB
  maxFiles?: number;
  multiple?: boolean;

  // 上传配置
  uploadUrl?: string;
  onUpload?: (files: File[]) => Promise<string[]>;

  // 样式配置
  variant?: 'default' | 'dropzone' | 'button';
  showPreview?: boolean;
  showProgress?: boolean;
}

// 文件类型映射
const fileTypeMap: Record<FileType, string> = {
  image: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
  document: '.pdf,.doc,.docx,.txt,.rtf',
  archive: '.zip,.rar,.7z,.tar,.gz',
  any: '*/*',
};

// 文件图标映射
const fileIconMap: Record<string, React.ReactNode> = {
  image: <Image className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  audio: <Music className="h-4 w-4" />,
  document: <FileText className="h-4 w-4" />,
  archive: <Archive className="h-4 w-4" />,
  default: <File className="h-4 w-4" />,
};

/**
 * 获取文件类型
 */
function getFileType(file: File): string {
  const type = file.type.split('/')[0];
  if (['image', 'video', 'audio'].includes(type)) {
    return type;
  }

  const ext = file.name.split('.').pop()?.toLowerCase();
  if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext || '')) {
    return 'document';
  }

  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext || '')) {
    return 'archive';
  }

  return 'default';
}

/**
 * 格式化文件大小
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 文件预览组件
 */
function FilePreview({
  fileInfo,
  onRemove,
}: {
  fileInfo: FileInfo;
  onRemove: () => void;
}) {
  const fileType = getFileType(fileInfo.file);
  const icon = fileIconMap[fileType] || fileIconMap.default;

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3">
      <div className="flex-shrink-0">
        {fileType === 'image' && fileInfo.url ? (
          <img
            src={fileInfo.url}
            alt={fileInfo.name}
            className="h-10 w-10 rounded object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
            {icon}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{fileInfo.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(fileInfo.size)}
        </p>

        {fileInfo.status === 'uploading' && (
          <Progress value={fileInfo.progress} className="mt-1 h-1" />
        )}

        {fileInfo.status === 'error' && fileInfo.error && (
          <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="h-3 w-3" />
            {fileInfo.error}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {fileInfo.status === 'success' && (
          <Badge variant="default" className="bg-green-500">
            <Check className="mr-1 h-3 w-3" />
            完成
          </Badge>
        )}

        {fileInfo.status === 'uploading' && (
          <Badge variant="secondary">上传中...</Badge>
        )}

        {fileInfo.status === 'error' && (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" />
            失败
          </Badge>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

/**
 * 文件上传组件
 */
export function FileUpload<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  className,
  accept = 'any',
  maxSize = 10, // 10MB
  maxFiles = 1,
  multiple = false,
  uploadUrl,
  onUpload,
  variant = 'default',
  showPreview = true,
  showProgress = true,
}: FileUploadProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<FileInfo[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // 获取接受的文件类型
  const acceptTypes =
    typeof accept === 'string' && accept in fileTypeMap
      ? fileTypeMap[accept as FileType]
      : accept;

  // 验证文件
  const validateFile = (file: File): string | undefined => {
    // 检查文件大小
    if (file.size > maxSize * 1024 * 1024) {
      return `文件大小不能超过 ${maxSize}MB`;
    }

    // 检查文件类型
    if (
      accept !== 'any' &&
      typeof accept === 'string' &&
      accept in fileTypeMap
    ) {
      const allowedTypes = fileTypeMap[accept as FileType];
      if (allowedTypes !== '*/*') {
        const fileType = getFileType(file);
        if (
          !allowedTypes.includes(fileType) &&
          !allowedTypes.includes(file.type)
        ) {
          return `不支持的文件类型`;
        }
      }
    }

    return undefined;
  };

  // 处理文件选择
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: FileInfo[] = [];
    const fileArray = Array.from(selectedFiles);

    // 检查文件数量限制
    if (files.length + fileArray.length > maxFiles) {
      return;
    }

    fileArray.forEach((file) => {
      const error = validateFile(file);
      const fileInfo: FileInfo = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: error ? 'error' : 'idle',
        progress: 0,
        error,
      };

      newFiles.push(fileInfo);
    });

    setFiles((prev) => [...prev, ...newFiles]);

    // 自动上传
    if (onUpload && newFiles.some((f) => f.status === 'idle')) {
      handleUpload(newFiles.filter((f) => f.status === 'idle'));
    }
  };

  // 处理文件上传
  const handleUpload = async (filesToUpload: FileInfo[]) => {
    if (!onUpload) return;

    // 更新状态为上传中
    setFiles((prev) =>
      prev.map((f) =>
        filesToUpload.find((upload) => upload.id === f.id)
          ? { ...f, status: 'uploading' as UploadStatus, progress: 0 }
          : f
      )
    );

    try {
      const fileList = filesToUpload.map((f) => f.file);
      const urls = await onUpload(fileList);

      // 更新状态为成功
      setFiles((prev) =>
        prev.map((f) => {
          const uploadIndex = filesToUpload.findIndex(
            (upload) => upload.id === f.id
          );
          if (uploadIndex !== -1) {
            return {
              ...f,
              status: 'success' as UploadStatus,
              progress: 100,
              url: urls[uploadIndex],
            };
          }
          return f;
        })
      );

      // 更新表单值
      const fileUrls = files
        .filter((f) => f.status === 'success')
        .map((f) => f.url)
        .filter(Boolean);

      field.onChange(multiple ? fileUrls : fileUrls[0]);
    } catch (error) {
      // 更新状态为失败
      setFiles((prev) =>
        prev.map((f) =>
          filesToUpload.find((upload) => upload.id === f.id)
            ? {
                ...f,
                status: 'error' as UploadStatus,
                error: error instanceof Error ? error.message : '上传失败',
              }
            : f
        )
      );
    }
  };

  // 移除文件
  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // 拖拽处理
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <FormField className={className}>
      {label && (
        <FormLabel htmlFor={name} required={required}>
          {label}
        </FormLabel>
      )}

      <div className="space-y-4">
        {/* 上传区域 */}
        {variant === 'dropzone' ? (
          <div
            className={cn(
              'rounded-lg border-2 border-dashed p-6 text-center transition-colors',
              isDragOver
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25',
              error && 'border-destructive',
              disabled && 'pointer-events-none opacity-50'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">
              拖拽文件到此处或
              <Button
                type="button"
                variant="link"
                className="h-auto p-0"
                onClick={() => fileInputRef.current?.click()}
              >
                点击选择
              </Button>
            </p>
            <p className="text-xs text-muted-foreground">
              支持 {accept === 'any' ? '所有' : accept} 类型文件，最大 {maxSize}
              MB
              {maxFiles > 1 && `，最多 ${maxFiles} 个文件`}
            </p>
          </div>
        ) : (
          <Button
            type="button"
            variant={variant === 'button' ? 'default' : 'outline'}
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            选择文件
          </Button>
        )}

        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {/* 文件预览 */}
        {showPreview && files.length > 0 && (
          <div className="space-y-2">
            {files.map((fileInfo) => (
              <FilePreview
                key={fileInfo.id}
                fileInfo={fileInfo}
                onRemove={() => removeFile(fileInfo.id)}
              />
            ))}
          </div>
        )}
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <FormError name={name} />
    </FormField>
  );
}

// 默认导出
export default FileUpload;
