'use client';

import React from 'react';
import { z } from 'zod';
import { PageContainer } from '@/components/layout/layout-container';
import { Grid, GridItem } from '@/components/layout/grid-system';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  FormProvider,
  FileUpload,
  FormSubmit,
  FormReset,
} from '@/components/forms';
import {
  Upload,
  Image,
  FileText,
  Video,
  Music,
  Archive,
  Settings,
} from 'lucide-react';

// 文件上传表单验证架构
const fileUploadSchema = z.object({
  avatar: z.string().url().optional(),
  documents: z.array(z.string().url()).optional(),
  images: z.array(z.string().url()).optional(),
  videos: z.array(z.string().url()).optional(),
  audio: z.array(z.string().url()).optional(),
  archives: z.array(z.string().url()).optional(),
});

type FileUploadForm = z.infer<typeof fileUploadSchema>;

export default function UploadDemoPage() {
  const [submittedData, setSubmittedData] =
    React.useState<FileUploadForm | null>(null);

  // 模拟文件上传函数
  const mockUpload = async (files: File[]): Promise<string[]> => {
    // 模拟上传延迟
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 模拟上传成功，返回文件URL
    return files.map((file) => {
      // 创建本地预览URL
      return URL.createObjectURL(file);
    });
  };

  // 表单提交处理
  const handleSubmit = (data: FileUploadForm) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    toast.success('文件上传成功！', {
      description: '所有文件已成功上传并保存',
    });
  };

  // 表单错误处理
  const handleError = (errors: any) => {
    console.log('Form errors:', errors);
    toast.error('表单验证失败', {
      description: '请检查并修正表单中的错误',
    });
  };

  return (
    <PageContainer
      title="文件上传组件演示"
      description="展示各种文件上传组件的功能和使用方式"
      actions={
        <div className="flex gap-2">
          <Badge variant="secondary">文件上传</Badge>
          <Badge variant="outline">拖拽支持</Badge>
        </div>
      }
      animated
    >
      <div className="space-y-8">
        {/* 文件上传表单 */}
        <Card>
          <CardHeader>
            <CardTitle>文件上传表单</CardTitle>
            <CardDescription>演示不同类型的文件上传组件和功能</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider
              schema={fileUploadSchema}
              onSubmit={handleSubmit}
              onError={handleError}
            >
              <Grid cols={{ xs: 1, md: 2 }} gap="lg">
                {/* 头像上传 */}
                <GridItem span={{ xs: 1, md: 2 }}>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Image className="h-5 w-5" aria-label="图片图标" />
                    头像上传
                  </h3>
                </GridItem>

                <GridItem span={{ xs: 1, md: 2 }}>
                  <FileUpload
                    name="avatar"
                    label="用户头像"
                    description="支持 JPG、PNG 格式，最大 5MB"
                    accept="image"
                    maxSize={5}
                    maxFiles={1}
                    variant="dropzone"
                    onUpload={mockUpload}
                    showPreview
                  />
                </GridItem>

                {/* 文档上传 */}
                <GridItem span={{ xs: 1, md: 2 }}>
                  <Separator className="my-6" />
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <FileText className="h-5 w-5" />
                    文档上传
                  </h3>
                </GridItem>

                <GridItem span={{ xs: 1, md: 2 }}>
                  <FileUpload
                    name="documents"
                    label="文档文件"
                    description="支持 PDF、DOC、DOCX 等格式，最大 20MB，最多 5 个文件"
                    accept="document"
                    maxSize={20}
                    maxFiles={5}
                    multiple
                    variant="dropzone"
                    onUpload={mockUpload}
                    showPreview
                  />
                </GridItem>

                {/* 图片上传 */}
                <GridItem span={{ xs: 1, md: 2 }}>
                  <Separator className="my-6" />
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Image className="h-5 w-5" aria-label="图片图标" />
                    图片上传
                  </h3>
                </GridItem>

                <FileUpload
                  name="images"
                  label="图片文件"
                  description="支持 JPG、PNG、GIF 格式，最大 10MB"
                  accept="image"
                  maxSize={10}
                  maxFiles={3}
                  multiple
                  variant="button"
                  onUpload={mockUpload}
                  showPreview
                />

                <FileUpload
                  name="videos"
                  label="视频文件"
                  description="支持 MP4、AVI、MOV 格式，最大 100MB"
                  accept="video"
                  maxSize={100}
                  maxFiles={2}
                  multiple
                  variant="default"
                  onUpload={mockUpload}
                  showPreview
                />

                {/* 音频和压缩包 */}
                <FileUpload
                  name="audio"
                  label="音频文件"
                  description="支持 MP3、WAV、AAC 格式，最大 50MB"
                  accept="audio"
                  maxSize={50}
                  maxFiles={3}
                  multiple
                  variant="default"
                  onUpload={mockUpload}
                  showPreview
                />

                <FileUpload
                  name="archives"
                  label="压缩包文件"
                  description="支持 ZIP、RAR、7Z 格式，最大 200MB"
                  accept="archive"
                  maxSize={200}
                  maxFiles={2}
                  multiple
                  variant="default"
                  onUpload={mockUpload}
                  showPreview
                />

                {/* 提交按钮 */}
                <GridItem span={{ xs: 1, md: 2 }}>
                  <div className="flex gap-4 pt-4">
                    <FormSubmit>
                      <Upload className="mr-2 h-4 w-4" />
                      提交文件
                    </FormSubmit>
                    <FormReset>重置表单</FormReset>
                  </div>
                </GridItem>
              </Grid>
            </FormProvider>
          </CardContent>
        </Card>

        {/* 上传功能特性 */}
        <Card>
          <CardHeader>
            <CardTitle>上传功能特性</CardTitle>
            <CardDescription>文件上传组件支持的功能和特性</CardDescription>
          </CardHeader>
          <CardContent>
            <Grid cols={{ xs: 1, md: 2, lg: 3 }} gap="lg">
              <Card className="p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                    <Upload className="h-5 w-5" />
                  </div>
                  <h4 className="font-medium">拖拽上传</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  支持拖拽文件到上传区域，提供直观的上传体验
                </p>
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2 text-green-600">
                    <Settings className="h-5 w-5" />
                  </div>
                  <h4 className="font-medium">文件验证</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  自动验证文件类型、大小和数量，确保上传文件符合要求
                </p>
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                    <Image className="h-5 w-5" aria-label="图片图标" />
                  </div>
                  <h4 className="font-medium">文件预览</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  支持图片预览和文件信息展示，方便用户确认上传内容
                </p>
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                    <Video className="h-5 w-5" />
                  </div>
                  <h4 className="font-medium">多种格式</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  支持图片、视频、音频、文档、压缩包等多种文件格式
                </p>
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2 text-red-600">
                    <Music className="h-5 w-5" />
                  </div>
                  <h4 className="font-medium">上传进度</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  实时显示上传进度和状态，提供清晰的反馈信息
                </p>
              </Card>

              <Card className="p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-teal-100 p-2 text-teal-600">
                    <Archive className="h-5 w-5" />
                  </div>
                  <h4 className="font-medium">批量上传</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  支持多文件同时上传，提高上传效率
                </p>
              </Card>
            </Grid>
          </CardContent>
        </Card>

        {/* 提交结果展示 */}
        {submittedData && (
          <Card>
            <CardHeader>
              <CardTitle>上传结果</CardTitle>
              <CardDescription>
                文件上传成功，以下是上传的文件信息
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-auto rounded-lg bg-muted p-4 text-sm">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
