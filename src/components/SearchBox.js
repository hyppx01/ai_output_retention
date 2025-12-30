'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // 获取所有文章数据
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setAllPosts(data))
      .catch(err => console.error('Failed to load posts:', err));
  }, []);

  // 搜索过滤
  useEffect(() => {
    if (query.trim()) {
      const filtered = allPosts.filter(post =>
        post.title?.toLowerCase().includes(query.toLowerCase()) ||
        post.content?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query, allPosts]);

  return (
    <div className="relative">
      <div className="flex items-center border-b border-gray-200 dark:border-gray-700 focus-within:border-gray-400">
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <div className="relative flex-1 ml-2">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder=""
            className="w-full pr-4 py-1 text-sm bg-transparent focus:outline-none text-ink dark:text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && query.trim() && results.length > 0 && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="max-h-80 overflow-y-auto">
            {results.map((post) => (
              <a
                key={post.id}
                href={`/posts/${encodeURIComponent(post.id)}`}
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <div className="font-medium text-ink dark:text-gray-200 text-sm truncate">
                  {post.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {post.content.slice(0, 80)}...
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 点击外部关闭 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
