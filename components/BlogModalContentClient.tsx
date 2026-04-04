'use client';
import { useEffect, useState } from 'react';

interface Post {
  slug: string;
  title: string;
  description: string;
}

export function BlogModalContentClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('获取博客列表失败:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-sm text-zinc-500">加载中...</div>;
  if (error) return <div className="text-sm text-red-500">加载失败：{error}</div>;
  if (posts.length === 0) return <div className="text-sm text-zinc-500">暂无博客</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.slug} className="border-b border-zinc-200 dark:border-zinc-700 pb-4">
          <h3 className="text-base font-medium mb-2">
            <a href={`/blog/${post.slug}`} className="...">
              {post.title}
            </a>
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{post.description}</p>
        </div>
      ))}
    </div>
  );
}