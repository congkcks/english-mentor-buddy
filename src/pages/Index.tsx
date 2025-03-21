
import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard';
import { Book, GraduationCap, MessageCircle, Globe } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

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
  return (
    <MainLayout>
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <Globe className="h-8 w-8 text-primary" />
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-dictionary to-exercises bg-clip-text text-transparent">
                  BTL
                </span>
                <span className="hidden sm:inline-block text-sm text-muted-foreground">
                  | Nền tảng học tiếng Anh thông minh
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Nâng cao kỹ năng tiếng Anh với{" "}
                <span className="bg-gradient-to-r from-primary via-dictionary to-exercises bg-clip-text text-transparent inline-block">
                  BTL
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
                BTL kết hợp các tính năng thiết yếu giúp việc học tiếng Anh trở nên hiệu quả và thú vị hơn.
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
    </MainLayout>
  );
};

export default Index;
