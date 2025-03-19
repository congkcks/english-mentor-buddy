
import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard';
import { Book, GraduationCap, MessageCircle, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const features = [
  {
    title: 'Từ điển',
    description: 'Tra cứu từ vựng với định nghĩa chi tiết, ví dụ thực tế và gợi ý sử dụng trong nhiều ngữ cảnh khác nhau.',
    icon: Book,
    path: '/dictionary',
    color: 'text-dictionary',
    bgColor: 'bg-dictionary/10',
  },
  {
    title: 'Bài tập',
    description: 'Thiết lập bài tập phù hợp với nhu cầu học tập của bạn với các chủ đề và dạng bài tập đa dạng.',
    icon: GraduationCap,
    path: '/exercises',
    color: 'text-exercises',
    bgColor: 'bg-exercises/10',
  },
  {
    title: 'Chat với AI',
    description: 'Trò chuyện với trợ lý AI thông minh để được hướng dẫn, giải thích và luyện tập tiếng Anh trong tình huống thực tế.',
    icon: MessageCircle,
    path: '/chat',
    color: 'text-chat',
    bgColor: 'bg-chat/10',
  }
];

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Header của trang chủ với chế độ sáng tối và tài khoản */}
      <div className="container px-4 md:px-6 py-4 flex justify-end gap-4">
        {/* Theme Toggle Button */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Chuyển đổi giao diện</span>
        </Button>

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full border-border">
              <User className="h-5 w-5" />
              <span className="sr-only">Tài khoản</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="font-medium">
              Tài Khoản
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
            <DropdownMenuItem>Cài đặt</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Hero Section */}
      <section className="pt-4 pb-20 md:pt-10 md:pb-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-2"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Nâng cao kỹ năng tiếng Anh với{" "}
                <span className="bg-gradient-to-r from-primary via-dictionary to-exercises bg-clip-text text-transparent inline-block">
                  EngBuddy
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                Công cụ học tiếng Anh thông minh giúp bạn tra từ, tạo bài tập và luyện tập với AI chỉ trong một nền tảng.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a
                href="/dictionary"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Bắt đầu ngay
              </a>
              <a
                href="#features"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Khám phá tính năng
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave Separator */}
      <div className="relative h-16 md:h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full text-background"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 320H1440V0C1344 80 1104 160 720 160C336 160 96 80 0 0V320Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Tính năng chính
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Mọi công cụ bạn cần để thành thạo tiếng Anh
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                EngBuddy kết hợp các tính năng thiết yếu giúp việc học tiếng Anh trở nên hiệu quả và thú vị hơn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
