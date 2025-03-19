
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, GraduationCap, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dictionary', path: '/dictionary', icon: Book, color: 'text-dictionary' },
    { name: 'Exercises', path: '/exercises', icon: GraduationCap, color: 'text-exercises' },
    { name: 'AI Chat', path: '/chat', icon: MessageCircle, color: 'text-chat' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-lg bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-dictionary bg-clip-text text-transparent">
              EngBuddy
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
        
        <div className="block md:hidden">
          <div className="flex gap-4">
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
      </div>
    </header>
  );
};

export default Navbar;
