
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, GraduationCap, MessageCircle, User, Sun, Moon, Globe, Settings, LogOut, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from './ui/sheet';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { name: 'Dictionary', path: '/dictionary', icon: Book, color: 'text-dictionary' },
    { name: 'Exercises', path: '/exercises', icon: GraduationCap, color: 'text-exercises' },
    { name: 'AI Chat', path: '/chat', icon: MessageCircle, color: 'text-chat' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-lg bg-background/80 dark:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-dictionary bg-clip-text text-transparent">
              BTL
            </span>
            <span className="hidden sm:inline-block text-sm text-muted-foreground">
              | Nền tảng học tiếng Anh thông minh
            </span>
          </motion.div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 font-medium transition-colors hover:text-foreground relative py-2",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("w-4 h-4", item.color)} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-border">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-medium">
                Tài Khoản
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Thông tin cá nhân</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Thông tin cá nhân</DialogTitle>
                    <DialogDescription>
                      Xem và cập nhật thông tin tài khoản của bạn
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-primary">
                          <UserCircle className="w-20 h-20 text-muted-foreground" />
                        </div>
                        <Button size="sm" variant="outline" className="absolute bottom-0 right-0 rounded-full size-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Họ và tên</h4>
                      <p className="text-muted-foreground">Nguyễn Văn A</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Email</h4>
                      <p className="text-muted-foreground">nguyenvana@gmail.com</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Cấp độ</h4>
                      <p className="text-muted-foreground">Trung cấp</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Ngày tham gia</h4>
                      <p className="text-muted-foreground">01/01/2023</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Chỉnh sửa</Button>
                    <Button>Lưu thay đổi</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Sheet>
                <SheetTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt</span>
                  </DropdownMenuItem>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Cài đặt</SheetTitle>
                    <SheetDescription>
                      Tùy chỉnh các thiết lập cho ứng dụng
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Giao diện</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Chế độ tối</span>
                        <Button variant="outline" size="sm" onClick={toggleTheme}>
                          {theme === 'dark' ? <Sun className="h-4 w-4 mr-1" /> : <Moon className="h-4 w-4 mr-1" />}
                          {theme === 'dark' ? 'Sáng' : 'Tối'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Thông báo</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email thông báo</span>
                        <Button variant="outline" size="sm">Bật</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Nhắc nhở hàng ngày</span>
                        <Button variant="outline" size="sm">Tắt</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Bảo mật</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Đổi mật khẩu</span>
                        <Button variant="outline" size="sm">Cập nhật</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Xác thực hai yếu tố</span>
                        <Button variant="outline" size="sm">Thiết lập</Button>
                      </div>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button variant="outline">Hủy</Button>
                    <Button>Lưu thay đổi</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation Icons */}
        <div className="md:hidden flex items-center gap-4">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={cn(
                "flex items-center justify-center", 
                location.pathname === item.path ? item.color : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
