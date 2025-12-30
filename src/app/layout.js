import './globals.css';
import { ThemeProvider } from './theme-provider';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import SearchBox from '@/components/SearchBox';

export const metadata = {
  title: 'AI Output Retention',
  description: 'Retention of valuable AI outputs',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#121212] transition-colors duration-300 min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          {/* 顶部: 右侧切换 */}
          <header className="fixed top-0 left-0 right-0 p-4 z-50 flex justify-end">
            <ThemeToggle />
          </header>

          {/* 主体内容 */}
          <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-16">
            {children}
          </main>

          {/* 底部导航 */}
          <footer className="w-full py-2 pb-3 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-sm fixed bottom-0 left-0 right-0 border-t border-gray-100 dark:border-gray-800 z-40">
            <nav className="relative flex items-center justify-center text-sm h-full">
              {/* 左侧版权 */}
              <span className="text-gray-400 dark:text-gray-500 absolute left-0" style={{ left: '20px' }}>©jclio</span>

              {/* 中间链接 */}
              <div className="flex gap-6 text-ink dark:text-gray-300">
                <Link href="/" className="hover:underline underline-offset-2">首页</Link>
                <Link href="/list" className="hover:underline underline-offset-2">列表</Link>
              </div>

              {/* 右侧搜索 */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10" style={{ right: '20px' }}>
                <SearchBox />
              </div>
            </nav>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
