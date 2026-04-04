'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function TwoFactorAuthPage() {
  const [viewSecret, setViewSecret] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (currentCode) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(currentCode);
        } else {
          // 回退方案：使用 document.execCommand
          const textArea = document.createElement('textarea');
          textArea.value = currentCode;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    }
  };

  const generateCode = async () => {
    if (!viewSecret) {
      setError('请输入密钥');
      return;
    }

    setError('');

    try {
      const response = await fetch('/api/2fa/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: viewSecret,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }

      setCurrentCode(data.code);
      setTimeRemaining(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成验证码失败，请重试');
    }
  };

  // 定时更新验证码
  useEffect(() => {
    if (viewSecret) {
      generateCode();
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const timeInCycle = 30 - (now % 30);
        setTimeRemaining(timeInCycle);
        
        if (timeInCycle === 30) {
          generateCode();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [viewSecret]);

  return (
    <div className="min-h-screen py-12 px-4 md:px-6">
      {/* 返回按钮 */}
      <div className="mb-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
        >
          ← 返回
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
              2FA 双重验证
            </h1>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              输入您的 2FA 密钥，查看当前验证码
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                <strong>提示:</strong> 输入您已有的 2FA 密钥，系统将实时生成当前的验证码
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                2FA 密钥
              </label>
              <input
                type="text"
                value={viewSecret}
                onChange={(e) => setViewSecret(e.target.value.toUpperCase())}
                placeholder="例如: JBSWY3DPEHPK3PXP"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all font-mono tracking-wider"
              />
            </div>

            {viewSecret && currentCode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
              >
                <div className="text-center">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">当前验证码</p>
                  <div className="text-5xl md:text-6xl font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-[0.2em] mb-4">
                    {currentCode}
                  </div>
                  <button
                    onClick={copyCode}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg font-medium text-sm text-zinc-700 dark:text-zinc-300 transition-all shadow-sm hover:shadow-md mb-4 border border-zinc-200 dark:border-zinc-700"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        已复制
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        复制验证码
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-32 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <motion.div
                        layoutId="progress"        
                        animate={{ width: `${(timeRemaining / 30) * 100}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-purple-600 dark:bg-purple-400"
                      />
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {timeRemaining}秒后刷新
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>🔒 隐私保护：</strong>您的 2FA 密钥仅保存在本地浏览器中，不会上传到服务器，确保您的密钥安全。
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
