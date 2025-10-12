import React from 'react';
import { useTranslations } from 'next-intl';
import { ControlPanelProps, AspectRatio } from '@/types/hero';
import { cn } from '@/lib/utils';

/**
 * ControlPanel - 控制面板组件
 *
 * 图片上传、参数配置的核心组件
 * 状态在Hero切换过程中保持不变
 */
export default function ControlPanel({
  state,
  onChange,
  onBackToOne,
  currentMode,
  className,
  maxImages = 5,
  maxPromptLength = 1000,
  showBackButton = true,
}: ControlPanelProps) {
  const t = useTranslations('hero_switcher.control_panel');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxImages - state.uploadedImages.length;
    const filesToAdd = files.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      onChange({
        ...state,
        uploadedImages: [...state.uploadedImages, ...filesToAdd]
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = state.uploadedImages.filter((_, i) => i !== index);
    onChange({ ...state, uploadedImages: newImages });
  };

  const updatePrompt = (prompt: string) => {
    if (prompt.length <= maxPromptLength) {
      onChange({ ...state, prompt });
    }
  };

  const updateAspectRatio = (aspectRatio: AspectRatio) => {
    onChange({ ...state, aspectRatio });
  };

  const updateOutputCount = (outputCount: number) => {
    onChange({ ...state, outputCount });
  };

  return (
    <div className={cn(
      "rounded-2xl p-6 bg-white shadow-lg border border-gray-200 h-full flex flex-col",
      className
    )}>
      {/* 标题 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('title')}</h2>
        <p className="text-sm text-gray-600">
          {t('description', { maxImages })}
        </p>
      </div>

      {/* 图片上传区域 */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="image-upload"
              disabled={state.uploadedImages.length >= maxImages}
            />
            <label
              htmlFor="image-upload"
              className={cn(
                "px-4 py-2 rounded-lg cursor-pointer transition-colors",
                state.uploadedImages.length >= maxImages
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              )}
            >
              {t('upload_button')}
            </label>
            <p className="text-xs text-gray-500 mt-2">
              {t('file_types')}
            </p>
            {state.uploadedImages.length >= maxImages && (
              <p className="text-xs text-red-500 mt-1">
                {t('max_images_reached', { maxImages })}
              </p>
            )}
          </div>
        </div>

        {/* 已上传图片列表 */}
        {state.uploadedImages.length > 0 && (
          <div className="mt-4 space-y-2">
            {state.uploadedImages.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                  {file.name}
                </span>
                <button
                  onClick={() => removeImage(index)}
                  className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  {t('remove')}
                </button>
              </div>
            ))}
            <div className="text-xs text-gray-500 text-right">
              {t('images_count', { count: state.uploadedImages.length, max: maxImages })}
            </div>
          </div>
        )}
      </div>

      {/* Prompt输入 */}
      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-900 mb-2">
          {t('prompt_title')}
        </label>
        <p className="text-sm text-gray-600 mb-3">
          {t('prompt_description')}
        </p>
        <textarea
          id="prompt"
          value={state.prompt}
          onChange={(e) => updatePrompt(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          rows={3}
          placeholder={t('prompt_placeholder')}
          maxLength={maxPromptLength}
        />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {state.prompt.length}/{maxPromptLength}
        </div>
      </div>

      {/* 宽高比选择 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-3">
          {t('aspect_ratio_title')}
        </label>
        <p className="text-sm text-gray-600 mb-3">
          {t('aspect_ratio_description')}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(['1:1', '2:3', '16:9'] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => updateAspectRatio(ratio)}
              className={cn(
                "p-3 border rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                state.aspectRatio === ratio
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-300 hover:border-gray-400'
              )}
              aria-label={`Set aspect ratio to ${ratio}`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* 输出数量 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-3">
          {t('output_count_title')}
        </label>
        <p className="text-sm text-gray-600 mb-3">
          {t('output_count_description')}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 4].map((count) => (
            <button
              key={count}
              onClick={() => updateOutputCount(count)}
              className={cn(
                "p-3 border rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                state.outputCount === count
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-300 hover:border-gray-400'
              )}
              aria-label={`Set output count to ${count}`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* 底部按钮区域 */}
      <div className="mt-auto pt-4">
        {/* 生成按钮 */}
        <button
          className={cn(
            "w-full py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
            state.prompt.trim().length > 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          )}
          disabled={state.prompt.trim().length === 0}
        >
          {t('generate_button', { count: state.outputCount })}
        </button>

        {/* 返回按钮 - 只在 hero-two 模式下显示 */}
        {currentMode === 'two' && showBackButton && onBackToOne && (
          <button
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
            onClick={onBackToOne}
            aria-label="Return to hero mode one"
          >
            {t('back_button')}
          </button>
        )}
      </div>
    </div>
  );
}
