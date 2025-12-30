import './globals.css';
import { ThemeProvider } from './theme-provider';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

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
          <footer className="w-full py-2 pb-3 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-sm fixed bottom-0 left-0 border-t border-gray-100 dark:border-gray-800 z-40">
            <nav className="flex justify-between items-center px-4 text-sm">
              <span className="text-gray-400 dark:text-gray-500 w-16">©jclio</span>
              <div className="flex gap-6 text-ink dark:text-gray-300">
                <Link href="/" className="hover:underline underline-offset-2">首页</Link>
                <Link href="/list" className="hover:underline underline-offset-2">列表</Link>
              </div>
              <div className="w-16"></div>
            </nav>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
